import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Product } from '../../products/models/product.model';
import { Customer } from '../../customer/models/customer.model';

interface LikedProductAttrs {
  product_id: number;
  customer_id: number;
}
@Table({ tableName: 'liked_products' })
export class LikedProduct extends Model<LikedProduct, LikedProductAttrs> {
  @ApiProperty({ example: 1, description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Product)
  @ApiProperty({ example: 1, description: 'Product id' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  product_id: number;

  @ForeignKey(() => Customer)
  @ApiProperty({ example: 1, description: 'Customer id' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  customer_id: number;

  //================== Relationships ================================
  @BelongsTo(() => Product)
  product: Product;

  @BelongsTo(() => Customer)
  customer: Customer;
}
