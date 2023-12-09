import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { UUID } from 'crypto';
import { PrimaryGeneratedColumn } from 'typeorm';

export class SongDto {
  @PrimaryGeneratedColumn()
  id: UUID;
  
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsInt()
  @IsEnum([1, 2, 3, 4, 5, 6])
  music_genre: number;

  @IsString()
  authors: string;

  @IsNotEmpty()
  year: number;
}
