import {
  CalendarMonthOutlined,
  HomeOutlined,
  PeopleOutlineRounded,
} from "@mui/icons-material";
import { CssBaseline, ThemeProvider } from "@mui/material";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createAppTheme } from "../../theme/appTheme";
import { AppShell } from "./AppShell";

const items = [
  { id: "inicio", icon: <HomeOutlined />, label: "Início" },
  { id: "pessoas", icon: <PeopleOutlineRounded />, label: "Pessoas", badge: 4 },
  {
    id: "encontros",
    icon: <CalendarMonthOutlined />,
    label: "Encontros",
    badge: 3,
  },
];

function setup(props: Partial<React.ComponentProps<typeof AppShell>> = {}) {
  const onProfile = vi.fn();
  const onPasswordChange = vi.fn();
  const onSignOut = vi.fn();
  render(
    <ThemeProvider theme={createAppTheme("light")} defaultMode="light">
      <CssBaseline />
      <AppShell
        activeNavigationId="encontros"
        navigationItems={items}
        onPasswordChange={onPasswordChange}
        onProfile={onProfile}
        onSignOut={onSignOut}
        user={{ name: "José Eduardo", role: "Coordenador" }}
        {...props}
      >
        <h1>Conteúdo da tela</h1>
      </AppShell>
    </ThemeProvider>,
  );
  return { onPasswordChange, onProfile, onSignOut };
}

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

afterEach(() => vi.unstubAllGlobals());

describe("AppShell", () => {
  it("renderiza conteúdo, navegação e identificação da pessoa", () => {
    setup();

    expect(screen.getByRole("main", { name: "" })).toHaveTextContent(
      "Conteúdo da tela",
    );
    expect(
      screen.getByRole("navigation", {
        hidden: true,
        name: "Navegação principal",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("button", { name: "Conta de José Eduardo" }),
    ).toHaveLength(1);
    expect(screen.getByRole("button", { name: "Encontros" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("recolhe e expande o menu lateral", () => {
    setup();

    expect(screen.getByLabelText("Pastoral da Juventude")).toBeInTheDocument();

    const button = screen.getByRole("button", {
      hidden: true,
      name: "Expandir menu lateral",
    });
    fireEvent.click(button);

    expect(
      screen.getByRole("button", {
        hidden: true,
        name: "Recolher menu lateral",
      }),
    ).toBeInTheDocument();
    expect(screen.getAllByText("Encontros").length).toBeGreaterThan(0);
  });

  it("oferece as ações do menu da conta", () => {
    const { onPasswordChange, onProfile, onSignOut } = setup();

    fireEvent.click(
      screen.getAllByRole("button", { name: "Conta de José Eduardo" })[0],
    );
    fireEvent.click(screen.getByRole("menuitem", { name: /Meu perfil/ }));
    expect(onProfile).toHaveBeenCalledOnce();

    fireEvent.click(
      screen.getAllByRole("button", { name: "Conta de José Eduardo" })[0],
    );
    fireEvent.click(screen.getByRole("menuitem", { name: /Alterar senha/ }));
    expect(onPasswordChange).toHaveBeenCalledOnce();

    fireEvent.click(
      screen.getAllByRole("button", { name: "Conta de José Eduardo" })[0],
    );
    fireEvent.click(screen.getByRole("menuitem", { name: /Sair/ }));
    expect(onSignOut).toHaveBeenCalledOnce();
  });

  it("aceita uma navegação móvel específica", () => {
    setup({ mobileNavigationItems: [items[0]] });

    expect(
      screen.getByRole("navigation", { name: "Navegação móvel" }),
    ).toHaveTextContent("Início");
    expect(
      screen.getByRole("navigation", { name: "Navegação móvel" }),
    ).not.toHaveTextContent("Pessoas");
  });

  it.each([320, 360, 390, 414, 767])(
    "permite acessar todos os destinos pelo menu em %i px",
    async (width) => {
      setViewportWidth(width);
      const user = userEvent.setup();
      const onLeadership = vi.fn();
      setup({
        activeNavigationId: "lideranca",
        navigationItems: [
          ...items,
          {
            id: "lideranca",
            label: "Liderança",
            icon: <PeopleOutlineRounded />,
            onClick: onLeadership,
          },
          {
            id: "administracao",
            label: "Administração",
            icon: <PeopleOutlineRounded />,
          },
        ],
      });

      const trigger = screen.getByRole("button", {
        name: "Abrir menu de navegação",
      });
      expect(trigger).toHaveAttribute("aria-expanded", "false");
      const shortcuts = screen.getByRole("navigation", {
        name: "Navegação móvel",
      });
      expect(within(shortcuts).getAllByRole("button")).toHaveLength(3);
      expect(
        within(shortcuts).queryByRole("button", { name: "Liderança" }),
      ).not.toBeInTheDocument();

      await user.click(trigger);
      const menu = screen.getByRole("navigation", {
        name: "Menu de navegação móvel",
      });
      expect(trigger).toHaveAttribute("aria-controls", menu.id);
      expect(trigger).toHaveAttribute("aria-expanded", "true");
      expect(within(menu).getAllByRole("button")).toHaveLength(5);
      expect(
        within(menu).getByRole("button", { name: "Administração" }),
      ).toBeInTheDocument();
      const leadership = within(menu).getByRole("button", {
        name: "Liderança",
      });
      expect(leadership).toHaveAttribute("aria-current", "page");

      await user.click(leadership);
      expect(onLeadership).toHaveBeenCalledOnce();
      await waitFor(() =>
        expect(
          screen.queryByRole("navigation", { name: "Menu de navegação móvel" }),
        ).not.toBeInTheDocument(),
      );
      expect(trigger).toHaveAttribute("aria-expanded", "false");
    },
  );

  it.each([768, 1200])("não oferece o acionador móvel em %i px", (width) => {
    setViewportWidth(width);
    setup();
    expect(
      screen.queryByRole("button", { name: "Abrir menu de navegação" }),
    ).not.toBeInTheDocument();
  });

  it("fecha o menu móvel com Esc e devolve o foco ao acionador", async () => {
    setViewportWidth(390);
    const user = userEvent.setup();
    setup();
    const trigger = screen.getByRole("button", {
      name: "Abrir menu de navegação",
    });
    await user.click(trigger);
    await user.keyboard("{Escape}");
    await waitFor(() =>
      expect(
        screen.queryByRole("navigation", { name: "Menu de navegação móvel" }),
      ).not.toBeInTheDocument(),
    );
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).toHaveFocus();
  });
});
