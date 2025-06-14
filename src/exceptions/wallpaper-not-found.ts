export class WallpaperNotFound extends Error {
  statusCode: number;

  constructor(message: string) {
    const finalMessage = message ?? "Wallpaper not found";
    super(finalMessage);
    this.name = "WallpaperNotFound";
    this.statusCode = 404; // Not Found
  }
}
