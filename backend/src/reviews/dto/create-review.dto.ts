import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty({ example: 5, description: 'Rating out of 5' })
  rating: number;

  @ApiProperty({ example: 'Amazing movie!', description: 'Review comment' })
  comment: string;
}
