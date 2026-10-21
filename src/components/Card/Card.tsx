import { ButtonBase, styled } from "@mui/material";
import { forwardRef, type ElementType, type Ref } from "react";
import { typographyStyle } from "../../theme/tokens";
import { Icon } from "../Icon";
import { IconButton } from "../IconButton";
import type { CardModel, CardProps } from "./Card.types";

/** Sombra do estado Hover do Figma (0 4 12, #000 12%), sem effect style. */
const hoverShadow = "0 4px 12px 0 rgba(0, 0, 0, 0.12)";

type OwnerState = { model: CardModel; selected: boolean };

const surface = ({ model, selected }: OwnerState) => ({
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "stretch",
  justifyContent: "flex-start",
  gap: "var(--pj-space-4)",
  width: "100%",
  boxSizing: "border-box" as const,
  padding: "var(--space-extended-20px)",
  borderRadius: "var(--pj-radius-lg)",
  border: selected
    ? "var(--pj-border-width-emphasis) solid var(--pj-color-action-primary)"
    : "var(--pj-border-width-default) solid var(--pj-color-border-default)",
  backgroundColor: selected
    ? "var(--pj-color-feedback-information-soft)"
    : "var(--pj-color-bg-surface)",
  color: "var(--pj-color-text-primary)",
  textAlign: "left" as const,
  textDecoration: "none",
  "& .card-header": {
    display: "flex",
    alignItems: "center",
    gap: "var(--pj-space-3)",
    width: "100%",
    minWidth: 0,
  },
  "& .card-title": {
    ...typographyStyle("title"),
    flex: "1 1 auto",
    minWidth: 0,
    margin: 0,
    overflowWrap: "anywhere" as const,
  },
  "& .card-content": {
    ...typographyStyle("bodyMedium"),
    color: "var(--pj-color-text-secondary)",
    overflowWrap: "anywhere" as const,
  },
  "& .card-indicator": { color: "var(--pj-color-action-primary)" },
  "& .card-context-action": {
    // Área de toque de 44 px sem alterar a altura do cabeçalho.
    margin: "calc((var(--space-extended-44px) - var(--pj-icon-size-md)) / -2)",
    // Ícone "…" do Figma em color/text/secondary.
    color: "var(--pj-color-text-secondary)",
  },
  "& .card-actions": {
    display: "flex",
    justifyContent: "flex-end",
    flexWrap: "wrap" as const,
    gap: "var(--pj-space-3)",
  },
  ...(model === "interactive" && {
    cursor: "pointer",
    "&:hover": { boxShadow: hoverShadow },
    "&.Mui-focusVisible": {
      outline: "none",
      border:
        "var(--pj-border-width-emphasis) solid var(--pj-color-border-focus)",
    },
  }),
});

const StaticRoot = styled("section", {
  shouldForwardProp: (prop) => prop !== "model" && prop !== "selected",
})<OwnerState>(surface);

const InteractiveRoot = styled(ButtonBase, {
  shouldForwardProp: (prop) => prop !== "model" && prop !== "selected",
})<OwnerState>(surface);

/**
 * Card do Figma: agrupa conteúdo relacionado em uma superfície delimitada.
 * Os estados Hover, Foco e Selecionado existem só no modelo Clicável ou
 * selecionável, em que toda a superfície é um único elemento interativo.
 */
export const Card = forwardRef<HTMLElement, CardProps>(function Card(
  {
    actions,
    children,
    contextAction,
    href,
    model = "informative",
    onClick,
    selected,
    title,
    ...props
  },
  ref,
) {
  const content =
    children === undefined ? null : (
      <div className="card-content">{children}</div>
    );

  if (model === "interactive") {
    // Link quando há destino; botão nos demais casos.
    const element = { component: (href ? "a" : "button") as ElementType, href };
    return (
      <InteractiveRoot
        {...props}
        {...element}
        ref={ref as Ref<HTMLButtonElement>}
        onClick={onClick}
        // Só é um controle selecionável quando "selected" é informado.
        aria-pressed={href || selected === undefined ? undefined : selected}
        aria-current={href && selected ? "true" : undefined}
        model={model}
        selected={selected ?? false}
      >
        <span className="card-header">
          <span className="card-title">{title}</span>
          <Icon className="card-indicator" name="arrow_forward" size="md" />
        </span>
        {children === undefined ? null : (
          <span className="card-content">{children}</span>
        )}
      </InteractiveRoot>
    );
  }

  return (
    <StaticRoot
      {...props}
      ref={ref as Ref<HTMLElement>}
      model={model}
      selected={false}
    >
      {model === "informative" ? (
        <p className="card-title">{title}</p>
      ) : (
        <div className="card-header">
          <p className="card-title">{title}</p>
          {contextAction ? (
            <IconButton
              className="card-context-action"
              icon={<Icon name="more_horiz" size="md" />}
              label={contextAction.label}
              onClick={contextAction.onClick}
              size="medium"
              variant="tertiary"
            />
          ) : null}
        </div>
      )}
      {content}
      {model === "actions" ? (
        <div className="card-actions">{actions}</div>
      ) : null}
    </StaticRoot>
  );
});
