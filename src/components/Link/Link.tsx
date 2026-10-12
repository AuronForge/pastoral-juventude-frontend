import { Link as MuiLink, styled } from "@mui/material";
import { forwardRef, type MouseEvent } from "react";
import { typographyStyle } from "../../theme/tokens";
import type { LinkProps } from "./Link.types";

type LinkStyleOwnerState = { linkDisabled: boolean };

const StyledLink = styled(MuiLink, {
  shouldForwardProp: (prop) => prop !== "linkDisabled",
})<LinkStyleOwnerState>(({ linkDisabled }) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: "var(--pj-space-1)",
  color: linkDisabled
    ? "var(--pj-color-text-disabled)"
    : "var(--pj-color-action-primary)",
  cursor: linkDisabled ? "not-allowed" : "pointer",
  ...typographyStyle("bodyLarge"),
  textDecorationColor: linkDisabled ? "transparent" : "currentcolor",
  textDecorationThickness: "var(--pj-border-width-default)",
  textUnderlineOffset: "0.16em",
  transition: "color 120ms ease, text-decoration-color 120ms ease",
  "&:hover": linkDisabled
    ? undefined
    : {
        color: "var(--pj-color-action-primary)",
        textDecorationColor: "transparent",
      },
  "&:focus-visible": {
    outline:
      "3px solid color-mix(in srgb, var(--pj-color-border-focus) 55%, transparent)",
    outlineOffset: 2,
    borderRadius: "var(--pj-radius-md)",
  },
  "& .material-symbols-outlined": {
    width: "var(--pj-icon-size-sm)",
    height: "var(--pj-icon-size-sm)",
    fontSize: "var(--pj-icon-size-sm)",
  },
}));

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { children, disabled = false, endIcon, href, onClick, startIcon, ...props },
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
      {startIcon}
      {children}
      {endIcon}
    </StyledLink>
  );
});
