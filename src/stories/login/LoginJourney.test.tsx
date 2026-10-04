import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "@mui/material";
import { createAppTheme } from "../../theme/appTheme";
import { ApiRequestError } from "../../shared/api/apiError";
import type { LoginResponse } from "../../features/auth/authenticationApi";
import { LoginJourney } from "./LoginJourney";
import type { LoginJourneyProps } from "./LoginJourney.types";

const credentials = { email: "jovem@exemplo.test", senha: "SenhaExemplo123" };
const success: LoginResponse = {
  tokenType: "Bearer",
  accessToken: "example",
  expiresIn: 900,
};
const problem = (status: number) =>
  new ApiRequestError({
    status,
    codigo: status === 401 ? "CREDENCIAIS_INVALIDAS" : "EXEMPLO",
    titulo: "Detalhe interno",
    mensagem: "Usuário inexistente",
    endpoint: "/api/v1/autenticacao/login",
  });
function setup(
  props: Partial<LoginJourneyProps> = {},
  mode: "light" | "dark" = "light",
) {
  const authenticate = vi.fn().mockResolvedValue(success);
  render(
    <ThemeProvider theme={createAppTheme(mode)}>
      <LoginJourney authenticate={authenticate} {...props} />
    </ThemeProvider>,
  );
  return { authenticate, user: userEvent.setup() };
}
const email = () => screen.getByRole("textbox", { name: /E-mail/ });
const password = () => screen.getByLabelText(/^Senha/);
const submit = () => screen.getByRole("button", { name: "Entrar" });

