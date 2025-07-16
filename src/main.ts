import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger config
  const config = new DocumentBuilder()
    .setTitle('Hola Mundo API')
    .setDescription('Documentación de la API Hola Mundo')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

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
