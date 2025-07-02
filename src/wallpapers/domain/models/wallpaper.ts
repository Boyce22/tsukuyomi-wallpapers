import {
  Entity,
  Column,
  ManyToOne,
  JoinTable,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Tag } from '../../../tags/domain/models/tag';
import { User } from '../../../users/domain/models/user';

import { WallpaperStatus } from '@wallpapers/types/wallpaper-status.enum';

@Entity('wallpaper')
export class Wallpaper {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 255 })
  name!: string;

  @Column({ nullable: true, length: 255 })
  description?: string;

  @Column({ length: 255 })
  originalUrl!: string;

  @Column({ length: 255 })
  thumbnailUrl!: string;

  @Column({ default: false })
  isMature!: boolean;

  @Column({ default: true })
  isActive!: boolean;

  @Column({ type: 'enum', enum: WallpaperStatus, default: WallpaperStatus.PENDING })
  status!: WallpaperStatus;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column({ type: 'float', nullable: true })
  fileSize?: number;

  @Column({ length: 10, nullable: true })
  format?: string;

  @Column({ default: 0 })
  viewCount!: number;

  @Column({ default: 0 })
  downloadCount!: number;

  @ManyToOne(() => User, (user) => user.createdWallpapers, { nullable: true })
  createdBy?: User;

  @ManyToOne(() => User, { nullable: true })
  updatedBy?: User;

  @ManyToMany(() => Tag, (tag) => tag.wallpapers, { cascade: true })
  @JoinTable({ name: 'wallpaper_tag' })
  tags!: Tag[];
}
