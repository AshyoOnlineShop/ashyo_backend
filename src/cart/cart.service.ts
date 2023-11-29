import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Cart } from './models/cart.model';
import { UpdateCartDto } from './dto/update-cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart)
    private cartRepo: typeof Cart,
  ) {}

  async createCart(
    createCartDto: CreateCartDto,
  ): Promise<Cart> {
    const cart = await this.cartRepo.create(createCartDto);
    return cart;
  }

  async getAllCarts(): Promise<Cart[]> {
    const cart = await this.cartRepo.findAll({
      include: { all: true },
    });
    return cart;
  }

  async getCartById(id: number): Promise<Cart> {
    const cart = await this.cartRepo.findOne({
      where: { id },
      include: { all: true }
    });
    return cart;
  }

  async deleteCartById(id: number): Promise<number> {
    return this.cartRepo.destroy({ where: { id } });
  }

  async updateCart(
    id: number,
    updateCartDto: UpdateCartDto,
  ): Promise<Cart> {
    const cart = await this.cartRepo.update(updateCartDto, {
      where: { id },
      returning: true,
    });
    console.log(cart);

    return cart[1][0].dataValues;
  }
}
