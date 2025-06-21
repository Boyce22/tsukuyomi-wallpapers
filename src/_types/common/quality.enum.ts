/**
 * Enumeração que representa os níveis de qualidade para compressão de imagens.
 * Cada nível é definido como uma porcentagem da qualidade original (0 a 100).
 *
 * @enum {number}
 */
export enum QualityCompress {
  /**
   * Qualidade muito alta, equivalente a 90% da qualidade original.
   */
  VERY_HIGH = 90,

  /**
   * Qualidade alta, equivalente a 80% da qualidade original.
   */
  HIGH = 80,

  /**
   * Qualidade média, equivalente a 60% da qualidade original.
   */
  MEDIUM = 60,

  /**
   * Qualidade baixa, equivalente a 40% da qualidade original.
   */
  LOW = 40,

  /**
   * Qualidade muito baixa, equivalente a 20% da qualidade original.
   */
  VERY_LOW = 20,
}
