import { ArrowForward, OpenInNew } from "@mui/icons-material";
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
          "Navegação textual para destinos internos ou externos. O conteúdo do link deve descrever o destino; evite textos genéricos como ‘clique aqui’.",
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
    href: { control: "text" },
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const ComIcones: Story = {
  render: () => (
    <Stack spacing={2}>
      <Link endIcon={<ArrowForward />} href="/acesso">
        Voltar ao acesso
      </Link>
      <Link endIcon={<OpenInNew />} href="https://pj.org.br" target="_blank">
        Conhecer a Pastoral da Juventude
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
