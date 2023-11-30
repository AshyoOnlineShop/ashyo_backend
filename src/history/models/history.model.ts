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
import { Customer } from '../../customer/models/customer.model';
import { Order } from '../../order/models/order.model';

interface HistoryAttr {
  customer_id: number;
  order_id: number;
  delivered_date: Date;
}

@Table({ tableName: 'history' })
export class History extends Model<History, HistoryAttr> {
  @ApiProperty({ example: 1, description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Customer)
  @ApiProperty({ example: 1, description: 'customer id' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  customer_id: number;

  @ForeignKey(() => Order)
  @ApiProperty({ example: 1, description: 'order id' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  order_id: number;

  @ApiProperty({ example: '2023-11-12', description: 'delivered date' })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  delivered_date: Date;

  //================== Relationships ================================
  @BelongsTo(() => Customer)
  customer: Customer;

  @BelongsTo(() => Order)
  order: Order;
}
