export class NotFound extends Error {
  statusCode: number;

  constructor(msg?: string) {
    const finalMessage = msg ?? 'Not Found';
    super(finalMessage);
    this.name = 'NotFound';
    this.statusCode = 404;
  }
}
