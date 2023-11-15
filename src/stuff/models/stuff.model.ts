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
import { Delivery } from '../../delivery/models/delivery.model';

interface StuffAttr {
  first_name: string;
  last_name: string;
  image: string;
  phone_number: string;
  email: string;
  password: string;
  birthdate: Date;
  role: string;
  is_active: boolean;
  hashed_refresh_roken: string;
  activation_link: string;
}

@Table({ tableName: 'stuff' })
export class Stuff extends Model<Stuff, StuffAttr> {
  @ApiProperty({ example: 1, description: 'Unikal Id' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Lucy', description: 'Stuff first name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  first_name: string;

  @ApiProperty({ example: 'Hale', description: 'Stuff last name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  last_name: string;

  @ApiProperty({ example: 'img/photo1.jpg', description: 'Stuff image' })
  @Column({
    type: DataType.STRING,
  })
  image: string;

  @ApiProperty({
    example: '+998998887766',
    description: 'Stuff phone number',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  phone_number: string;

  @ApiProperty({ example: 'john01@gmail.com', description: 'Stuff email' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @ApiProperty({ example: '12345', description: 'Stuff password' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @ApiProperty({ example: '2000/10/10', description: 'Stuff birthdate' })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  birthdate: Date;

  @ApiProperty({ example: 'superadmin', description: 'Stuff role' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  role: string;

  @ApiProperty({ example: 'false', description: 'Is stuff active' })
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
  @HasMany(() => Delivery)
  deliveries: Delivery[];
}
