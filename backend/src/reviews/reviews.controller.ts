import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { Review } from './entities/review.entity';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get()
  getAll(): Promise<Review[]> {
    return this.reviewsService.findAll();
  }

  @Get(':movieId')
  getByMovie(@Param('movieId') movieId: number): Promise<Review[]> {
    return this.reviewsService.findByMovie(movieId);
  }

  @Post(':movieId')
  createReview(@Param('movieId') movieId: number, @Body() review: Review) {
    return this.reviewsService.create(review, movieId);
  }
}
