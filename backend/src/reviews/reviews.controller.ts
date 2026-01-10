import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all reviews' })
  getAll() {
    return this.reviewsService.findAll();
  }

  @Get(':movieId')
  @ApiOperation({ summary: 'Get reviews by movie' })
  getByMovie(@Param('movieId') movieId: number) {
    return this.reviewsService.findByMovie(movieId);
  }

  @Post(':movieId')
  @ApiOperation({ summary: 'Create a new review for a movie' })
  createReview(@Param('movieId') movieId: number, @Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.create(createReviewDto as any, movieId);
  }
}
