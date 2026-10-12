import { Stack, Typography } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Link } from "./Link";

const meta = {
  title: "Design System/Componentes/Link",
  component: Link,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Link do Figma: navegação textual para destinos internos e externos. Use texto descritivo (prefira “Visualizar termo” a “Clique aqui”). O sublinhado mantém o link reconhecível sem depender somente da cor. O ícone externo é opcional, mas recomendado quando o conteúdo abrir em outra aba ou aplicativo. O estado desabilitado não é interativo nem recebe foco.",
      },
    },
  },
  args: {
    children: "Voltar ao acesso",
    href: "/acesso",
  },
  argTypes: {
    children: { control: "text" },
    disabled: { control: "boolean" },
    externalIcon: { control: "boolean" },
    href: { control: "text" },
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Tipos: Story = {
  render: () => (
    <Stack spacing={2} sx={{ alignItems: "flex-start" }}>
      <Link href="/encontros">Voltar aos encontros</Link>
      <Link externalIcon href="https://exemplo.org/termo" target="_blank">
        Visualizar termo
      </Link>
    </Stack>
  ),
};

export const Estados: Story = {
  render: () => (
    <Stack spacing={2}>
      <Link href="/termos">Ler termos de uso</Link>
      <Link disabled href="/termos">
        Ler termos de uso indisponíveis
      </Link>
      <Typography variant="bodySmall" color="text.secondary">
        Use Tab para verificar o foco visível. Links desabilitados não recebem
        foco nem navegam.
      </Typography>
    </Stack>
  ),
};
