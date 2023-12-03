import { BadRequestException, Injectable } from '@nestjs/common';
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

  async getAllPayments(
    page: number,
    limit: number,
  ): Promise<{ payments: Payment[]; count: number }> {
    try {
      let page1: number = +page > 0 ? +page : 1;
      let limit1: number = +limit > 0 ? +limit : null;

      const payments = await this.paymentRepo.findAll({
        include: { all: true },
        offset: (page1 - 1) * limit1,
        limit: limit1,
      });

      const count = await this.paymentRepo.count();
      return { payments, count };
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Bad request from client');
    }
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
