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
import { Delivery } from '../../delivery/models/delivery.model';
import { History } from '../../history/models/history.model';
import { Customer } from '../../customer/models/customer.model';
import { CustomerLocation } from '../../customer_location/models/customer_location.model';
import { Payment } from '../../payment/models/payment.model';

interface OrderAttr {
  customer_id: number;
  customer_location_id: number;
  payment_id: number;
  ordering_date: string;
  status: boolean;
}

@Table({ tableName: 'order' })
export class Order extends Model<Order, OrderAttr> {
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

  @ForeignKey(() => CustomerLocation)
  @ApiProperty({ example: 1, description: 'customer location id' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  customer_location_id: number;

  @ForeignKey(() => Payment)
  @ApiProperty({ example: 1, description: 'payment id' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  payment_id: number;

  @ApiProperty({ example: '2023-11-12', description: 'ordering date' })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  ordering_date: Date;

  @ApiProperty({ example: true, description: 'order status' })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  status: boolean;

  // ======================RELATIONSHIPS=====================================
  @HasMany(() => Delivery)
  deliveries: Delivery[];

  @HasMany(() => History)
  histories: History[];

  @BelongsTo(() => Customer)
  customer: Customer;

  @BelongsTo(() => CustomerLocation)
  customer_location: CustomerLocation;

  @BelongsTo(() => Payment)
  payment: Payment;
}
