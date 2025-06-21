import { Role } from './role';
import { Tag } from './tag';
import { Wallpaper } from './wallpaper';

import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid', {
    comment: 'Identificador único do usuário, gerado automaticamente.',
  })
  id!: string;

  @Column({ length: 50, comment: 'Nome próprio do usuário (máx. 50 caracteres).' })
  name!: string;

  @Column({ length: 50, comment: 'Sobrenome do usuário (máx. 50 caracteres).' })
  lastName!: string;

  @Column({
    unique: true,
    length: 50,
    comment: 'Nome de usuário único utilizado para login e identificação (máx. 50 caracteres).',
  })
  userName!: string;

  @Column({
    length: 100,
    comment: 'Hash da senha do usuário (máx. 100 caracteres).',
  })
  password!: string;

  @Column({
    type: 'date',
    nullable: true,
    comment: 'Data de nascimento do usuário.',
  })
  dateBirth?: Date;

  @Column({
    unique: true,
    length: 255,
    comment: 'Endereço de e-mail do usuário, deve ser único (máx. 255 caracteres).',
  })
  email!: string;

  @Column({
    default: false,
    comment: 'Indica se o usuário foi verificado.',
  })
  isVerified!: boolean;

  @Column({
    nullable: true,
    length: 255,
    comment: 'URL da foto de perfil do usuário (máx. 255 caracteres).',
  })
  profilePictureUrl?: string;

  @Column({
    nullable: true,
    length: 255,
    comment: 'URL do banner do perfil do usuário (máx. 255 caracteres).',
  })
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
