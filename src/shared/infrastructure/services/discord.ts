import { IFile, TDiscordService } from '../../application/ports/services/discord';
import { DiscordConfigError } from '../../domain/exceptions/discord-config-error';
import { InvalidDiscordChannelError } from '../../domain/exceptions/invalid-discord-channel-error';
import { Wallpaper } from '@wallpapers/domain/models/wallpaper';

import { Client, IntentsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

class DiscordClient implements TDiscordService {
  private readonly client: Client;
  private readonly reviewerRoleId: string;

  constructor(
    public readonly onApprove: (interaction: any) => Promise<void>,
    public readonly onReject: (interaction: any) => Promise<void>,
  ) {
    this.client = new Client({
      intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
      ],
    });

    this.reviewerRoleId = this._addReviewerRoleId();

    this._buildDiscordClient();
  }

  private _buildDiscordClient() {
    if (!process.env.DISCORD_TOKEN) {
      throw new DiscordConfigError('Missing environment variable: DISCORD_TOKEN');
    }

    this.client.login(process.env.DISCORD_TOKEN);

    this.client.on('interactionCreate', async (interaction) => {
      if (!interaction.isButton()) return;

      if (interaction.customId === 'approve_wallpaper') {
        await this.onApprove(interaction);
      } else if (interaction.customId === 'decline_wallpaper') {
        await this.onReject(interaction);
      }
    });
  }

  private _addReviewerRoleId() {
    if (!process.env.DISCORD_REVIEWER_ROLE_ID) {
      throw new DiscordConfigError('Missing environment variable: DISCORD_REVIEWER_ROLE_ID');
    }

    return process.env.DISCORD_REVIEWER_ROLE_ID;
  }

  private async getTextChannel(channelId: string): Promise<any> {
    if (!this.client.isReady()) {
      await new Promise((resolve) => this.client.once('ready', resolve));
    }

    const channel = await this.client.channels.fetch(channelId);

    if (channel?.isTextBased()) {
      return channel;
    }

    throw new InvalidDiscordChannelError('The specified channel is not a sendable text-based channel.');
  }

  private applyMatureContentPrefix(isMature: boolean, fileName: string) {
    return isMature ? `SPOILER_${fileName}` : fileName;
  }

  async sendWallpaper({
    userId,
    file,
    wallpaper,
  }: {
    userId: string;
    file: IFile;
    wallpaper: Wallpaper;
  }): Promise<void> {
    const channel = await this.getTextChannel(process.env.DISCORD_CHANNEL!);
    const timestamp = new Date();

    const embed = new EmbedBuilder()
      .setTitle('Tsukuyomi - Submission Under Review')
      .setDescription(
        [
          'A new image submission awaits divine scrutiny.',
          'The system stands ready to render judgment on this offering.',
          '',
          'Review the submission and provide your verdict.',
          '_The judgment is final and cannot be reversed._',
          '',
          'Thank you for your cooperation in maintaining the integrity of the system.',
        ].join('\n'),
      )
      .setColor(0x8b0000)
      .setThumbnail('https://i.ibb.co/Kx9Kvprc/wallpapersden-com-sukuna-4k-jujutsu-kaisen-art-3840x2160.jpg')
      .addFields(
        {
          name: 'Status',
          value: 'Submission pending review',
          inline: false,
        },
        {
          name: 'Submission Time',
          value: timestamp.toLocaleString('pt-BR', {
            timeZone: 'America/Sao_Paulo',
            hour12: false,
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }),
          inline: false,
        },
        {
          name: 'Submitted By',
          value: `${userId}`,
          inline: true,
        },
      )
      .setFooter({
        text: `Tsukuyomi Protocol: Submission Assessment - Wallpaper ID: ${wallpaper.id}`,
        iconURL: 'https://i.pinimg.com/originals/c5/a0/89/c5a08960c26b18e717ac53bf359c4238.jpg',
      })
      .setTimestamp();

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId('approve_wallpaper').setLabel('Approve').setStyle(ButtonStyle.Success),
      new ButtonBuilder().setCustomId('decline_wallpaper').setLabel('Reject').setStyle(ButtonStyle.Danger),
    );

    await channel.send({
      content: `<@&${this.reviewerRoleId}>, your submission has been received and is under review.`,
      files: [
        {
          attachment: file.buffer,
          name: this.applyMatureContentPrefix(wallpaper.isMature, file.name),
        },
      ],
      embeds: [embed],
      components: [row],
    });
  }
}

export default DiscordClient;
