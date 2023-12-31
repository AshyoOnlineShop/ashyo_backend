import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  HasMany,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
} from 'sequelize-typescript';
import { BrandCategory } from '../../brand-category/model/brand-category.model';
import { Category } from '../../category/model/category.model';
import { Product } from '../../products/models/product.model';

interface BrandAttr {
  name: string;
  image: string;
  position: number;
}

@Table({ tableName: 'brand' })
export class Brand extends Model<Brand, BrandAttr> {
  @ApiProperty({ example: 1, description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Apple', description: 'brand name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name: string;

  @ApiProperty({ example: './img/photo.jpeg', description: 'brand image' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  image: string;

  @ApiProperty({ example: 1, description: 'image position' })
  @Column({
    type: DataType.INTEGER,
  })
  position: number;

  //================== Relationships ================================
  @BelongsToMany(() => Category, () => BrandCategory)
  categories: Category[];

  @HasMany(() => Product)
  product: Product[];
}
