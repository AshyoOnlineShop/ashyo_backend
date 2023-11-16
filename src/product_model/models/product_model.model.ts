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
import { BrandCategory } from '../../brand-category/model/brand-category.model';
import { Product } from '../../products/models/product.model';
import { SaleProducts } from '../../sale-products/model/sale-product.model';

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

  @ForeignKey(() => BrandCategory)
  @ApiProperty({ example: 1, description: 'brand category id' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  brand_category_id: number;

  //================== Relationships ================================
  @BelongsTo(() => BrandCategory)
  brand_category: BrandCategory;

  @HasMany(() => Product)
  product: Product[];

  @HasMany(() => SaleProducts)
  sale_products: SaleProducts[];
}
