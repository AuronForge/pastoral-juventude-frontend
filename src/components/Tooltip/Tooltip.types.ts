import type { ReactElement } from "react";

/** Posições do Tooltip do Figma: Superior, Inferior, Esquerda e Direita. */
export type TooltipPosition = "top" | "bottom" | "left" | "right";

export type TooltipProps = {
  /** Frase curta e objetiva, sem conteúdo interativo. */
  text: string;
  position?: TooltipPosition;
  disabled?: boolean;
  /** Exibição controlada (ex.: confirmação "Copiado"); sem valor, segue hover e foco. */
  open?: boolean;
  /** Elemento de origem; recebe a descrição acessível. */
  children: ReactElement;
};
