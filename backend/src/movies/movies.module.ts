import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { Movie } from './entities/movie.entity';
import { Review } from '../reviews/entities/review.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Movie, Review])],
  controllers: [MoviesController],
  providers: [MoviesService],
  exports: [MoviesService], // ✅ add this line
})
export class MoviesModule {}

