import { Role } from './role';
import { Tag } from './tag';
import { Wallpaper } from './wallpaper';

import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';

@Entity('user')
export class User {
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

  @OneToMany(() => Wallpaper, (wallpaper) => wallpaper.createdBy)
  createdWallpapers!: Wallpaper[];

  @OneToMany(() => Wallpaper, (wallpaper) => wallpaper.updatedBy)
  updatedWallpapers!: Wallpaper[];

  @OneToMany(() => Tag, (tag) => tag.createdBy)
  createdTags!: Tag[];

  @OneToMany(() => Tag, (tag) => tag.updatedBy)
  updatedTags!: Tag[];

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({ name: 'user_role' })
  roles!: Role[];
}
