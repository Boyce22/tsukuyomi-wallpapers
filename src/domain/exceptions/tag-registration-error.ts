export class TagRegistrationError extends Error {
  statusCode: number;

  constructor(message?: string) {
    const finalMessage = message ?? 'Failed to register tag.';
    super(finalMessage);
    this.name = 'TagRegistrationError';
    this.statusCode = 500;

    Object.setPrototypeOf(this, TagRegistrationError.prototype);
  }
}
