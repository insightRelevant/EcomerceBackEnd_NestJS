import { PartialType } from '@nestjs/mapped-types';
import { ProductDto } from '../product.dto/product.dto';

export class ProductPatchDto extends PartialType(ProductDto) {}
