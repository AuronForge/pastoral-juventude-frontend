import { ButtonBase, styled } from "@mui/material";
import { typographyStyle } from "../../theme/tokens";

/** Breakpoints pendentes de variável no Figma (ver tokens de layout). */
export const DESKTOP = "@media (min-width: 1200px)";

export const AppFrame = styled("div", {
  shouldForwardProp: (prop) => prop !== "sidebarExpanded",
})<{ sidebarExpanded: boolean }>(({ sidebarExpanded }) => ({
  height: "100dvh",
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr)",
  gridTemplateRows:
    "var(--pj-layout-header-compact) minmax(0, 1fr) var(--pj-layout-bottom-nav-height)",
  backgroundColor: "var(--pj-color-bg-surface)",
  [DESKTOP]: {
    gridTemplateColumns: `${sidebarExpanded ? "var(--pj-layout-sidebar-expanded)" : "var(--pj-layout-sidebar-collapsed)"} minmax(0, 1fr)`,
    gridTemplateRows: "var(--pj-layout-header-desktop) minmax(0, 1fr)",
  },
}));

/** Header / App Bar no App Shell: fundo color/bg/canvas e divisória inferior. */
export const Header = styled("header")({
  gridColumn: "1 / -1",
  display: "flex",
  alignItems: "center",
  gap: "var(--pj-space-3)",
  paddingInline: "var(--pj-space-3)",
  backgroundColor: "var(--pj-color-bg-canvas)",
  borderBottom:
    "var(--pj-border-width-default) solid var(--pj-color-border-default)",
  /* No desktop, a assinatura fica a 4 px da borda, como no App Shell do Figma. */
  "& .app-shell-brand": {
    [DESKTOP]: { marginLeft: "calc(var(--pj-space-1) - var(--pj-space-3))" },
  },
  "& .app-shell-user": {
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
    gap: "var(--pj-space-2)",
  },
  "& .app-shell-user-name": {
    ...typographyStyle("labelLarge"),
    color: "var(--pj-color-text-primary)",
    display: "none",
    [DESKTOP]: { display: "inline" },
  },
});

/** Ação de menu do Header: 40 × 40 px com ícone de 24 px. */
export const HeaderAction = styled(ButtonBase)({
  width: "var(--space-extended-40px)",
  height: "var(--space-extended-40px)",
  flexShrink: 0,
  borderRadius: "var(--pj-radius-md)",
  color: "var(--pj-color-text-primary)",
  "&.Mui-focusVisible": {
    outline:
      "var(--pj-border-width-emphasis) solid var(--pj-color-border-focus)",
  },
  [DESKTOP]: { display: "none" },
});

/** Sidebar: 280 px expandida, 72 px recolhida, somente no desktop. */
export const Sidebar = styled("aside", {
  shouldForwardProp: (prop) => prop !== "compact",
})<{ compact: boolean }>(({ compact }) => ({
  display: "none",
  flexDirection: "column",
  gap: "var(--pj-space-2)",
  padding: compact ? "var(--pj-space-4) 0" : "var(--pj-space-4)",
  alignItems: compact ? "center" : "stretch",
  minHeight: 0,
  overflowY: "auto",
  backgroundColor: "var(--pj-color-bg-canvas)",
  borderRight:
    "var(--pj-border-width-default) solid var(--pj-color-border-default)",
  [DESKTOP]: { display: "flex" },
  "& .app-shell-sidebar-footer": {
    marginTop: "auto",
    display: "flex",
    justifyContent: compact ? "center" : "flex-end",
    width: "100%",
  },
}));

export const NavigationList = styled("ul")({
  display: "flex",
  flexDirection: "column",
  gap: "var(--pj-space-2)",
  listStyle: "none",
  margin: 0,
  padding: 0,
});

/** Navigation Item (Tipo=Simples): 44 px, padding 14 px, gap 12 px, ícone 18 px. */
export const NavigationButton = styled(ButtonBase, {
  shouldForwardProp: (prop) => prop !== "compact" && prop !== "selected",
})<{ compact: boolean; selected: boolean }>(({ compact, selected }) => ({
  ...typographyStyle(selected ? "labelLarge" : "bodyMedium"),
  display: "flex",
  alignItems: "center",
  justifyContent: compact ? "center" : "flex-start",
  gap: "var(--pj-space-3)",
  width: compact ? "var(--pj-space-8)" : "100%",
  minHeight: "var(--space-extended-44px)",
  paddingInline: compact ? 0 : "var(--layout-fine-14px)",
  borderRadius: "var(--pj-radius-md)",
  textAlign: "left",
  color: selected
    ? "var(--pj-color-action-primary)"
    : "var(--pj-color-text-primary)",
  backgroundColor: selected
    ? "var(--pj-color-feedback-information-soft)"
    : "transparent",
  "& .material-symbols-outlined": {
    width: "var(--layout-fine-18px)",
    height: "var(--layout-fine-18px)",
    fontSize: "var(--layout-fine-18px)",
    color: "var(--pj-color-action-primary)",
  },
  "&:hover": selected
    ? undefined
    : { backgroundColor: "var(--pj-color-bg-canvas)" },
  "&.Mui-focusVisible": {
    outline:
      "var(--pj-border-width-emphasis) solid var(--pj-color-border-focus)",
    outlineOffset: "calc(var(--pj-border-width-emphasis) * -1)",
  },
  "&.Mui-disabled": {
    color: "var(--pj-color-text-disabled)",
    "& .material-symbols-outlined": { color: "var(--pj-color-text-disabled)" },
  },
}));

