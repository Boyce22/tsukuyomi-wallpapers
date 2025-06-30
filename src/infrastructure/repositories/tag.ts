import { Tag } from '@/domain/models/tag';
import { In, Repository } from 'typeorm';
import AppDataSource from '@/infrastructure/config/database';

import { CreateTag, ITagRepository } from '@/application/_types/tags/tag.type';

export class TagRepository implements ITagRepository {
  private repository: Repository<Tag>;

  constructor() {
    this.repository = AppDataSource.getRepository(Tag);
  }

  async findAllByIds(ids: string[]): Promise<Tag[]> {
    return this.repository.find({ where: { id: In(ids) } });
  }

  async register(dto: CreateTag): Promise<Tag> {
    const tag = this.repository.create({
      name: dto.name,
      description: dto.description,
    });

    return await this.repository.save(tag);
  }
}
