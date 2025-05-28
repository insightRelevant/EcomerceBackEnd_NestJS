import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Review } from './entities/review.entity';
import { Models } from 'src/products/entities/models.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Review, Product, Models])],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
