import type { HTMLAttributes } from "react";

/** Propriedade Estado do Requisito de senha do Figma. */
export type PasswordRequirementState = "pending" | "met" | "unmet";

/** Propriedade Tamanho do Figma: Regular (desktop/tablet) e Compacto (mobile). */
export type PasswordRequirementsSize = "regular" | "compact";

export interface PasswordRequirement {
  /** Texto autossuficiente da regra. */
  label: string;
  state: PasswordRequirementState;
}

export interface PasswordRequirementsProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children" | "title"
> {
  requirements: PasswordRequirement[];
  size?: PasswordRequirementsSize;
  /** Título do indicador; padrão do Figma: "Sua senha precisa:". */
  title?: string;
}
