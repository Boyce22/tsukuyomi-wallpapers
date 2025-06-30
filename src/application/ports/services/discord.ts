import { type Wallpaper } from "@/domain/models/wallpaper";

export interface IFile {
  buffer: Buffer;
  name: string;
}

export type TDiscordService = {
  sendWallpaper: ({ file, userId, wallpaper }: { file: IFile; userId: string, wallpaper: Wallpaper }) => Promise<void>;
};