/** Controle de recolher/expandir a Sidebar: 44 × 44 px. */
export const CollapseButton = styled(ButtonBase)({
  width: "var(--space-extended-44px)",
  height: "var(--space-extended-44px)",
  borderRadius: "var(--pj-radius-md)",
  color: "var(--pj-color-text-primary)",
  "&:hover": { backgroundColor: "var(--pj-color-bg-canvas)" },
  "&.Mui-focusVisible": {
    outline:
      "var(--pj-border-width-emphasis) solid var(--pj-color-border-focus)",
  },
});

export const Content = styled("main")({
  minWidth: 0,
  minHeight: 0,
  overflowY: "auto",
  backgroundColor: "var(--pj-color-bg-surface)",
});

/** Bottom Navigation: 64 px fixa no rodapé, de 3 a 5 itens, somente fora do desktop. */
export const BottomNavigation = styled("nav")({
  gridColumn: "1 / -1",
  display: "flex",
  justifyContent: "center",
  backgroundColor: "var(--pj-color-bg-canvas)",
  borderTop:
    "var(--pj-border-width-default) solid var(--pj-color-border-default)",
  paddingBottom: "env(safe-area-inset-bottom)",
  [DESKTOP]: { display: "none" },
  "& > ul": {
    display: "flex",
    width: "100%",
    /* 420 px: largura do componente Bottom Navigation no Figma. */
    maxWidth: 420,
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  "& > ul > li": { flex: "1 1 0", display: "flex", alignItems: "center" },
});

/** Bottom Navigation Item: 56 px, gap 3 px, ícone 20 px, Label/Small. */
export const BottomNavigationButton = styled(ButtonBase, {
  shouldForwardProp: (prop) => prop !== "selected",
})<{ selected: boolean }>(({ selected }) => ({
  ...typographyStyle("labelSmall"),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "var(--layout-fine-3px)",
  width: "100%",
  /* 56 px: altura do Bottom Navigation Item no Figma (sem variável vinculada). */
  height: 56,
  borderRadius: "var(--pj-radius-md)",
  whiteSpace: "nowrap",
  color: selected
    ? "var(--pj-color-action-primary)"
    : "var(--pj-color-text-secondary)",
  "& .material-symbols-outlined": {
    width: "var(--pj-icon-size-md)",
    height: "var(--pj-icon-size-md)",
    fontSize: "var(--pj-icon-size-md)",
  },
  "&:hover": { backgroundColor: "var(--pj-color-bg-canvas)" },
  "&.Mui-focusVisible": {
    outline:
      "var(--pj-border-width-emphasis) solid var(--pj-color-border-focus)",
    outlineOffset: "calc(var(--pj-border-width-emphasis) * -1)",
  },
  "&.Mui-disabled": { color: "var(--pj-color-text-disabled)" },
}));

/** Painel do Navigation Drawer: 320 px, padding 16/20 px, gap 8 px. */
export const DrawerPanel = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "var(--pj-space-2)",
  width: 320,
  maxWidth: "100vw",
  height: "100%",
  boxSizing: "border-box",
  padding: "var(--pj-space-4) var(--space-extended-20px)",
  backgroundColor: "var(--pj-color-bg-surface)",
  "& .app-shell-drawer-header": {
    display: "flex",
    alignItems: "center",
    gap: "var(--pj-space-3)",
    minHeight: "var(--pj-space-8)",
    "& > .material-symbols-outlined": {
      width: "var(--layout-fine-18px)",
      height: "var(--layout-fine-18px)",
      fontSize: "var(--layout-fine-18px)",
      color: "var(--pj-color-action-primary)",
    },
  },
  "& .app-shell-drawer-title": {
    ...typographyStyle("title"),
    flex: 1,
    margin: 0,
    color: "var(--pj-color-action-primary)",
  },
  "& .app-shell-drawer-divider": {
    height: "var(--pj-border-width-default)",
    margin: "var(--pj-space-2) 0 0",
    border: 0,
    backgroundColor: "var(--pj-color-border-default)",
  },
});

/** Controle de fechar do Drawer: ícone de 20 px em área de 44 px. */
export const DrawerClose = styled(ButtonBase)({
  width: "var(--space-extended-44px)",
  height: "var(--space-extended-44px)",
  marginRight:
    "calc((var(--space-extended-44px) - var(--pj-icon-size-md)) / -2)",
  borderRadius: "var(--pj-radius-md)",
  color: "var(--pj-color-text-primary)",
  "&.Mui-focusVisible": {
    outline:
      "var(--pj-border-width-emphasis) solid var(--pj-color-border-focus)",
  },
});
