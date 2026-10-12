import { styled } from "@mui/material";
import { pendingLayoutTokens } from "../../theme/tokens";

const breakpointTokens = pendingLayoutTokens.breakpoints;

const tablet = `@media (min-width: ${breakpointTokens.tablet}px)`;

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

/** Formulário / Estrutura do Figma, modelo Compacto. */
export const LoginStructure = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: "var(--pj-space-3)",
  "& h1:focus": { outline: "none" },
  "& .login-description": { color: "var(--pj-color-text-secondary)" },
  "& .login-sections": {
    display: "flex",
    flexDirection: "column",
    gap: "var(--pj-space-4)",
  },
  "& .login-recovery": {
    display: "flex",
    justifyContent: "center",
    minHeight: "48px",
    alignItems: "center",
  },
});
