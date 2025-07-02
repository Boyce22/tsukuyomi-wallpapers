import WallpaperController from '@wallpapers/infrastructure/controllers/wallpaper';
import { RegisterWallpaperUseCase } from '@wallpapers/application/use-cases/register-wallpaper';
import { GetOriginalSizeUseCase } from '@wallpapers/application/use-cases/get-original-size';

import { FindAllTagsByIdsUseCase } from '../../../tags/application/use-cases/find-all-tags-by-ids';
import ImageCompressService from '../../../shared/infrastructure/services/image-compress';
import BackBlazeService from '../../../shared/infrastructure/services/back-blaze';
import DiscordClient from '../../../shared/infrastructure/services/discord';

import WallpaperRepository from '@wallpapers/infrastructure/repositories/wallpaper';
import { TagRepository } from '@tags/infrastructure/repositories/tag';

import { ApproveWallpaperUseCase } from '@wallpapers/application/use-cases/approve-wallpaper';
import { RejectWallpaperUseCase } from '@wallpapers/application/use-cases/reject-wallpaper';
import { EmbedBuilder } from 'discord.js';

export const makeWallpaperController = () => {
  const wallpaperRepository = new WallpaperRepository();
  const tagRepository = new TagRepository();
  const findAllTagsByIdsUseCase = new FindAllTagsByIdsUseCase(tagRepository);
  const imageCompressService = new ImageCompressService();
  const storageService = new BackBlazeService();

  const approveWallpaperUseCase = new ApproveWallpaperUseCase(wallpaperRepository);
  const rejectWallpaperUseCase = new RejectWallpaperUseCase(wallpaperRepository);

  const discordClient = new DiscordClient(
    async (interaction) => {
      const wallpaperId = interaction.message.embeds[0].footer.text.split('Wallpaper ID: ')[1];

      await approveWallpaperUseCase.execute(wallpaperId);

      const embed = new EmbedBuilder()
        .setTitle('Decree Issued: Wallpaper Approved')
        .setDescription(
          [
            'Your judgment has been cast.',
            'The image has passed divine scrutiny and has been accepted into the domain.',
            '',
            'Let this approval echo through the void.',
            '',
            'The system acknowledges your verdict as final.',
          ].join('\n'),
        )
        .setColor(0x00ff00)
        .setThumbnail('https://i.ibb.co/Kx9Kvprc/wallpapersden-com-sukuna-4k-jujutsu-kaisen-art-3840x2160.jpg')
        .setFooter({
          text: `Tsukuyomi Protocol: Approval Finalized - Wallpaper ID: ${wallpaperId}`,
          iconURL: 'https://i.pinimg.com/originals/c5/a0/89/c5a08960c26b18e717ac53bf359c4238.jpg',
        })
        .setTimestamp();

      await interaction.update({ embeds: [embed], components: [] });
    },

    async (interaction) => {
      const wallpaperId = interaction.message.embeds[0].footer.text.split('Wallpaper ID: ')[1];

      await rejectWallpaperUseCase.execute(wallpaperId);

      const embed = new EmbedBuilder()
        .setTitle('Decree Issued: Wallpaper Rejected')
        .setDescription(
          [
            'Judgment has been rendered.',
            'The submission has failed to meet the standards of the realm.',
            '',
            'This rejection is absolute.',
            '',
            'The system will not entertain appeals.',
          ].join('\n'),
        )
        .setColor(0xff0000)
        .setThumbnail('https://i.ibb.co/Kx9Kvprc/wallpapersden-com-sukuna-4k-jujutsu-kaisen-art-3840x2160.jpg')
        .setFooter({
          text: `Tsukuyomi Protocol: Rejection Finalized - Wallpaper ID: ${wallpaperId}`,
          iconURL: 'https://i.pinimg.com/originals/c5/a0/89/c5a08960c26b18e717ac53bf359c4238.jpg',
        })
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
  );

  const getOriginalSizeUseCase = new GetOriginalSizeUseCase(wallpaperRepository);

  return new WallpaperController(registerWallpaperUseCase, getOriginalSizeUseCase);
};
