import type { Meta, StoryObj } from "@storybook/react-vite";
import { PasswordChangeView } from "./PasswordChangeView";
import { ApiRequestError } from "../../shared/api/apiError";

const error = {
  status: 503,
  codigo: "SERVICO_INDISPONIVEL",
  titulo: "Serviço indisponível",
  mensagem: "Tente novamente.",
  endpoint: "/api/v1/autenticacao/alterar-senha",
};
const meta = {
  title: "Jornadas/Acesso/003 - Troca obrigatória de senha",
  component: PasswordChangeView,
  parameters: { layout: "fullscreen" },
  args: { change: async () => undefined, onRestart: () => undefined },
} satisfies Meta<typeof PasswordChangeView>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Padrao: Story = {};
export const Carregando: Story = { args: { loading: true } };
export const FalhaDeRede: Story = {
  args: {
    change: async () => {
      throw new TypeError("Failed to fetch");
    },
  },
};
export const ServicoIndisponivel: Story = {
  args: {
    initialError: error,
    change: async () => {
      throw new ApiRequestError(error);
    },
  },
};
export const TokenExpirado: Story = {
  args: { initialError: { ...error, status: 401, codigo: "TOKEN_EXPIRADO" } },
};
