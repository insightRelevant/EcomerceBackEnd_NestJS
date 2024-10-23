import { ProductDto } from './product.dto';

describe('ProductDto', () => {
  it('should be defined', () => {
    expect(new ProductDto()).toBeDefined();
  });
});
