import {
  Controller,
  Inject,
  Param,
  Body,
  Get,
  Post,
  Patch,
  Delete,
} from '@nestjs/common';
import { PlaylistsService } from './playlist.service';
import { PlaylistDto } from './dto/playlist.dto';
import { SongDto } from './dto/song.dto';
import { UUID } from 'crypto';

@Controller('playlists')
export class PlaylistsController {
  constructor(
    private readonly playlistsService: PlaylistsService,
  ) {}

  @Get()
  getPlaylists() {
    return this.playlistsService.getPlaylists();
  }

  @Post()
  createPlaylist(@Body() playlist: PlaylistDto) {
    return this.playlistsService.createPlaylist(playlist);
  }

  @Get(':playlistId')
  getPlaylist(@Param('playlistId') playlistId: UUID) {
    return this.playlistsService.getPlaylist(playlistId);
  }

  @Patch(':playlistId')
  updatePlaylist(
    @Param('playlistId') playlistId: UUID,
    @Body() playlist: PlaylistDto,
  ) {
    return this.playlistsService.updatePlaylist(playlistId, playlist);
  }

  @Delete(':playlistId')
  deletePlaylist(@Param('playlistId') playlistId: UUID) {
    return this.playlistsService.deletePlaylist(playlistId);
  }

  @Post(':playlistId/add-song')
  addSong(@Param('playlistId') playlistId: UUID, @Body() song: SongDto) {
    return this.playlistsService.addSong(playlistId, song.id);
  }
}
