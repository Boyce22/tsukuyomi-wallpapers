import { Tag } from '@/@/models/tag';

export interface ITagService {
  findAllByIds(ids: string[]): Promise<Tag[] | null>;
}
