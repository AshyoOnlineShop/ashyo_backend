import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
interface ProductBranchAttr {
  product_id: number;
  branch_id: number;
}

@Table({ tableName: 'product_branches' })
export class ProductBranch extends Model<ProductBranch, ProductBranchAttr> {
  @ApiProperty({ example: 1, description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 1, description: "product's id" })
  @Column({
    type: DataType.INTEGER,
  })
  product_id: number;

  @ApiProperty({ example: 1, description: "branch's id" })
  @Column({
    type: DataType.INTEGER,
  })
  branch_id: number;
}
