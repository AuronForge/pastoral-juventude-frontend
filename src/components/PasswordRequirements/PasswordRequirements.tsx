import { styled } from "@mui/material";
import { useId } from "react";
import { typographyStyle } from "../../theme/tokens";
import { Icon } from "../Icon";
import type {
  PasswordRequirementState,
  PasswordRequirementsProps,
  PasswordRequirementsSize,
} from "./PasswordRequirements.types";

const ICON: Record<PasswordRequirementState, string> = {
  pending: "circle",
  met: "check",
  unmet: "close",
};

const STATE_TEXT: Record<PasswordRequirementState, string> = {
  pending: "pendente",
  met: "atendido",
  unmet: "não atendido",
};

const COLOR: Record<PasswordRequirementState, string> = {
  pending: "var(--pj-color-text-secondary)",
  met: "var(--pj-color-feedback-success)",
  unmet: "var(--pj-color-feedback-error)",
};

const Root = styled("div", {
  shouldForwardProp: (prop) => prop !== "indicatorSize",
})<{ indicatorSize: PasswordRequirementsSize }>(({ indicatorSize }) => {
  const compact = indicatorSize === "compact";
  return {
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    gap: compact ? "var(--pj-space-2)" : "var(--pj-space-3)",
    padding: compact ? "var(--pj-space-3)" : "var(--pj-space-4)",
    background: "var(--pj-color-bg-surface)",
    border:
      "var(--pj-border-width-default) solid var(--pj-color-border-default)",
    borderRadius: "var(--pj-radius-md)",
    "& .password-requirements-title": {
      margin: 0,
      color: "var(--pj-color-text-primary)",
      ...typographyStyle("labelLarge"),
    },
    "& ul": {
      margin: 0,
      padding: 0,
      listStyle: "none",
      display: "flex",
      flexDirection: compact ? "row" : "column",
      flexWrap: compact ? "wrap" : "nowrap",
      columnGap: "var(--pj-space-3)",
      rowGap: compact ? "var(--pj-space-1)" : "var(--pj-space-2)",
    },
    "& li": {
      display: "flex",
      alignItems: "center",
      gap: "var(--pj-space-2)",
      padding: "var(--layout-fine-2px) 0",
      ...typographyStyle("bodyMedium"),
    },
    "& .visually-hidden": {
      position: "absolute",
      width: 1,
      height: 1,
      overflow: "hidden",
      clip: "rect(0 0 0 0)",
      whiteSpace: "nowrap",
    },
  };
});

/**
 * Indicador de requisitos de senha do Figma: comunica a política de senha e
 * o estado de cada requisito (Pendente, Atendido, Não atendido) por ícone,
 * texto e cor, anunciando mudanças com aria-live polite.
 */
export function PasswordRequirements({
  requirements,
  size = "regular",
  title = "Sua senha precisa:",
  ...props
}: PasswordRequirementsProps) {
  const titleId = useId();
  return (
    <Root
      indicatorSize={size}
      role="group"
      aria-labelledby={titleId}
      {...props}
    >
      <p className="password-requirements-title" id={titleId}>
        {title}
      </p>
      <ul aria-live="polite">
        {requirements.map(({ label, state }) => (
          <li key={label} data-state={state} style={{ color: COLOR[state] }}>
            <Icon name={ICON[state]} size="md" />
            <span>
              {label}
              <span className="visually-hidden">: {STATE_TEXT[state]}</span>
            </span>
          </li>
        ))}
      </ul>
    </Root>
  );
}
