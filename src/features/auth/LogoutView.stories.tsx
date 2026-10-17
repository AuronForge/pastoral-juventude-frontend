import type { Meta, StoryObj } from "@storybook/react-vite";
import { userEvent, within } from "storybook/test";
import { LogoutView } from "./LogoutView";
import { ApiRequestError } from "../../shared/api/apiError";

const error = {
  status: 503,
  codigo: "SERVICO_INDISPONIVEL",
  titulo: "Serviço indisponível",
  mensagem: "Tente novamente.",
  endpoint: "/api/v1/autenticacao/logout",
  correlationId: "00000000-0000-4000-8000-000000000001",
};
const meta = {
  title: "Jornadas/Acesso/004 - Sessão e saída",
  component: LogoutView,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          'Jornada JA-04 / Sessão e saída do Figma (página 03.01.4), sobre o Access Layout. Tela de referência: sessão ativa 479:12633 (desktop), 479:12640 (tablet) e 403:1210 (mobile). Após sair, o Login exibe o aviso "Você saiu"; sessão expirada e invalidada usam os avisos do Login (479:12667 e 479:12687). A falha ao sair não tem tela no Figma (pendência).',
      },
    },
  },
  args: { logout: () => Promise.resolve(), onLoggedOut: () => undefined },
} satisfies Meta<typeof LogoutView>;
export default meta;
type Story = StoryObj<typeof meta>;
export const SessaoAtiva: Story = { name: "Sessão ativa" };
export const Saindo: Story = {
  args: { logout: () => new Promise<void>(() => undefined) },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Sair" }));
  },
};
export const FalhaAoSair: Story = {
  name: "Falha ao sair",
  args: {
    initialError: error,
    logout: async () => {
      throw new ApiRequestError(error);
    },
  },
};
