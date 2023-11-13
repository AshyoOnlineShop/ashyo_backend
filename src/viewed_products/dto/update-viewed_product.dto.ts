import { PartialType } from '@nestjs/mapped-types';
import { CreateViewedProductDto } from './create-viewed_product.dto';

export class UpdateViewedProductDto extends PartialType(CreateViewedProductDto) {}
