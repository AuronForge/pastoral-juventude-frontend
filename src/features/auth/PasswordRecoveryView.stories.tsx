import { fireEvent, userEvent, within } from "storybook/test";
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
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Jornada JA-02 / Recuperação de senha do Figma (página 03.01.2), sobre o Access Layout. Telas de referência no desktop: identificar 403:14, gerando 403:56, senha gerada 403:101, dados obrigatórios 479:5941, identificação não localizada 479:5963, recuperação em andamento 479:5987, limite 479:6011, falha de conexão 479:6035 e calendário aberto 403:457; tablet e mobile nas seções 479:9002 a 479:9007. Sem envio por e-mail: a senha temporária é exibida uma única vez e vale 15 minutos. Conta inativa, contagem da validade, expiração e nova solicitação não têm tela no Figma (pendência de desenho).",
      },
    },
  },
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
export const DadosObrigatorios: Story = {
  name: "Dados obrigatórios",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(
      canvas.getByRole("button", { name: "Gerar senha temporária" }),
    );
  },
};
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
    fireEvent.change(canvas.getByLabelText(/Data de nascimento/u), {
      target: { value: "01/01/2000" },
    });
    await userEvent.type(
      canvas.getByLabelText(/Nome da paróquia/u),
      "São João",
    );
    await userEvent.click(
      canvas.getByRole("button", { name: "Gerar senha temporária" }),
    );
    await canvas.findByRole("heading", { name: "Senha temporária gerada" });
  },
};
