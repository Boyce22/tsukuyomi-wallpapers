import {
  Entity,
  Column,
  ManyToOne,
  JoinTable,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Tag } from "./tag";
import { User } from "./user";

@Entity("wallpaper")
export class Wallpaper {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ length: 255 })
  name!: string;

  @Column({ type: "text" })
  description?: string;

  @Column()
  originalUrl!: string;

  @Column()
  thumbnailUrl!: string;

  @Column({ default: false })
  isMature!: boolean;

  @Column({ default: true })
  isActive!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column({ type: "float", nullable: true })
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
