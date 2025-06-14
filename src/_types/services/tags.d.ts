import { Tag } from '@/models/tag';
import type { RegisterTag } from '@/_types/dtos/tags/register-tag';

export interface ITagService {
  findAllByIds(ids: string[]): Promise<Tag[]>;
  register(dto: RegisterTag): Promise<string>;
}
