import { User } from './user';
import { Wallpaper } from './wallpaper';

export class Tag {
  id!: string;
  name!: string;
  description!: string;
  wallpapers!: Wallpaper[];
  createdBy!: User;
  updatedBy!: User;
}