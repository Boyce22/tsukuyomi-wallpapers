import { Role } from './role';
import { Tag } from './tag';
import { Wallpaper } from './wallpaper';

import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid', { comment: 'Identificador único do usuário, gerado automaticamente.' })
  id!: string;
  
  @Column({ comment: 'Nome próprio do usuário.' })
  name!: string;

  @Column({ comment: 'Sobrenome do usuário.' })
  lastName!: string;

  @Column({ unique: true, comment: 'Nome de usuário único utilizado para login e identificação.' })
  userName!: string;

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
