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
import {
  PasswordChangeView,
  type PasswordChangeViewProps,
} from "./PasswordChangeView";
import { ApiRequestError } from "../../shared/api/apiError";

function setup(
  props: Partial<PasswordChangeViewProps> = {},
  mode: "light" | "dark" = "light",
) {
  const change = vi.fn().mockResolvedValue(undefined);
  const onRestart = vi.fn();
  render(
    <ThemeProvider theme={createAppTheme(mode)}>
      <PasswordChangeView change={change} onRestart={onRestart} {...props} />
    </ThemeProvider>,
  );
  return { change, onRestart, user: userEvent.setup() };
}
const password = () => screen.getByLabelText(/^Nova senha/);
const confirmation = () => screen.getByLabelText(/^Repita a nova senha/);
const submit = () => screen.getByRole("button", { name: "Salvar senha" });
function fill(a = "NovaSenha123!", b = a) {
  fireEvent.change(password(), { target: { value: a } });
  fireEvent.change(confirmation(), { target: { value: b } });
}
const problem = (status: number) =>
  new ApiRequestError({
    status,
    codigo: "EXEMPLO",
    titulo: "Erro",
    mensagem: "Senha já utilizada.",
    endpoint: "/api/v1/autenticacao/alterar-senha",
    erros: [
      {
        campo: "novaSenha",
        codigo: "REUTILIZADA",
        mensagem: "Use outra senha.",
      },
      {
        campo: "confirmacaoNovaSenha",
        codigo: "DIFERENTE",
        mensagem: "Confira a confirmação.",
      },
    ],
  });

it("foca título e impede envio vazio ou com critérios inválidos", () => {
  const { change } = setup();
  expect(screen.getByRole("heading", { name: "Crie sua senha" })).toHaveFocus();
  expect(submit()).toBeDisabled();
  fireEvent.submit(screen.getByRole("form"));
  fill("curta");
  expect(submit()).toBeDisabled();
  fill("Senha com espaco");
  expect(submit()).toBeDisabled();
  fill("a".repeat(129));
  expect(submit()).toBeDisabled();
  expect(change).not.toHaveBeenCalled();
});
it("valida confirmação e devolve foco ao campo correto", () => {
  const { change } = setup();
  fill("NovaSenha123!", "OutraSenha123!");
  fireEvent.submit(screen.getByRole("form"));
  expect(confirmation()).toHaveFocus();
  expect(screen.getByText("As senhas precisam ser iguais.")).toBeVisible();
  expect(change).not.toHaveBeenCalled();
  fireEvent.change(confirmation(), { target: { value: "NovaSenha123!" } });
  expect(
    screen.queryByText("As senhas precisam ser iguais."),
  ).not.toBeInTheDocument();
});
it("salva sem senha atual e conclui o fluxo", async () => {
  const onCompleted = vi.fn();
  const { change, user } = setup({ onCompleted }, "dark");
  fill();
  await user.click(submit());
  await waitFor(() => expect(onCompleted).toHaveBeenCalledOnce());
  expect(change).toHaveBeenCalledWith({
    novaSenha: "NovaSenha123!",
    confirmacaoNovaSenha: "NovaSenha123!",
  });
  expect(password()).toHaveValue("");
});
it("impede envio concorrente", async () => {
  let resolve!: () => void;
  const change = vi.fn(
    () =>
      new Promise<void>((done) => {
        resolve = done;
      }),
  );
  setup({ change });
  fill();
  fireEvent.submit(screen.getByRole("form"));
  fireEvent.submit(screen.getByRole("form"));
  expect(change).toHaveBeenCalledOnce();
  expect(password()).toHaveAttribute("readonly");
  await act(async () => resolve());
});
it.each([0, 400, 403, 503])(
  "preserva valores e permite repetição após %s",
  async (status) => {
    const change = vi
      .fn()
      .mockRejectedValue(
        status === 0 ? new TypeError("fetch") : problem(status),
      );
    const { user } = setup({ change });
    fill();
    await user.click(submit());
    await screen.findByText("Não foi possível salvar");
    expect(password()).toHaveValue("NovaSenha123!");
    expect(confirmation()).toHaveValue("NovaSenha123!");
    expect(submit()).toBeEnabled();
    if (status === 400)
      expect(screen.getByText("Use outra senha.")).toBeVisible();
  },
);
it("descarta senhas em 401 e permite reiniciar o acesso", async () => {
  const { user, onRestart } = setup({
    change: vi.fn().mockRejectedValue(problem(401)),
  });
  fill();
  await user.click(submit());
  await user.click(
    await screen.findByRole("button", { name: "Voltar ao Login" }),
  );
  expect(onRestart).toHaveBeenCalledOnce();
  expect(screen.queryByLabelText(/^Nova senha/)).not.toBeInTheDocument();
});
it("reflete carregamento externo", () => {
  setup({ loading: true });
  fill();
  fireEvent.submit(screen.getByRole("form"));
  expect(screen.getByRole("form")).toHaveAttribute("aria-busy", "true");
});
