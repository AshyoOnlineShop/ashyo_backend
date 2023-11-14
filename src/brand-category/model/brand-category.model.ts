import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Brand } from '../../brands/models/brands.model';
import { Category } from '../../category/model/category.model';

interface BrandCategoryAttr {
  brand_id: number;
  category_id: number;
}

@Table({ tableName: 'brand-category' })
export class BrandCategory extends Model<BrandCategory, BrandCategoryAttr> {
  @ApiProperty({ example: 1, description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Brand)
  @ApiProperty({ example: 1, description: 'Brand id' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  brand_id: number;

  @ForeignKey(() => Category)
  @ApiProperty({ example: 1, description: 'Category id' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  category_id: number;

  // ======================RELATIONSHIPS=====================================
 
}
