export class IdNotProvided extends Error {
  statusCode: number;

  constructor(message?: string) {
    const finalMessage = message ?? 'A valid ID must be provided.';
    super(finalMessage);
    this.name = 'IdNotProvided';
    this.statusCode = 400;

    Object.setPrototypeOf(this, IdNotProvided.prototype);
  }
}
