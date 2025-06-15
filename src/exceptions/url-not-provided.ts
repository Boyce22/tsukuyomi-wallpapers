export class UrlNotProvided extends Error {
  statusCode: number;

  constructor(message?: string) {
    const finalMessage = message ?? 'URL must be provided.';
    super(finalMessage);
    this.name = 'UrlNotProvided';
    this.statusCode = 400;

    Object.setPrototypeOf(this, UrlNotProvided.prototype);
  }
}
