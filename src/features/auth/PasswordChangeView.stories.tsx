import type { Meta, StoryObj } from "@storybook/react-vite";
import { userEvent, within } from "storybook/test";
import { PasswordChangeView } from "./PasswordChangeView";
import { ApiRequestError } from "../../shared/api/apiError";

const error = {
  status: 503,
  codigo: "SERVICO_INDISPONIVEL",
  titulo: "Serviço indisponível",
  mensagem: "Tente novamente.",
  endpoint: "/api/v1/autenticacao/alterar-senha",
};
const reused = {
  ...error,
  status: 400,
  codigo: "DADOS_INCONSISTENTES",
  erros: [
    {
      campo: "novaSenha",
      codigo: "senha_reutilizada",
      mensagem: "A nova senha deve ser diferente da senha atual.",
    },
  ],
};
const meta = {
  title: "Jornadas/Acesso/003 - Troca obrigatória de senha",
  component: PasswordChangeView,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Jornada JA-03 / Senha temporária e definição de nova senha do Figma (página 03.01.3), sobre o Access Layout. A senha temporária é informada no Login (JA-01), que encaminha para esta tela. Telas de referência no desktop: troca obrigatória 479:9026, nova senha 403:846, salvando 479:10819, senha definida 479:10839, política 479:10853, senhas diferentes 479:10873, senha reutilizada 479:10893, acesso expirado 479:10915 e falha 479:10929; tablet e mobile nas seções 479:10095 a 479:10098. Usa o Indicador de requisitos de senha (Regular a partir de 768 px, Compacto abaixo).",
      },
    },
  },
  args: { change: async () => undefined, onRestart: () => undefined },
} satisfies Meta<typeof PasswordChangeView>;
export default meta;
type Story = StoryObj<typeof meta>;
export const TrocaObrigatoria: Story = { name: "Troca obrigatória" };
export const NovaSenha: Story = { args: { initialStep: "form" } };
export const Carregando: Story = {
  args: { initialStep: "form", loading: true },
};
export const RequisitosNaoAtendidos: Story = {
  name: "Requisitos não atendidos",
  args: { initialStep: "form" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(
      canvas.getByRole("button", { name: "Salvar nova senha" }),
    );
  },
};
export const SenhaReutilizada: Story = {
  args: {
    initialStep: "form",
    initialError: reused,
    change: async () => {
      throw new ApiRequestError(reused);
    },
  },
};
export const ServicoIndisponivel: Story = {
  args: {
    initialStep: "form",
    initialError: error,
    change: async () => {
      throw new ApiRequestError(error);
    },
  },
};
export const SenhaDefinida: Story = {
  args: { initialStep: "success" },
};
export const AcessoExpirado: Story = {
  args: { initialError: { ...error, status: 401, codigo: "TOKEN_EXPIRADO" } },
};
