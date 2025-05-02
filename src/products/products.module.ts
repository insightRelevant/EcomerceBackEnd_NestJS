import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductsController], // Controladores relacionados con productos
  providers: [ProductsService], // Servicios relacionados con productos
  exports: [TypeOrmModule],
})
export class ProductsModule {}
