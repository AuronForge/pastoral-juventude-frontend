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
          "Jornada JA-01 / Login do Figma (página 03.01.1), montada sobre o Access Layout. Telas de referência no desktop: login 402:14, preenchido 479:506, autenticando 479:524, sessão concedida 479:542, campos inválidos 479:556, credenciais inválidas 479:574, limite de tentativas 479:594, falha de conexão 479:614 e senha visível 479:634; seções de tablet 479:2532/479:2533 e de mobile 479:2534/479:2535. E-mail normalizado por trim + lowercase, erro genérico sem indicar qual credencial divergiu e sem Continuar conectado. Respostas simuladas, sem backend nem armazenamento de tokens. Cenários sem tela no Figma (usuário bloqueado ou inativo, senha temporária indisponível, erro 400, contagem regressiva e avisos ao voltar) são mantidos como pendência de desenho.",
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
export const Preenchido: Story = {
  args: { initialCredentials: credentials },
  parameters: {
    docs: {
      description: {
        story:
          "Acione Entrar para ver a sessão concedida (Acesso autorizado) antes do redirecionamento.",
      },
    },
  },
};
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
