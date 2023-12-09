import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  MinLength,
  IsAlphanumeric,
} from 'class-validator';

export class UpdateMusicDto {
  @IsInt()
  @IsEnum([1, 2, 3, 4, 5, 6])
  music_genre: number;

  @IsString()
  @MinLength(5, { message: 'Name must have at least 5 characters.' })
  @IsNotEmpty()
  name: string;

  //@IsAlphanumeric()
  @IsString()
  @MinLength(5, { message: 'Authors must have at least 5 characters.' })
  @IsNotEmpty()
  authors: string;

  validate() {
    if (!/^[a-zA-Z0-9 ]+$/.test(this.authors)) {
      throw new Error(
        'Authors must only contain letters, numbers, and spaces.',
      );
    }
  }

  @IsInt()
  year: number;
}
