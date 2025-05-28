import { IsNumber, IsString } from 'class-validator';

export class CreateReviewDto {
  @IsNumber()
  reviewId: number;

  @IsNumber()
  id: number;

  @IsString()
  content: string;

  @IsNumber()
  rating: number;
}
