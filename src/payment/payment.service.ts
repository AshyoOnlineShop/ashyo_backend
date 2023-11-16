import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Payment } from './models/payment.model';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment)
    private paymentRepo: typeof Payment,
  ) {}

  async createPayment(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const payment = await this.paymentRepo.create(createPaymentDto);
    return payment;
  }

  async getAllPayments(): Promise<Payment[]> {
    const payments = await this.paymentRepo.findAll({ include: { all: true } });
    return payments;
  }

  async getPaymentById(id: number): Promise<Payment> {
    const payment = await this.paymentRepo.findOne({
      where: { id },
      include: { all: true },
    });
    return payment;
  }

  async deletePaymentById(id: number): Promise<number> {
    return this.paymentRepo.destroy({ where: { id } });
  }

  async updatePayment(
    id: number,
    updatePaymentDto: UpdatePaymentDto,
  ): Promise<Payment> {
    const [_, [updatedPayment]] = await this.paymentRepo.update(
      updatePaymentDto,
      {
        where: { id },
        returning: true,
      },
    );

    return updatedPayment;
  }
}
