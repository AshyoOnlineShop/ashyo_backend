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

interface AttributeAttr {
  name: string;
  attribute_group_id: number;
  position: number;
}

@Table({ tableName: 'attribute' })
export class Attribute extends Model<Attribute, AttributeAttr> {
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

  @ApiProperty({ example: 1, description: 'Attribute group id' })
  @Column({
    type: DataType.INTEGER,
  })
  attribute_group_id: number;

  @ApiProperty({ example: 1, description: 'Position' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  position: number;
}
