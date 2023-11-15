import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Customer } from '../../customer/models/customer.model';
import { Product } from '../../products/models/product.model';

interface RatingAttrs {
  customer_id: number;
  product_id: number;
  rating_value: string;
}
@Table({ tableName: 'rating' })
export class Rating extends Model<Rating, RatingAttrs> {
  @ApiProperty({ example: 1, description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Customer)
  @ApiProperty({ example: 1, description: 'Customer id' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  customer_id: number;

  @ForeignKey(() => Product)
  @ApiProperty({ example: 1, description: 'Product id' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  product_id: number;

  @ApiProperty({ example: '12', description: 'Rating value' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  rating_value: string;

  //================== Relationships ================================
  @BelongsTo(() => Customer)
  customer: Customer;

  @BelongsTo(() => Product)
  product: Product;
}
