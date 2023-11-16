import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Customer } from './models/customer.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { LoginCustomerDto } from './dto/login-customer.dto';
import { MailService } from '../mail/mail.service';
import { UpdateCustomerActivenessDto } from './dto/update-customer-activeness.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer) private customerRepo: typeof Customer,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async getAllCustomer(): Promise<Customer[]> {
    try {
      const customers = await this.customerRepo.findAll({
        include: { all: true },
      });

      return customers;
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred while fetching customers',
      );
    }
  }

  async getCustomerById(id: number): Promise<Customer> {
    try {
      const customer = await this.customerRepo.findByPk(id, {
        include: { all: true },
      });

      if (!customer) {
        throw new NotFoundException(`Customer with ID ${id} not found`);
      }

      return customer;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'An error occurred while getting customer by id',
      );
    }
  }

  async deleteCustomerById(id: number) {
    try {
      const customerToDelete = await this.getCustomerById(id);
      const numAffectedRows = await this.customerRepo.destroy({
        where: { id },
      });

      if (numAffectedRows === 0) {
        throw new NotFoundException(`Customer with ID ${id} not found`);
      }

      const response = {
        message: 'Customer deleted',
        customer: customerToDelete,
      };
      return response;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'An error occurred while deleting customer',
      );
    }
  }

  //UPDATE CUSTOMER
  async updateCustomer(id: number, updateCustomerDto: UpdateCustomerDto) {
    const allowedProperties = ['first_name', 'last_name', 'phone_number'];

    const invalidProperties = Object.keys(updateCustomerDto).filter(
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

    const [numAffectedRows, updatedCustomers] = await this.customerRepo.update(
      updateCustomerDto,
      {
        where: { id },
        returning: true,
      },
    );

    if (numAffectedRows === 0) {
      throw new BadRequestException(
        `Customer with ID ${id} was not found or no changes were made.`,
      );
    }

    const response = {
      message: 'Customer updated',
      customer: updatedCustomers[0].dataValues,
    };

    return response;
  }

  // CHANGE CUSTOMER PASSWORD
  async changePassword(id: number, oldPassword: string, newPassword: string) {
    const customer = await this.customerRepo.findByPk(id);

    if (!customer) {
      throw new NotFoundException(`Customer with id ${id} not found.`);
    }

    const isOldPasswordValid = await bcrypt.compare(
      oldPassword,
      customer.password,
    );

    if (!isOldPasswordValid) {
      throw new BadRequestException('Password you entered is incorrect!');
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 7);

    const [numAffectedRows, updatedCustomers] = await this.customerRepo.update(
      { password: hashedNewPassword },
      {
        where: { id },
        returning: true,
      },
    );

    if (numAffectedRows === 0) {
      throw new BadRequestException('Failed to update the password.');
    }

    return updatedCustomers[0].dataValues;
  }

  // UPDATE CUSTOMER ACTIVENESS
  async updateCustomerActiveness(
    id: number,
    updateCustomerActivenessDto: UpdateCustomerActivenessDto,
  ) {
    const customer = await this.getCustomerById(id);
    if (!customer) {
      throw new NotFoundException(`Customer with id ${id} not found.`);
    }
    const { is_active } = updateCustomerActivenessDto;
    const updatedValues: Partial<Customer> = {};
    if (is_active !== undefined) {
      updatedValues.is_active = is_active;
    }
    const [numAffectedRows] = await this.customerRepo.update(updatedValues, {
      where: { id },
    });
    if (numAffectedRows === 0) {
      throw new NotFoundException(
        `Customer with id ${id} not found or no changes were made.`,
      );
    }

    return this.getCustomerById(id);
  }

  //REGISTRATION
  async signup(createCustomerDto: CreateCustomerDto, res: Response) {
    const customer = await this.customerRepo.findOne({
      where: { email: createCustomerDto.email },
    });
    if (customer) {
      throw new BadRequestException('Email already exists!');
    }
    if (createCustomerDto.password !== createCustomerDto.confirm_password) {
      throw new BadRequestException('Password is not match!');
    }

    const hashed_password = await bcrypt.hash(createCustomerDto.password, 7);
    const newCustomer = await this.customerRepo.create({
      ...createCustomerDto,
      password: hashed_password,
    });
    const tokens = await this.getTokens(newCustomer);

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const uniqueKey: string = uuidv4();
    const updatedCustomer = await this.customerRepo.update(
      {
        hashed_refresh_token: hashed_refresh_token,
        activation_link: uniqueKey,
      },
      { where: { id: newCustomer.id }, returning: true },
    );
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    try {
      await this.mailService.sendCustomerConfirmation(updatedCustomer[1][0]);
    } catch (error) {
      console.log(error);
    }

    const response = {
      message: 'Customer registered',
      customer: updatedCustomer[1][0],
      tokens,
    };
    return response;
  }

  //GET TOKENS
  async getTokens(customer: Customer) {
    const jwtPayload = {
      id: customer.id,
      is_active: customer.is_active,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.CUSTOMER_ACCESS_TOKEN_KEY,
        expiresIn: process.env.CUSTOMER_ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.CUSTOMER_REFRESH_TOKEN_KEY,
        expiresIn: process.env.CUSTOMER_REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  //LOGIN
  async login(loginCustomerDto: LoginCustomerDto, res: Response) {
    const { email, password } = loginCustomerDto;
    const customer = await this.customerRepo.findOne({ where: { email } });
    if (!customer) {
      throw new UnauthorizedException('Customer not registered');
    }
    if (!customer.is_active) {
      throw new BadRequestException('Customer is not active');
    }
    const isMatchPass = await bcrypt.compare(password, customer.password);

    if (!isMatchPass) {
      throw new UnauthorizedException('Customer not registered(pass)');
    }

    const tokens = await this.getTokens(customer);

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const updatedCustomer = await this.customerRepo.update(
      {
        hashed_refresh_token: hashed_refresh_token,
      },
      { where: { id: customer.id }, returning: true },
    );
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'Customer logged in',
      customer: updatedCustomer[1][0],
      tokens,
    };
    return response;
  }

  //LOGOUT
  async logout(refreshToken: string, res: Response) {
    const customerData = await this.jwtService.verify(refreshToken, {
      secret: process.env.CUSTOMER_REFRESH_TOKEN_KEY,
    });
    if (!customerData) {
      throw new ForbiddenException('Customer not found');
    }
    const updatedCustomer = await this.customerRepo.update(
      {
        hashed_refresh_token: null,
      },
      { where: { id: customerData.id }, returning: true },
    );
    res.clearCookie('refresh_token');
    const response = {
      message: 'Customer logged out successfully',
      customer: updatedCustomer[1][0],
    };
    return response;
  }

  //REFRESH TOKEN
  async refreshToken(customer_id: number, refreshToken: string, res: Response) {
    const decodedToken = this.jwtService.decode(refreshToken);
    if (customer_id != decodedToken['id']) {
      throw new BadRequestException('Customer not found');
    }

    const customer = await this.customerRepo.findOne({
      where: { id: customer_id },
    });
    if (!customer || !customer.hashed_refresh_token) {
      throw new BadRequestException('Customer not found');
    }

    const tokenMatch = await bcrypt.compare(
      refreshToken,
      customer.hashed_refresh_token,
    );

    if (!tokenMatch) {
      throw new ForbiddenException('Forbidden');
    }

    const tokens = await this.getTokens(customer);

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const updatedCustomer = await this.customerRepo.update(
      {
        hashed_refresh_token: hashed_refresh_token,
      },
      { where: { id: customer.id }, returning: true },
    );
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'Customer refreshed',
      customer: updatedCustomer[1][0],
      tokens,
    };
    return response;
  }

  // ACTIVATE
  async activate(link: string) {
    if (!link) {
      throw new BadRequestException('Activation link not found');
    }
    const updatedCustomer = await this.customerRepo.update(
      { is_active: true },
      { where: { activation_link: link, is_active: false }, returning: true },
    );

    if (!updatedCustomer[1][0]) {
      throw new BadRequestException('Customer already activated');
    }

    const response = {
      message: 'Customer activated successfully',
      customer: updatedCustomer,
    };
    return response;
  }
}
