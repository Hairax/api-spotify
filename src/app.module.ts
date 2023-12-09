import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsModule } from './items/items.module';
import { MusicsModule } from './musics/musics.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MusicEntity } from './musics/entities/music.entity';

@Module({
  imports: [
    ItemsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5050,
      username: 'root',
      password: 'root',
      database: 'spotify_db',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    MusicsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
