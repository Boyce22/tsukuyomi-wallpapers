import { Tag } from '@/models/tag';

/**
 * DTO (Data Transfer Object) para criação de uma nova tag.
 *
 * @typedef {Object} CreateTag
 * @property {string} name - Nome da tag.
 * @property {string} description - Descrição da tag.
 */
export type CreateTag = {
  name: string;
  description: string;
};

/**
 * Interface do repositório responsável pelas operações de acesso a dados da entidade `Tag`.
 *
 * @interface ITagRepository
 */
export interface ITagRepository {
  /**
   * Busca múltiplas tags pelos seus IDs.
   *
   * @param {string[]} ids - Array de IDs das tags a serem buscadas.
   * @returns {Promise<Tag[] | null>} Promise que resolve para um array de objetos Tag,
   * ou null se nenhuma tag for encontrada.
   * @throws {Error} Caso ocorra falha na consulta ao banco de dados.
   */
  findAllByIds(ids: string[]): Promise<Tag[] | null>;

  /**
   * Registra uma nova tag no banco de dados.
   *
   * @param {CreateTag} dto - Dados para criação da tag.
   * @returns {Promise<Tag>} Promise que resolve para a tag recém-criada.
   * @throws {Error} Caso ocorra falha ao salvar a tag.
   */
  register(dto: CreateTag): Promise<Tag>;
}

/**
 * Interface da camada de serviço responsável pela lógica de negócios relacionada a tags.
 *
 * @interface ITagService
 */
export interface ITagService {
  /**
   * Busca múltiplas tags pelos seus IDs.
   *
   * @param {string[]} ids - Array de IDs das tags a serem buscadas.
   * @returns {Promise<Tag[]>} Promise que resolve para um array de objetos Tag.
   * @throws {Error} Caso uma ou mais tags não sejam encontradas.
   */
  findAllByIds(ids: string[]): Promise<Tag[]>;

  /**
   * Registra uma nova tag na aplicação.
   *
   * @param {CreateTag} dto - Dados para criação da tag.
   * @returns {Promise<string>} Promise que resolve para o ID da tag criada.
   * @throws {Error} Caso ocorra falha ao criar a tag.
   */
  register(dto: CreateTag): Promise<string>;
}
