import {
  DarkModeOutlined,
  KeyboardArrowLeftRounded,
  KeyboardArrowRightRounded,
  LightModeOutlined,
  LogoutRounded,
  MenuRounded,
  PasswordRounded,
  PersonOutlineRounded,
} from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Box,
  Divider,
  Drawer,
  IconButton as MuiIconButton,
  Menu,
  MenuItem,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useColorScheme } from "@mui/material/styles";
import { useId, useState } from "react";
import { BrandLockup } from "../BrandLockup/BrandLockup";
import type {
  AppShellNavigationItem,
  AppShellProps,
  AppShellUser,
} from "./AppShell.types";
import {
  AppFrame,
  BottomNavigation,
  BottomNavigationButton,
  Content,
  NavigationButton,
  NavigationList,
  Sidebar,
  SidebarBrand,
  SidebarFooter,
  Topbar,
} from "./AppShell.styles";

function initialsFor(user: AppShellUser) {
  if (user.initials) return user.initials;
  return user.name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function NavigationItem({
  compact,
  item,
  selected,
}: {
  compact: boolean;
  item: AppShellNavigationItem;
  selected: boolean;
}) {
  const navigate = () => {
    item.onClick?.();
    if (item.href) window.location.assign(item.href);
  };
  const content = (
    <>
      <Box className="app-shell-navigation-icon">{item.icon}</Box>
      {!compact && (
        <span className="app-shell-navigation-label">{item.label}</span>
      )}
      {!compact && item.badge !== undefined && (
        <Badge
          badgeContent={item.badge}
          color="primary"
          max={99}
          className="app-shell-navigation-badge"
        />
      )}
    </>
  );

  const button = (
    <NavigationButton
      aria-current={selected ? "page" : undefined}
      aria-label={compact ? item.label : undefined}
      compact={compact}
      onClick={navigate}
      selected={selected}
      type="button"
    >
      {content}
    </NavigationButton>
  );

  return compact ? (
    <Tooltip title={item.label} placement="right">
      {button}
    </Tooltip>
  ) : (
    button
  );
}

function AccountMenu({
  anchor,
  onClose,
  onPasswordChange,
  onProfile,
  onSignOut,
  onThemeModeChange,
  open,
  user,
}: {
  anchor: HTMLElement | null;
  onClose: () => void;
  onPasswordChange?: () => void;
  onProfile?: () => void;
  onSignOut?: () => void;
  onThemeModeChange?: (mode: "light" | "dark") => void;
  open: boolean;
  user: AppShellUser;
}) {
  const { mode, setMode } = useColorScheme();
  const activeMode = mode === "dark" ? "dark" : "light";
  const selectTheme = (_event: unknown, nextMode: "light" | "dark" | null) => {
    if (!nextMode) return;
    setMode(nextMode);
    onThemeModeChange?.(nextMode);
  };
  const run = (action?: () => void) => () => {
    onClose();
    action?.();
  };

  return (
    <Menu
      anchorEl={anchor}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      onClose={onClose}
      open={open}
      slotProps={{ paper: { sx: { minWidth: 248, p: 0.5 } } }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
    >
      <Stack
        direction="row"
        spacing={1.25}
        sx={{ alignItems: "center", px: 1.25, py: 1 }}
      >
        <Avatar>{initialsFor(user)}</Avatar>
        <Box>
          <Typography variant="bodySmallStrong">{user.name}</Typography>
          <Typography color="text.secondary" variant="caption">
            {user.role}
          </Typography>
        </Box>
      </Stack>
      <Divider />
      {onProfile && (
        <MenuItem onClick={run(onProfile)}>
          <PersonOutlineRounded fontSize="small" />
          Meu perfil
        </MenuItem>
      )}
      {onPasswordChange && (
        <MenuItem onClick={run(onPasswordChange)}>
          <PasswordRounded fontSize="small" />
          Alterar senha
        </MenuItem>
      )}
      <Divider />
      <Box sx={{ px: 1.25, py: 0.75 }}>
        <Typography color="text.secondary" variant="labelSmall">
          Tema
        </Typography>
        <ToggleButtonGroup
          aria-label="Tema da aplicação"
          exclusive
          fullWidth
          onChange={selectTheme}
          size="small"
          sx={{ mt: 0.5 }}
          value={activeMode}
        >
          <ToggleButton aria-label="Tema claro" value="light">
            <LightModeOutlined fontSize="small" />
            Claro
          </ToggleButton>
          <ToggleButton aria-label="Tema escuro" value="dark">
            <DarkModeOutlined fontSize="small" />
            Escuro
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      {onSignOut && (
        <>
          <Divider />
          <MenuItem className="app-shell-sign-out" onClick={run(onSignOut)}>
            <LogoutRounded fontSize="small" />
            Sair
          </MenuItem>
        </>
      )}
    </Menu>
  );
}

/** Moldura responsiva para as páginas autenticadas da aplicação. */
export function AppShell({
  activeNavigationId,
  children,
  headerActions,
  headerContent,
  mobileNavigationItems,
  navigationItems,
  onPasswordChange,
  onProfile,
  onSignOut,
  onThemeModeChange,
  user,
}: AppShellProps) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [expanded, setExpanded] = useState(isDesktop);
  const [mobileNavigationOpen, setMobileNavigationOpen] = useState(false);
  const [accountAnchor, setAccountAnchor] = useState<HTMLElement | null>(null);
  const navigationId = useId();
  const bottomItems = (mobileNavigationItems ?? navigationItems).slice(0, 3);

  const compact = !expanded;
  const accountOpen = Boolean(accountAnchor);
  const accountLabel = `Conta de ${user.name}`;
  const closeAccount = () => setAccountAnchor(null);
  const openAccount = (event: React.MouseEvent<HTMLElement>) =>
    setAccountAnchor(event.currentTarget);

  const sidebarNavigation = (
    <NavigationList aria-label="Navegação principal" id={navigationId}>
      {navigationItems.map((item) => (
        <NavigationItem
          compact={compact}
          item={item}
          key={item.id}
          selected={activeNavigationId === item.id}
        />
      ))}
    </NavigationList>
  );

  return (
    <AppFrame sidebarExpanded={expanded}>
      <Sidebar aria-label="Navegação da aplicação" compact={compact}>
        <SidebarBrand compact={compact}>
          {compact ? (
            <Avatar aria-label="Pastoral da Juventude" variant="rounded">
              PJ
            </Avatar>
          ) : (
            <BrandLockup label="Pastoral" size="compact" tone="on-dark" />
          )}
        </SidebarBrand>
        {sidebarNavigation}
        <SidebarFooter compact={compact}>
          {onProfile && (
            <>
              <NavigationButton
                aria-label={compact ? "Meu perfil" : undefined}
                compact={compact}
                onClick={onProfile}
                selected={false}
                type="button"
              >
                <PersonOutlineRounded />
                {!compact && (
                  <span className="app-shell-navigation-label">Meu perfil</span>
                )}
              </NavigationButton>
            </>
          )}
          <Divider />
          <NavigationButton
            aria-label={compact ? "Expandir menu lateral" : undefined}
            compact={compact}
            onClick={() => setExpanded((current) => !current)}
            selected={false}
            type="button"
          >
            {compact ? (
              <KeyboardArrowRightRounded />
            ) : (
              <>
                <KeyboardArrowLeftRounded />
                <span className="app-shell-navigation-label">
                  Recolher menu lateral
                </span>
              </>
            )}
          </NavigationButton>
        </SidebarFooter>
      </Sidebar>

      <Topbar>
        <MuiIconButton
          aria-controls={mobileNavigationOpen ? navigationId : undefined}
          aria-expanded={mobileNavigationOpen}
          aria-label="Abrir menu de navegação"
          onClick={() => setMobileNavigationOpen(true)}
          sx={{ display: { sm: "none" } }}
        >
          <MenuRounded />
        </MuiIconButton>
        <Box className="app-shell-header-content">{headerContent}</Box>
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          {headerActions}
          <MuiIconButton
            aria-expanded={accountOpen}
            aria-haspopup="menu"
            aria-label={accountLabel}
            onClick={openAccount}
          >
            <Avatar
              sx={{
                height: "var(--size-avatar-md)",
                width: "var(--size-avatar-md)",
              }}
            >
              {initialsFor(user)}
            </Avatar>
          </MuiIconButton>
        </Stack>
      </Topbar>

      <Content>{children}</Content>

      <BottomNavigation aria-label="Navegação móvel">
        {bottomItems.map((item) => (
          <BottomNavigationButton
            aria-current={activeNavigationId === item.id ? "page" : undefined}
            key={item.id}
            onClick={() => {
              item.onClick?.();
              if (item.href) window.location.assign(item.href);
            }}
            selected={activeNavigationId === item.id}
            type="button"
          >
            {item.icon}
            <span>{item.label}</span>
          </BottomNavigationButton>
        ))}
      </BottomNavigation>

      <Drawer
        anchor="left"
        onClose={() => setMobileNavigationOpen(false)}
        open={isMobile && mobileNavigationOpen}
        slotProps={{
          paper: {
            sx: {
              bgcolor: "var(--sidebar-bg)",
              width: "var(--size-sidebar-expanded)",
            },
          },
        }}
      >
        <Box sx={{ p: 1.5 }}>
          <BrandLockup label="Pastoral" size="compact" tone="on-dark" />
        </Box>
        <NavigationList aria-label="Navegação móvel">
          {navigationItems.map((item) => (
            <NavigationItem
              compact={false}
              item={{
                ...item,
                onClick: () => {
                  setMobileNavigationOpen(false);
                  item.onClick?.();
                },
              }}
              key={item.id}
              selected={activeNavigationId === item.id}
            />
          ))}
        </NavigationList>
      </Drawer>

      <AccountMenu
        anchor={accountAnchor}
        onClose={closeAccount}
        onPasswordChange={onPasswordChange}
        onProfile={onProfile}
        onSignOut={onSignOut}
        onThemeModeChange={onThemeModeChange}
        open={accountOpen}
        user={user}
      />
    </AppFrame>
  );
}
