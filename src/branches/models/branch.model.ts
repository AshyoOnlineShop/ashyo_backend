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
import { AboutShop } from '../../about_shop/models/about_shop.model';
// import {ProductBranches} from '../../product_branches/models/product_branches.model'

interface BranchAttr {
  region_id: number;
  // longitude: number;
  // latitude: number;
  details: string;
  phone: string;
  email: string;
  about_shop_id: number;
}

@Table({ tableName: 'branches' })
export class Branch extends Model<Branch, BranchAttr> {
  @ApiProperty({ example: 1, description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 1, description: 'branch region id' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  region_id: number;


  // @ApiProperty({
  //   example: 78978,
  //   description: 'longitude of branch',
  // })
  // @Column({
  //   type: DataType.FLOAT,
  // })
  // longitude: number;

  // @ApiProperty({ example: 8789, description: 'latitude of branch' })
  // @Column({
  //   type: DataType.FLOAT,
  // })
  // latitude: number;


  @ApiProperty({
    example: 'Amir Temur street, home 8',
    description: 'datails of branch location',
  })
  @Column({
    type: DataType.STRING,
  })
  details: string;

  @ApiProperty({ example: '+998991234567', description: 'branch phone number' })
  @Column({
    type: DataType.STRING,
  })
  phone: string;

  @ApiProperty({ example: 'email@gmail.com', description: 'email of branch' })
  @Column({
    type: DataType.STRING,
  })
  email: string;

  @ApiProperty({ example: 1, description: 'about shop id' })
  @Column({
    type: DataType.INTEGER,
  })
  about_shop_id: number;

}
