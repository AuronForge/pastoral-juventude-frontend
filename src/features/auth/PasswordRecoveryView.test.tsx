import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { ThemeProvider } from "@mui/material";
import { createAppTheme } from "../../theme/appTheme";
import {
  PasswordRecoveryView,
  type PasswordRecoveryViewProps,
} from "./PasswordRecoveryView";
import { ApiRequestError } from "../../shared/api/apiError";
const result = () => ({
  senhaTemporaria: "fictional-temporary",
  expiraEm: new Date(Date.now() + 900000).toISOString(),
  trocaSenhaObrigatoria: true as const,
});
function setup(props: Partial<PasswordRecoveryViewProps> = {}) {
  const recover = vi.fn().mockImplementation(async () => result());
  const onBack = vi.fn();
  const rendered = render(
    <ThemeProvider theme={createAppTheme()}>
      <PasswordRecoveryView recover={recover} onBack={onBack} {...props} />
    </ThemeProvider>,
  );
  return { recover, onBack, ...rendered };
}
function fill(date = "29/02/2000") {
  for (const [label, value] of [
    [/^Nome completo/, "  Maria Silva  "],
    [/^E-mail/, "  MARIA@EXEMPLO.TEST "],
    [/^Data de nascimento/, date],
    [/^Nome da paróquia/, "  São   João  "],
  ] as const)
    fireEvent.change(screen.getByLabelText(label), { target: { value } });
}
function submit() {
  fireEvent.submit(screen.getByRole("form"));
}
afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});
it("foca título, valida os quatro campos e mantém foco no primeiro erro", () => {
  const { recover } = setup();
  expect(
    screen.getByRole("heading", { name: "Recupere seu acesso" }),
  ).toHaveFocus();
  submit();
  expect(recover).not.toHaveBeenCalled();
  expect(screen.getByLabelText(/^Nome completo/)).toHaveFocus();
  expect(screen.getByLabelText(/^Data de nascimento/)).toHaveAttribute(
    "placeholder",
    "DD/MM/AAAA",
  );
  fill("29/02/2001");
  submit();
  expect(recover).not.toHaveBeenCalled();
  expect(screen.getByLabelText(/^Data de nascimento/)).toHaveFocus();
  expect(screen.getByText("Data inválida")).toBeVisible();
});
it("usa as mensagens de validação do Figma", () => {
  setup();
  submit();
  for (const text of [
    "Informe seu nome completo.",
    "Informe um e-mail válido.",
    "Data inválida",
    "Informe o nome da paróquia.",
  ])
    expect(screen.getByText(text)).toBeVisible();
});
it("normaliza request, exibe senha uma vez sem storage e devolve foco", async () => {
  const local = vi.spyOn(Storage.prototype, "setItem");
  const { recover } = setup();
  fill();
  submit();
  await screen.findByRole("heading", { name: "Senha temporária gerada" });
  expect(recover).toHaveBeenCalledWith({
    nome: "Maria Silva",
    email: "maria@exemplo.test",
    dataNascimento: "2000-02-29",
    nomeParoquia: "São João",
  });
  await waitFor(() =>
    expect(
      screen.getByRole("heading", { name: "Senha temporária gerada" }),
    ).toHaveFocus(),
  );
  const field = screen.getByLabelText("Sua senha temporária");
  expect(field).toHaveValue("fictional-temporary");
  expect(field).toHaveAttribute("type", "password");
  expect(field).toHaveAttribute("readonly");
  fireEvent.click(screen.getByRole("button", { name: "Mostrar senha" }));
  expect(field).toHaveAttribute("type", "text");
  expect(local).not.toHaveBeenCalled();
  expect(screen.getByRole("button", { name: /Pedir outra em/ })).toBeDisabled();
});
it("Entrar com senha temporária leva ao Login", async () => {
  const { onBack } = setup();
  fill();
  submit();
  fireEvent.click(
    await screen.findByRole("button", { name: "Entrar com senha temporária" }),
  );
  expect(onBack).toHaveBeenCalledOnce();
});
it("previne envio duplicado e ignora resposta após sair da tela", async () => {
  let release!: (value: ReturnType<typeof result>) => void;
  const recover = vi.fn(
    () =>
      new Promise<ReturnType<typeof result>>((resolve) => {
        release = resolve;
      }),
  );
  const { unmount } = setup({ recover });
  fill();
  submit();
  submit();
  expect(recover).toHaveBeenCalledOnce();
  expect(
    screen.getByRole("button", { name: "Gerar senha temporária" }),
  ).toBeDisabled();
  expect(screen.getByLabelText(/^Nome completo/)).toBeDisabled();
  unmount();
  await act(async () => {
    release(result());
  });
  setup();
  expect(
    screen.queryByDisplayValue("fictional-temporary"),
  ).not.toBeInTheDocument();
});
it("copia somente após ação explícita e trata indisponibilidade do clipboard", async () => {
  const writeText = vi.fn().mockResolvedValue(undefined);
  Object.defineProperty(navigator, "clipboard", {
    value: { writeText },
    configurable: true,
  });
  setup();
  fill();
  submit();
  await screen.findByRole("heading", { name: "Senha temporária gerada" });
  expect(writeText).not.toHaveBeenCalled();
  fireEvent.click(screen.getByRole("button", { name: "Copiar senha" }));
  await screen.findByText("Senha temporária copiada.");
  expect(writeText).toHaveBeenCalledWith("fictional-temporary");
  writeText.mockRejectedValue(new Error("clipboard"));
  fireEvent.click(screen.getByRole("button", { name: "Copiar senha" }));
  await screen.findByText(/Selecione o valor e copie manualmente/);
});
it.each([
  [404, "DADOS_RECUPERACAO_NAO_LOCALIZADOS", "Confira os dados informados"],
  [409, "RECUPERACAO_SENHA_EM_ANDAMENTO", "Recuperação já iniciada"],
  [403, "USUARIO_INATIVO", "Esta conta está inativa"],
  [429, "LIMITE_TENTATIVAS_EXCEDIDO", "Aguarde para tentar novamente"],
  [503, "SERVICO_INDISPONIVEL", "Não foi possível recuperar"],
])(
  "trata %s sem divulgar campo divergente ou segredo",
  async (status, codigo, title) => {
    const recover = vi.fn().mockRejectedValue(
      new ApiRequestError({
        status,
        codigo,
        titulo: "Detalhe interno",
        mensagem: "Dado específico divergente",
        endpoint: "/api/v1/autenticacao/recuperar-senha",
      }),
    );
    setup({ recover });
    fill();
    submit();
    await screen.findByText(title);
    expect(
      screen.queryByText("Dado específico divergente"),
    ).not.toBeInTheDocument();
    expect(screen.getByLabelText(/^Nome completo/)).toHaveValue(
      "  Maria Silva  ",
    );
    if (status === 429)
      expect(
        screen.getByRole("button", { name: "Gerar senha temporária" }),
      ).toBeDisabled();
  },
);
it("erro de rede mantém valores e permite tentar novamente", async () => {
  const { recover } = setup();
  recover.mockRejectedValueOnce(new TypeError("network"));
  fill();
  submit();
  await screen.findByText("Não foi possível recuperar");
  submit();
  await screen.findByRole("heading", { name: "Senha temporária gerada" });
});
it("volta ao login pelo link e usa a marca aprovada", () => {
  const { onBack } = setup({});
  const link = screen.getByRole("link", { name: "Voltar ao login" });
  expect(link).toHaveAttribute("href", "/login");
  fireEvent.click(link);
  expect(onBack).toHaveBeenCalledOnce();
  expect(screen.getByRole("img", { name: /PastorApp/ })).toHaveAttribute(
    "src",
    expect.stringContaining("on-light"),
  );
});
it("expiração libera novo formulário e remove o valor da tela", async () => {
  vi.useFakeTimers();
  setup();
  fill();
  submit();
  await act(async () => {});
  await act(async () => {
    vi.advanceTimersByTime(901000);
  });
  expect(
    screen.queryByDisplayValue("fictional-temporary"),
  ).not.toBeInTheDocument();
  expect(screen.getByText("Senha temporária expirada.")).toBeVisible();
  fireEvent.click(
    screen.getByRole("button", { name: "Pedir outra senha temporária" }),
  );
  expect(
    screen.getByRole("heading", { name: "Recupere seu acesso" }),
  ).toBeVisible();
});
it("Retry-After libera nova tentativa sem retry automático", async () => {
  vi.useFakeTimers();
  const { recover } = setup({
    initialError: {
      status: 429,
      codigo: "LIMITE_TENTATIVAS_EXCEDIDO",
      titulo: "Erro",
      mensagem: "Espere",
      endpoint: "test",
      retryAfterAt: Date.now() + 2000,
    },
  });
  expect(
    screen.getByRole("button", { name: "Gerar senha temporária" }),
  ).toBeDisabled();
  await act(async () => {
    vi.advanceTimersByTime(3000);
  });
  expect(
    screen.getByRole("button", { name: "Gerar senha temporária" }),
  ).not.toBeDisabled();
  expect(recover).not.toHaveBeenCalled();
});
