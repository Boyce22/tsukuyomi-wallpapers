export class IdNotProvided extends Error {
  statusCode: number;

  constructor(message?: string) {
    const finalMessage = message ?? 'ID must be provided.';
    super(finalMessage);
    this.name = 'IdNotProvided';
    this.statusCode = 400;
  }
}
