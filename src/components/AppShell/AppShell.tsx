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
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
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
import { Icon } from "../Icon";

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
  open,
  user,
}: {
  anchor: HTMLElement | null;
  onClose: () => void;
  onPasswordChange?: () => void;
  onProfile?: () => void;
  onSignOut?: () => void;
  open: boolean;
  user: AppShellUser;
}) {
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
          <Typography variant="labelMedium">{user.name}</Typography>
          <Typography color="text.secondary" variant="bodySmall">
            {user.role}
          </Typography>
        </Box>
      </Stack>
      <Divider />
      {onProfile && (
        <MenuItem onClick={run(onProfile)}>
          <Icon name="person" size="md" />
          Meu perfil
        </MenuItem>
      )}
      {onPasswordChange && (
        <MenuItem onClick={run(onPasswordChange)}>
          <Icon name="password" size="md" />
          Alterar senha
        </MenuItem>
      )}
      {onSignOut && (
        <>
          <Divider />
          <MenuItem className="app-shell-sign-out" onClick={run(onSignOut)}>
            <Icon name="logout" size="md" />
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
  user,
}: AppShellProps) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [expanded, setExpanded] = useState(isDesktop);
  const [mobileNavigationOpen, setMobileNavigationOpen] = useState(false);
  const [accountAnchor, setAccountAnchor] = useState<HTMLElement | null>(null);
  const navigationId = useId();
  const mobileNavigationId = useId();
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
            <BrandLockup label="Pastoral" size="compact" tone="on-light" />
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
                <Icon name="person" />
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
              <Icon name="keyboard_arrow_right" />
            ) : (
              <>
                <Icon name="keyboard_arrow_left" />
                <span className="app-shell-navigation-label">
                  Recolher menu lateral
                </span>
              </>
            )}
          </NavigationButton>
        </SidebarFooter>
      </Sidebar>

      <Topbar>
        {isMobile && (
          <MuiIconButton
            aria-controls={
              mobileNavigationOpen ? mobileNavigationId : undefined
            }
            aria-expanded={mobileNavigationOpen}
            aria-label="Abrir menu de navegação"
            onClick={() => setMobileNavigationOpen(true)}
          >
            <Icon name="menu" />
          </MuiIconButton>
        )}
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
                height: "var(--pj-avatar-size-md)",
                width: "var(--pj-avatar-size-md)",
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
              bgcolor: "var(--pj-color-bg-canvas)",
              width: "var(--pj-layout-sidebar-expanded)",
            },
          },
        }}
      >
        <Box sx={{ p: 1.5 }}>
          <BrandLockup label="Pastoral" size="compact" tone="on-light" />
        </Box>
        <NavigationList
          aria-label="Menu de navegação móvel"
          id={mobileNavigationId}
        >
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
        open={accountOpen}
        user={user}
      />
    </AppFrame>
  );
}
