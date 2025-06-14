import { User } from './user';
import { Wallpaper } from './wallpaper';

import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne } from 'typeorm';

@Entity('tag')
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    unique: true,
    comment: 'Nome único da tag que identifica cada tag de forma exclusiva.',
  })
  name!: string;

  @Column({
    comment: 'Descrição da tag, que explica seu significado ou contexto.',
  })
  description!: string;

  @ManyToMany(() => Wallpaper, (wallpaper) => wallpaper.tags)
  wallpapers!: Wallpaper[];

  @ManyToOne(() => User, (user) => user.createdTags)
  createdBy!: User;

  @ManyToOne(() => User, (user) => user.updatedTags)
  updatedBy!: User;
}
