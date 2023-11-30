import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ProductModel } from '../../product_model/models/product_model.model';

interface SaleProductsAttr {
  product_model_id: number;
  sale_precentage: number;
  sale_start_date: Date;
  sale_end_date: Date;
  status: boolean;
}

@Table({ tableName: 'sale-products' })
export class SaleProducts extends Model<SaleProducts, SaleProductsAttr> {
  @ApiProperty({ example: 1, description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => ProductModel)
  @ApiProperty({ example: 1, description: 'Product model id' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  product_model_id: number;

  @ApiProperty({ example: 44, description: 'Sale precentage' })
  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  sale_precentage: number;

  @ApiProperty({ example: '11/11/2023', description: 'Sale start date' })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  sale_start_date: Date;

  @ApiProperty({ example: '11/11/2023', description: 'Sale end date' })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  sale_end_date: Date;

  @ApiProperty({ example: true, description: 'Status' })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  status: boolean;

  //================== Relationships ================================
  @BelongsTo(() => ProductModel)
  product_model: ProductModel;
}
