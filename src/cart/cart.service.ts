import { BadRequestException, Injectable } from '@nestjs/common';
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

  async createCart(createCartDto: CreateCartDto): Promise<Cart> {
    const cart = await this.cartRepo.create(createCartDto);
    return cart;
  }

  async getAllCarts(
    page: number,
    limit: number,
  ): Promise<{ carts: Cart[]; count: number }> {
    try {
      let page1: number = +page > 0 ? +page : 1;
      let limit1: number = +limit > 0 ? +limit : null;

      const carts = await this.cartRepo.findAll({
        include: { all: true },
        offset: (page1 - 1) * limit1,
        limit: limit1,
      });

      const count = await this.cartRepo.count();
      return { carts, count };
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Bad request from client');
    }
  }

  async getCartById(id: number): Promise<Cart> {
    const cart = await this.cartRepo.findOne({
      where: { id },
      include: { all: true },
    });
    return cart;
  }

  async deleteCartById(id: number): Promise<number> {
    return this.cartRepo.destroy({ where: { id } });
  }

  async updateCart(id: number, updateCartDto: UpdateCartDto): Promise<Cart> {
    const cart = await this.cartRepo.update(updateCartDto, {
      where: { id },
      returning: true,
    });
    console.log(cart);

    return cart[1][0].dataValues;
  }
}
