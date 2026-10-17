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
    <ThemeProvider theme={createAppTheme()}>
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
it.each(["USUARIO_BLOQUEADO", "USUARIO_INATIVO"])(
  "orienta o usuário para %s",
  (codigo) => {
    expect(loginFeedback({ ...details, codigo }).message).toMatch(
      /coordenador/,
    );
  },
);
it.each([
  ["SENHA_TEMPORARIA_EXPIRADA", "Senha temporária expirada"],
  ["SENHA_TEMPORARIA_INVALIDADA", "Limite atingido"],
])("%s oferece Recuperar senha", async (codigo, title) => {
  const onRecover = vi.fn();
  render(
    <ThemeProvider theme={createAppTheme()}>
      <LoginView
        authenticate={vi.fn()}
        initialError={{ ...details, status: 401, codigo }}
        onRecover={onRecover}
      />
    </ThemeProvider>,
  );
  expect(screen.getByText(title)).toBeVisible();
  fireEvent.click(screen.getByRole("button", { name: "Recuperar senha" }));
  expect(onRecover).toHaveBeenCalledOnce();
});
it("orienta correção de validação", () => {
  expect(loginFeedback({ ...details, status: 400 }).title).toBe(
    "Confira os dados",
  );
});
it.each([
  ["passwordChanged", "Senha alterada"],
  ["expired", "Sua sessão expirou. Faça um novo login para continuar."],
  ["invalidated", "Sua sessão não é mais válida. Faça um novo login."],
  ["loggedOut", "Seu acesso foi encerrado."],
] as const)("mostra feedback de %s", (notice, text) => {
  render(
    <ThemeProvider theme={createAppTheme()}>
      <LoginView authenticate={vi.fn()} notice={notice} />
    </ThemeProvider>,
  );
  expect(screen.getByText(text)).toBeVisible();
});
