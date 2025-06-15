export class TagNotFound extends Error {
  statusCode: number;

  constructor(message?: string) {
    const finalMessage = message ?? 'The requested tag was not found.';
    super(finalMessage);
    this.name = 'TagNotFound';
    this.statusCode = 404; // Not Found

    Object.setPrototypeOf(this, TagNotFound.prototype);
  }
}
