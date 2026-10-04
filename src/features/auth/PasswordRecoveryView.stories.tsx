import { userEvent, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { PasswordRecoveryView } from "./PasswordRecoveryView";
const error = {
  status: 404,
  codigo: "DADOS_RECUPERACAO_NAO_LOCALIZADOS",
  titulo: "Dados não localizados",
  mensagem: "Confira os dados.",
  endpoint: "/api/v1/autenticacao/recuperar-senha",
};
const meta = {
  title: "Jornadas/Acesso/002 - Recuperação de senha",
  component: PasswordRecoveryView,
  parameters: { layout: "fullscreen" },
  args: {
    recover: async () => ({
      senhaTemporaria: "exemplo-ficticio",
      expiraEm: new Date(Date.now() + 900000).toISOString(),
      trocaSenhaObrigatoria: true,
    }),
    onBack: () => undefined,
  },
} satisfies Meta<typeof PasswordRecoveryView>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Padrao: Story = {};
export const Carregando: Story = { args: { loading: true } };
export const DadosNaoConferem: Story = { args: { initialError: error } };
export const RecuperacaoEmAndamento: Story = {
  args: {
    initialError: {
      ...error,
      status: 409,
      codigo: "RECUPERACAO_SENHA_EM_ANDAMENTO",
    },
  },
};
export const ContaInativa: Story = {
  args: { initialError: { ...error, status: 403, codigo: "USUARIO_INATIVO" } },
};
export const MuitasTentativas: Story = {
  args: {
    initialError: {
      ...error,
      status: 429,
      codigo: "LIMITE_TENTATIVAS_EXCEDIDO",
      retryAfterAt: Date.now() + 1800000,
    },
  },
};
export const ServicoIndisponivel: Story = {
  args: {
    initialError: { ...error, status: 503, codigo: "SERVICO_INDISPONIVEL" },
  },
};

export const SenhaTemporariaGerada: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(
      canvas.getByLabelText(/Nome completo/u),
      "Maria Silva",
    );
    await userEvent.type(
      canvas.getByLabelText(/E-mail/u),
      "maria@exemplo.invalid",
    );
    await userEvent.type(
      canvas.getByLabelText(/Data de nascimento/u),
      "01/01/2000",
    );
    await userEvent.type(canvas.getByLabelText(/Paróquia/u), "São João");
    await userEvent.click(
      canvas.getByRole("button", { name: "Ver minha senha temporária" }),
    );
    await canvas.findByRole("heading", { name: "Sua senha temporária" });
  },
};
