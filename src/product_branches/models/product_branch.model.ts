import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Branch } from '../../branches/models/branch.model';
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

  // @ForeignKey(() => Product)
  @ApiProperty({ example: 1, description: 'product id' })
  @Column({
    type: DataType.INTEGER,
  })
  product_id: number;

  @ForeignKey(() => Branch)
  @ApiProperty({ example: 1, description: 'branch id' })
  @Column({
    type: DataType.INTEGER,
  })
  branch_id: number;

  //================== Relationships ================================

}
