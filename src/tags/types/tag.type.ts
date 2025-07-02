import { Tag } from '../domain/models/tag';

export type CreateTag = {
  name: string;
  description: string;
};

export interface ITagRepository {
  findAllByIds(ids: string[]): Promise<Tag[] | null>;
  register(dto: CreateTag): Promise<Tag>;
}

export interface ITagService {
  findAllByIds(ids: string[]): Promise<Tag[]>;
  register(dto: CreateTag): Promise<string>;
}
