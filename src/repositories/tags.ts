import { Tag } from '@/models/tag';
import { In, Repository } from 'typeorm';
import AppDataSource from '@/config/database';
import { ITagRepository } from '@/_types/repositories/tags';

export class TagReporitory implements ITagRepository {
  private repository: Repository<Tag>;

  constructor() {
    this.repository = AppDataSource.getRepository(Tag);
  }

  static createInstance(): TagReporitory {
    return new TagReporitory();
  }

  findAllByIds = async (ids: string[]): Promise<Tag[] | null> => {
    const tags = await this.repository.find({ where: { id: In([...ids]) } });

    return tags;
  };
}
