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

import { Tag } from './tag';
import { User } from './user';

@Entity('wallpaper')
export class Wallpaper {
  @PrimaryGeneratedColumn('uuid', {
    comment: 'Identificador único do papel de parede, gerado automaticamente.',
  })
  id!: string;

  @Column({
    length: 255,
    comment: 'Nome do papel de parede (máx. 255 caracteres).',
  })
  name!: string;

  @Column({
    nullable: true,
    comment: 'Descrição detalhada do papel de parede (máx. 255 caracteres).',
    length: 255,
  })
  description?: string;

  @Column({
    length: 255,
    comment: 'URL original do arquivo da imagem (máx. 255 caracteres).',
  })
  originalUrl!: string;

  @Column({
    length: 255,
    comment: 'URL da miniatura (thumbnail) da imagem (máx. 255 caracteres).',
  })
  thumbnailUrl!: string;

  @Column({
    default: false,
    comment: 'Indica se o conteúdo é para público adulto (mature).',
  })
  isMature!: boolean;

  @Column({
    default: false,
    comment: 'Indica se o papel de parede está ativo e disponível.',
  })
  isActive!: boolean;

  @CreateDateColumn({
    comment: 'Data e hora de criação do registro.',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    comment: 'Data e hora da última atualização do registro.',
  })
  updatedAt!: Date;

  @Column({
    type: 'float',
    nullable: true,
    comment: 'Tamanho do arquivo em megabytes ou outra unidade relevante.',
  })
  fileSize?: number;

  @Column({
    length: 10,
    nullable: true,
    comment: 'Formato do arquivo (exemplo: jpg, png, gif, webp).',
  })
  format?: string;

  @Column({
    default: 0,
    comment: 'Quantidade de visualizações do papel de parede.',
  })
  viewCount!: number;

  @Column({
    default: 0,
    comment: 'Quantidade de downloads do papel de parede.',
  })
  downloadCount!: number;

  @ManyToOne(() => User, (user) => user.createdWallpapers, { nullable: true })
  createdBy?: User;

  @ManyToOne(() => User, { nullable: true })
  updatedBy?: User;

  @ManyToMany(() => Tag, (tag) => tag.wallpapers, { cascade: true })
  @JoinTable({ name: 'wallpaper_tag' })
  tags!: Tag[];
}
