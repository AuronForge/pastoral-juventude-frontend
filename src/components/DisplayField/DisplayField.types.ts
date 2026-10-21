import type { HTMLAttributes, ReactNode } from "react";

/** Orientações do Figma: Vertical (rótulo acima) e Horizontal (lado a lado). */
export type DisplayFieldOrientation = "vertical" | "horizontal";

/** Densidades do Figma: Padrão (padding 16 px) e Compacto (8 px). */
export type DisplayFieldDensity = "standard" | "compact";

/** Tipos do Figma: Texto e Link. */
export type DisplayFieldType = "text" | "link";

export type DisplayFieldProps = Omit<
  HTMLAttributes<HTMLDListElement>,
  "children"
> & {
  /** Rótulo do dado. */
  label: string;
  /**
   * Valor somente leitura. Ausente (undefined, null ou texto vazio) exibe "-".
   * Em dado mascarado sem permissão de revelar, não envie o valor.
   */
  value?: string | null;
  orientation?: DisplayFieldOrientation;
  density?: DisplayFieldDensity;
  /** Link: o valor navega para `href`. */
  type?: DisplayFieldType;
  href?: string;
  /** Estado Mascarado: oculta o valor sensível. */
  masked?: boolean;
  /**
   * Permite revelar o valor mascarado; habilite somente quando a role ou
   * permissão da pessoa autorizar.
   */
  canReveal?: boolean;
  /** Chamado ao revelar (ex.: auditoria ou busca do valor autorizado). */
  onReveal?: () => void;
  /**
   * Copiável: ação opcional. Em dado mascarado, só é oferecida quando
   * `canReveal` também é verdadeiro.
   */
  copyable?: boolean;
  /** Chamado após copiar com sucesso. */
  onCopy?: () => void;
  /** Conteúdo alternativo do valor (ex.: formatação); padrão: `value`. */
  children?: ReactNode;
};
