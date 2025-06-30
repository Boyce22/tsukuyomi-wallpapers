import { ImageBufferData } from '../compress/compress.type';

export interface IDiscordClient {}

export type ClientStatus = {
  online: boolean;
  timestamp: Date;
};

export type RequestApproval = {
  image: ImageBufferData;
  userId: string;
};
