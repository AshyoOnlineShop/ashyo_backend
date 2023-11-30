import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerCardDto } from './dto/create-customer_card.dto';
import { InjectModel } from '@nestjs/sequelize';
import { CustomerCard } from './models/customer_card.model';
import { UpdateCustomerCardDto } from './dto/update-card_types.dto'; 

@Injectable()
export class CustomerCardService {
  constructor(
    @InjectModel(CustomerCard)
    private customerCardRepo: typeof CustomerCard,
  ) {}

  async createCustomerCard(
    createCustomerCardDto: CreateCustomerCardDto,
  ): Promise<CustomerCard> {
    const customerCard = await this.customerCardRepo.create(
      createCustomerCardDto,
    );
    return customerCard;
  }

  async getAllCustomerCards(): Promise<CustomerCard[]> {
    const customerCards = await this.customerCardRepo.findAll({
      include: { all: true },
    });
    return customerCards;
  }

  async getCustomerCardById(id: number): Promise<CustomerCard> {
    const customerCard = await this.customerCardRepo.findOne({
      where: { id },
      include: { all: true },
    });
    return customerCard;
  }

//   async getCustomerCardByName(name: string): Promise<CustomerCard> {
//     console.log(name);
//     const customerCard = await this.customerCardRepo.findOne({
//       where: { name },
//       include: { all: true },
//     });
//     return customerCard;
//   }

  async deleteCustomerCardById(id: number): Promise<number> {
    return this.customerCardRepo.destroy({ where: { id } });
  }

  async updateCustomerCard(
    id: number,
    updateCustomerCardDto: UpdateCustomerCardDto,
  ): Promise<CustomerCard> {
    const customerCard = await this.customerCardRepo.update(
      updateCustomerCardDto,
      {
        where: { id },
        returning: true,
      },
    );

    if (!customerCard[1].length) {
      throw new NotFoundException(`CustomerCard with ID "${id}" not found`);
    }

    return customerCard[1][0].dataValues;
  }
}
