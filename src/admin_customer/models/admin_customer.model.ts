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
import { Customer } from '../../customer/models/customer.model';
import { Stuff } from '../../stuff/models/stuff.model';

interface AdminCustomerAttr {
  customer_id: number;
  admin_id: number;
  customer_message: string;
  admin_message: string;
  messaged_at: number;
}

@Table({ tableName: 'admin_customer' })
export class AdminCustomer extends Model<AdminCustomer, AdminCustomerAttr> {
  @ApiProperty({ example: 1, description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Customer)
  @ApiProperty({ example: 1, description: 'customer id' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  customer_id: number;

  @ForeignKey(() => Stuff)
  @ApiProperty({ example: 1, description: 'stuff id' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  admin_id: number;

  @ApiProperty({
    example: 'Are u planning to sale Iphone 15 in ur market?',
    description: 'customer message',
  })
  @Column({
    type: DataType.TEXT,
  })
  customer_message: string;

  @ApiProperty({
    example: 'Yes, next week it will be on sale.',
    description: 'admin message',
  })
  @Column({
    type: DataType.STRING,
  })
  admin_message: string;

  @ApiProperty({
    example: 316,
    description: 'time in numbers',
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  messaged_at: number;

  //================== Relationships ================================
  @BelongsTo(() => Customer)
  customer: Customer;

  @BelongsTo(() => Stuff)
  stuff: Stuff;
}
