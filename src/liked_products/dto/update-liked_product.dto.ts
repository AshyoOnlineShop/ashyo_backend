import { PartialType } from '@nestjs/mapped-types';
import { CreateLikedProductDto } from './create-liked_product.dto';

export class UpdateLikedProductDto extends PartialType(CreateLikedProductDto) {}
