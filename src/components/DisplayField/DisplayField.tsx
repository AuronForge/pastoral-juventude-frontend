import { styled } from "@mui/material";
import { forwardRef, useEffect, useRef, useState } from "react";
import { typographyStyle } from "../../theme/tokens";
import { Icon } from "../Icon";
import { IconButton } from "../IconButton";
import { Link } from "../Link";
import { Tooltip } from "../Tooltip";
import type {
  DisplayFieldDensity,
  DisplayFieldOrientation,
  DisplayFieldProps,
} from "./DisplayField.types";

/** Valor mascarado do Figma: 12 pontos, sem revelar o tamanho real. */
const MASK = "••••••••••••";
/** Duração da confirmação "Copiado". */
const COPIED_FEEDBACK_MS = 2000;

type OwnerState = {
  orientation: DisplayFieldOrientation;
  density: DisplayFieldDensity;
};

const Root = styled("dl", {
  shouldForwardProp: (prop) => prop !== "orientation" && prop !== "density",
})<OwnerState>(({ orientation, density }) => ({
  display: "flex",
  flexDirection: orientation === "vertical" ? "column" : "row",
  alignItems: orientation === "vertical" ? "stretch" : "center",
  gap: orientation === "vertical" ? "var(--pj-space-1)" : "var(--pj-space-4)",
  width: "100%",
  boxSizing: "border-box",
  margin: 0,
  padding: density === "standard" ? "var(--pj-space-4)" : "var(--pj-space-2)",
  "& .display-field-label": {
    ...typographyStyle("labelMedium"),
    margin: 0,
    color: "var(--pj-color-text-secondary)",
    overflowWrap: "anywhere",
    ...(orientation === "horizontal" && {
      // Largura consistente do rótulo; o valor ocupa o restante.
      flex: "0 0 120px",
      alignSelf: "stretch",
    }),
  },
  "& .display-field-value": {
    display: "flex",
    alignItems: "center",
    gap: "var(--pj-space-1)",
    minHeight: "var(--space-extended-44px)",
    margin: 0,
    minWidth: 0,
    ...(orientation === "horizontal" && { flex: "1 1 auto" }),
  },
  "& .display-field-text": {
    ...typographyStyle("bodyLarge"),
    flex: "1 1 auto",
    minWidth: 0,
    color: "var(--pj-color-text-primary)",
    overflowWrap: "anywhere",
  },
  "& .display-field-empty": { color: "var(--pj-color-text-secondary)" },
  "& .display-field-actions": {
    display: "flex",
    alignItems: "center",
    gap: "var(--pj-space-1)",
    flexShrink: 0,
  },
  // Ícones em color/text/primary nos mestres do Figma.
  "& .display-field-action": { color: "var(--pj-color-text-primary)" },
}));

const VisuallyHidden = styled("span")({
  position: "absolute",
  width: 1,
  height: 1,
  overflow: "hidden",
  clip: "rect(0 0 0 0)",
  whiteSpace: "nowrap",
});

/**
 * Campo de exibição do Figma: apresenta rótulo e valor somente leitura, em
 * orientação vertical ou horizontal e densidade padrão ou compacta, como
 * texto ou link. Valor ausente exibe "-". Copiar e revelar são opcionais; a
 * revelação de dados mascarados depende da autorização informada.
 */
export const DisplayField = forwardRef<HTMLDListElement, DisplayFieldProps>(
  function DisplayField(
    {
      canReveal = false,
      children,
      copyable = false,
      density = "standard",
      href,
      label,
      masked = false,
      onCopy,
      onReveal,
      orientation = "vertical",
      type = "text",
      value,
      ...props
    },
    ref,
  ) {
    const [revealed, setRevealed] = useState(false);
    const [copied, setCopied] = useState(false);
    const timer = useRef<number | undefined>(undefined);

    useEffect(() => () => window.clearTimeout(timer.current), []);

    const empty = value === undefined || value === null || value === "";
    const hidden = masked && !revealed;
    // Mascarado sem permissão: o valor pode nem ter sido enviado.
    const showReveal = masked && canReveal && !empty;
    const showCopy = copyable && !empty && (!masked || canReveal);

    async function copy() {
      if (!value) return;
      try {
        await navigator.clipboard.writeText(value);
      } catch {
        return;
      }
      onCopy?.();
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(
        () => setCopied(false),
        COPIED_FEEDBACK_MS,
      );
    }

    function toggleReveal() {
      if (!revealed) onReveal?.();
      setRevealed((current) => !current);
    }

    let content;
    if (hidden)
      content = (
        <span className="display-field-text">
          <span aria-hidden="true">{MASK}</span>
          <VisuallyHidden>Valor oculto</VisuallyHidden>
        </span>
      );
    else if (empty)
      content = (
        <span className="display-field-text display-field-empty">-</span>
      );
    else if (type === "link")
      content = (
        <span className="display-field-text">
          <Link href={href}>{children ?? value}</Link>
        </span>
      );
    else
      content = <span className="display-field-text">{children ?? value}</span>;

    return (
      <Root {...props} ref={ref} orientation={orientation} density={density}>
        <dt className="display-field-label">{label}</dt>
        <dd className="display-field-value">
          {content}
          {showCopy || showReveal ? (
            <span className="display-field-actions">
              {showCopy ? (
                <Tooltip text="Copiado" open={copied}>
                  <IconButton
                    className="display-field-action"
                    icon={<Icon name="content_copy" size="md" />}
                    label={`Copiar ${label}`}
                    onClick={() => void copy()}
                    size="medium"
                    variant="tertiary"
                  />
                </Tooltip>
              ) : null}
              {showReveal ? (
                <IconButton
                  className="display-field-action"
                  aria-pressed={revealed}
                  icon={
                    <Icon
                      name={revealed ? "visibility_off" : "visibility"}
                      size="md"
                    />
                  }
                  label={`${revealed ? "Ocultar" : "Revelar"} ${label}`}
                  onClick={toggleReveal}
                  size="medium"
                  variant="tertiary"
                />
              ) : null}
            </span>
          ) : null}
          <VisuallyHidden role="status">
            {copied ? `${label} copiado` : ""}
          </VisuallyHidden>
        </dd>
      </Root>
    );
  },
);
