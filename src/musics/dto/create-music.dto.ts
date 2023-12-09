import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlphanumeric,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateMusicDto {
  @IsInt()
  @IsEnum([1, 2, 3, 4, 5, 6])
  music_gener: number;

  @IsString()
  @MinLength(5, { message: 'Name must have at least 5 characters.' })
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @MinLength(5, { message: 'Authors must have at least 5 characters.' })
  @IsAlphanumeric(null, {
    message: 'Authors does not allow other than alpha numeric chars.',
  })
  authors: string;

  @IsInt()
  year: number;
}
