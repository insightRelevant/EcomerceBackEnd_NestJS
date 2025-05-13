/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewsService {
  constructor (
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
  ) {}

  async saveReview(id: number, body: CreateReviewDto) {
    const product = await this.productRepository.findOneBy({ id });
    console.log(product, id);
    if(!product) {
      const review =this.reviewRepository.create(body);
    review.productId = id;
    await this.reviewRepository.save(review);
    return review;
  }
  throw new NotFoundException('Product not found');
  }
}