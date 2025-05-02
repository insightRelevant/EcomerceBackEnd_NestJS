import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from '../products.controller';
import { ProductsService } from '../../products/products.service';

describe('ProductsController', () => {
  let controller: ProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        ProductsService,
        {
          provide: 'ProductRepository',
          useValue: {
            findAll: jest.fn(), // Mock method
            findOne: jest.fn(), // Mock method
            create: jest.fn(), // Mock method
            update: jest.fn(), // Mock method
            delete: jest.fn(), // Mock method
          }, // Mock implementation of ProductRepository
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
