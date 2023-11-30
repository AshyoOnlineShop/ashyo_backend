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
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { Cart } from './models/cart.model';
import { UpdateCartDto } from './dto/update-cart.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CustomerGuard } from '../guards/customer.guard';

@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(CustomerGuard)
  @ApiOperation({ summary: 'to create cart' })
  @ApiResponse({ status: 200, description: 'New cart' })
  @Post('create')
  async createCart(@Body() createCartDto: CreateCartDto) {
    const cart = await this.cartService.createCart(createCartDto);
    return cart;
  }

  @UseGuards(CustomerGuard)
  @ApiOperation({ summary: 'get all cartes' })
  @ApiResponse({ status: 200, description: 'get all cart' })
  @Get('all')
  async getAllCart(): Promise<Cart[]> {
    return this.cartService.getAllCarts();
  }

  @UseGuards(CustomerGuard)
  @ApiOperation({ summary: 'get carts by id' })
  @ApiResponse({ status: 200, description: 'get cart by id' })
  @Get(':id')
  async getCartById(@Param('id') id: string): Promise<Cart> {
    return this.cartService.getCartById(+id);
  }

  @UseGuards(CustomerGuard)
  @ApiOperation({ summary: 'to delete cart' })
  @ApiResponse({ status: 200, description: 'delete cart' })
  @Delete('delete/:id')
  async deleteCartById(@Param('id') id: string): Promise<number> {
    return this.cartService.deleteCartById(+id);
  }

  @UseGuards(CustomerGuard)
  @ApiOperation({ summary: 'to update cart' })
  @ApiResponse({ status: 200, description: 'update cart' })
  @Put('update/:id')
  async updateCart(
    @Param('id') id: string,
    @Body() updateCartDto: UpdateCartDto,
  ): Promise<Cart> {
    return this.cartService.updateCart(+id, updateCartDto);
  }
}
