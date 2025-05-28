/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './entities/review.entity';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post(':id/review')
  async createReview(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CreateReviewDto,
  ) {
    return this.reviewsService.saveReview(id, body);
  }

  @Get(':id/review')
  async getReviews(@Param('id', ParseIntPipe) id: number): Promise<Review[]> {
    return this.reviewsService.getReviews(id);
  }

  @Patch(':id/review/:reviewId')
  async updateReview(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CreateReviewDto,
  ) {
    return this.reviewsService.updateReview(id, body);
  }

  @Delete(':id/review/:reviewId')
  async deleteReview(
    @Param('id', ParseIntPipe) id: number,
    @Param('reviewId', ParseIntPipe) reviewId: number,
  ) {
    return this.reviewsService.deleteReview(id, reviewId);
  }

}
