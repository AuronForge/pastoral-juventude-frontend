import { act, fireEvent, render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material";
import { createAppTheme } from "../../theme/appTheme";
import { LoginView } from "./LoginView";
import { loginFeedback } from "./loginFeedback";

const credentials = { email: "u@exemplo.test", senha: "Senha123!" };
const details = {
  status: 429,
  codigo: "LIMITE_TENTATIVAS_EXCEDIDO",
  titulo: "Limite",
  mensagem: "Aguarde",
  endpoint: "/api/v1/autenticacao/login",
};
afterEach(() => vi.useRealTimers());
function setup(error = details) {
  const authenticate = vi.fn();
  render(
    <ThemeProvider theme={createAppTheme("light")}>
      <LoginView
        authenticate={authenticate}
        initialCredentials={credentials}
        initialError={error}
      />
    </ThemeProvider>,
  );
  return authenticate;
}
it("impede envio até o prazo da API, mesmo se o formulário for submetido diretamente", async () => {
  vi.useFakeTimers();
  const authenticate = setup({
    ...details,
    retryAfterAt: Date.now() + 2000,
  } as typeof details);
  const button = screen.getByRole("button", { name: "Entrar" });
  expect(button).toBeDisabled();
  fireEvent.submit(screen.getByRole("form"));
  expect(authenticate).not.toHaveBeenCalled();
  await act(() => vi.advanceTimersByTimeAsync(2000));
  expect(button).toBeEnabled();
});
it("429 sem prazo não fornece contagem nem bloqueio artificial", () => {
  setup();
  expect(screen.queryByText(/segundos/)).not.toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Entrar" })).toBeEnabled();
});
it.each([
  "USUARIO_BLOQUEADO",
  "USUARIO_INATIVO",
  "SENHA_TEMPORARIA_EXPIRADA",
  "SENHA_TEMPORARIA_INVALIDADA",
])("orienta o usuário para %s", (codigo) => {
  expect(loginFeedback({ ...details, codigo }).message).toMatch(/coordenador/);
});
it("orienta correção de validação", () => {
  expect(loginFeedback({ ...details, status: 400 }).title).toBe(
    "Confira os dados",
  );
});
it.each(["passwordChanged", "expired"] as const)(
  "mostra feedback de %s",
  (notice) => {
    render(
      <ThemeProvider theme={createAppTheme("light")}>
        <LoginView authenticate={vi.fn()} notice={notice} />
      </ThemeProvider>,
    );
    expect(
      screen.getByText(
        notice === "passwordChanged" ? "Senha alterada" : "Tempo esgotado",
      ),
    ).toBeVisible();
  },
);
