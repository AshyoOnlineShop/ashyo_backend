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

interface CardTypeAttr {
  name: string;
  image: string;
  description: string;
  position: number;
}

@Table({ tableName: 'card_types' })
export class  Card_types extends Model< Card_types, CardTypeAttr> {
  @ApiProperty({ example: 1, description: 'Unikal Id' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: "Humo", description: 'Card Type name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({ example: 'img/basic.jpg', description: 'Card Type image' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  image: string;

  @ApiProperty({
    example: 'Basic Card type for general users.',
    description: 'Card Type description',
  })
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description: string;

  @ApiProperty({ example: 1, description: 'Card Type position' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  position: number;
}
