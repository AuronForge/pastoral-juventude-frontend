import { Stack, Typography } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox } from "./Checkbox";

const meta = {
  title: "Design System/Componentes/Caixa de seleção",
  component: Checkbox,
  tags: ["autodocs"],
  args: { label: "Registrar presença" },
  argTypes: {
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
    indeterminate: { control: "boolean" },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Estados: Story = {
  render: () => (
    <Stack spacing={0.5}>
      <Checkbox label="Não registrado" />
      <Checkbox checked label="Presença registrada" />
      <Checkbox indeterminate label="Presença parcial" />
      <Checkbox disabled label="Não disponível" />
      <Checkbox
        checked
        disabled
        label="Registrado, sem permissão para editar"
      />
      <Checkbox
        indeterminate
        disabled
        label="Parcial, sem permissão para editar"
      />
    </Stack>
  ),
};

export const RotuloLongo: Story = {
  name: "Rótulo em múltiplas linhas",
  render: () => (
    <Stack spacing={1} sx={{ maxWidth: 420 }}>
      <Typography variant="bodySmall" color="text.secondary">
        O rótulo inteiro é clicável; quando quebra, o componente mantém o
        respiro vertical do alvo de toque.
      </Typography>
      <Checkbox label="Confirmo que li e aceito os termos de participação na Pastoral da Juventude." />
    </Stack>
  ),
};
