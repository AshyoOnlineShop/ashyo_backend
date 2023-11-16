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

interface ViewedProductAttrs {
  product_id: number;
  customer_id: number;
  viewed_at: Date;
}
@Table({ tableName: 'viewed-products' })
export class ViewedProduct extends Model<ViewedProduct, ViewedProductAttrs> {
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

  @ApiProperty({ example: "ko'rildi", description: 'viewed' })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  viewed_at: Date;

  //================== Relationships ================================
  @BelongsTo(() => Product)
  product: Product;

  @BelongsTo(() => Customer)
  customer: Customer;
}
