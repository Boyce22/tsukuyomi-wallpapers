import { RoleEntity } from './role.entity';
import { TagEntity } from './tag.entity';
import { WallpaperEntity } from './wallpaper.entity';

import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 50 })
  name!: string;

  @Column({ length: 50 })
  lastName!: string;

  @Column({ unique: true, length: 50 })
  userName!: string;

  @Column({ length: 100 })
  password!: string;

  @Column({ type: 'date', nullable: true })
  birthDate?: Date;

  @Column({ unique: true, length: 255 })
  email!: string;

  @Column({ default: false })
  isVerified!: boolean;

  @Column({ nullable: true, length: 255 })
  profilePictureUrl?: string;

  @Column({ nullable: true, length: 255 })
  bannerUrl?: string;

  @OneToMany(() => WallpaperEntity, (wallpaper) => wallpaper.createdBy)
  createdWallpapers!: WallpaperEntity[];

  @OneToMany(() => WallpaperEntity, (wallpaper) => wallpaper.updatedBy)
  updatedWallpapers!: WallpaperEntity[];

  @OneToMany(() => TagEntity, (tag) => tag.createdBy)
  createdTags!: TagEntity[];

  @OneToMany(() => TagEntity, (tag) => tag.updatedBy)
  updatedTags!: TagEntity[];

  @ManyToMany(() => RoleEntity, (role) => role.users)
  @JoinTable({ name: 'user_role' })
  roles!: RoleEntity[];
}
