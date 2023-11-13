import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface RatingAttrs{
     id: number;
     customer_id: number;
     product_id: number;
     rating_value:string;
}
@Table({tableName: "rating"})
export class Rating extends Model<Rating,RatingAttrs>  {
    @ApiProperty({ example: 1, description: 'Unikal ID' })
    @Column({
        type:DataType.INTEGER,
        autoIncrement:true,
        primaryKey:true
    })
    id:number;
    
    @ApiProperty({ example: 1, description: 'Customer id' })
    @Column({
        type:DataType.INTEGER,
        allowNull:false,
    })
    customer_id: number;

    @ApiProperty({ example: 1, description: 'Product id' })
    @Column({
        type:DataType.INTEGER,
        allowNull:false,
    })
    product_id: number;

    @ApiProperty({ example: '12', description: 'Rating value' })
    @Column({
        type:DataType.STRING,
        allowNull:false,
    })
    rating_value:string;
}