import { Link as MuiLink, styled } from "@mui/material";
import { forwardRef, type MouseEvent } from "react";
import { typographyStyle } from "../../theme/tokens";
import { Icon } from "../Icon";
import type { LinkProps } from "./Link.types";

type LinkStyleOwnerState = { linkDisabled: boolean };

const StyledLink = styled(MuiLink, {
  shouldForwardProp: (prop) => prop !== "linkDisabled",
})<LinkStyleOwnerState>(({ linkDisabled }) => ({
  ...typographyStyle("bodyLarge"),
  display: "inline-flex",
  alignItems: "center",
  gap: "var(--pj-space-2)",
  padding: "var(--layout-fine-2px) var(--pj-space-1)",
  borderRadius: "var(--pj-radius-sm)",
  color: linkDisabled
    ? "var(--pj-color-text-disabled)"
    : "var(--pj-color-action-primary)",
  cursor: linkDisabled ? "not-allowed" : "pointer",
  textDecorationColor: "currentcolor",
  "&:hover, &:active": linkDisabled
    ? undefined
    : { color: "var(--pj-color-action-primary-hover)" },
  "&:focus-visible": {
    outline:
      "var(--pj-border-width-emphasis) solid var(--pj-color-border-focus)",
    outlineOffset: "calc(var(--pj-border-width-emphasis) * -1)",
  },
  "& .material-symbols-outlined": { textDecoration: "none" },
}));

/**
 * Link do Figma: navegação textual para destinos internos e externos, em
 * Body/Large sublinhado, com estados Padrão, Hover, Foco, Pressionado e
 * Desabilitado e ícone externo opcional.
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { children, disabled = false, externalIcon = false, href, onClick, ...props },
  ref,
) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (disabled) {
      event.preventDefault();
      return;
    }

    onClick?.(event);
  };

  return (
    <StyledLink
      {...props}
      ref={ref}
      aria-disabled={disabled || undefined}
      href={disabled ? undefined : href}
      linkDisabled={disabled}
      onClick={handleClick}
      role={disabled ? "link" : props.role}
      tabIndex={disabled ? -1 : props.tabIndex}
      underline="always"
    >
      {children}
      {externalIcon ? <Icon name="open_in_new" size="sm" /> : null}
    </StyledLink>
  );
});
