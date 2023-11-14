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

interface ProductAttr {
  name: string;
  description: string;
  price: number;
  category_id: number;
  model_id: number;
  brand_id: number;
  quantity: number;
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

  @ApiProperty({ example: 1, description: 'category id' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  category_id: number;

  @ApiProperty({ example: 1, description: 'model id' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  model_id: number;

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

  //================== Relationships ================================
  @BelongsToMany(() => Branch, () => ProductBranch)
  branches: Branch[];

  @HasMany(() => Cart)
  carts: Cart[];
}
