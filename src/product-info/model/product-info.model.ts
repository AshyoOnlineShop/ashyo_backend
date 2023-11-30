import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  HasMany,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
  Default,
} from 'sequelize-typescript';
import { Product } from '../../products/models/product.model';
import { Attribute } from '../../attribute/model/attribute.model';

interface ProductInfoAttr {
  product_id: number;
  attribute_id: number;
  //   attribute_value: string;
  //   show_in_main: boolean;
}

@Table({ tableName: 'product-info' })
export class ProductInfo extends Model<ProductInfo, ProductInfoAttr> {
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

  @ForeignKey(() => Attribute)
  @ApiProperty({ example: 1, description: 'Attribute id' })
  @Column({
    type: DataType.INTEGER,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  attribute_id: number;

  // @ApiProperty({ example: '8GB', description: 'Attribute value' })
  // @Column({
  //   type: DataType.STRING,
  //   allowNull: false,
  // })
  // attribute_value: string;

  // @ApiProperty({ example: true, description: 'Show in main' })
  // @Column({
  //   type: DataType.BOOLEAN,
  //   allowNull: false,
  // })
  // show_in_main: boolean;

  //================== Relationships ================================
  @BelongsTo(() => Product)
  product: Product;

  @BelongsTo(() => Attribute)
  attribute: Attribute;
}
