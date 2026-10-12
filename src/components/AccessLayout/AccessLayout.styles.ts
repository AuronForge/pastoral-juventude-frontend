import { styled } from "@mui/material";
import { typographyStyle } from "../../theme/tokens";

/** Larguras dos quadros Tablet (768 px) e Desktop do Figma. */
export const TABLET = "@media (min-width: 768px)";
export const DESKTOP = "@media (min-width: 1200px)";

export const Root = styled("main")({
  boxSizing: "border-box",
  minHeight: "100svh",
  display: "flex",
  justifyContent: "center",
  alignItems: "stretch",
  padding: "var(--pj-space-4)",
  background: "var(--color-bg-access)",
  [TABLET]: { padding: "var(--pj-space-5) 0" },
  [DESKTOP]: {
    justifyContent: "flex-start",
    gap: "48px",
    padding: "var(--pj-space-6)",
  },
});

export const Surface = styled("section")({
  boxSizing: "border-box",
  width: "100%",
  minWidth: 0,
  display: "flex",
  flexDirection: "column",
  gap: "var(--pj-space-4)",
  padding: "var(--pj-space-5) var(--pj-space-5) var(--pj-space-3)",
  background: "var(--pj-color-bg-surface)",
  borderRadius: "var(--pj-radius-xl)",
  [TABLET]: {
    width: "480px",
    flexShrink: 0,
    padding: "var(--pj-space-5) var(--pj-space-6) var(--space-extended-36px)",
  },
  [DESKTOP]: {
    width: "420px",
    gap: "var(--pj-space-2)",
    padding: "var(--pj-space-6)",
  },
  "& .access-content": {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    minWidth: 0,
  },
  "& .access-help": {
    margin: 0,
    color: "var(--pj-color-text-secondary)",
    ...typographyStyle("bodySmall"),
  },
});

export const Message = styled("aside")({
  display: "none",
  [DESKTOP]: {
    boxSizing: "border-box",
    flex: 1,
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    gap: "var(--pj-space-6)",
    padding: "var(--pj-space-6)",
  },
  "& .access-context, & cite": {
    margin: 0,
    fontStyle: "normal",
    color: "var(--pj-color-content-highlight)",
    ...typographyStyle("labelLarge"),
  },
  "& .access-context": { textTransform: "uppercase" },
  "& figure": {
    flex: 1,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "var(--pj-space-5)",
  },
  "& blockquote": {
    margin: 0,
    color: "var(--pj-color-text-inverse)",
    ...typographyStyle("headingLarge"),
  },
  "& ul": {
    margin: 0,
    padding: 0,
    listStyle: "none",
    display: "flex",
    flexDirection: "column",
    gap: "var(--pj-space-4)",
    color: "var(--pj-color-text-inverse)",
    ...typographyStyle("bodyMedium"),
  },
  "& li::before": { content: '"•\\00a0\\00a0"' },
});
