import { ButtonBase, styled } from "@mui/material";
import { typographyStyle } from "../../theme/tokens";

type SidebarOwnerState = { compact: boolean };
type AppFrameOwnerState = { sidebarExpanded: boolean };

export const AppFrame = styled("div", {
  shouldForwardProp: (prop) => prop !== "sidebarExpanded",
})<AppFrameOwnerState>(({ sidebarExpanded }) => ({
  height: "100dvh",
  backgroundColor: "var(--pj-color-bg-canvas)",
  display: "grid",
  overflow: "hidden",
  gridTemplateColumns: "1fr",
  gridTemplateRows: "var(--pj-layout-header-desktop) minmax(0, 1fr)",
  "@media (min-width: 768px)": {
    gridTemplateColumns: `${sidebarExpanded ? "var(--pj-layout-sidebar-expanded)" : "var(--pj-layout-sidebar-collapsed)"} minmax(0, 1fr)`,
    gridTemplateRows: "var(--pj-layout-header-desktop) minmax(0, 1fr)",
  },
}));

export const Sidebar = styled("aside", {
  shouldForwardProp: (prop) => prop !== "compact",
})<SidebarOwnerState>(({ compact }) => ({
  gridColumn: 1,
  gridRow: "1 / span 2",
  display: "none",
  flexDirection: "column",
  minWidth: 0,
  padding: "var(--pj-space-3) var(--pj-space-2)",
  color: "var(--pj-color-text-primary)",
  backgroundColor: "var(--pj-color-bg-canvas)",
  borderRight:
    "var(--pj-border-width-default) solid var(--pj-color-border-default)",
  "@media (min-width: 768px)": { display: "flex" },
  ...(compact && { alignItems: "center", paddingInline: "var(--pj-space-3)" }),
}));

export const SidebarBrand = styled("div", {
  shouldForwardProp: (prop) => prop !== "compact",
})<SidebarOwnerState>(({ compact }) => ({
  minHeight: "var(--space-extended-44px)",
  display: "flex",
  alignItems: "center",
  gap: "var(--pj-space-2)",
  justifyContent: compact ? "center" : "space-between",
  marginBottom: "var(--space-extended-20px)",
  width: "100%",
  "& .MuiAvatar-root": {
    width: "var(--pj-space-6)",
    height: "var(--pj-space-6)",
    color: "var(--pj-color-text-inverse)",
    backgroundColor: "var(--pj-color-action-primary)",
    ...typographyStyle("labelMedium"),
  },
  "& button": { color: "var(--pj-color-text-primary)" },
  "& button:hover": { backgroundColor: "var(--pj-color-bg-canvas)" },
}));

export const NavigationList = styled("nav")({
  display: "grid",
  alignContent: "start",
  gap: "var(--pj-space-1)",
  width: "100%",
  "& .MuiSvgIcon-root": {
    width: "var(--pj-icon-size-md)",
    height: "var(--pj-icon-size-md)",
  },
});

export const NavigationButton = styled(ButtonBase, {
  shouldForwardProp: (prop) => prop !== "compact" && prop !== "selected",
})<SidebarOwnerState & { selected: boolean }>(({ compact, selected }) => ({
  minWidth: 0,
  minHeight: "var(--space-extended-44px)",
  padding: compact
    ? "var(--pj-space-3)"
    : "var(--pj-space-3) var(--pj-space-2)",
  display: "flex",
  alignItems: "center",
  gap: "var(--pj-space-2)",
  justifyContent: compact ? "center" : "flex-start",
  border: 0,
  borderRadius: "var(--pj-radius-lg)",
  color: selected
    ? "var(--pj-color-action-primary)"
    : "var(--pj-color-text-primary)",
  background: selected
    ? "var(--pj-color-feedback-information-soft)"
    : "transparent",
  font: "inherit",
  cursor: "pointer",
  textDecoration: "none",
  "&:hover": {
    backgroundColor: selected
      ? "var(--pj-color-feedback-information-soft)"
      : "var(--pj-color-bg-canvas)",
  },
  "&:focus-visible": {
    outline:
      "3px solid color-mix(in srgb, var(--pj-color-border-focus) 55%, transparent)",
    outlineOffset: 2,
  },
  "& .app-shell-navigation-label": {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  "& .app-shell-navigation-icon": {
    display: "grid",
    flex: "0 0 auto",
    placeItems: "center",
  },
  "& .app-shell-navigation-badge": { marginLeft: "auto" },
  "& .MuiBadge-badge": {
    backgroundColor: "var(--pj-color-action-primary)",
    color: "var(--pj-color-text-inverse)",
  },
}));

export const SidebarFooter = styled("div", {
  shouldForwardProp: (prop) => prop !== "compact",
})<SidebarOwnerState>(({ compact }) => ({
  marginTop: "auto",
  width: "100%",
  "& hr": {
    borderColor: "var(--pj-color-border-default)",
    marginBlock: "var(--pj-space-2)",
  },
  ...(compact && { display: "grid", justifyItems: "center" }),
}));

export const Topbar = styled("header")({
  gridColumn: 1,
  gridRow: 1,
  minWidth: 0,
  height: "var(--pj-layout-header-desktop)",
  paddingInline: "var(--pj-space-4)",
  display: "flex",
  alignItems: "center",
  gap: "var(--pj-space-3)",
  backgroundColor: "var(--pj-color-bg-surface)",
  borderBottom:
    "var(--pj-border-width-default) solid var(--pj-color-border-default)",
  "@media (min-width: 768px)": { gridColumn: 2 },
  "& .app-shell-header-content": { flex: "1 1 auto", minWidth: 0 },
});

export const Content = styled("main")({
  gridColumn: 1,
  gridRow: 2,
  minWidth: 0,
  minHeight: 0,
  overflow: "auto",
  padding:
    "var(--space-extended-20px) var(--pj-space-4) calc(var(--pj-layout-bottom-nav-height) + var(--space-extended-20px))",
  "@media (min-width: 768px)": {
    gridColumn: 2,
    padding: "var(--pj-space-6)",
  },
  "@media (min-width: 1200px)": {
    padding: "var(--space-extended-40px)",
  },
});

export const BottomNavigation = styled("nav")({
  position: "fixed",
  zIndex: 1100,
  bottom: 0,
  left: 0,
  right: 0,
  height: "var(--pj-layout-bottom-nav-height)",
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  backgroundColor: "var(--pj-color-bg-surface)",
  borderTop:
    "var(--pj-border-width-default) solid var(--pj-color-border-default)",
  "@media (min-width: 768px)": { display: "none" },
});

export const BottomNavigationButton = styled(ButtonBase, {
  shouldForwardProp: (prop) => prop !== "selected",
})<{ selected: boolean }>(({ selected }) => ({
  display: "grid",
  placeItems: "center",
  alignContent: "center",
  gap: "var(--layout-fine-2px)",
  border: 0,
  color: selected
    ? "var(--pj-color-action-primary)"
    : "var(--pj-color-text-secondary)",
  background: "transparent",
  ...typographyStyle("labelSmall"),
  textDecoration: "none",
  cursor: "pointer",
  "& .MuiSvgIcon-root": {
    width: "var(--pj-icon-size-md)",
    height: "var(--pj-icon-size-md)",
  },
  "&:focus-visible": {
    outline:
      "3px solid color-mix(in srgb, var(--pj-color-border-focus) 55%, transparent)",
    outlineOffset: -3,
  },
}));
