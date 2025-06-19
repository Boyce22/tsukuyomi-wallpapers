/**
 * Níveis de qualidade utilizados para compressão de imagens.
 * Os valores representam a porcentagem da qualidade original (de 0 a 100).
 */
export enum QualityCompress {
  /** Qualidade muito alta (90%) */
  VERY_HIGH = 90,

  /** Qualidade alta (80%) */
  HIGH = 80,

  /** Qualidade média (60%) */
  MEDIUM = 60,

  /** Qualidade baixa (40%) */
  LOW = 40,

  /** Qualidade muito baixa (20%) */
  VERY_LOW = 20,
}
