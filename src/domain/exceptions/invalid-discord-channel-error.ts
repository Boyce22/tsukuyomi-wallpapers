export class InvalidDiscordChannelError extends Error {
  statusCode: number;

  constructor(message?: string) {
    const finalMessage = message ?? 'The specified Discord channel is not a sendable text-based channel.';
    super(finalMessage);
    this.name = 'InvalidDiscordChannelError';
    this.statusCode = 400;

    Object.setPrototypeOf(this, InvalidDiscordChannelError.prototype);
  }
}
