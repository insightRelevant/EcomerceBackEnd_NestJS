
import { Module } from '@nestjs/common';
import { AppController } from '../../controllers/app/app.controller';
import { AppService } from '../../services/app.service';
import { ProductsController } from '../../controllers/products/products.controller';
import { ProductsService } from '../../services/products/products.service';
import { ProductsModule } from 'src/products/products.module';
import { TagsModule } from 'src/tags/tags.module'; // Importa TagsModule

@Module({
  imports: [ProductsModule, TagsModule], // Agrega TagsModule a los imports
  controllers: [AppController, ProductsController],
  providers: [AppService, ProductsService],
})
export class AppModule {}
