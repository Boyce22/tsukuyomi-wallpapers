export class UrlNotFound extends Error {
  statusCode: number;

  constructor(message?: string, url?: string) {
    const finalMessage = message
      ? url
        ? `${message}: ${url}`
        : message
      : url
        ? `URL not found: ${url}`
        : 'URL not found.';

    super(finalMessage);
    this.name = 'UrlNotFound';
    this.statusCode = 404;

    Object.setPrototypeOf(this, UrlNotFound.prototype);
  }
}
