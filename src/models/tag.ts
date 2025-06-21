import { User } from './user';
import { Wallpaper } from './wallpaper';

import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne } from 'typeorm';

@Entity('tag')
export class Tag {
  @PrimaryGeneratedColumn('uuid', {
    comment: 'Identificador único da tag, gerado automaticamente.',
  })
  id!: string;

  @Column({
    unique: true,
    length: 50,
    comment: 'Nome único da tag que identifica cada tag de forma exclusiva (máx. 50 caracteres).',
  })
  name!: string;

  @Column({
    length: 255,
    comment: 'Descrição da tag, que explica seu significado ou contexto (máx. 255 caracteres).',
  })
  description!: string;

  @ManyToMany(() => Wallpaper, (wallpaper) => wallpaper.tags)
  wallpapers!: Wallpaper[];

  @ManyToOne(() => User, (user) => user.createdTags)
  createdBy!: User;

  @ManyToOne(() => User, (user) => user.updatedTags)
  updatedBy!: User;
}
