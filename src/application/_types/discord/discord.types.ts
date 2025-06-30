import { ImageBufferData } from '../compress/compress.type';

export interface IDiscordClient {
  requestApproval(params: RequestApproval): Promise<void>;
}

export type ClientStatus = {
  online: boolean;
  timestamp: Date;
};

export type RequestApproval = {
  image: ImageBufferData;
  userId: string;
};
