import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import { AttributeGroup } from '../../attribute-group/model/attribute-group.model';
import { BrandCategory } from '../../brand-category/model/brand-category.model';
import { Brand } from '../../brands/models/brands.model';

interface CategoryAttr {
  name: string;
  position: number;
  image: string;
  parent_category_id: number;
}

@Table({ tableName: 'category' })
export class Category extends Model<Category, CategoryAttr> {
  @ApiProperty({ example: 1, description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Phones', description: 'Name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({ example: 1, description: 'Position' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  position: number;

  @ApiProperty({ example: './img/image1.png', description: 'Image' })
  @Column({
    type: DataType.STRING,
  })
  image: string;

  @ApiProperty({ example: 1, description: 'Parent category id' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  parent_category_id: number;

  // ======================RELATIONSHIPS=====================================
  @HasMany(() => AttributeGroup)
  attribute_groups: AttributeGroup[];

  @BelongsToMany(() => Brand, () => BrandCategory)
  brands: Brand[];
}
