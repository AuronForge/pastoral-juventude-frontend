import { act, fireEvent, render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material";
import { createAppTheme } from "../../theme/appTheme";
import { ApiRequestError } from "../../shared/api/apiError";
import { LogoutView, type LogoutViewProps } from "./LogoutView";

function setup(props: Partial<LogoutViewProps> = {}) {
  const logout = vi.fn().mockResolvedValue(undefined);
  const onLoggedOut = vi.fn();
  render(
    <ThemeProvider theme={createAppTheme()}>
      <LogoutView logout={logout} onLoggedOut={onLoggedOut} {...props} />
    </ThemeProvider>,
  );
  return { logout, onLoggedOut };
}
const unavailable = new ApiRequestError({
  status: 503,
  codigo: "SERVICO_INDISPONIVEL",
  titulo: "Serviço indisponível",
  mensagem: "Tente novamente.",
  endpoint: "/api/v1/autenticacao/logout",
  correlationId: "00000000-0000-4000-8000-000000000001",
});

it("exibe a sessão ativa com os textos do Figma", () => {
  setup();
  expect(
    screen.getByRole("heading", { level: 1, name: "Encerrar acesso" }),
  ).toBeVisible();
  expect(
    screen.getByText("Seu acesso está ativo. Ao terminar, saia da sua conta."),
  ).toBeVisible();
  expect(screen.getByText("Sessão ativa")).toBeVisible();
  expect(
    screen.getByText("Você pode encerrar seu acesso quando terminar."),
  ).toBeVisible();
});

it("encerra uma única vez e segue ao Login após o sucesso", async () => {
  let resolve!: () => void;
  const logout = vi.fn(
    () =>
      new Promise<void>((done) => {
        resolve = done;
      }),
  );
  const { onLoggedOut } = setup({ logout });
  fireEvent.click(screen.getByRole("button", { name: "Sair" }));
  fireEvent.click(screen.getByRole("button", { name: /Sair|Carregando/ }));
  expect(logout).toHaveBeenCalledTimes(1);
  expect(onLoggedOut).not.toHaveBeenCalled();
  await act(async () => resolve());
  expect(onLoggedOut).toHaveBeenCalledTimes(1);
});

it("mantém o acesso e permite tentar novamente quando a saída falha", async () => {
  const logout = vi
    .fn()
    .mockRejectedValueOnce(unavailable)
    .mockResolvedValueOnce(undefined);
  const { onLoggedOut } = setup({ logout });
  await act(async () =>
    fireEvent.click(screen.getByRole("button", { name: "Sair" })),
  );
  expect(screen.getByText("Não foi possível sair")).toBeVisible();
  expect(
    screen.getByText(/Seu acesso continua ativo\. Tente novamente\./),
  ).toHaveTextContent("00000000-0000-4000-8000-000000000001");
  expect(onLoggedOut).not.toHaveBeenCalled();
  await act(async () =>
    fireEvent.click(screen.getByRole("button", { name: "Sair" })),
  );
  expect(logout).toHaveBeenCalledTimes(2);
  expect(onLoggedOut).toHaveBeenCalledTimes(1);
});

it("trata falha inesperada como erro de comunicação", async () => {
  setup({ logout: vi.fn().mockRejectedValue(new Error("rede")) });
  await act(async () =>
    fireEvent.click(screen.getByRole("button", { name: "Sair" })),
  );
  expect(screen.getByText("Não foi possível sair")).toBeVisible();
});
