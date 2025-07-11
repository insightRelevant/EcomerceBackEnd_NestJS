import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from '../products/products.module';
import { TagsModule } from '../tags/tags.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../products/entities/product.entity';
import { User } from '../user/entities/user.entity';
import { Clients } from '../user/entities/clients.entity';
import { Review } from '../reviews/entities/review.entity';
import { ReviewsModule } from '../reviews/reviews.module';
import { Models } from 'src/products/entities/models.entity';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot(),
    ProductsModule,
    TagsModule,
    ReviewsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10), // Puerto por defecto de MySQL
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true, //Carga las entidades automaticamente.
      synchronize: true, //Sincroniza la informacion de las tablas al iniciar la app No usar en produccion.
      entities: [Product, User, Clients, Review, Models], //Especificamos las entidades que queremos cargar.
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
