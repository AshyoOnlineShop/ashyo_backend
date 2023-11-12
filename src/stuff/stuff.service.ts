import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Stuff } from './models/stuff.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateStuffDto } from './dto/create-stuff.dto';
import { UpdateStuffDto } from './dto/update-stuff.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { LoginStuffDto } from './dto/login-stuff.dto';
import { MailService } from '../mail/mail.service';
import { UpdateStuffActivenessDto } from './dto/update-stuff-activeness.dto';

@Injectable()
export class StuffService {
  constructor(
    @InjectModel(Stuff) private stuffRepo: typeof Stuff,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async getAllStuff(): Promise<Stuff[]> {
    try {
      const stuffs = await this.stuffRepo.findAll({
        include: { all: true },
      });

      return stuffs;
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred while fetching stuffs',
      );
    }
  }

  async getStuffById(id: number): Promise<Stuff> {
    try {
      const stuff = await this.stuffRepo.findByPk(id);

      if (!stuff) {
        throw new NotFoundException(`Stuff with ID ${id} not found`);
      }

      return stuff;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'An error occurred while getting stuff by id',
      );
    }
  }

  async deleteStuffById(id: number) {
    try {
      const stuffToDelete = await this.getStuffById(id);
      const numAffectedRows = await this.stuffRepo.destroy({
        where: { id },
      });

      if (numAffectedRows === 0) {
        throw new NotFoundException(`Stuff with ID ${id} not found`);
      }

      const response = {
        message: 'Stuff deleted',
        stuff: stuffToDelete,
      };
      return response;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'An error occurred while deleting stuff',
      );
    }
  }

  //UPDATE CUSTOMER
  async updateStuff(id: number, updateStuffDto: UpdateStuffDto) {
    const allowedProperties = ['first_name', 'last_name', 'phone_number'];

    const invalidProperties = Object.keys(updateStuffDto).filter(
      (property) => !allowedProperties.includes(property),
    );

    if (invalidProperties.length > 0) {
      const invalidPropsList = invalidProperties.join(', ');
      const allowedPropsList = allowedProperties.join(', ');
      const errorMessage = `Invalid change: ${invalidPropsList}.\
 Only the following properties are allowed to be updated:\
 ${allowedPropsList}.`;

      throw new BadRequestException(errorMessage);
    }

    const [numAffectedRows, updatedStuffs] = await this.stuffRepo.update(
      updateStuffDto,
      {
        where: { id },
        returning: true,
      },
    );

    if (numAffectedRows === 0) {
      throw new BadRequestException(
        `Stuff with ID ${id} was not found or no changes were made.`,
      );
    }

    const response = {
      message: 'Stuff updated',
      stuff: updatedStuffs[0].dataValues,
    };

    return response;
  }

  // CHANGE CUSTOMER PASSWORD
  async changePassword(id: number, oldPassword: string, newPassword: string) {
    const stuff = await this.stuffRepo.findByPk(id);

    if (!stuff) {
      throw new NotFoundException(`Stuff with id ${id} not found.`);
    }

    const isOldPasswordValid = await bcrypt.compare(
      oldPassword,
      stuff.password,
    );

    if (!isOldPasswordValid) {
      throw new BadRequestException('Password you entered is incorrect!');
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 7);

    const [numAffectedRows, updatedStuffs] = await this.stuffRepo.update(
      { password: hashedNewPassword },
      {
        where: { id },
        returning: true,
      },
    );

    if (numAffectedRows === 0) {
      throw new BadRequestException('Failed to update the password.');
    }

    return updatedStuffs[0].dataValues;
  }

  // UPDATE CUSTOMER ACTIVENESS
  async updateStuffActiveness(
    id: number,
    updateStuffActivenessDto: UpdateStuffActivenessDto,
  ) {
    const stuff = await this.getStuffById(id);
    if (!stuff) {
      throw new NotFoundException(`Stuff with id ${id} not found.`);
    }
    const { is_active } = updateStuffActivenessDto;
    const updatedValues: Partial<Stuff> = {};
    if (is_active !== undefined) {
      updatedValues.is_active = is_active;
    }
    const [numAffectedRows] = await this.stuffRepo.update(updatedValues, {
      where: { id },
    });
    if (numAffectedRows === 0) {
      throw new NotFoundException(
        `Stuff with id ${id} not found or no changes were made.`,
      );
    }

    return this.getStuffById(id);
  }
  // =============================AUTH=======================================
  //REGISTRATION
  async signup(createStuffDto: CreateStuffDto, res: Response) {
    const stuff = await this.stuffRepo.findOne({
      where: { email: createStuffDto.email },
    });
    if (stuff) {
      throw new BadRequestException('Email already exists!');
    }
    if (createStuffDto.password !== createStuffDto.confirm_password) {
      throw new BadRequestException('Password is not match!');
    }

    const hashed_password = await bcrypt.hash(createStuffDto.password, 7);
    const newStuff = await this.stuffRepo.create({
      ...createStuffDto,
      password: hashed_password,
    });
    const tokens = await this.getTokens(newStuff);

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const uniqueKey: string = uuidv4();
    const updatedStuff = await this.stuffRepo.update(
      {
        hashed_refresh_token: hashed_refresh_token,
        activation_link: uniqueKey,
      },
      { where: { id: newStuff.id }, returning: true },
    );
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    try {
      await this.mailService.sendStuffConfirmation(updatedStuff[1][0]);
    } catch (error) {
      console.log(error);
    }

    const response = {
      message: 'Stuff registered',
      stuff: updatedStuff[1][0],
      tokens,
    };
    return response;
  }

  //GET TOKENS
  async getTokens(stuff: Stuff) {
    const jwtPayload = {
      id: stuff.id,
      is_active: stuff.is_active,
      role: stuff.role,
    };

    let accessTokenKey, accessTokenTime, refreshTokenKey, refreshTokenTime;

    // CHEKING THE STUFF ROLE
    if (stuff.role === 'superadmin') {
      accessTokenKey = process.env.SUPERADMIN_ACCESS_TOKEN_KEY;
      accessTokenTime = process.env.SUPERADMIN_ACCESS_TOKEN_TIME;
      refreshTokenKey = process.env.SUPERADMIN_REFRESH_TOKEN_KEY;
      refreshTokenTime = process.env.SUPERADMIN_REFRESH_TOKEN_TIME;
    } else if (stuff.role === 'admin') {
      accessTokenKey = process.env.ADMIN_ACCESS_TOKEN_KEY;
      accessTokenTime = process.env.ADMIN_ACCESS_TOKEN_TIME;
      refreshTokenKey = process.env.ADMIN_REFRESH_TOKEN_KEY;
      refreshTokenTime = process.env.ADMIN_REFRESH_TOKEN_TIME;
    } else if (stuff.role === 'deliver') {
      accessTokenKey = process.env.DELIVER_ACCESS_TOKEN_KEY;
      accessTokenTime = process.env.DELIVER_ACCESS_TOKEN_TIME;
      refreshTokenKey = process.env.DELIVER_REFRESH_TOKEN_KEY;
      refreshTokenTime = process.env.DELIVER_REFRESH_TOKEN_TIME;
    }

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: accessTokenKey,
        expiresIn: accessTokenTime,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: refreshTokenKey,
        expiresIn: refreshTokenTime,
      }),
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  //LOGIN
  async login(loginStuffDto: LoginStuffDto, res: Response) {
    const { email, password } = loginStuffDto;
    const stuff = await this.stuffRepo.findOne({ where: { email } });
    if (!stuff) {
      throw new UnauthorizedException('Stuff not registered');
    }
    if (!stuff.is_active) {
      throw new BadRequestException('Stuff is not active');
    }
    const isMatchPass = await bcrypt.compare(password, stuff.password);

    if (!isMatchPass) {
      throw new UnauthorizedException('Stuff not registered(pass)');
    }

    const tokens = await this.getTokens(stuff);

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const updatedStuff = await this.stuffRepo.update(
      {
        hashed_refresh_token: hashed_refresh_token,
      },
      { where: { id: stuff.id }, returning: true },
    );
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'Stuff logged in',
      stuff: updatedStuff[1][0],
      tokens,
    };
    return response;
  }

  //LOGOUT
  async logout(refreshToken: string, res: Response, id: number) {
    const stuff = await this.getStuffById(id);
    let stuffRefreshToken;
    if (stuff.role == 'superadmin') {
      stuffRefreshToken = process.env.SUPERADMIN_REFRESH_TOKEN_KEY;
    } else if (stuff.role == 'admin') {
      stuffRefreshToken = process.env.ADMIN_REFRESH_TOKEN_KEY;
    } else if (stuff.role == 'deliver') {
      stuffRefreshToken = process.env.DELIVER_REFRESH_TOKEN_KEY;
    }

    const stuffData = await this.jwtService.verify(refreshToken, {
      secret: stuffRefreshToken,
    });
    if (!stuffData) {
      throw new ForbiddenException('Stuff not found');
    }
    const updatedStuff = await this.stuffRepo.update(
      {
        hashed_refresh_token: null,
      },
      { where: { id: stuffData.id }, returning: true },
    );
    res.clearCookie('refresh_token');
    const response = {
      message: 'Stuff logged out successfully',
      stuff: updatedStuff[1][0],
    };
    return response;
  }

  //REFRESH TOKEN
  async refreshToken(stuff_id: number, refreshToken: string, res: Response) {
    const decodedToken = this.jwtService.decode(refreshToken);
    if (stuff_id != decodedToken['id']) {
      throw new BadRequestException('Stuff not found');
    }

    const stuff = await this.stuffRepo.findOne({
      where: { id: stuff_id },
    });
    if (!stuff || !stuff.hashed_refresh_token) {
      throw new BadRequestException('Stuff not found');
    }

    const tokenMatch = await bcrypt.compare(
      refreshToken,
      stuff.hashed_refresh_token,
    );

    if (!tokenMatch) {
      throw new ForbiddenException('Forbidden');
    }

    const tokens = await this.getTokens(stuff);

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const updatedStuff = await this.stuffRepo.update(
      {
        hashed_refresh_token: hashed_refresh_token,
      },
      { where: { id: stuff.id }, returning: true },
    );
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'Stuff refreshed',
      stuff: updatedStuff[1][0],
      tokens,
    };
    return response;
  }

  // ACTIVATE
  async activate(link: string) {
    if (!link) {
      throw new BadRequestException('Activation link not found');
    }
    const updatedStuff = await this.stuffRepo.update(
      { is_active: true },
      { where: { activation_link: link, is_active: false }, returning: true },
    );

    if (!updatedStuff[1][0]) {
      throw new BadRequestException('Stuff already activated');
    }

    const response = {
      message: 'Stuff activated successfully',
      stuff: updatedStuff,
    };
    return response;
  }
}
