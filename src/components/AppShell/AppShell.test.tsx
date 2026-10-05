import {
  CalendarMonthOutlined,
  HomeOutlined,
  PeopleOutlineRounded,
} from "@mui/icons-material";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { fireEvent, render, screen } from "@testing-library/react";
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
});
