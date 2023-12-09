import { Module } from '@nestjs/common';
import { PlaylistsService } from './playlist.service';
import { PlaylistsController } from './playlist.controller';
import { PlaylistEntity } from './entities/playlist.entity';
import { MusicEntity } from '../musics/entities/music.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export const musicRepositoryProvider = {
  provide: 'MUSIC_REPOSITORY',
  useFactory: (repository: Repository<MusicEntity>) => repository,
  inject: ['DATABASE_CONNECTION'],
};

@Module({
  imports: [TypeOrmModule.forFeature([PlaylistEntity, MusicEntity])],
  providers: [PlaylistsService],
  controllers: [PlaylistsController],
  exports: [PlaylistsService],
})
export class PlaylistsModule {}
