import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { District } from '../../district/models/district.model';
import { Branch } from '../../branches/models/branch.model';
import { CustomerLocation } from './../../customer_location/models/customer_location.model';
interface RegionAttr {
  name: string;
}

@Table({ tableName: 'region' })
export class Region extends Model<Region, RegionAttr> {
  @ApiProperty({ example: 1, description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'tashkent', description: 'region name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name: string;

  // ======================RELATIONSHIPS=====================================
  @HasMany(() => CustomerLocation)
  customer_locations: CustomerLocation[];

  @HasMany(() => District)
  districts: District[];
}
