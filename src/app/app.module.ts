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

@Module({
  imports: [
    ProductsModule,
    TagsModule,
    ReviewsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'geekoServerDB',
      password: 'Mj4$!2@#',
      database: 'nestDB',
      autoLoadEntities: true, //Carga las entidades automaticamente.
      entities: [Product, User, Clients, Review, Models], //Especificamos las entidades que queremos cargar.
      synchronize: true, //Sincroniza la informacion de las tablas al iniciar la app No usar en produccion.
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
