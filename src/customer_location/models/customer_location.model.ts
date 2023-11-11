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

interface CustomerLocationAttr {
  customer_id: number;
  region_id: number;
  latitude: number;
  longitude: number;
  details: string;
}

@Table({ tableName: 'customer_location' })
export class CustomerLocation extends Model<
  CustomerLocation,
  CustomerLocationAttr
> {
  @ApiProperty({ example: 1, description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 1, description: 'customer id' })
  @Column({
    type: DataType.INTEGER,
  })
  customer_id: number;

  @ApiProperty({ example: 1, description: 'latitude of customer location' })
  @Column({
    type: DataType.FLOAT,
  })
  latitude: number;

  @ApiProperty({ example: 1, description: 'longitude of customer location' })
  @Column({
    type: DataType.FLOAT,
  })
  longitude: number;

  @ApiProperty({ example: 1, description: 'details of customer location' })
  @Column({
    type: DataType.STRING,
  })
  details: string;

}
