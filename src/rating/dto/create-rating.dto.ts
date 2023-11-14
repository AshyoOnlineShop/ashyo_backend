import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateRatingDto {
    @ApiProperty({
        example:1
    })
    @IsNotEmpty()
    @IsNumber()
    readonly customer_id: number;

    @ApiProperty({
        example:1
    })
    @IsNotEmpty()
    @IsNumber()
    readonly product_id: number;

    @ApiProperty({
        example:'12'
    })
    @IsNotEmpty()
    @IsString()
    readonly rating_value:string;
}
