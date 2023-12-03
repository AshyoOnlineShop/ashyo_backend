import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Customer } from '../customer/models/customer.model';
import { Stuff } from '../stuff/models/stuff.model';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}
  async sendCustomerConfirmation(customer: Customer): Promise<void> {
    const url = `${process.env.API_HOST}:${process.env.API_PORT}/api/customer/activate/${customer.activation_link}`;
    console.log(url);
    await this.mailerService.sendMail({
      to: customer.email,
      subject: 'Welcome to Ashyo Online Shop! Confirm your Email.',
      template: './confirmation',
      context: {
        name: customer.first_name,
        url,
      },
    });
  }

  async sendStuffConfirmation(stuff: Stuff): Promise<void> {
    const url = `${process.env.API_HOST}:${process.env.API_PORT}/api/stuff/activate/${stuff.activation_link}`;
    console.log(url);
    await this.mailerService.sendMail({
      to: stuff.email,
      subject: 'Welcome to Ashyo Online Shop! Confirm your Email.',
      template: './confirmation',
      context: {
        name: stuff.first_name,
        url,
      },
    });
  }
}
