import { Module } from '@nestjs/common';
import { MusicsService } from './musics.service';
import { MusicsController } from './musics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MusicEntity } from './entities/music.entity';
import { Repository } from 'typeorm';

export const musicRepositoryProvider = {
  provide: 'MUSIC_REPOSITORY',
  useFactory: (repository: Repository<MusicEntity>) => repository,
  inject: ['DATABASE_CONNECTION'],
};

@Module({
  imports: [TypeOrmModule.forFeature([MusicEntity])],
  controllers: [MusicsController],
  providers: [MusicsService],
})
export class MusicsModule {}
