import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface CustomerAttr {
  first_name: string;
  last_name: string;
  image: string;
  phone_number: string;
  email: string;
  password: string;
  is_active: boolean;
  hashed_refresh_roken: string;
  activation_link: string;
}

@Table({ tableName: 'customer' })
export class Customer extends Model<Customer, CustomerAttr> {
  @ApiProperty({ example: 1, description: 'Unikal Id' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'John', description: 'Customer first name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  first_name: string;

  @ApiProperty({ example: 'Green', description: 'Customer last name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  last_name: string;

  @ApiProperty({ example: 'img/photo1.jpg', description: 'Customer image' })
  @Column({
    type: DataType.STRING,
  })
  image: string;

  @ApiProperty({
    example: '+998998887766',
    description: 'Customer phone number',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  phone_number: string;

  @ApiProperty({ example: 'john01@gmail.com', description: 'Customer email' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @ApiProperty({ example: '12345', description: 'Customer password' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @ApiProperty({ example: 'false', description: 'Is customer active' })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;

  @Column({
    type: DataType.STRING,
  })
  hashed_refresh_token: string;

  @Column({
    type: DataType.STRING,
  })
  activation_link: string;

  //================== Relationships ================================
}
