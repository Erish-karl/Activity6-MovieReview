import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { Movie } from '../movies/entities/movie.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,

    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {}

  findAll(): Promise<Review[]> {
    return this.reviewRepository.find({ relations: ['movie'] });
  }

  findByMovie(movieId: number): Promise<Review[]> {
    return this.reviewRepository.find({
      where: { movie: { id: movieId } },
      relations: ['movie'],
    });
  }

  async create(review: Review, movieId: number): Promise<Review> {
    const movie = await this.movieRepository.findOneBy({ id: movieId });
    if (!movie) throw new Error('Movie not found');

    review.movie = movie;
    const saved = await this.reviewRepository.save(review);

    // Optional: Update movie's average rating
    const reviews = await this.findByMovie(movieId);
    const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
    movie.rating = parseFloat(avgRating.toFixed(1));
    await this.movieRepository.save(movie);

    return saved;
  }
}
