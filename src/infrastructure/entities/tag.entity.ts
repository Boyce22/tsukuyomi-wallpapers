import { UserEntity } from './user.entity';
import { WallpaperEntity } from './wallpaper.entity';

import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne } from 'typeorm';

@Entity('tag')
export class TagEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true, length: 50 })
  name!: string;

  @Column({ length: 255 })
  description!: string;

  @ManyToMany(() => WallpaperEntity, (wallpaper) => wallpaper.tags)
  wallpapers!: WallpaperEntity[];

  @ManyToOne(() => UserEntity, (user) => user.createdTags)
  createdBy!: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.updatedTags)
  updatedBy!: UserEntity;
}
