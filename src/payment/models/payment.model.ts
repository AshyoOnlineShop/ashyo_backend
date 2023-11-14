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

interface PaymentAttr {
  card_id: number;
  customer_card_id: number;
  payment_type: boolean;
  payment_date: string;
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

  @ApiProperty({ example: 1, description: 'card id' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  card_id: number;

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
    allowNull: false
  })
  payment_type: boolean;

  @ApiProperty({ example: '2023-11-12', description: 'payment date' })
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  payment_date: string;

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
}
