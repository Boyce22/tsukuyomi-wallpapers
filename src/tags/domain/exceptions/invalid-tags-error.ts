export class InvalidTagsError extends Error {
  statusCode: number;

  constructor(message?: string) {
    const finalMessage = message ?? 'Invalid or empty tags provided.';
    super(finalMessage);
    this.name = 'InvalidTagsError';
    this.statusCode = 400;

    Object.setPrototypeOf(this, InvalidTagsError.prototype);
  }
}
