export class UrlNotFound extends Error {
  statusCode: number;

  constructor(message?: string, url?: string) {
    const finalMessage = message && url ? `${message} ${url}` : 'Url not found';
    super(finalMessage);
    this.name = 'UrlNotFound';
    this.statusCode = 404;
  }
}
