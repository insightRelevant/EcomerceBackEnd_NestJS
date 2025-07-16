import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsController } from '../reviews.controller';
import { ReviewsService } from '../reviews.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Review } from '../entities/review.entity';
import { Product } from '../../products/entities/product.entity';

describe('ReviewsController', () => {
  let controller: ReviewsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewsController],
      providers: [
        ReviewsService,
        { provide: getRepositoryToken(Product), useValue: {} },
        { provide: getRepositoryToken(Review), useValue: {} },
      ],
    }).compile();

    controller = module.get<ReviewsController>(ReviewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
