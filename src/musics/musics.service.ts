import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MusicEntity } from './entities/music.entity';
import { CreateMusicDto } from './dto/create-music.dto';
import { UUID } from 'crypto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { FindOneOptions } from 'typeorm';

@Injectable()
export class MusicsService {
  /**
   * Here, we have used data mapper approch for this tutorial that is why we
   * injecting repository here. Another approch can be Active records.
   */
  constructor(
    @InjectRepository(MusicEntity)
    private readonly musicRepository: Repository<MusicEntity>,
  ) {}

  /**
   * This is function is used to create Music in Music Entity.
   * @param createMusicDto this will type of createMusicDto in which
   * we have defined what are the keys we are expecting from body
   * @returns promise of music
   */
  create(createMusicDto: CreateMusicDto): Promise<MusicEntity> {
    try {
      const music: MusicEntity = new MusicEntity();
      music.name = createMusicDto.name;
      music.music_genre = createMusicDto.music_genre;
      music.authors = createMusicDto.authors;
      music.year = createMusicDto.year;
      return this.musicRepository.save(music);
    } catch (error) {
      console.error('Error creating music:', error.message, error.stack);
      throw new Error('Error creating music');
    }
  }

  /**
   * Gets all the music's list
   * @returns promise of array of musics
   */
  findAll(): Promise<MusicEntity[]> {
    return this.musicRepository.find();
    // return this.musicRepository.find({ where: { isActive: true } });
    // throw new Error('Method not implemented.');
  }

  /**
   * Gets one specific music based on id
   * @returns promise of array of musics
   */
  async findOne(id: UUID): Promise<MusicEntity | undefined> {
    return this.musicRepository.findOne({ where: { id } });
  }

  /**
   * Updates specific music whose id is passed in
   * parameter along with passed updated data
   * @param id is type of uuid, which represent the id of music.
   * @param updateMusicDto this is partial type of createMusicDto.
   * @returns promise of udpate music
   */
  async update(id: UUID, updateMusicDto: UpdateMusicDto): Promise<MusicEntity> {
    try {
      const existingMusic = await this.musicRepository.findOne({
        where: { id },
      } as FindOneOptions<MusicEntity>);
      if (!existingMusic) {
        throw new Error(`Music with id ${id} not found`);
      }
      existingMusic.music_genre = updateMusicDto.music_genre;
      existingMusic.name = updateMusicDto.name;
      existingMusic.authors = updateMusicDto.authors;
      existingMusic.year = updateMusicDto.year;
      updateMusicDto.validate();
      return this.musicRepository.save(existingMusic);
    } catch (error) {
      console.error('Error updating music:', error.message, error.stack);
      throw new Error('Error updating music');
    }
  }

  /**
   * Removes or deletes music from database.
   * @param id is the type of number, which represent id of music
   * @returns UUID of rows deleted or affected
   */
  async remove(id: UUID): Promise<{ affected?: UUID }> {
    try {
      const result = await this.musicRepository.delete(id);
      if (result.affected === 1) {
        return { affected: id };
      } else {
        throw new Error(`Music with id ${id} not found`);
      }
    } catch (error) {
      console.error('Error deleting music:', error.message, error.stack);
      throw new Error('Error deleting music');
    }
  }
}