describe("Jornada de Login no Storybook", () => {
  it("permite preencher, alternar senha e enviar pelo teclado", async () => {
    const onAuthenticated = vi.fn();
    const { user, authenticate } = setup({ onAuthenticated });
    expect(email()).toHaveAttribute("autocomplete", "username");
    expect(password()).toHaveAttribute("autocomplete", "current-password");
    expect(password()).toHaveAttribute("type", "password");
    await user.type(email(), credentials.email);
    await user.type(password(), credentials.senha);
    await user.click(screen.getByRole("button", { name: "Mostrar senha" }));
    expect(password()).toHaveAttribute("type", "text");
    expect(screen.queryByRole("checkbox")).not.toBeInTheDocument();
    await user.click(password());
    await user.keyboard("{Enter}");
    await waitFor(() => expect(onAuthenticated).toHaveBeenCalledWith(success));
    expect(authenticate).toHaveBeenCalledWith(credentials);
    expect(
      screen.getByRole("heading", { name: "Acesso autorizado" }),
    ).toHaveFocus();
    expect(screen.queryByLabelText(/^Senha/)).not.toBeInTheDocument();
  });

  it("não envia um formulário vazio", async () => {
    const { user, authenticate } = setup();
    await user.click(submit());
    expect(authenticate).not.toHaveBeenCalled();
    expect(email()).toBeInvalid();
  });

  it("impede envio duplicado durante a requisição e preserva os campos", async () => {
    let resolve!: (value: LoginResponse) => void;
    const authenticate = vi.fn(
      () =>
        new Promise<LoginResponse>((done) => {
          resolve = done;
        }),
    );
    setup({ initialCredentials: credentials, authenticate });
    const form = screen.getByRole("form", { name: "Entrar" });
    fireEvent.submit(form);
    fireEvent.submit(form);
    expect(authenticate).toHaveBeenCalledTimes(1);
    expect(submit()).toBeDisabled();
    expect(form).toHaveAttribute("aria-busy", "true");
    expect(password()).toHaveValue(credentials.senha);
    expect(password()).toHaveAttribute("readonly");
    await act(async () => resolve(success));
  });

  it("apresenta o estado de carregamento estático sem enviar", () => {
    const { authenticate } = setup({
      loading: true,
      initialCredentials: credentials,
    });
    fireEvent.submit(screen.getByRole("form"));
    expect(submit()).toBeDisabled();
    expect(authenticate).not.toHaveBeenCalled();
  });

  it("401 limpa apenas a senha, usa mensagem genérica e devolve o foco", async () => {
    const authenticate = vi.fn().mockRejectedValue(problem(401));
    const { user } = setup({ initialCredentials: credentials, authenticate });
    await user.click(submit());
    await waitFor(() => expect(password()).toHaveFocus());
    expect(password()).toHaveValue("");
    expect(email()).toHaveValue(credentials.email);
    expect(screen.queryByRole("checkbox")).not.toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveTextContent(
      "E-mail ou senha incorretos",
    );
    expect(screen.queryByText("Usuário inexistente")).not.toBeInTheDocument();
    expect(password()).toHaveAttribute("aria-invalid", "true");
    await user.type(password(), "OutraSenha123");
    await user.click(submit());
    await waitFor(() => expect(authenticate).toHaveBeenCalledTimes(2));
  });

  it("abre a história de 401 com senha vazia e foco correto", () => {
    setup({
      initialCredentials: credentials,
      initialError: problem(401).details,
    });
    expect(password()).toHaveValue("");
    expect(password()).toHaveFocus();
  });

  it.each([0, 500, 503, 429])(
    "preserva valores após %s e permite nova tentativa",
    async (status) => {
      const authenticate = vi
        .fn()
        .mockRejectedValueOnce(problem(status))
        .mockResolvedValueOnce(success);
      const { user } = setup({ initialCredentials: credentials, authenticate });
      await user.click(submit());
      await screen.findByText(
        status === 429
          ? "Limite de tentativas atingido"
          : "Não foi possível entrar",
      );
      expect(email()).toHaveValue(credentials.email);
      expect(password()).toHaveValue(credentials.senha);
      expect(submit()).toBeEnabled();
      expect(
        screen.queryByText(/\d+\s*(segundos|minutos)/),
      ).not.toBeInTheDocument();
      await user.click(submit());
      await screen.findByRole("heading", { name: "Acesso autorizado" });
      expect(authenticate).toHaveBeenCalledTimes(2);
    },
  );

  it("normaliza uma exceção de rede não tipada", async () => {
    const { user } = setup({
      initialCredentials: credentials,
      authenticate: vi.fn().mockRejectedValue(new TypeError("Failed to fetch")),
    });
    await user.click(submit());
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Verifique sua conexão e tente novamente.",
    );
    expect(password()).toHaveValue(credentials.senha);
  });

  it("TROCA_SENHA desvia para alteração obrigatória sem autorizar acesso normal", async () => {
    const firstAccess: LoginResponse = {
      tokenType: "TROCA_SENHA",
      tokenTrocaSenha: "restricted",
      expiresIn: 900,
      trocaSenhaObrigatoria: true,
    };
    const onAuthenticated = vi.fn();
    const onPasswordChangeRequired = vi.fn();
    const { user } = setup({
      initialCredentials: credentials,
      authenticate: vi.fn().mockResolvedValue(firstAccess),
      onAuthenticated,
      onPasswordChangeRequired,
    });
    await user.click(submit());
    const heading = await screen.findByRole("heading", {
      name: "Altere sua senha",
    });
    expect(heading).toHaveFocus();
    expect(onPasswordChangeRequired).toHaveBeenCalledWith(firstAccess);
    expect(onAuthenticated).not.toHaveBeenCalled();
    expect(screen.queryByText("restricted")).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/^Senha/)).not.toBeInTheDocument();
  });

  it("mantém recuperação indisponível e usa a marca oficial no tema escuro", async () => {
    const { user } = setup({}, "dark");
    expect(screen.getByRole("img", { name: "PastorApp" })).toHaveAttribute(
      "src",
      expect.stringContaining("pastorapp-on-dark.svg"),
    );
    const link = screen.getByRole("link", { name: /Esqueci minha senha/ });
    expect(link).toHaveAttribute("aria-disabled", "true");
    const previousHash = window.location.hash;
    await user.click(link);
    expect(window.location.hash).toBe(previousHash);
  });
});
