/* eslint-disable prettier/prettier */
//Importar: Body, controller, Post, Httpcode, httpstatus desde nestjscommon;
//Importar: AuthService (common )
//Crear un decorador controller auth, exportar la clase 
//con metodo constructor (privado de tipo AuthService)
//crear un httpstatus.OKcon decorador HttpCode, un Post con parametro login
// y crear un metodo singIn y pasarle por parametro el decorator Body metodo 
//de tipo singInDto tipo record que sera un string, any
// retornar este service de auth accediendo al metodo singIn
//con parametro de singInDto que acceda al username, y al singInDto password

import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService  } from './auth.service';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private authservice: AuthService,
    private jwtService: JwtService
 ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  singIn(@Body() signInDto: Record<string, any> ) {
    return this.authservice.signIn(signInDto.username, signInDto.password);
  }
  
}


