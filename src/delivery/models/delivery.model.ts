import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';

interface DeliveryAttributes {
  order_id: number;
  deliver_id: number;
  delivering_price: number;
  status: boolean;
}

@Table({ tableName: 'delivery' })
export class Delivery extends Model<Delivery, DeliveryAttributes> {
  @ApiProperty({ example: 1, description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 123, description: 'Order ID' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  order_id: number;

  @ApiProperty({ example: 456, description: 'Deliver ID' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  deliver_id: number;

  @ApiProperty({ example: 50.99, description: 'Delivering Price' })
  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  delivering_price: number;

  @ApiProperty({ example: true, description: 'Delivery Status' })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  status: boolean;
}
