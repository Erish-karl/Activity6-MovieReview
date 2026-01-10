import { ApiProperty } from '@nestjs/swagger';

export class CreateMovieDto {
  @ApiProperty({ example: 'The Matrix', description: 'Title of the movie' })
  title: string;

  @ApiProperty({ example: 'A sci-fi action movie', description: 'Description of the movie' })
  description: string;

  @ApiProperty({ example: 1999, description: 'Release year' })
  year: number;
}
