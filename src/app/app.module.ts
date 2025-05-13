import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from '../products/products.controller';
import { ProductsService } from '../products/products.service';
import { ProductsModule } from '../products/products.module';
import { TagsModule } from '../tags/tags.module';
import { TagsController } from '../tags/tags.controller';
import { TagsService } from '../tags/tags.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../products/entities/product.entity';
import { User } from '../user/entities/user.entity';
import { Clients } from '../user/entities/clients.entity';
import { Review } from '../reviews/entities/review.entity';
import { ReviewsService } from '../reviews/reviews.service';

@Module({
  imports: [
    ProductsModule,
    TagsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'geekoServerDB',
      password: 'Mj4$!2@#',
      database: 'nestDB',
      autoLoadEntities: true, //Carga las entidades automaticamente.
      entities: [Product, User, Clients, Review],
      synchronize: true, //Sincroniza la informacion de las tablas al iniciar la app No usar en produccion.
    }),
  ],
  controllers: [AppController, ProductsController, TagsController],
  providers: [AppService, ProductsService, TagsService, ReviewsService],
})
export class AppModule {}
