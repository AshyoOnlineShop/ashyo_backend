import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { CustomerLocation } from '../../customer_location/models/customer_location.model';
import { Cart } from '../../cart/models/cart.model';
import { Comment } from '../../comments/models/comment.model';
import { CustomerCard } from '../../customer_card/models/customer_card.model';
import { History } from '../../history/models/history.model';
import { LikedProduct } from '../../liked_products/models/liked_product.model';
import { Order } from '../../order/models/order.model';
import { Rating } from '../../rating/models/rating.model';
import { ViewedProduct } from '../../viewed_products/models/viewed_product.model';

interface CustomerAttr {
  first_name: string;
  last_name: string;
  image: string;
  phone_number: string;
  email: string;
  password: string;
  is_active: boolean;
  hashed_refresh_roken: string;
  activation_link: string;
}

@Table({ tableName: 'customer' })
export class Customer extends Model<Customer, CustomerAttr> {
  @ApiProperty({ example: 1, description: 'Unikal Id' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'John', description: 'Customer first name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  first_name: string;

  @ApiProperty({ example: 'Green', description: 'Customer last name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  last_name: string;

  @ApiProperty({ example: 'img/photo1.jpg', description: 'Customer image' })
  @Column({
    type: DataType.STRING,
  })
  image: string;

  @ApiProperty({
    example: '+998998887766',
    description: 'Customer phone number',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  phone_number: string;

  @ApiProperty({ example: 'john01@gmail.com', description: 'Customer email' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @ApiProperty({ example: '12345', description: 'Customer password' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @ApiProperty({ example: 'false', description: 'Is customer active' })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;

  @Column({
    type: DataType.STRING,
  })
  hashed_refresh_token: string;

  @Column({
    type: DataType.STRING,
  })
  activation_link: string;

  //================== Relationships ================================
  @HasMany(() => CustomerLocation)
  customer_locations: CustomerLocation[];

  @HasMany(() => Cart)
  carts: Cart[];

  @HasMany(() => Rating)
  ratings: Rating[];

  @HasMany(() => Comment)
  comments: Comment[];

  @HasMany(() => CustomerCard)
  customer_cards: CustomerCard[];

  @HasMany(() => History)
  histories: History[];

  @HasMany(() => LikedProduct)
  liked_products: LikedProduct[];

  @HasMany(() => Order)
  orders: Order[];

  @HasMany(() => ViewedProduct)
  viewed_products: ViewedProduct[];
}
