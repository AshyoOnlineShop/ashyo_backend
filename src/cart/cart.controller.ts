import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Put,
  UseGuards,
  Query,
  BadRequestException,
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

  // @UseGuards(CustomerGuard)
  @ApiOperation({ summary: 'to create cart' })
  @ApiResponse({ status: 200, description: 'New cart' })
  @Post('create')
  async createCart(@Body() createCartDto: CreateCartDto) {
    const cart = await this.cartService.createCart(createCartDto);
    return cart;
  }

  // @UseGuards(CustomerGuard)
  @ApiOperation({ summary: 'get all cartes' })
  @ApiResponse({ status: 200, description: 'get all cart' })
  @Get('all/:q')
  async getAllCart(@Query() q: any): Promise<{ carts: Cart[]; count: number }> {
    return this.cartService.getAllCarts(q?.page, q?.limit);
  }

  // @UseGuards(CustomerGuard)
  @ApiOperation({ summary: 'get all customer carts' })
  @ApiResponse({ status: 200, description: 'get all cart' })
  @Get('all/:customerId/:q')
  async getAllCustomerCarts(
    @Param('customerId') customerId: string,
    @Query() q: any,
  ): Promise<{ carts: Cart[]; count: number }> {
    const parsedCustomerId = +customerId;

    if (isNaN(parsedCustomerId)) {
      throw new BadRequestException('Invalid customer ID');
    }

    const page = q?.page ? +q.page : undefined;
    const limit = q?.limit ? +q.limit : undefined;

    return this.cartService.getAllCustomerCarts(parsedCustomerId, page, limit);
  }

  // @UseGuards(CustomerGuard)
  @ApiOperation({ summary: 'get carts by id' })
  @ApiResponse({ status: 200, description: 'get cart by id' })
  @Get(':id')
  async getCartById(@Param('id') id: string): Promise<Cart> {
    return this.cartService.getCartById(+id);
  }

  // @UseGuards(CustomerGuard)
  @ApiOperation({ summary: 'to delete cart' })
  @ApiResponse({ status: 200, description: 'delete cart' })
  @Delete('delete/:id')
  async deleteCartById(@Param('id') id: string): Promise<number> {
    return this.cartService.deleteCartById(+id);
  }

  // @UseGuards(CustomerGuard)
  @ApiOperation({ summary: 'to update cart' })
  @ApiResponse({ status: 200, description: 'update cart' })
  @Put('update/:id')
  async updateCart(
    @Param('id') id: string,
    @Body() updateCartDto: UpdateCartDto,
  ): Promise<Cart> {
    return this.cartService.updateCart(+id, updateCartDto);
  }

  @ApiOperation({ summary: "id bo'yicha o'chirish" })
  @Delete('remove/:productId/:customerId')
  remove(
    @Param('productId') productId: string,
    @Param('customerId') customerId: string,
  ) {
    return this.cartService.remove(+productId, +customerId);
  }
}
