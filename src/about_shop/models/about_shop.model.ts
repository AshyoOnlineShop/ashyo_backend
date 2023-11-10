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

interface AboutShopAttr {
  main_phone: string;
  email: string;
  description: string;
  insta_link: string;
  telegram_link: string;
  facebook_link: string;
  youtube_link: string;
  twitter_link: string;
}

@Table({ tableName: 'aboutShop' })
export class AboutShop extends Model<AboutShop, AboutShopAttr> {
  @ApiProperty({ example: 1, description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: '+998991234567', description: 'main phone number' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  main_phone: string;

  @ApiProperty({ example: "example@mail.uz", description: 'shop email' })
  @Column({
    type: DataType.STRING,
  })
  email: string;

  @ApiProperty({ example: "This shop sells food", description: 'shop description' })
  @Column({
    type: DataType.STRING,
  })
  description: string;

  @ApiProperty({ example: "https://instagram.com/", description: 'shop instsagram link' })
  @Column({
    type: DataType.STRING,
  })
  insta_link: string;

  @ApiProperty({ example: "https://telegram.com/", description: 'shop telegram link' })
  @Column({
    type: DataType.STRING,
  })
  telegram_link: string;

  @ApiProperty({ example: "https://facebook.com/", description: 'shop facebook link' })
  @Column({
    type: DataType.STRING,
  })
  facebook_link: string;

  @ApiProperty({ example: "https://youtube.com/", description: 'shop youtube link' })
  @Column({
    type: DataType.STRING,
  })
  youtube_link: string;

  @ApiProperty({ example: "https://twitter.com/", description: 'shop twitter link' })
  @Column({
    type: DataType.STRING,
  })
  twitter_link: string;

//   @BelongsTo(() => Branches)
//   branches: Branches;
}
