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

interface ProductModelAttr {
  name: string;
  brand_category_id: number;
}

@Table({ tableName: 'product_model' })
export class ProductModel extends Model<ProductModel, ProductModelAttr> {
  @ApiProperty({ example: 1, description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'Iphone 15 pro max',
    description: 'product model name',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({ example: 1, description: 'brand category id' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  brand_category_id: number;

  //================== Relationships ================================
}
