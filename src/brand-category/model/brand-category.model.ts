import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
// import { Region } from '../../region/model/region.model';

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

  @ApiProperty({ example: 1, description: 'Brand id' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  brand_id: number;

  @ApiProperty({ example: 1, description: 'Category id' })
  @Column({
    type: DataType.INTEGER,
  })
  category_id: number;
}
