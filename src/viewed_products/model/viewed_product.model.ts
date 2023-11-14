import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface ViewedProductAttrs{

     product_id:number;
     customer_id:number;
     viewed_at:string; 
}
@Table({tableName:'viewed-products'})
export class ViewedProduct extends Model<ViewedProduct, ViewedProductAttrs> {
    @ApiProperty({ example: 1, description: 'Unikal ID' })
  
    @Column({
        type:DataType.INTEGER,
        autoIncrement:true,
        primaryKey:true
    })
    id:number;

    @ApiProperty({ example: 1, description: 'Product id' })
    @Column({
        type:DataType.INTEGER,
        allowNull:false,
    })
    product_id: number;

    @ApiProperty({ example: 1, description: 'Customer id' })
    @Column({
        type:DataType.INTEGER,
        allowNull:false,
    })
    customer_id:number;

    @ApiProperty({ example: "ko'rildi", description: 'viewed' })
    @Column({
        type:DataType.STRING,
        allowNull:false,
    })
    viewed_at:string; 

}
