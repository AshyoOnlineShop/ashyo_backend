import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface LikedProductAttrs{
    readonly product_id:number;
    readonly customer_id:number;
}
@Table({tableName: "liked_products"})
export class LikedProduct extends Model<LikedProduct,LikedProductAttrs> {
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
    product_id:number;

    @ApiProperty({ example: 1, description: 'Customer id' })
    @Column({
        type:DataType.INTEGER,
        allowNull:false,
    })
    customer_id:number;
}
