import { Box } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { DisplayField } from "./DisplayField";

const meta: Meta<typeof DisplayField> = {
  title: "Design System/Componentes/Campo de exibição",
  component: DisplayField,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          'Campo de exibição do Figma (página 02.6.36): rótulo e valor somente leitura. Orientações Vertical e Horizontal (rótulo com 120 px); densidades Padrão (16 px) e Compacto (8 px); tipos Texto e Link (usa o Link do design system). Valor ausente exibe "-". Mascarado oculta o valor; revelar e copiar só aparecem quando a autorização permitir. Copiar mostra "Copiado" por 2 s e anuncia para leitores de tela; revelar alterna para "Ocultar".',
      },
    },
  },
  args: {
    label: "Nome completo",
    value: "João da Silva",
    orientation: "vertical",
    density: "standard",
    type: "text",
  },
  argTypes: {
    orientation: {
      control: "inline-radio",
      options: ["vertical", "horizontal"],
    },
    density: { control: "inline-radio", options: ["standard", "compact"] },
    type: { control: "inline-radio", options: ["text", "link"] },
  },
  decorators: [
    (Story) => (
      <Box
        sx={{ maxWidth: 360, backgroundColor: "var(--pj-color-bg-surface)" }}
      >
        <Story />
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof DisplayField>;

export const Preenchido: Story = {};

export const Vazio: Story = { args: { label: "Telefone", value: null } };

export const Horizontal: Story = {
  args: { orientation: "horizontal" },
};

export const Compacto: Story = {
  args: { density: "compact" },
};

export const TextoCopiavel: Story = {
  name: "Texto copiável",
  args: { label: "E-mail", value: "jose@pastoral.org.br", copyable: true },
};

export const LinkECopiar: Story = {
  name: "Link + copiar",
  args: {
    label: "Portal",
    value: "pastoral.org.br",
    type: "link",
    href: "https://pastoral.org.br",
    orientation: "horizontal",
    copyable: true,
  },
};

export const MascaradoAutorizado: Story = {
  name: "Mascarado — role autorizada",
  args: {
    label: "CPF",
    value: "123.456.789-00",
    masked: true,
    canReveal: true,
    copyable: true,
  },
};

export const MascaradoSemPermissao: Story = {
  name: "Mascarado — sem permissão",
  args: {
    label: "Documento",
    value: undefined,
    masked: true,
    orientation: "horizontal",
    density: "compact",
  },
};

export const ConteudoLongo: Story = {
  name: "Conteúdo longo",
  args: {
    label: "Observações",
    value:
      "Participa do grupo de música desde 2022 e ajuda na organização dos encontros mensais da pastoral.",
    orientation: "horizontal",
  },
};
