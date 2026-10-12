import { act, fireEvent, render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material";
import { createAppTheme } from "../../theme/appTheme";
import { ApiRequestError } from "../../shared/api/apiError";
import {
  PasswordChangeView,
  type PasswordChangeViewProps,
} from "./PasswordChangeView";

function setup(props: Partial<PasswordChangeViewProps> = {}) {
  const change = vi.fn().mockResolvedValue(undefined);
  const onCompleted = vi.fn();
  const onRestart = vi.fn();
  render(
    <ThemeProvider theme={createAppTheme()}>
      <PasswordChangeView
        change={change}
        onCompleted={onCompleted}
        onRestart={onRestart}
        initialStep="form"
        {...props}
      />
    </ThemeProvider>,
  );
  return { change, onCompleted, onRestart };
}
const password = () => screen.getByLabelText(/^Nova senha/);
const confirmation = () => screen.getByLabelText(/^Confirmar nova senha/);
function fill(value = "NovaSenha123!", repeat = value) {
  fireEvent.change(password(), { target: { value } });
  fireEvent.change(confirmation(), { target: { value: repeat } });
}
const submit = () => fireEvent.submit(screen.getByRole("form"));
const problem = (
  status: number,
  erros?: { campo: string; codigo: string; mensagem: string }[],
) =>
  new ApiRequestError({
    status,
    codigo: "EXEMPLO",
    titulo: "Detalhe interno",
    mensagem: "Mensagem interna",
    endpoint: "/api/v1/autenticacao/alterar-senha",
    erros,
  });

it("começa pela tela informativa e abre o formulário", () => {
  setup({ initialStep: undefined });
  expect(
    screen.getByRole("heading", { name: "Defina sua senha" }),
  ).toHaveFocus();
  expect(screen.getByText("Primeiro acesso ou recuperação")).toBeVisible();
  fireEvent.click(screen.getByRole("button", { name: "Definir minha senha" }));
  expect(password()).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: "Defina sua senha" }),
  ).toHaveFocus();
});

it("valida ao enviar com as mensagens do Figma", () => {
  const { change } = setup();
  submit();
  expect(change).not.toHaveBeenCalled();
  expect(
    screen.getByText("Use de 8 a 128 caracteres, sem espaços."),
  ).toBeVisible();
  expect(screen.getByText("Confirme a nova senha.")).toBeVisible();
  expect(password()).toHaveFocus();
  fill("Nova senha 1", "Nova senha 1");
  submit();
  expect(change).not.toHaveBeenCalled();
  fill("NovaSenha123!", "OutraSenha123!");
  submit();
  expect(screen.getByText("As senhas não coincidem.")).toBeVisible();
  expect(confirmation()).toHaveFocus();
  expect(change).not.toHaveBeenCalled();
});

it("atualiza o indicador de requisitos enquanto digita", () => {
  setup();
  const items = () => screen.getAllByRole("listitem");
  expect(items().map((item) => item.dataset.state)).toEqual([
    "pending",
    "pending",
    "pending",
  ]);
  fireEvent.change(password(), { target: { value: "abc def" } });
  expect(items().map((item) => item.dataset.state)).toEqual([
    "unmet",
    "unmet",
    "pending",
  ]);
  fireEvent.change(password(), { target: { value: "NovaSenha123!" } });
  expect(items().map((item) => item.dataset.state)).toEqual([
    "met",
    "met",
    "pending",
  ]);
});

it("salva e mostra Senha definida antes de ir ao login", async () => {
  const { change, onCompleted } = setup();
  fill();
  submit();
  expect(change).toHaveBeenCalledWith({
    novaSenha: "NovaSenha123!",
    confirmacaoNovaSenha: "NovaSenha123!",
  });
  await screen.findByRole("heading", { name: "Senha definida" });
  expect(screen.getByText("Senha alterada com sucesso")).toBeVisible();
  expect(onCompleted).not.toHaveBeenCalled();
  fireEvent.click(screen.getByRole("button", { name: "Ir para o login" }));
  expect(onCompleted).toHaveBeenCalledOnce();
});

it("impede envio concorrente e desabilita os campos", async () => {
  let release!: () => void;
  const change = vi.fn(
    () =>
      new Promise<void>((resolve) => {
        release = resolve;
      }),
  );
  setup({ change });
  fill();
  submit();
  submit();
  expect(change).toHaveBeenCalledOnce();
  expect(password()).toBeDisabled();
  await act(async () => release());
});

it("senha reutilizada marca o requisito e mostra Escolha outra senha", async () => {
  const change = vi.fn().mockRejectedValue(
    problem(400, [
      {
        campo: "novaSenha",
        codigo: "senha_reutilizada",
        mensagem: "Interna",
      },
    ]),
  );
  setup({ change });
  fill();
  submit();
  await screen.findByText("Escolha outra senha");
  expect(screen.getAllByRole("listitem")[2].dataset.state).toBe("unmet");
  expect(password()).toHaveValue("NovaSenha123!");
  fireEvent.change(password(), { target: { value: "OutraSenha123!" } });
  expect(screen.getAllByRole("listitem")[2].dataset.state).toBe("pending");
});

it.each([0, 403, 503])(
  "preserva valores e permite repetição após %s",
  async (status) => {
    const change = vi
      .fn()
      .mockRejectedValueOnce(problem(status))
      .mockResolvedValueOnce(undefined);
    setup({ change });
    fill();
    submit();
    await screen.findByText("Não foi possível salvar");
    expect(screen.queryByText("Mensagem interna")).not.toBeInTheDocument();
    expect(password()).toHaveValue("NovaSenha123!");
    submit();
    await screen.findByRole("heading", { name: "Senha definida" });
  },
);

it("401 descarta as senhas e oferece voltar ao login", async () => {
  const { onRestart } = setup({
    change: vi.fn().mockRejectedValue(problem(401)),
  });
  fill();
  submit();
  await screen.findByRole("heading", { name: "Valide seu acesso novamente" });
  expect(screen.getByText("Acesso temporário expirado")).toBeVisible();
  fireEvent.click(screen.getByRole("link", { name: "Voltar ao login" }));
  expect(onRestart).toHaveBeenCalledOnce();
});

it("reflete carregamento externo", () => {
  setup({ loading: true });
  expect(password()).toBeDisabled();
  expect(confirmation()).toBeDisabled();
});
