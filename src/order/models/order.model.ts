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

  @ApiProperty({ example: 1, description: 'customer id' })
  @Column({
    type: DataType.INTEGER,
  })
  customer_id: number;

  @ApiProperty({ example: 1, description: 'customer location id' })
  @Column({
    type: DataType.INTEGER,
  })
  customer_location_id: number;

  @ApiProperty({ example: 1, description: 'payment id' })
  @Column({
    type: DataType.INTEGER,
  })
  payment_id: number;

  @ApiProperty({ example: '2023-11-12', description: 'ordering date' })
  @Column({
    type: DataType.STRING,
  })
  ordering_date: string;

  @ApiProperty({ example: true, description: 'order status' })
  @Column({
    type: DataType.BOOLEAN,
  })
  status: boolean;
}
