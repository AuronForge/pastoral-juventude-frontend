import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  ApiRequestError,
  createCommunicationError,
  type ApiErrorDetails,
} from "../../shared/api/apiError";
import type { LoginResponse } from "../../features/auth/authenticationApi";
import { LoginJourney } from "./LoginJourney";

const credentials = { email: "jovem@exemplo.test", senha: "SenhaExemplo123" };
const success: LoginResponse = {
  tokenType: "Bearer",
  accessToken: "storybook-only",
  expiresIn: 900,
};
const firstAccess: LoginResponse = {
  tokenType: "TROCA_SENHA",
  tokenTrocaSenha: "storybook-change-only",
  expiresIn: 900,
  trocaSenhaObrigatoria: true,
};
const invalid: ApiErrorDetails = {
  status: 401,
  codigo: "CREDENCIAIS_INVALIDAS",
  titulo: "Não autorizado",
  mensagem: "Credenciais inválidas.",
  endpoint: "/api/v1/autenticacao/login",
};
const limited: ApiErrorDetails = {
  ...invalid,
  status: 429,
  codigo: "LIMITE_TENTATIVAS",
  titulo: "Limite de tentativas",
  mensagem: "Tente novamente mais tarde.",
};
const serverError: ApiErrorDetails = {
  ...invalid,
  status: 503,
  codigo: "SERVICO_INDISPONIVEL",
  titulo: "Serviço indisponível",
  mensagem: "Tente novamente.",
};
const networkError = createCommunicationError("/api/v1/autenticacao/login");

// Latência de demonstração, sem requests reais nem persistência de sessão/credenciais.
async function respond(response: LoginResponse) {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return response;
}
async function reject(error: ApiErrorDetails): Promise<LoginResponse> {
  await new Promise((resolve) => setTimeout(resolve, 600));
  throw new ApiRequestError(error);
}

const meta = {
  title: "Jornadas/Acesso/001 - Login",
  component: LoginJourney,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Composição dos componentes aprovados, sem AccessLayout. Referências: Figma 86:433 (desktop), 86:759 (tablet), 103:2220 (celular), 86:560 (401) e 86:693 (alerta bloqueante). Usa BrandLockup oficial no lugar da antiga sigla PJ. Respostas simuladas com o contrato de login existente, sem backend, Redux global ou armazenamento de tokens. O término desta história indica a fronteira de navegação; a troca está na história 003. O formulário não oferece a opção de continuar conectado; o contrato atual não recebe essa opção. Recuperação de senha permanece indisponível; logout e renovação estão fora do escopo. As mensagens de erro são genéricas, sem reproduzir detalhes internos da API. 429 sem cabeçalho válido não usa temporizador; com prazo recebido, bloqueia envio até sua liberação. Os helpers reservados pelos campos aprovados são mantidos; não se altera a API dos componentes nesta composição.",
      },
    },
  },
  args: { authenticate: () => respond(success) },
  argTypes: {
    authenticate: { control: false },
    initialCredentials: { control: false },
    initialError: { control: false },
    onAuthenticated: { control: false },
    onPasswordChangeRequired: { control: false },
  },
} satisfies Meta<typeof LoginJourney>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = { name: "Login padrão" };
export const Carregando: Story = {
  args: { initialCredentials: credentials, loading: true },
};
export const CredenciaisInvalidas: Story = {
  name: "Credenciais inválidas (401)",
  args: {
    initialCredentials: credentials,
    initialError: invalid,
    authenticate: () => reject(invalid),
  },
};
export const LimiteDeTentativas: Story = {
  name: "Limite de tentativas (429)",
  args: {
    initialCredentials: credentials,
    initialError: limited,
    authenticate: () => reject(limited),
  },
};
export const FalhaDeRede: Story = {
  args: { initialCredentials: credentials, initialError: networkError },
  parameters: {
    docs: {
      description: {
        story:
          "Valores preservados. Entrar simula uma nova tentativa bem-sucedida.",
      },
    },
  },
};
export const ServicoIndisponivel: Story = {
  name: "Serviço indisponível (503)",
  args: { initialCredentials: credentials, initialError: serverError },
};
export const PrimeiroAcesso: Story = {
  args: {
    initialCredentials: credentials,
    authenticate: () => respond(firstAccess),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Acione Entrar para demonstrar o desvio obrigatório: TROCA_SENHA não concede acesso normal. A página de alteração de senha está disponível na jornada 003.",
      },
    },
  },
};

export const SenhaAlterada: Story = { args: { notice: "passwordChanged" } };
export const LimiteComPrazo: Story = {
  args: {
    initialCredentials: credentials,
    authenticate: () =>
      reject({ ...limited, retryAfterAt: Date.now() + 73000 }),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Acione Entrar para receber um prazo simulado da API; o contador não existe sem esse prazo.",
      },
    },
  },
};
