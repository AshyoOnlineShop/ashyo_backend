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

interface CustomerCardAttr {
  customer_id: number;
  card_number: number;
  cardholder_name: string;
  expiration_date: string;
  card_type_id: number;
  last_used: string;
}

@Table({ tableName: 'customer_cards' })
export class CustomerCard extends Model<CustomerCard, CustomerCardAttr> {
  @ApiProperty({ example: 1, description: 'Unique ID' })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: 1, description: 'Customer Id' })
  // @ForeignKey(() => Customer)
  @Column({ type: DataType.INTEGER, allowNull: false })
  customer_id: number;

  // @BelongsTo(() => Customer)
  // customer: Customer;

  @ApiProperty({ example: 123456789, description: 'Card Number' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  card_number: number;

  @ApiProperty({ example: 'MESSI', description: 'Cardholder Name' })
  @Column({ type: DataType.STRING, allowNull: false })
  cardholder_name: string;

  @ApiProperty({ example: '01/23', description: 'Expiration Date' })
  @Column({ type: DataType.STRING, allowNull: false })
  expiration_date: string;

  @ApiProperty({ example: 1, description: 'Card Type Id' })
  // @ForeignKey(() => Card_types)
  @Column({ type: DataType.INTEGER, allowNull: false })
  card_type_id: number;

  // @BelongsTo(() => Card_types)
  // card_type: Card_types;

  @ApiProperty({ example: '2023-11-12', description: 'last_used' })
  @Column({ type: DataType.STRING, allowNull: false })
  last_used: string;
}
