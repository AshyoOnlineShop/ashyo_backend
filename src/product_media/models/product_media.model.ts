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
import { Product } from '../../products/models/product.model';

interface ProductMediaAttr {
  product_id: number;
  url: string;
  type: string;
}

@Table({ tableName: 'product_media' })
export class ProductMedia extends Model<ProductMedia, ProductMediaAttr> {
  @ApiProperty({ example: 1, description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Product)
  @ApiProperty({ example: 1, description: 'product id' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  product_id: number;

  @ApiProperty({
    example: './img/photo1.jpeg',
    description: 'product media url',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  url: string;

  @ApiProperty({ example: 'video', description: 'product media type' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  type: string;

  //================== Relationships ================================
  @BelongsTo(() => Product)
  product: Product;
}
