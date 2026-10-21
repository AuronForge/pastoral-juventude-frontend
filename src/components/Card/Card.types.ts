import type { HTMLAttributes, MouseEventHandler, ReactNode } from "react";

/**
 * Modelos do Card do Figma: Informativo simples; Cabeçalho e conteúdo;
 * Cabeçalho, conteúdo e ações; Clicável ou selecionável.
 */
export type CardModel = "informative" | "header" | "actions" | "interactive";

export type CardContextAction = {
  /** Nome acessível da ação contextual (ícone "…" do cabeçalho). */
  label: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

type CardBaseProps = Omit<
  HTMLAttributes<HTMLElement>,
  "children" | "title" | "onClick"
> & {
  /** Título curto e específico do card. */
  title: ReactNode;
  /** Conteúdo principal; não repita o título. */
  children?: ReactNode;
};

type StaticCardProps = CardBaseProps & {
  /** Informativo simples (padrão) ou Cabeçalho e conteúdo. */
  model?: "informative" | "header";
  /** Ação contextual opcional do cabeçalho (só no modelo Cabeçalho e conteúdo). */
  contextAction?: CardContextAction;
  actions?: never;
  href?: never;
  onClick?: never;
  selected?: never;
};

type ActionsCardProps = CardBaseProps & {
  /** Cabeçalho, conteúdo e ações: rodapé com até duas ações relacionadas. */
  model: "actions";
  /** Ações do rodapé, da menor para a maior ênfase. */
  actions: ReactNode;
  contextAction?: CardContextAction;
  href?: never;
  onClick?: never;
  selected?: never;
};

type InteractiveCardProps = CardBaseProps & {
  /** Clicável ou selecionável: toda a superfície é um único controle. */
  model: "interactive";
  /** Destino quando o card navega; renderiza um link. */
  href?: string;
  onClick?: MouseEventHandler<HTMLElement>;
  /** Estado Selecionado; não significa concluído ou aprovado. */
  selected?: boolean;
  actions?: never;
  contextAction?: never;
};

export type CardProps =
  StaticCardProps | ActionsCardProps | InteractiveCardProps;
