import { CreateTag } from '@/application/_types/tags/tag.type';
import type { Request, Response } from 'express';
import { IRegisterTagUseCase } from '@/application/use-cases/tag/register-tag';
import { IFindAllTagsByIdsUseCase } from '@/application/use-cases/tag/find-all-tags-by-ids';
import { InvalidTagsError } from '@/domain/exceptions/invalid-tags-error';

class TagController {
  private readonly registerTagUseCase: IRegisterTagUseCase;
  private readonly findAllTagsByIdsUseCase: IFindAllTagsByIdsUseCase;

  constructor(registerTagUseCase: IRegisterTagUseCase, findAllTagsByIdsUseCase: IFindAllTagsByIdsUseCase) {
    this.registerTagUseCase = registerTagUseCase;
    this.findAllTagsByIdsUseCase = findAllTagsByIdsUseCase;
  }

  async register(req: Request, res: Response): Promise<void> {
    const dto: CreateTag = req.body;

    const tagId = await this.registerTagUseCase.execute(dto);

    res.status(201).json({ id: tagId });
  }

  async findAllByIds(req: Request, res: Response): Promise<void> {
    const ids = req.body?.ids;

    if (!Array.isArray(ids) || !ids.every((id) => typeof id === 'string')) {
      throw new InvalidTagsError('`ids` deve ser um array de strings.');
    }

    const tags = await this.findAllTagsByIdsUseCase.execute(ids);
    res.status(200).json(tags);
  }
}

export default TagController;
