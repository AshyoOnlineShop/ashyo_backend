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


@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @ApiOperation({ summary: 'Create a new payment' })
  @ApiResponse({ status: 200, description: 'New payment created' })
  @Post('create')
  async createPayment(@Body() createPaymentDto: CreatePaymentDto) {
    const payment = await this.paymentService.createPayment(createPaymentDto);
    return payment;
  }

  @ApiOperation({ summary: 'Get all payments' })
  @ApiResponse({ status: 200, description: 'Get all payments' })
  @Get('all')
  async getAllPayments(): Promise<Payment[]> {
    return this.paymentService.getAllPayments();
  }

  @ApiOperation({ summary: 'Get payment by ID' })
  @ApiResponse({ status: 200, description: 'Get payment by ID' })
  @Get(':id')
  async getPaymentById(@Param('id') id: string): Promise<Payment> {
    return this.paymentService.getPaymentById(+id);
  }

  @ApiOperation({ summary: 'Delete payment by ID' })
  @ApiResponse({ status: 200, description: 'Delete payment by ID' })
  @Delete('delete/:id')
  async deletePaymentById(@Param('id') id: string): Promise<number> {
    return this.paymentService.deletePaymentById(+id);
  }

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
