export class TagNotFound extends Error {
  statusCode: number;

  constructor(message?: string) {
    const finalMessage = message ?? 'Tag not found';
    super(finalMessage);
    this.name = 'TagNotFound';
    this.statusCode = 404; // Not Found
  }
}
