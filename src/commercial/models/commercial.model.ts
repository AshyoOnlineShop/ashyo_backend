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
import { Product } from '../../products/models/product.model';

interface CommercialAttr {
  product_id: number;
  image: string;
  title: string;
  description: string;
}

@Table({ tableName: 'commercial' })
export class Commercial extends Model<Commercial, CommercialAttr> {
  @ApiProperty({ example: 1, description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Product)
  @ApiProperty({ example: 1, description: 'product id' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  product_id: number;

  @ApiProperty({ example: 'img.png', description: 'image' })
  @Column({
    type: DataType.STRING,
  })
  image: string;

  @ApiProperty({
    example: 'Siz kutgan Xiaomi 12 Mi Laite',
    description: 'commercial title',
  })
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  title: string;

  @ApiProperty({
    example:
      "Orginallik va qulay narxni o'zida jamlagan  Xiaomi 12 Mi Laite  siz uchun eng yaxshi arziydigan takliflarimizdan biridir!ii",
    description: 'commercial description',
  })
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description: string;

  //================== Relationships ================================
  @BelongsTo(() => Product)
  product: Product;
}
