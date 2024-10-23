import { IsInt, IsString } from "class-validator";

export class ProductDto {
    @IsInt()
      id: number;  

    @IsString()
    name: string;
    
    @IsInt()
      price: number;  

    @IsString()
    description: string;

    @IsString()
      tags: string[];     






}
