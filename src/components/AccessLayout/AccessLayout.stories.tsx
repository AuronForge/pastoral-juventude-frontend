import type { Meta, StoryObj } from "@storybook/react-vite";
import { Typography } from "@mui/material";
import { AccessLayout } from "./AccessLayout";

const meta = {
  title: "Design System/Composição/Access Layout",
  component: AccessLayout,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Access Layout do Figma (página 02.6.47, nó 447:133): fundo de acesso, superfície com a assinatura da marca, slot Conteúdo e texto de Ajuda. No desktop (a partir de 1200 px) exibe a Mensagem institucional (nó 413:9); em tablet a superfície tem 480 px centralizada e no mobile ocupa a largura com margem de 16 px.",
      },
    },
  },
  args: {
    "aria-label": "Acesso",
    children: (
      <Typography component="h1" variant="headingMedium">
        Conteúdo da jornada
      </Typography>
    ),
  },
  argTypes: { children: { control: false } },
} satisfies Meta<typeof AccessLayout>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
