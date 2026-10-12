import type { HTMLAttributes, ReactNode } from "react";

/** Access Layout do Figma: casca das jornadas de acesso (JA-01 a JA-04). */
export interface AccessLayoutProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "children"
> {
  /** Slot Conteúdo do Figma. */
  children: ReactNode;
  /** Propriedade Ajuda do Figma (texto no rodapé da superfície). */
  help?: ReactNode;
}
