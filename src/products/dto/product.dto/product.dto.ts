import { IsInt, IsString, IsArray } from "class-validator";

export class ProductDto {
    @IsInt()
    id: number;

    @IsString()
    name: string;

    @IsInt()
    price: number;

    @IsString()
    description: string;

    @IsArray()
    @IsString({ each: true })
    tags: string[];  
}
