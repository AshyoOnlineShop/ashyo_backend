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
import { ProductBranch } from '../../product_branches/models/product_branch.model';
import { Branch } from '../../branches/models/branch.model';
import { Cart } from '../../cart/models/cart.model';
import { Comment } from '../../comments/models/comment.model';
import { LikedProduct } from '../../liked_products/models/liked_product.model';
import { ProductMedia } from '../../product_media/models/product_media.model';
import { ProductInfo } from '../../product-info/model/product-info.model';
import { Category } from '../../category/model/category.model';
import { ProductModel } from '../../product_model/models/product_model.model';
import { Brand } from '../../brands/models/brands.model';
import { Rating } from '../../rating/models/rating.model';
import { ViewedProduct } from '../../viewed_products/models/viewed_product.model';
import { Commercial } from '../../commercial/models/commercial.model';

interface ProductAttr {
  name: string;
  description: string;
  price: number;
  category_id: number;
  model_id: number;
  brand_id: number;
  quantity: number;
  image: string;
}

@Table({ tableName: 'product' })
export class Product extends Model<Product, ProductAttr> {
  @ApiProperty({ example: 1, description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'headphone', description: 'product name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({
    example: 'great headphone',
    description: 'product description',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @ApiProperty({ example: 235000, description: 'product price' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  price: number;

  @ForeignKey(() => Category)
  @ApiProperty({ example: 1, description: 'category id' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  category_id: number;

  @ForeignKey(() => ProductModel)
  @ApiProperty({ example: 1, description: 'model id' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  model_id: number;

  @ForeignKey(() => Brand)
  @ApiProperty({ example: 1, description: 'brand id' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  brand_id: number;

  @ApiProperty({ example: 100, description: 'product quantity' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantity: number;

  @ApiProperty({ example: 'img.png', description: 'product img' })
  @Column({
    type: DataType.STRING,
  })
  image: string;

  //================== Relationships ================================
  @BelongsTo(() => Category)
  category: Category;

  @BelongsTo(() => ProductModel)
  product_model: ProductModel;

  @BelongsTo(() => Brand)
  brands: Brand;

  @BelongsToMany(() => Branch, () => ProductBranch)
  branches: Branch[];

  @HasMany(() => Cart)
  carts: Cart[];

  @HasMany(() => Comment)
  comments: Comment[];

  @HasMany(() => Rating)
  ratings: Rating[];

  @HasMany(() => LikedProduct)
  liked_products: LikedProduct[];

  @HasMany(() => ViewedProduct)
  viewed_products: ViewedProduct[];

  @HasMany(() => ProductMedia)
  product_medias: ProductMedia[];

  @HasMany(() => ProductInfo)
  product_infos: ProductInfo[];

  @HasMany(() => Commercial)
  commercials: Commercial[];
}
