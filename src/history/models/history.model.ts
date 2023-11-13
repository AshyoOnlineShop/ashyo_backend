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

interface HistoryAttr {
  customer_id: number;
  order_id: number;
  delivered_date: string;
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

  @ApiProperty({ example: 1, description: 'customer id' })
  @Column({
    type: DataType.INTEGER,
  })
  customer_id: number;

  @ApiProperty({ example: 1, description: 'order id' })
  @Column({
    type: DataType.INTEGER,
  })
  order_id: number;

  @ApiProperty({ example: '2023-11-12', description: 'delivered date' })
  @Column({
    type: DataType.STRING,
  })
  delivered_date: string;
}
