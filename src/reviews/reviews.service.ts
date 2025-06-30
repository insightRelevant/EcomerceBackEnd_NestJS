/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from 'src/reviews/dto/create-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../products/entities/product.entity';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewsService {
  constructor (
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  async saveReview(id: number, body: CreateReviewDto) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const review = this.reviewRepository.create(body);
    review.product = product; // Associate the product entity
    await this.reviewRepository.save(review);
    return review;
  }

  /**
   * Recupera una lista de reseñas para un producto específico por su ID.
   *
   * @param id - El ID del producto cuyas reseñas se desean recuperar.
   * @returns Una promesa que resuelve a un arreglo de entidades `Review` asociadas con el producto.
   * @throws NotFoundException - Si no se encuentra un producto con el ID proporcionado.
   */
  async getReviews(id: number): Promise<Review[]> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return this.reviewRepository.find({
      where: { productId: id },
      relations: ['product'],
    });
  }
  /**
   * Elimina una reseña asociada a un producto específico.
   *
   * @param id - El ID del producto al que pertenece la reseña.
   * @param reviewId - El ID de la reseña que se va a eliminar.
   * @throws NotFoundException - Si no se encuentra el producto con el ID proporcionado.
   * @throws NotFoundException - Si no se encuentra la reseña con el reviewId proporcionado.
   * @returns Una promesa que resuelve el resultado de la operación de eliminación.
   */
  async deleteReview(id: number, reviewId: number) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    const review = await this.reviewRepository.findOneBy({ id: reviewId });
    if (!review) {
      throw new NotFoundException('Review not found');
    }
    return this.reviewRepository.delete(reviewId);
  }
  async updateReview(id: number, body: CreateReviewDto) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    const review = await this.reviewRepository.findOneBy({ id: body.reviewId });
    if (!review) {
      throw new NotFoundException('Review not found');
    }
    return this.reviewRepository.update(body.id, body);
  }
}