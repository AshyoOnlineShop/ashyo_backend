import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateLikedProductDto {
    
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
}
