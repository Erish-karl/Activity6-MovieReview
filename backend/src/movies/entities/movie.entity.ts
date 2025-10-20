import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Review } from '../../reviews/entities/review.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'float', default: 0 })
  rating: number;

  @OneToMany(() => Review, (review) => review.movie)
  reviews: Review[];
}
