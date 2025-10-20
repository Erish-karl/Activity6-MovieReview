import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {}

  // Find all movies with reviews and calculate average rating
  async findAll(): Promise<any[]> {
    const movies = await this.movieRepository.find({ relations: ['reviews'] });

    // Map to include averageRating
    return movies.map(movie => {
      const avgRating = movie.reviews.length
        ? movie.reviews.reduce((sum, r) => sum + r.rating, 0) / movie.reviews.length
        : 0;
      return { ...movie, averageRating: avgRating };
    });
  }

  findOne(id: number): Promise<Movie | null> {
    return this.movieRepository.findOneBy({ id });
  }

  create(movie: Movie): Promise<Movie> {
    return this.movieRepository.save(movie);
  }

  async remove(id: number): Promise<void> {
    await this.movieRepository.delete(id);
  }
}
