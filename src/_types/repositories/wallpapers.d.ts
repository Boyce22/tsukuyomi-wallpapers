import { RegisterWallpaper } from "@/dtos/register-wallpaper";

export interface IWallpapersRepository {
  findUrlWithOriginalSizeById(id: string): Promise<string | null>;
}