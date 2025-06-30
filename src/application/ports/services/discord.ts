export interface IFile {
  buffer: Buffer;
  name: string;
}

export type TDiscordService = {
  sendWallpaper: ({ file, userId }: { file: IFile; userId: string }) => Promise<void>;
};
