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
import { Customer } from '../../customer/models/customer.model';
import { Card_types } from '../../card_types/models/card_types.model';
import { Payment } from '../../payment/models/payment.model';

interface CustomerCardAttr {
  customer_id: number;
  card_number: number;
  cardholder_name: string;
  expiration_date: string;
  cvv: number;
  card_type_id: number;
  last_used: string;
}

@Table({ tableName: 'customer_cards' })
export class CustomerCard extends Model<CustomerCard, CustomerCardAttr> {
  @ApiProperty({ example: 1, description: 'Unique ID' })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => Customer)
  @ApiProperty({ example: 1, description: 'Customer Id' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  customer_id: number;

  @ApiProperty({ example: 123456789, description: 'Card Number' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  card_number: number;

  @ApiProperty({ example: 'MESSI', description: 'Cardholder Name' })
  @Column({ type: DataType.STRING, allowNull: false })
  cardholder_name: string;

  @ApiProperty({ example: '01/23', description: 'Expiration Date' })
  @Column({ type: DataType.STRING, allowNull: false })
  expiration_date: string;

  @ApiProperty({ example: 1232, description: 'Card cvv' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  cvv: number;

  @ForeignKey(() => Card_types)
  @ApiProperty({ example: 1, description: 'Card Type Id' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  card_type_id: number;

  @ApiProperty({ example: '2023-11-12', description: 'last_used' })
  @Column({ type: DataType.STRING, allowNull: false })
  last_used: string;

  //================== Relationships ================================
  @BelongsTo(() => Customer)
  customer: Customer;

  @BelongsTo(() => Card_types)
  card_type: Card_types;

  @HasMany(() => Payment)
  payments: Payment[];
}
