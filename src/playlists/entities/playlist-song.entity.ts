import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne } from 'typeorm';
import { PlaylistEntity } from './playlist.entity';
import { MusicEntity } from '../../musics/entities/music.entity';
import { UUID } from 'crypto';

@Entity()
export class PlaylistSongEntity {
  @PrimaryGeneratedColumn()
  id: UUID;

  @ManyToOne(() => PlaylistEntity, (playlist) => playlist.songs)
  playlist: PlaylistEntity;

  @ManyToOne(() => MusicEntity, (music) => music.songs)
  music: MusicEntity;
}
