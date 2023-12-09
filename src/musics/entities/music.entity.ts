import { UUID } from 'crypto';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinTable, ManyToMany } from 'typeorm';
import { PlaylistEntity } from 'src/playlists/entities/playlist.entity';
import { PlaylistSongEntity } from 'src/playlists/entities/playlist-song.entity';

@Entity()
export class MusicEntity {
  @PrimaryGeneratedColumn()
  id: UUID;

  @Column({ type: 'varchar', length: 36 })
  name: string;

  @Column({ type: 'smallint', default: 1 })
  music_genre: number;

  @Column({ type: 'varchar', length: 50 })
  authors: string;

  @Column({ type: 'int' })
  year: number;

  @ManyToMany(() => PlaylistEntity, (playlist) => playlist.songs)
  @JoinTable()
  playlists: PlaylistEntity[];

  @OneToMany(() => PlaylistSongEntity, (playlistSong) => playlistSong.music)
  songs: PlaylistSongEntity[];
}
