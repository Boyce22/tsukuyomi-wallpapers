import { Role } from './role';
import { Tag } from './tag';
import { Wallpaper } from './wallpaper';

export class User {
  id!: string;
  name!: string;
  lastName!: string;
  userName!: string;
  password!: string;
  birthDate?: Date;
  email!: string;
  isVerified!: boolean;
  profilePictureUrl?: string;
  bannerUrl?: string;
  createdWallpapers!: Wallpaper[];
  updatedWallpapers!: Wallpaper[];
  createdTags!: Tag[];
  updatedTags!: Tag[];
  roles!: Role[];
}