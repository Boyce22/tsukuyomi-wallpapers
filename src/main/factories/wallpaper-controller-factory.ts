import WallpaperController from '@/infrastructure/controllers/wallpaper';
import { RegisterWallpaperUseCase } from '@/application/use-cases/wallpaper/register-wallpaper';
import { GetOriginalSizeUseCase } from '@/application/use-cases/wallpaper/get-original-size';

import { FindAllTagsByIdsUseCase } from '@/application/use-cases/tag/find-all-tags-by-ids';
import ImageCompressService from '@/infrastructure/services/image-compress';
import BackBlazeService from '@/infrastructure/services/back-blaze';
import DiscordClient from '@/infrastructure/services/discord';

import WallpaperRepository from '@/infrastructure/repositories/wallpaper';
import { TagRepository } from '@/infrastructure/repositories/tag';

import { ApproveWallpaperUseCase } from '@/application/use-cases/wallpaper/approve-wallpaper';
import { RejectWallpaperUseCase } from '@/application/use-cases/wallpaper/reject-wallpaper';
import { EmbedBuilder } from 'discord.js';
import { env } from '@/infrastructure/config/env';

export const makeWallpaperController = () => {
  const wallpaperRepository = new WallpaperRepository();
  const tagRepository = new TagRepository();
  const findAllTagsByIdsUseCase = new FindAllTagsByIdsUseCase(tagRepository);
  const imageCompressService = new ImageCompressService();
  const storageService = new BackBlazeService(env.B2_URL, env.B2_REGION, env.B2_KEY_ID, env.B2_SECRET_KEY);

  const approveWallpaperUseCase = new ApproveWallpaperUseCase(wallpaperRepository);
  const rejectWallpaperUseCase = new RejectWallpaperUseCase(wallpaperRepository);

  const discordClient = new DiscordClient(
    env.DISCORD_TOKEN,
    env.DISCORD_REVIEWER_ROLE_ID,
    env.DISCORD_CHANNEL,
    async (interaction) => {
      const wallpaperId = interaction.message.embeds[0].footer.text.split('Wallpaper ID: ')[1];
      
      await approveWallpaperUseCase.execute(wallpaperId);

      const embed = new EmbedBuilder()
        .setTitle('Wallpaper Approved!')
        .setDescription('The wallpaper has been successfully approved and is now live.')
        .setColor(0x00ff00)
        .setTimestamp();

      await interaction.update({ embeds: [embed], components: [] });
    },
    async (interaction) => {
      const wallpaperId = interaction.message.embeds[0].footer.text.split('Wallpaper ID: ')[1];

      await rejectWallpaperUseCase.execute(wallpaperId);

      const embed = new EmbedBuilder()
        .setTitle('Wallpaper Rejected!')
        .setDescription('The wallpaper has been rejected.')
        .setColor(0xff0000)
        .setTimestamp();

      await interaction.update({ embeds: [embed], components: [] });
    },
  );

  const registerWallpaperUseCase = new RegisterWallpaperUseCase(
    wallpaperRepository,
    findAllTagsByIdsUseCase,
    imageCompressService,
    storageService,
    discordClient,
    env.STORAGE_WALLPAPER_BUCKET,
  );

  const getOriginalSizeUseCase = new GetOriginalSizeUseCase(wallpaperRepository);

  return new WallpaperController(registerWallpaperUseCase, getOriginalSizeUseCase);
};
