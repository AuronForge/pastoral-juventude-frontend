import { ButtonBase, styled } from "@mui/material";

type SidebarOwnerState = { compact: boolean };
type AppFrameOwnerState = { sidebarExpanded: boolean };

export const AppFrame = styled("div", {
  shouldForwardProp: (prop) => prop !== "sidebarExpanded",
})<AppFrameOwnerState>(({ sidebarExpanded }) => ({
  height: "100dvh",
  backgroundColor: "var(--bg-canvas)",
  display: "grid",
  overflow: "hidden",
  gridTemplateColumns: "1fr",
  gridTemplateRows: "var(--size-topbar) minmax(0, 1fr)",
  "@media (min-width: 768px)": {
    gridTemplateColumns: `${sidebarExpanded ? "var(--size-sidebar-expanded)" : "var(--size-sidebar-collapsed)"} minmax(0, 1fr)`,
    gridTemplateRows: "var(--size-topbar) minmax(0, 1fr)",
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
  padding: "var(--spacing-md) var(--spacing-sm)",
  color: "var(--sidebar-text)",
  backgroundColor: "var(--sidebar-bg)",
  borderRight: "var(--border-thin) solid var(--sidebar-border)",
  "@media (min-width: 768px)": { display: "flex" },
  ...(compact && { alignItems: "center", paddingInline: "var(--spacing-md)" }),
}));

export const SidebarBrand = styled("div", {
  shouldForwardProp: (prop) => prop !== "compact",
})<SidebarOwnerState>(({ compact }) => ({
  minHeight: "var(--size-control-lg)",
  display: "flex",
  alignItems: "center",
  gap: "var(--spacing-sm)",
  justifyContent: compact ? "center" : "space-between",
  marginBottom: "var(--spacing-xl)",
  width: "100%",
  "& .MuiAvatar-root": {
    width: "var(--size-control-sm)",
    height: "var(--size-control-sm)",
    color: "var(--text-on-primary)",
    backgroundColor: "var(--primary-solid)",
    fontSize: "var(--font-size-xs)",
  },
  "& button": { color: "var(--sidebar-text)" },
  "& button:hover": { backgroundColor: "var(--sidebar-item-hover-bg)" },
}));

export const NavigationList = styled("nav")({
  display: "grid",
  alignContent: "start",
  gap: "var(--spacing-xs)",
  width: "100%",
  "& .MuiSvgIcon-root": {
    width: "var(--size-icon-md)",
    height: "var(--size-icon-md)",
  },
});

export const NavigationButton = styled(ButtonBase, {
  shouldForwardProp: (prop) => prop !== "compact" && prop !== "selected",
})<SidebarOwnerState & { selected: boolean }>(({ compact, selected }) => ({
  minWidth: 0,
  minHeight: "var(--size-touch-min)",
  padding: compact
    ? "var(--spacing-md)"
    : "var(--spacing-md) var(--spacing-sm)",
  display: "flex",
  alignItems: "center",
  gap: "var(--spacing-sm)",
  justifyContent: compact ? "center" : "flex-start",
  border: 0,
  borderRadius: "var(--radius-md)",
  color: selected ? "var(--sidebar-text-active)" : "var(--sidebar-text)",
  background: selected ? "var(--sidebar-item-active-bg)" : "transparent",
  font: "inherit",
  cursor: "pointer",
  textDecoration: "none",
  "&:hover": {
    backgroundColor: selected
      ? "var(--sidebar-item-active-bg)"
      : "var(--sidebar-item-hover-bg)",
  },
  "&:focus-visible": {
    outline:
      "3px solid color-mix(in srgb, var(--border-focus) 55%, transparent)",
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
    backgroundColor: "var(--primary-solid)",
    color: "var(--text-on-primary)",
  },
}));

export const SidebarFooter = styled("div", {
  shouldForwardProp: (prop) => prop !== "compact",
})<SidebarOwnerState>(({ compact }) => ({
  marginTop: "auto",
  width: "100%",
  "& hr": {
    borderColor: "var(--sidebar-border)",
    marginBlock: "var(--spacing-sm)",
  },
  ...(compact && { display: "grid", justifyItems: "center" }),
}));

export const Topbar = styled("header")({
  gridColumn: 1,
  gridRow: 1,
  minWidth: 0,
  height: "var(--size-topbar)",
  paddingInline: "var(--spacing-lg)",
  display: "flex",
  alignItems: "center",
  gap: "var(--spacing-md)",
  backgroundColor: "var(--bg-surface)",
  borderBottom: "var(--border-thin) solid var(--border-subtle)",
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
    "var(--spacing-xl) var(--spacing-lg) calc(var(--size-bottom-nav) + var(--spacing-xl))",
  "@media (min-width: 768px)": {
    gridColumn: 2,
    padding: "var(--spacing-3xl)",
  },
  "@media (min-width: 1200px)": {
    padding: "var(--spacing-4xl)",
  },
});

export const BottomNavigation = styled("nav")({
  position: "fixed",
  zIndex: 1100,
  bottom: 0,
  left: 0,
  right: 0,
  height: "var(--size-bottom-nav)",
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  backgroundColor: "var(--bg-surface)",
  borderTop: "var(--border-thin) solid var(--border-subtle)",
  boxShadow: "var(--elevation-floating)",
  "@media (min-width: 768px)": { display: "none" },
});

export const BottomNavigationButton = styled(ButtonBase, {
  shouldForwardProp: (prop) => prop !== "selected",
})<{ selected: boolean }>(({ selected }) => ({
  display: "grid",
  placeItems: "center",
  alignContent: "center",
  gap: "var(--spacing-2xs)",
  border: 0,
  color: selected ? "var(--primary-text)" : "var(--text-secondary)",
  background: "transparent",
  font: "var(--font-size-xs)/var(--line-height-xs) var(--font-family-body)",
  textDecoration: "none",
  cursor: "pointer",
  "& .MuiSvgIcon-root": {
    width: "var(--size-icon-md)",
    height: "var(--size-icon-md)",
  },
  "&:focus-visible": {
    outline:
      "3px solid color-mix(in srgb, var(--border-focus) 55%, transparent)",
    outlineOffset: -3,
  },
}));
