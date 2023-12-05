import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  async getAllCustomerCarts(
    customerId: number,
    page: number,
    limit: number,
  ): Promise<{ carts: Cart[]; count: number }> {
    try {
      const validatedPage = +page > 0 ? +page : 1;
      const validatedLimit = +limit > 0 ? +limit : null;

      const offset = (validatedPage - 1) * validatedLimit;

      const carts = await this.cartRepo.findAll({
        include: { all: true },
        where: { customer_id: customerId },
        offset,
        limit: validatedLimit,
      });

      const count = await this.cartRepo.count({
        where: { customer_id: customerId },
      });

      return { carts, count };
    } catch (error) {
      console.error(error);
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

  async remove(productId: number, customerId: number) {
    try {
      const cart = await this.cartRepo.destroy({
        where: {
          product_id: productId,
          customer_id: customerId,
        },
      });

      if (!cart) {
        throw new NotFoundException('Product or cutsomer id is incorrect!');
      }

      const response = {
        message: `Product with ID ${productId} removed from cart.`,
        status: cart,
      };
      return response;
    } catch (error) {
      console.error('Error removing cart product:', error);
      return 'Error removing product cart';
    }
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
