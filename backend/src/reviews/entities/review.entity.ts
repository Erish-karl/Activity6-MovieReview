import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Movie } from '../../movies/entities/movie.entity'; // relative path to Movie entity

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  reviewer: string;

  @Column()
  comment: string;

  @Column('float')
  rating: number;

  @ManyToOne(() => Movie, (movie) => movie.reviews, { onDelete: 'CASCADE' })
  movie: Movie;
}
