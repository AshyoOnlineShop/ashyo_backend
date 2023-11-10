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
// import { Region } from '../../region/model/region.model';

interface StuffAttr {
  first_name: string
  last_name: string;
  photo: string
  phone_number: string
  email: string
  hashed_password: string
  hashed_token: string
  birthdate: Date
  is_active: boolean
  hashed_refresh_token: string
  activation_link: string
  role: string
  is_creator: boolean
}

@Table({ tableName: 'stuff' })
export class Stuff extends Model<Stuff, StuffAttr> {
  @ApiProperty({ example: 1, description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'John', description: 'first name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  first_name: string;

  @ApiProperty({ example: 'Doe', description: 'last name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  last_name: string;

  @ApiProperty({ example: './img/image1.png', description: 'photo' })
  @Column({
    type: DataType.STRING,
  })
  photo: string;

  @ApiProperty({ example: '+998990001111', description: 'phone number' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone_number: string;

  @ApiProperty({ example: 'johndoe@email.com', description: 'email' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;

  @ApiProperty({ example: 'hash:fjcbnrincrjifcnejifcnek', description: 'hashed password' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  hashed_password: string;

  @ApiProperty({ example: '01/10/2001', description: 'birth date' })
  @Column({
    type: DataType.DATE,
  })
  birthdate: Date

  @ApiProperty({ example: false, description: 'is active' })
  @Column({
    type: DataType.BOOLEAN,
  })
  is_active: boolean;

  @ApiProperty({ example: 'hash64:feknfrfnlefcmfkf', description: 'hashed refresh token' })
  @Column({
    type: DataType.STRING,
  })
  hashed_refresh_token: string;

  @ApiProperty({ example: 'https://activate.com/activation/reknfkjvnkefcnjkrf', description: 'activation link' })
  @Column({
    type: DataType.STRING,
  })
  activation_link: string;

  @ApiProperty({ example: 'admin', description: 'stuff role' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  role: string;

  @ApiProperty({ example: false, description: 'is creator' })
  @Column({
    type: DataType.BOOLEAN,
  })
  is_creator: boolean;

  // @ApiProperty({ example: 1, description: 'region id' })
  // @ForeignKey(() => Region)
  // @Column({
  //   type: DataType.INTEGER,
  // })
  // region_id: number;
  // @BelongsTo(() => Region)
  // region: Region;
}
