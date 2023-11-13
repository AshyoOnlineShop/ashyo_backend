import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString,  } from "class-validator";

export class CreateViewedProductDto {
    @ApiProperty({
        example:1
    })
    @IsNotEmpty()
    @IsNumber()
    readonly product_id:number;

    @ApiProperty({
        example:1
    })
    @IsNotEmpty()
    @IsNumber()
    readonly customer_id:number;

    @ApiProperty({
        example:"ko'rildi"
    })
    @IsNotEmpty()
    @IsString()
    readonly viewed_at:string; 
}
