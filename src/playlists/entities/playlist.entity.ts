import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { PlaylistSongEntity } from './playlist-song.entity';
import { UUID } from 'crypto';

@Entity()
export class PlaylistEntity {

  @PrimaryGeneratedColumn()
  id: UUID;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  public: boolean;

  @ManyToMany(() => PlaylistSongEntity, (playlistSong) => playlistSong.playlist)
  songs: PlaylistSongEntity[];
}
