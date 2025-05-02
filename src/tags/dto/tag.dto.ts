import { IsArray, IsString } from 'class-validator';

export class TagDto {
  @IsArray()
  @IsString({ each: true }) // El campo `tag` es un array de strings
  tags: string[];
}
