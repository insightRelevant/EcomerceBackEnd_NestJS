import { PartialType } from '@nestjs/mapped-types';
import { IsArray, IsString } from 'class-validator';
import { TagDto } from './tag.dto';

export class TagPatchDto extends PartialType(TagDto) {
  @IsArray()
  @IsString({ each: true }) // El campo `tag` es un array de strings
  tags?: string[]; // El campo `tag` es opcional y debe ser un string
}
