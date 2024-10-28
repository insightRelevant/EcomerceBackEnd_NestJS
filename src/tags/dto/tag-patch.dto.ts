import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { TagDto } from './tag.dto';

export class TagPatchDto extends PartialType(TagDto) {
  @IsString()
  tag?: string; // El campo `tag` es opcional y debe ser un string
}
