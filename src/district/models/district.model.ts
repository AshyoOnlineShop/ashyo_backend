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
import { Region } from '../../region/models/region.model';

interface DistrictAttr {
  name: string;
  region_id: number;
}

@Table({ tableName: 'district' })
export class District extends Model<District, DistrictAttr> {
  @ApiProperty({ example: 1, description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Chilonzor', description: 'district name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name: string;

  @ForeignKey(() => Region)
  @ApiProperty({ example: 1, description: 'region id' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  region_id: number;

  //================== Relationships ================================
  @BelongsTo(() => Region)
  region: Region;
}
