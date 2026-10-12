import { CssBaseline, ThemeProvider } from "@mui/material";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ComponentProps } from "react";
import { createAppTheme } from "../../theme/appTheme";
import { AppShell } from "./AppShell";

const items = [
  { id: "inicio", icon: "home", label: "Início", href: "/" },
  { id: "encontros", icon: "calendar_month", label: "Encontros" },
  { id: "perfil", icon: "person", label: "Meu perfil" },
  { id: "pessoas", icon: "groups", label: "Pessoas" },
  { id: "relatorios", icon: "list", label: "Relatórios" },
  { id: "configuracoes", icon: "settings", label: "Configurações" },
];

function setViewportWidth(width: number) {
  vi.stubGlobal(
    "matchMedia",
    vi.fn((query: string) => ({
      matches: [...query.matchAll(/\((min|max)-width:\s*([\d.]+)px\)/g)].every(
        ([, limit, value]) =>
          limit === "min" ? width >= Number(value) : width <= Number(value),
      ),
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  );
}

function setup(props: Partial<ComponentProps<typeof AppShell>> = {}) {
  render(
    <ThemeProvider theme={createAppTheme()}>
      <CssBaseline />
      <AppShell
        activeNavigationId="encontros"
        navigationItems={items}
        user={{ id: "pessoa-1", name: "Maria da Silva", initials: "MS" }}
        {...props}
      >
        <h1>Conteúdo da tela</h1>
      </AppShell>
    </ThemeProvider>,
  );
}

afterEach(() => vi.unstubAllGlobals());

describe("AppShell", () => {
  it("renderiza conteúdo, marca, pessoa e o destino atual", () => {
    setViewportWidth(1440);
    setup();

    expect(screen.getByRole("main")).toHaveTextContent("Conteúdo da tela");
    expect(screen.getByRole("img", { name: "PastorApp" })).toBeInTheDocument();
    expect(screen.getByText("Maria da Silva")).toBeInTheDocument();
    // jsdom não aplica media queries: a Sidebar do desktop fica oculta.
    const navigation = screen.getByRole("navigation", {
      hidden: true,
      name: "Navegação principal",
    });
    expect(
      within(navigation).getByRole("button", {
        hidden: true,
        name: "Encontros",
      }),
    ).toHaveAttribute("aria-current", "page");
    expect(
      within(navigation).getByRole("link", { hidden: true, name: "Início" }),
    ).toHaveAttribute("href", "/");
  });

  it("recolhe e expande a Sidebar com tooltip nos itens", async () => {
    setViewportWidth(1440);
    const user = userEvent.setup();
    setup();
    // jsdom não aplica media queries: a Sidebar do desktop fica oculta.
    const hidden = { hidden: true } as const;

    const collapse = screen.getByRole("button", {
      ...hidden,
      name: "Recolher navegação",
    });
    await user.click(collapse);
    expect(collapse).toHaveAttribute("aria-expanded", "false");
    expect(collapse).toHaveAttribute("aria-label", "Expandir navegação");
    const sidebar = screen.getByRole("navigation", {
      ...hidden,
      name: "Navegação principal",
    });
    expect(
      within(sidebar).getByRole("button", { ...hidden, name: "Encontros" }),
    ).toHaveAccessibleDescription("Encontros");

    await user.click(collapse);
    expect(collapse).toHaveAttribute("aria-expanded", "true");
    expect(collapse).toHaveAttribute("aria-label", "Recolher navegação");
  });

  it("limita a Bottom Navigation a cinco atalhos", () => {
    setViewportWidth(390);
    setup();

    const shortcuts = screen.getByRole("navigation", {
      name: "Atalhos de navegação",
    });
    expect(within(shortcuts).getAllByRole("listitem")).toHaveLength(5);
  });

  it("aceita atalhos específicos para a Bottom Navigation", () => {
    setViewportWidth(390);
    setup({ bottomNavigationItems: items.slice(0, 3) });

    const shortcuts = screen.getByRole("navigation", {
      name: "Atalhos de navegação",
    });
    expect(within(shortcuts).getAllByRole("listitem")).toHaveLength(3);
  });

  it("abre o Drawer pelo Header e fecha com Esc devolvendo o foco", async () => {
    setViewportWidth(390);
    const user = userEvent.setup();
    setup();

    const trigger = screen.getByRole("button", { name: "Abrir navegação" });
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    const drawer = screen.getByRole("navigation", {
      name: "Navegação completa",
    });
    expect(within(drawer).getAllByRole("listitem")).toHaveLength(6);

    await user.keyboard("{Escape}");
    await waitFor(() =>
      expect(
        screen.queryByRole("navigation", { name: "Navegação completa" }),
      ).not.toBeInTheDocument(),
    );
    await waitFor(() => expect(trigger).toHaveFocus());
  });

  it("fecha o Drawer ao escolher um destino ou pelo botão fechar", async () => {
    setViewportWidth(390);
    const user = userEvent.setup();
    const onClick = vi.fn();
    setup({
      navigationItems: [
        ...items.slice(0, 2),
        { id: "perfil", icon: "person", label: "Meu perfil", onClick },
      ],
    });

    await user.click(screen.getByRole("button", { name: "Abrir navegação" }));
    const drawer = screen.getByRole("navigation", {
      name: "Navegação completa",
    });
    await user.click(
      within(drawer).getByRole("button", { name: "Meu perfil" }),
    );
    expect(onClick).toHaveBeenCalledOnce();
    await waitFor(() =>
      expect(
        screen.queryByRole("navigation", { name: "Navegação completa" }),
      ).not.toBeInTheDocument(),
    );

    await user.click(screen.getByRole("button", { name: "Abrir navegação" }));
    await user.click(screen.getByRole("button", { name: "Fechar navegação" }));
    await waitFor(() =>
      expect(
        screen.queryByRole("navigation", { name: "Navegação completa" }),
      ).not.toBeInTheDocument(),
    );
  });
});
