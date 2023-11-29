import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Payment } from './models/payment.model';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CustomerGuard } from '../guards/customer.guard';
import { AdminGuard } from '../guards/admin.guard';


@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @UseGuards(CustomerGuard)
  @ApiOperation({ summary: 'Create a new payment' })
  @ApiResponse({ status: 200, description: 'New payment created' })
  @Post('create')
  async createPayment(@Body() createPaymentDto: CreatePaymentDto) {
    const payment = await this.paymentService.createPayment(createPaymentDto);
    return payment;
  }

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Get all payments' })
  @ApiResponse({ status: 200, description: 'Get all payments' })
  @Get('all')
  async getAllPayments(): Promise<Payment[]> {
    return this.paymentService.getAllPayments();
  }

  @UseGuards(CustomerGuard)
  @ApiOperation({ summary: 'Get payment by ID' })
  @ApiResponse({ status: 200, description: 'Get payment by ID' })
  @Get(':id')
  async getPaymentById(@Param('id') id: string): Promise<Payment> {
    return this.paymentService.getPaymentById(+id);
  }

  @UseGuards(CustomerGuard)
  @ApiOperation({ summary: 'Delete payment by ID' })
  @ApiResponse({ status: 200, description: 'Delete payment by ID' })
  @Delete('delete/:id')
  async deletePaymentById(@Param('id') id: string): Promise<number> {
    return this.paymentService.deletePaymentById(+id);
  }

  @UseGuards(CustomerGuard)
  @ApiOperation({ summary: 'Update payment' })
  @ApiResponse({ status: 200, description: 'Update payment' })
  @Put('update/:id')
  async updatePayment(
    @Param('id') id: string,
    @Body() updatePaymentDto: UpdatePaymentDto,
  ): Promise<Payment> {
    return this.paymentService.updatePayment(+id, updatePaymentDto);
  }
}
