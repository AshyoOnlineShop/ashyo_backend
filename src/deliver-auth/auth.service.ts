import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Response } from 'express';
import { v4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
import { Stuff } from '../stuff/model/stuff.model';
import { DeliverMailService } from '../mail-deliver/mail.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private mailservice: DeliverMailService,
    private jwtService: JwtService,
  ) {}

  async signup(authDto: AuthDto, res: Response) {
    try {
      const candidate = await Stuff.findOne({
        where: { email: authDto.email },
      });

      if (candidate != null) {
        throw new BadRequestException('Bunday email mavjud');
      }
      const user = await Stuff.create({ ...authDto, role: 'deliver' });
      user.activation_link = v4();
      user.save();
      
      this.mailservice.sendUserConfirmation(user);
      const tokens = await this.getTokens(user.id, user.email);
      await this.updateRefreshTokenHash(user.id, tokens.refresh_token);
      user.hashed_refresh_token = tokens.refresh_token;
      user.save()
      res.cookie('refesh_token', tokens.refresh_token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return { tokens, message: 'Email confirmation link is sent' };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async signin(loginDto: LoginDto, res: Response) {
    try {
      const { email, hashed_password } = loginDto;
      const user = await Stuff.findOne({ where: { email } });
      
      if (user==null) {
        throw new BadRequestException('Access  denied');
      }
      const passwordMatches = user.hashed_password == hashed_password;
      if (!passwordMatches) {
        throw new ForbiddenException('Access denied');
      }

      if (user.role!='deliver') {
        throw new ForbiddenException('Access denied');
      }

      const tokens = await this.getTokens(user.id, user.email);
      await this.updateRefreshTokenHash(user.id, tokens.refresh_token);
      res.cookie('refesh_token', tokens.refresh_token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return tokens;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async signout(userId: number, res: Response) {
    try {
      
      const user = await Stuff.findOne({
        where: { id: userId },
      });
      if (!user) {
        throw new BadRequestException('Access denied');
      }
      res.clearCookie('refesh_token');
      Stuff.destroy({ where: { id: userId } });
      return 'Signed Out';
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async refreshTokens(res: Response | any) {
    try {
      const tokens = await this.getTokens(1, 'gmail@gmail.com');
      res.cookie('refresh_token', tokens.refresh_token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return tokens;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async getTokens(userId: number, email: string) {
    try {
      const jwtPayload = {
        sub: userId,
        email: email,
      };
      const [acccessToken, refreshToken] = await Promise.all([
        this.jwtService.signAsync(jwtPayload, {
          secret: process.env.ACCESS_TOKEN_KEY,
          expiresIn: process.env.ACCESS_TOKEN_TIME,
        }),
        this.jwtService.signAsync(jwtPayload, {
          secret: process.env.REFRESH_TOKEN_KEY,
          expiresIn: process.env.REFRESH_TOKEN_TIME,
        }),
      ]);
      return {
        access_token: acccessToken,
        refresh_token: refreshToken,
      };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async updateRefreshTokenHash(
    userId: number,
    refreshToken: string,
  ): Promise<void> {
    try {
      await Stuff.update(
        { hashed_refresh_token: refreshToken },
        {
          where: {
            id: userId,
          },
        },
      );
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async activate(link: string) {
    try {
      if (!link) {
        throw new BadRequestException('Activation link not found');
      }

      const updatedUser = await Stuff.update(
        { is_active: true },
        { where: { activation_link: link, is_active: false } },
      );

      if (!updatedUser[0]) {
        throw new BadRequestException('User already activated');
      }

      const response = {
        message: 'User activated successfuly',
      };
      return response;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
