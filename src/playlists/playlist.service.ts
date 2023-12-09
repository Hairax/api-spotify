import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';
import { Repository } from 'typeorm';
import { PlaylistEntity } from './entities/playlist.entity';
import { MusicEntity } from '../musics/entities/music.entity';
import { PlaylistDto } from './dto/playlist.dto';
import { PlaylistSongEntity } from './entities/playlist-song.entity';

@Injectable()
export class PlaylistsService {
  constructor(
    @InjectRepository(PlaylistEntity)
    private readonly playlistRepository: Repository<PlaylistEntity>,
    @InjectRepository(MusicEntity)
    private readonly musicRepository: Repository<MusicEntity>,
  ) {}

  async getPlaylists(): Promise<PlaylistEntity[]> {
    return await this.playlistRepository.find();
  }

  async createPlaylist(playlistDto: PlaylistDto): Promise<PlaylistEntity> {
    const playlist = new PlaylistEntity();
    playlist.name = playlistDto.name;
    playlist.description = playlistDto.description;
    playlist.public = playlistDto.public;

    return await this.playlistRepository.save(playlist);
  }

  async getPlaylist(playlistId: UUID): Promise<PlaylistEntity> {
    return await this.playlistRepository.findOne({ where: { id: playlistId } });
  }

  async updatePlaylist(playlistId: UUID, playlistDto: PlaylistDto): Promise<PlaylistEntity> {
    const playlist = await this.playlistRepository.findOne({ where: { id: playlistId } });

    playlist.name = playlistDto.name;
    playlist.description = playlistDto.description;
    playlist.public = playlistDto.public;

    return await this.playlistRepository.save(playlist);
  }

  async deletePlaylist(playlistId: UUID): Promise<void> {
    await this.playlistRepository.delete({ id: playlistId });
  }

  async addSong(playlistId: UUID, songId: UUID): Promise<MusicEntity> {
    // Buscamos la playlist con la relación 'songs' cargada
    const playlist = await this.playlistRepository.findOne(
      { where: { id: playlistId }, relations: ['songs'] }
    );
  
    if (!playlist) {
      throw new NotFoundException('Playlist not found');
    }
  
    const song = await this.musicRepository.findOne({ where: { id: songId } });
  
    if (!song) {
      throw new NotFoundException('Song not found');
    }
  
    // Creamos una nueva PlaylistSongEntity
    const playlistSong = new PlaylistSongEntity();
    playlistSong.playlist = playlist;
    playlistSong.music = song;
  
    // Asegúrate de que la propiedad 'songs' esté inicializada antes de usar 'push'
    if (!playlist.songs) {
      playlist.songs = [];
    }
  
    // Agregamos la PlaylistSongEntity a la lista de canciones de la playlist
    playlist.songs.push(playlistSong);
  
    // Guardamos los cambios
    await this.playlistRepository.save(playlist);
  
    return song;
  }
  
}
