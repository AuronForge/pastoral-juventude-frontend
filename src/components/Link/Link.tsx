import { Link as MuiLink, styled } from "@mui/material";
import { forwardRef, type MouseEvent } from "react";
import type { LinkProps } from "./Link.types";

type LinkStyleOwnerState = { linkDisabled: boolean };

const StyledLink = styled(MuiLink, {
  shouldForwardProp: (prop) => prop !== "linkDisabled",
})<LinkStyleOwnerState>(({ linkDisabled }) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: "var(--spacing-xs)",
  color: linkDisabled ? "var(--text-disabled)" : "var(--primary-text)",
  cursor: linkDisabled ? "not-allowed" : "pointer",
  fontSize: "var(--font-size-md)",
  fontWeight: 600,
  lineHeight: "var(--line-height-md)",
  textDecorationColor: linkDisabled ? "transparent" : "currentcolor",
  textDecorationThickness: "var(--border-thin)",
  textUnderlineOffset: "0.16em",
  transition: "color 120ms ease, text-decoration-color 120ms ease",
  "&:hover": linkDisabled
    ? undefined
    : {
        color: "var(--primary-text)",
        textDecorationColor: "transparent",
      },
  "&:focus-visible": {
    outline:
      "3px solid color-mix(in srgb, var(--border-focus) 55%, transparent)",
    outlineOffset: 2,
    borderRadius: "var(--radius-sm)",
  },
  "& .MuiSvgIcon-root": {
    width: "var(--size-icon-sm)",
    height: "var(--size-icon-sm)",
    fontSize: "var(--size-icon-sm)",
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
