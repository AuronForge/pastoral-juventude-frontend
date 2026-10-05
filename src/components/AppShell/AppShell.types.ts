import type { ReactNode } from "react";

export type AppShellNavigationItem = {
  /** Identificador estável usado para marcar a seção ativa. */
  id: string;
  /** Texto apresentado na barra de navegação. */
  label: string;
  /** Ícone que representa a seção. */
  icon: ReactNode;
  /** Quantidade complementar exibida ao lado do item. */
  badge?: number;
  /** Destino do item quando a navegação é feita por link. */
  href?: string;
  /** Ação alternativa para integrações que não usam links. */
  onClick?: () => void;
};

export type AppShellUser = {
  name: string;
  role: string;
  /** Iniciais exibidas quando não há fotografia de perfil. */
  initials?: string;
};

export type AppShellProps = {
  children: ReactNode;
  /** Elementos posicionados antes do avatar na barra superior. */
  headerActions?: ReactNode;
  /** Identificador do item de navegação selecionado. */
  activeNavigationId?: string;
  /** Itens disponíveis para a pessoa autenticada. */
  navigationItems: AppShellNavigationItem[];
  /** Itens compactos usados na navegação inferior móvel. */
  mobileNavigationItems?: AppShellNavigationItem[];
  /** Conteúdo opcional no início da barra superior, como uma busca. */
  headerContent?: ReactNode;
  /** Pessoa autenticada exibida no cabeçalho e no rodapé da sidebar. */
  user: AppShellUser;
  /** Navega para o perfil da pessoa. */
  onProfile?: () => void;
  /** Inicia a troca voluntária de senha. */
  onPasswordChange?: () => void;
  /** Encerra a sessão da pessoa autenticada. */
  onSignOut?: () => void;
  /** É chamado após a alteração de tema. */
  onThemeModeChange?: (mode: "light" | "dark") => void;
};
