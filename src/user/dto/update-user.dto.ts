/* eslint-disable prettier/prettier */
import { IsString } from 'class-validator';

export class UpdateUserDto {
    
    @IsString()
    username: string;

    @IsString()
    password: string;

    @IsString()
    email: string;  

    @IsString()
    firstName: string;  

    @IsString()
    lastName: string;

    @IsString()
    phone: string;  

    @IsString()
    address: string;    

}
