export class DiscordConfigError extends Error {
  statusCode: number;

  constructor(message?: string) {
    const finalMessage = message ?? 'Missing or invalid Discord configuration.';
    super(finalMessage);
    this.name = 'DiscordConfigError';
    this.statusCode = 500;

    Object.setPrototypeOf(this, DiscordConfigError.prototype);
  }
}
