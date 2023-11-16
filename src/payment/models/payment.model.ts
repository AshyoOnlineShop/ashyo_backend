import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  HasMany,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Order } from '../../order/models/order.model';
import { Cart } from '../../cart/models/cart.model';
import { CustomerCard } from '../../customer_card/models/customer_card.model';

interface PaymentAttr {
  cart_id: number;
  customer_card_id: number;
  payment_type: boolean;
  payment_date: Date;
  total_price: number;
  status: boolean;
}

@Table({ tableName: 'payment' })
export class Payment extends Model<Payment, PaymentAttr> {
  @ApiProperty({ example: 1, description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Cart)
  @ApiProperty({ example: 1, description: 'card id' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  cart_id: number;

  @ForeignKey(() => CustomerCard)
  @ApiProperty({ example: 1, description: 'customer card id' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  customer_card_id: number;

  @ApiProperty({ example: true, description: 'payment type' })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  payment_type: boolean;

  @ApiProperty({ example: '2023-11-12', description: 'payment date' })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  payment_date: Date;

  @ApiProperty({ example: 100.5, description: 'total price' })
  @Column({
    type: DataType.FLOAT,
  })
  total_price: number;

  @ApiProperty({ example: true, description: 'payment status' })
  @Column({
    type: DataType.BOOLEAN,
  })
  status: boolean;

  // ======================RELATIONSHIPS=====================================
  @HasMany(() => Order)
  orders: Order[];

  @BelongsTo(() => Cart)
  cart: Cart;

  @BelongsTo(() => CustomerCard)
  customer_card: CustomerCard;
}
