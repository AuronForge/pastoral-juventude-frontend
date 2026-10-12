import { Drawer, useMediaQuery } from "@mui/material";
import { useId, useState, type ElementType } from "react";
import { Avatar } from "../Avatar";
import { BrandLockup } from "../BrandLockup";
import { Icon } from "../Icon";
import { Tooltip } from "../Tooltip";
import type { AppShellNavigationItem, AppShellProps } from "./AppShell.types";
import {
  AppFrame,
  BottomNavigation,
  BottomNavigationButton,
  CollapseButton,
  Content,
  DrawerClose,
  DrawerPanel,
  Header,
  HeaderAction,
  NavigationButton,
  NavigationList,
  Sidebar,
} from "./AppShell.styles";

function linkProps(item: AppShellNavigationItem, onNavigate?: () => void) {
  return {
    component: (item.href ? "a" : "button") as ElementType,
    href: item.disabled ? undefined : item.href,
    disabled: item.disabled,
    onClick: () => {
      onNavigate?.();
      item.onClick?.();
    },
  };
}

function NavigationItem({
  compact,
  item,
  onNavigate,
  selected,
}: {
  compact: boolean;
  item: AppShellNavigationItem;
  onNavigate?: () => void;
  selected: boolean;
}) {
  const button = (
    <NavigationButton
      {...linkProps(item, onNavigate)}
      aria-current={selected ? "page" : undefined}
      aria-label={compact ? item.label : undefined}
      compact={compact}
      disableRipple
      selected={selected}
    >
      <Icon name={item.icon} />
      {compact ? null : <span>{item.label}</span>}
    </NavigationButton>
  );

  return (
    <li>
      {compact ? (
        <Tooltip position="right" text={item.label}>
          {button}
        </Tooltip>
      ) : (
        button
      )}
    </li>
  );
}

/**
 * App Shell do Figma: Header, Sidebar (desktop, 280/72 px) e, em tablet e
 * mobile, Navigation Drawer acionado pelo Header com Bottom Navigation de
 * atalhos. O conteúdo ocupa a área em color/bg/surface.
 */
export function AppShell({
  activeNavigationId,
  bottomNavigationItems,
  children,
  navigationItems,
  user,
}: AppShellProps) {
  const isDesktop = useMediaQuery("(min-width: 1200px)");
  const [expanded, setExpanded] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerId = useId();
  const compact = !expanded;
  const shortcuts = (bottomNavigationItems ?? navigationItems).slice(0, 5);
  const closeDrawer = () => setDrawerOpen(false);

  return (
    <AppFrame sidebarExpanded={expanded}>
      <Header>
        <HeaderAction
          aria-controls={drawerOpen ? drawerId : undefined}
          aria-expanded={drawerOpen}
          aria-label="Abrir navegação"
          disableRipple
          onClick={() => setDrawerOpen(true)}
        >
          <Icon name="menu" />
        </HeaderAction>
        <BrandLockup
          className="app-shell-brand"
          label="PastorApp"
          size="compact"
        />
        <div className="app-shell-user">
          <Avatar initials={user.initials} personId={user.id} size={32} />
          <span className="app-shell-user-name">{user.name}</span>
        </div>
      </Header>

      <Sidebar compact={compact}>
        <nav aria-label="Navegação principal">
          <NavigationList>
            {navigationItems.map((item) => (
              <NavigationItem
                compact={compact}
                item={item}
                key={item.id}
                selected={activeNavigationId === item.id}
              />
            ))}
          </NavigationList>
        </nav>
        <div className="app-shell-sidebar-footer">
          <Tooltip
            position="right"
            text={compact ? "Expandir navegação" : "Recolher navegação"}
          >
            <CollapseButton
              aria-expanded={expanded}
              aria-label={compact ? "Expandir navegação" : "Recolher navegação"}
              disableRipple
              onClick={() => setExpanded((current) => !current)}
            >
              <Icon name={compact ? "chevron_right" : "chevron_left"} />
            </CollapseButton>
          </Tooltip>
        </div>
      </Sidebar>

      <Content>{children}</Content>

      <BottomNavigation aria-label="Atalhos de navegação">
        <ul>
          {shortcuts.map((item) => {
            const selected = activeNavigationId === item.id;
            return (
              <li key={item.id}>
                <BottomNavigationButton
                  {...linkProps(item)}
                  aria-current={selected ? "page" : undefined}
                  disableRipple
                  selected={selected}
                >
                  <Icon name={item.icon} />
                  <span>{item.label}</span>
                </BottomNavigationButton>
              </li>
            );
          })}
        </ul>
      </BottomNavigation>

      <Drawer
        anchor="left"
        onClose={closeDrawer}
        open={!isDesktop && drawerOpen}
        slotProps={{
          backdrop: {
            sx: { backgroundColor: "var(--pj-color-text-primary)" },
          },
          paper: { sx: { boxShadow: "none" } },
        }}
      >
        <DrawerPanel id={drawerId}>
          <div className="app-shell-drawer-header">
            <Icon name="groups" />
            <p className="app-shell-drawer-title">Pastoral da Juventude</p>
            <DrawerClose
              aria-label="Fechar navegação"
              disableRipple
              onClick={closeDrawer}
            >
              <Icon name="close" size="md" />
            </DrawerClose>
          </div>
          <hr className="app-shell-drawer-divider" />
          <nav aria-label="Navegação completa">
            <NavigationList>
              {navigationItems.map((item) => (
                <NavigationItem
                  compact={false}
                  item={item}
                  key={item.id}
                  onNavigate={closeDrawer}
                  selected={activeNavigationId === item.id}
                />
              ))}
            </NavigationList>
          </nav>
        </DrawerPanel>
      </Drawer>
    </AppFrame>
  );
}
