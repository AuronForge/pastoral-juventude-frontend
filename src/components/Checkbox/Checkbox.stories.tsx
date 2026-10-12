import { Stack, Typography } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox } from "./Checkbox";

const meta = {
  title: "Design System/Componentes/Caixa de seleção",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Checkbox do Figma: controle para selecionar múltiplas opções, confirmar uma condição ou representar seleção parcial. Caixa visual de 20 px e área de interação de 44 px. Indeterminado representa somente seleção parcial de um grupo. O label deve explicar a opção; Sem label é reservado a contextos com significado já explícito.",
      },
    },
  },
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
      <Checkbox
        label="Aceito participar do encontro"
        errorMessage="Confirme a participação para continuar."
      />
      <Checkbox
        checked
        label="Receber lembretes"
        hint="Enviados um dia antes do encontro."
      />
      <Checkbox aria-label="Selecionar todos" />
    </Stack>
  ),
};

export const RotuloLongo: Story = {
  name: "Rótulo em múltiplas linhas",
  render: () => (
    <Stack spacing={1} sx={{ maxWidth: 420 }}>
      <Typography variant="bodySmall" color="text.secondary">
        O rótulo inteiro é clicável e pode quebrar em várias linhas.
      </Typography>
      <Checkbox label="Confirmo que li e aceito os termos de participação na Pastoral da Juventude." />
    </Stack>
  ),
};
