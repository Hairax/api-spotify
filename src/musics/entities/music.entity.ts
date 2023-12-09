import { UUID } from 'crypto';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
