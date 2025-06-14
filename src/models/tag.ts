import { User } from "./user";
import { Wallpaper } from "./wallpaper";

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  ManyToOne,
} from "typeorm";

@Entity("tag")
export class Tag {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  name!: string;

  @ManyToMany(() => Wallpaper, (wallpaper) => wallpaper.tags)
  wallpapers!: Wallpaper[];

  @ManyToOne(() => User, (user) => user.createdTags)
  createdBy!: User;

  @ManyToOne(() => User, (user) => user.updatedTags)
  updatedBy!: User;
}
