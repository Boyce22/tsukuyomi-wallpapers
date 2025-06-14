import { Tag } from '@/models/tag';
import type { RegisterTag } from '../dtos/tags/register-tag';

export interface ITagRepository {
  findAllByIds(ids: string[]): Promise<Tag[] | null>;
  register(dto: RegisterTag): Promise<Tag>;
}
