import type { HTMLAttributes } from "react";

/** Tipos do Progress do Figma. */
export type ProgressType = "linear" | "circular";

export type ProgressProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "children" | "role" | "aria-label"
> & {
  /** Linear (áreas horizontais) ou Circular (espaços compactos). */
  type?: ProgressType;
  /**
   * Valor real entre 0 e 100 (modo Determinado). Sem valor, o modo é
   * Indeterminado e comunica atividade, não duração restante.
   */
  value?: number;
  /** Exibe o valor percentual; disponível somente no modo Determinado. */
  showValue?: boolean;
  /** Descreve a operação em andamento para tecnologias assistivas. */
  label: string;
};
