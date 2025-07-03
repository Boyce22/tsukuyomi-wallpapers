import { User } from '@users/domain/models/user';
import { Wallpaper } from '@wallpapers/domain/models/wallpaper';

import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne } from 'typeorm';

@Entity('tag')
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true, length: 50 })
  name!: string;

  @Column({ length: 255 })
  description!: string;

  @ManyToMany(() => Wallpaper, (wallpaper) => wallpaper.tags)
  wallpapers!: Wallpaper[];

  @ManyToOne(() => User, (user) => user.createdTags)
  createdBy!: User;

  @ManyToOne(() => User, (user) => user.updatedTags)
  updatedBy!: User;
}
