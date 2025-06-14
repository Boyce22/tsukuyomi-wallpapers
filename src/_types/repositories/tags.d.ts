export interface ITagRepository {
  findAllByIds(ids: string[]): Promise<Tag[] | null>;
}
