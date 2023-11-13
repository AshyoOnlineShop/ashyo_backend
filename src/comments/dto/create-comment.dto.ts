import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreateCommentDto {    
    
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
        example:"zo'r"
    })
    @IsNotEmpty()
    @IsString()
    readonly comment :string;
    @ApiProperty({
        example:1
    })
        @IsNotEmpty()
        @IsNumber()
    readonly reaply_comment_id:number;
    @ApiProperty({
        example:"2004-02-21"
    })
    readonly commented_at:Date;
}
