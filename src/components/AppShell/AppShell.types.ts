import type { ReactNode } from "react";

export type AppShellNavigationItem = {
  /** Identificador estável usado para marcar o destino atual. */
  id: string;
  /** Rótulo curto, claro e orientado a destino. */
  label: string;
  /** Nome do símbolo no Material Symbols Outlined. */
  icon: string;
  /** Destino do item quando a navegação é feita por link. */
  href?: string;
  /** Ação alternativa para integrações que não usam links. */
  onClick?: () => void;
  /** Estado Desabilitado: sem interação. */
  disabled?: boolean;
};

export type AppShellUser = {
  /** Identificador imutável da pessoa (define a cor do Avatar). */
  id: string;
  name: string;
  /** Iniciais configuradas para o Avatar (1 a 2 caracteres). */
  initials: string;
};

export type AppShellProps = {
  children: ReactNode;
  /** Identificador do destino atual (aria-current=page). */
  activeNavigationId?: string;
  /** Destinos da navegação completa (Sidebar e Drawer). */
  navigationItems: AppShellNavigationItem[];
  /**
   * Atalhos da Bottom Navigation em tablet e mobile (3 a 5). Sem valor, usa
   * os primeiros destinos da navegação completa, até 5.
   */
  bottomNavigationItems?: AppShellNavigationItem[];
  /** Pessoa autenticada exibida no Header. */
  user: AppShellUser;
};
