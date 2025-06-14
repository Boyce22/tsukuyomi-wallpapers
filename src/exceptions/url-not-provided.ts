export class UrlNotProvided extends Error {
  statusCode: number;

  constructor(message: string) {
    const finalMessage = message ?? "Wallpaper ID must be provided";
    super(finalMessage);
    this.name = "UrlNotProvided";
    this.statusCode = 400;
  }
}
