import { IsNumber, IsString } from 'class-validator';

export class UpDateReviewDto {
  @IsNumber()
  reviewId: number;

  @IsNumber()
  id: number;

  @IsString()
  content: string;

  @IsNumber()
  rating: number;
}
