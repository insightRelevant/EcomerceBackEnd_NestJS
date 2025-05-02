import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS
  app.enableCors({
    origin: 'http://localhost:4200', // Dirección donde está el front-end de Angular
    methods: 'GET,POST,PUT,DELETE', // Métodos HTTP permitidos
    allowedHeaders: 'Content-Type,Authorization', // Cabeceras permitidas
  });

  // Usar validación global para DTOs
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
