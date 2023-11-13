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
// import { Region } from '../../region/model/region.model';

interface AttributeGroupAttr {
  name: string;
  category_id: number;
  position: number;
}

@Table({ tableName: 'attribute-group' })
export class AttributeGroup extends Model<AttributeGroup, AttributeGroupAttr> {
  @ApiProperty({ example: 1, description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Memory', description: 'Name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({ example: 1, description: 'Category id' })
  @Column({
    type: DataType.INTEGER,
  })
  category_id: number;

  @ApiProperty({ example: 1, description: 'Position' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  position: number;
}
