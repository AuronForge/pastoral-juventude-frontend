import { styled } from "@mui/material";
import {
  elevationTokens,
  pendingLayoutTokens,
  typographyStyle,
} from "../../theme/tokens";

const breakpointTokens = pendingLayoutTokens.breakpoints;

const tablet = `@media (min-width: ${breakpointTokens.tablet}px)`;
const desktop = `@media (min-width: ${breakpointTokens.desktop}px)`;

export const JourneyCanvas = styled("main")({
  background: "var(--pj-color-bg-canvas)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "28px",
  padding: "var(--pj-space-6) var(--pj-space-4)",
  minHeight: "100svh",
  boxSizing: "border-box",
  [tablet]: { paddingInline: "60px" },
  [desktop]: {
    flexDirection: "row",
    alignItems: "stretch",
    gap: "var(--pj-space-8)",
    padding: "var(--pj-space-8)",
    minHeight: "max(880px, 100svh)",
  },
});

export const LoginPanel = styled("section")({
  background: "var(--pj-color-bg-surface)",
  borderRadius: "var(--pj-radius-xl)",
  boxShadow: elevationTokens.large,
  width: "100%",
  minWidth: 0,
  padding: "var(--pj-space-5)",
  display: "flex",
  flexDirection: "column",
  gap: "var(--pj-space-5)",
  boxSizing: "border-box",
  [tablet]: { padding: "var(--space-extended-40px)", maxWidth: "648px" },
  [desktop]: {
    padding: "var(--pj-space-8)",
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
  "& .login-feedback": { marginTop: "var(--space-extended-20px)" },
  "& .login-feedback + .login-fields": {
    marginTop: "var(--space-extended-20px)",
  },
  "& .login-options": {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "var(--pj-space-3)",
    marginTop: "var(--layout-fine-2px)",
    [tablet]: { flexDirection: "row", gap: "var(--pj-space-5)" },
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
    color: "var(--pj-color-action-primary)",
    ...typographyStyle("bodyMedium"),
  },
  "& cite": {
    display: "block",
    marginTop: "var(--pj-space-2)",
    color: "var(--pj-color-action-accent)",
    ...typographyStyle("labelLarge"),
    fontStyle: "normal",
  },
  [tablet]: {
    maxWidth: "648px",
    "& blockquote": typographyStyle("title"),
  },
  [desktop]: {
    maxWidth: "none",
    flex: 1,
    padding: "var(--pj-space-8) var(--pj-space-5)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    textAlign: "left",
    "& .login-overline": {
      display: "block",
      color: "var(--pj-color-action-accent)",
    },
    "& blockquote": typographyStyle("headingLarge"),
    "& cite": {
      marginTop: "var(--pj-space-4)",
      ...typographyStyle("labelLarge"),
    },
    "& .login-benefits": {
      display: "flex",
      flexDirection: "column",
      gap: "14px",
      listStyle: "none",
      margin: 0,
      padding: 0,
      color: "var(--pj-color-text-primary)",
      "& li": {
        display: "flex",
        alignItems: "center",
        gap: "var(--pj-space-3)",
      },
      "& svg": {
        color: "var(--pj-color-action-accent)",
        width: "22px",
        height: "22px",
        flexShrink: 0,
      },
    },
  },
});
