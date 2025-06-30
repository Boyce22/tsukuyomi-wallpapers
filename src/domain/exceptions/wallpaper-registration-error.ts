export class WallpaperRegistrationError extends Error {
  statusCode: number;

  constructor(message?: string) {
    const finalMessage = message ?? 'Failed to register wallpaper.';
    super(finalMessage);
    this.name = 'WallpaperRegistrationError';
    this.statusCode = 500;

    Object.setPrototypeOf(this, WallpaperRegistrationError.prototype);
  }
}
