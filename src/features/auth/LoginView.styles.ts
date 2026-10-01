import { styled } from "@mui/material";
import { breakpointTokens, elevationTokens } from "../../theme/tokens";

const tablet = `@media (min-width: ${breakpointTokens.tablet}px)`;
const desktop = `@media (min-width: ${breakpointTokens.desktop}px)`;

export const JourneyCanvas = styled("main")({
  background: "var(--sidebar-bg)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "28px",
  padding: "var(--spacing-3xl) var(--spacing-lg)",
  minHeight: "100svh",
  boxSizing: "border-box",
  [tablet]: { paddingInline: "60px" },
  [desktop]: {
    flexDirection: "row",
    alignItems: "stretch",
    gap: "var(--spacing-5xl)",
    padding: "var(--spacing-5xl)",
    minHeight: "max(880px, 100svh)",
  },
});

export const LoginPanel = styled("section")({
  background: "var(--bg-surface)",
  borderRadius: "var(--radius-2xl)",
  boxShadow: elevationTokens.modal,
  width: "100%",
  minWidth: 0,
  padding: "var(--spacing-2xl)",
  display: "flex",
  flexDirection: "column",
  gap: "var(--spacing-2xl)",
  boxSizing: "border-box",
  [tablet]: { padding: "var(--spacing-4xl)", maxWidth: "648px" },
  [desktop]: {
    padding: "var(--spacing-5xl)",
    width: "520px",
    flexShrink: 0,
    justifyContent: "space-between",
  },
});

export const LoginForm = styled("form")({
  "& .login-fields": {
    display: "flex",
    flexDirection: "column",
    // TextField reserves 20px for helper text; keep its API and avoid duplicate spacing.
    gap: "0px",
    marginTop: "28px",
  },
  "& .login-feedback": { marginTop: "var(--spacing-xl)" },
  "& .login-feedback + .login-fields": { marginTop: "var(--spacing-xl)" },
  "& .login-options": {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "var(--spacing-md)",
    marginTop: "var(--spacing-2xs)",
    [tablet]: { flexDirection: "row", gap: "var(--spacing-2xl)" },
  },
  "& .login-submit": { marginTop: "28px" },
});

export const JourneyAside = styled("aside")({
  width: "100%",
  minWidth: 0,
  textAlign: "center",
  "& .login-overline, & .login-benefits": { display: "none" },
  "& blockquote": {
    margin: 0,
    color: "var(--sidebar-text-active)",
    fontSize: "var(--font-size-sm)",
    lineHeight: "var(--line-height-sm)",
  },
  "& cite": {
    display: "block",
    marginTop: "var(--spacing-sm)",
    color: "var(--accent-solid)",
    fontSize: "var(--font-size-sm)",
    fontWeight: "var(--font-weight-semibold)",
    fontStyle: "normal",
  },
  [tablet]: {
    maxWidth: "648px",
    "& blockquote": {
      fontSize: "var(--font-size-xl)",
      lineHeight: "var(--line-height-xl)",
      fontWeight: "var(--font-weight-semibold)",
    },
  },
  [desktop]: {
    maxWidth: "none",
    flex: 1,
    padding: "var(--spacing-5xl) var(--spacing-2xl)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    textAlign: "left",
    "& .login-overline": { display: "block", color: "var(--accent-solid)" },
    "& blockquote": {
      fontFamily: "var(--font-family-display)",
      fontSize: "var(--font-size-4xl)",
      lineHeight: "var(--line-height-4xl)",
      letterSpacing: "-0.2px",
    },
    "& cite": {
      marginTop: "var(--spacing-lg)",
      fontSize: "var(--font-size-md)",
    },
    "& .login-benefits": {
      display: "flex",
      flexDirection: "column",
      gap: "14px",
      listStyle: "none",
      margin: 0,
      padding: 0,
      color: "var(--sidebar-text)",
      "& li": {
        display: "flex",
        alignItems: "center",
        gap: "var(--spacing-md)",
      },
      "& svg": {
        color: "var(--accent-solid)",
        width: "22px",
        height: "22px",
        flexShrink: 0,
      },
    },
  },
});
