import { RegisterWallpaper } from "@/dtos/register-wallpaper";

export interface IWallpaperService {
    getOriginalSize(id: string): Promise<string>;
    register(dto: RegisterWallpaper): Promise<string>
}