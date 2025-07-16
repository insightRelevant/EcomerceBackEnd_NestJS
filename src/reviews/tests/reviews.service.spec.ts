import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsService } from '../reviews.service';

describe('ReviewsService', () => {
  let service: ReviewsService;

  beforeEach(async () => {
    const mockProductRepository = {};
    const mockReviewRepository = {};

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewsService,
        { provide: 'ProductRepository', useValue: mockProductRepository },
        { provide: 'ReviewRepository', useValue: mockReviewRepository },
      ],
    }).compile();

    service = module.get<ReviewsService>(ReviewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
