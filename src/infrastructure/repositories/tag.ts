import { TagEntity } from '@/infrastructure/entities/tag.entity';
import { Tag } from '@/domain/models/tag';
import { In, Repository } from 'typeorm';
import AppDataSource from '@/infrastructure/config/database';

import { CreateTag, ITagRepository } from '@/application/_types/tags/tag.type';

export class TagRepository implements ITagRepository {
  private repository: Repository<TagEntity>;

  constructor() {
    this.repository = AppDataSource.getRepository(TagEntity);
  }

  async findAllByIds(ids: string[]): Promise<Tag[]> {
    const tagEntities = await this.repository.find({ where: { id: In(ids) } });
    return tagEntities.map(tagEntity => {
      const tag = new Tag();
      tag.id = tagEntity.id;
      tag.name = tagEntity.name;
      tag.description = tagEntity.description;
      return tag;
    });
  }

  async register(dto: CreateTag): Promise<Tag> {
    const tagEntity = this.repository.create({
      name: dto.name,
      description: dto.description,
    });

    const savedEntity = await this.repository.save(tagEntity);

    const tag = new Tag();
    tag.id = savedEntity.id;
    tag.name = savedEntity.name;
    tag.description = savedEntity.description;

    return tag;
  }
}
