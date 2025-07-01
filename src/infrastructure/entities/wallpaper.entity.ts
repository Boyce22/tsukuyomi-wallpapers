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

import { TagEntity } from './tag.entity';
import { UserEntity } from './user.entity';

import { WallpaperStatus } from '@/domain/enums/wallpaper-status.enum';

@Entity('wallpaper')
export class WallpaperEntity {
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

  @ManyToOne(() => UserEntity, (user) => user.createdWallpapers, { nullable: true })
  createdBy?: UserEntity;

  @ManyToOne(() => UserEntity, { nullable: true })
  updatedBy?: UserEntity;

  @ManyToMany(() => TagEntity, (tag) => tag.wallpapers, { cascade: true })
  @JoinTable({ name: 'wallpaper_tag' })
  tags!: TagEntity[];
}
