import {
  Body,
  Controller,
  Delete,
  Get, 
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Customer } from './models/customer.model';
import { LoginCustomerDto } from './dto/login-customer.dto';
import { CookieGetter } from '../decorators/cookieGetter.decorator';
import { ChangeCustomerPasswordDto } from './dto/change-customer-password.dto';
import { UpdateCustomerActivenessDto } from './dto/update-customer-activeness.dto';
import { CustomerSelfGuard } from '../guards/customer.self.guard';
import { CustomerGuard } from '../guards/customer.guard';
import { AdminGuard } from '../guards/admin.guard';
import { SuperadminGuard } from '../guards/superadmin.guard';

@ApiTags('Customer')
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  // @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Get all customers' })
  @Get('all/:q')
  async getAllCustomer(
    @Query() q: any,
  ): Promise<{ customers: Customer[]; count: number }> {
    return this.customerService.getAllCustomer(q?.page, q?.limit);
  }

  // @UseGuards(CustomerSelfGuard)
  // @UseGuards(CustomerGuard)
  @ApiOperation({ summary: 'Get customer by id' })
  @Get(':id')
  async getCustomerById(@Param('id') id: string) {
    return this.customerService.getCustomerById(+id); 
  }

  // @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Delete customer' })
  @Delete('delete/:id')
  async deleteCustomerById(@Param('id') id: string) {
    return this.customerService.deleteCustomerById(+id);
  }

  // @UseGuards(CustomerSelfGuard)
  // @UseGuards(CustomerGuard)
  @ApiOperation({ summary: 'Update customer' })
  @Put('update/:id')
  async updateCustomer(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customerService.updateCustomer(+id, updateCustomerDto);
  }

  // @UseGuards(CustomerSelfGuard)
  // @UseGuards(CustomerGuard)
  @ApiOperation({ summary: 'Change customer password' })
  @Put('change-password/:id')
  async changePassword(
    @Param('id') id: number,
    @Body() changeCustomerPasswordDto: ChangeCustomerPasswordDto,
  ) {
    const { oldPassword, newPassword } = changeCustomerPasswordDto;

    const updatedCustomer = await this.customerService.changePassword(
      id,
      oldPassword,
      newPassword,
    );

    if (!updatedCustomer) {
      return { message: 'Password change failed.' };
    }

    return { message: 'Password changed successfully.' };
  }

  // @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Change customer activeness' })
  @Put('activeness/:id')
  async changeCustomerActiveness(
    @Param('id') id: number,
    @Body() updateCustomerActivenessDto: UpdateCustomerActivenessDto,
  ) {
    try {
      const updatedCustomer =
        await this.customerService.updateCustomerActiveness(
          id,
          updateCustomerActivenessDto,
        );
      return {
        message: 'Customer activeness updated successfully.',
        customer: updatedCustomer,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        return { message: error.message };
      }
      throw error;
    }
  }
  // ================= AUTH ==================================================

  @ApiOperation({ summary: 'Signup Customer' })
  @ApiResponse({ status: 201, type: Customer })
  @Post('signup')
  signup(
    @Body() createCustomerDto: CreateCustomerDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.customerService.signup(createCustomerDto, res);
  }

  @ApiOperation({ summary: 'Login Customer' })
  @ApiResponse({ status: 200, type: Customer })
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  login(
    @Body() loginCustomerDto: LoginCustomerDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.customerService.login(loginCustomerDto, res);
  }

  @ApiOperation({ summary: 'Logout Customer' })
  @ApiResponse({ status: 200, type: Customer })
  @HttpCode(HttpStatus.OK)
  @Post('signout')
  logout(
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.customerService.logout(refreshToken, res);
  }

  @ApiOperation({ summary: 'Activate Customer' })
  @ApiResponse({ status: 200, type: [Customer] })
  @Get('activate/:link')
  activate(@Param('link') link: string) {
    return this.customerService.activate(link);
  }

  @ApiOperation({ summary: 'Refresh customer token' })
  @Post('refresh/:id')
  refresh(
    @Param('id') id: string,
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.customerService.refreshToken(+id, refreshToken, res);
  }
}
