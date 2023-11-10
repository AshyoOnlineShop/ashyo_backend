import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { District } from '../../district/model/district.model';
// import { Branches } from '../../district/model/branches.model';
// import { Customer_location } from '../../district/model/customer_location.model';
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

  @ApiProperty({ example: 'tashkent', description: 'not null name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name: string;

  @HasMany(() => District)
  district: District[];

  //   @BelongsTo((Branches) => )
  //   branches: Branches;

  // @BelongsTo((Customer_location) => )
  // customer_location: Customer_location;
}
