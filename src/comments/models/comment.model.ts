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
import { Customer } from '../../customer/models/customer.model';
import { Product } from '../../products/models/product.model';

interface CommentsCreateAttrs {
  customer_id: number;
  product_id: number;
  comment: string;
  reply_comment_id: number;
  commented_at: Date;
}
@Table({ tableName: 'comments' })
export class Comment extends Model<Comment, CommentsCreateAttrs> {
  @ApiProperty({ example: 1, description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Customer)
  @ApiProperty({ example: 1, description: 'Customer id' })
  @Column({
    type: DataType.INTEGER,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  customer_id: number;

  @ForeignKey(() => Product)
  @ApiProperty({ example: 1, description: 'Product id' })
  @Column({
    type: DataType.INTEGER,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    allowNull: false,
  })
  product_id: number;

  @ApiProperty({ example: "zo'r", description: 'Comment' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  comment: string;

  @ForeignKey(() => Comment)
  @ApiProperty({ example: 1, description: 'Reply comment id' })
  @Column({
    type: DataType.INTEGER,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    allowNull: false,
  })
  reply_comment_id: number;

  @ApiProperty({ example: '2004-02-21', description: 'commented_at' })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  commented_at: Date;

  // ======================RELATIONSHIPS=====================================
  @BelongsTo(() => Customer)
  customer: Customer;

  @BelongsTo(() => Product)
  product: Product;

  @BelongsTo(() => Comment)
  reply_comment: Comment;

  @HasMany(() => Comment, 'reply_comment_id')
  reply_comments: Comment[];
}
