import { Module } from '@nestjs/common';
import { ProductsController } from 'src/controllers/products/products.controller';
import { ProductsService } from 'src/services/products/products.service'; 
import { TagsModule } from 'src/tags/tags.module';

@Module({
    imports: [TagsModule],
    controllers: [ProductsController],
    providers: [ProductsService],

})
export class ProductsModule {}
