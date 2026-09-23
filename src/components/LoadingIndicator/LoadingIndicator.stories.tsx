import { Box, Button, Stack, Typography } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { LoadingIndicator } from "./LoadingIndicator";

const meta = {
  title: "Design System/Componentes/Indicador circular",
  component: LoadingIndicator,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Indicador indeterminado para ações breves iniciadas pela pessoa. Os tamanhos e tons refletem o componente Indicador circular do Figma.",
      },
    },
  },
  args: {
    label: "Carregando",
    size: "medium",
    tone: "default",
  },
  argTypes: {
    decorative: { control: "boolean" },
    size: {
      control: "inline-radio",
      options: ["small", "medium", "large"],
    },
    tone: {
      control: "inline-radio",
      options: ["default", "on-solid"],
    },
  },
} satisfies Meta<typeof LoadingIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

const sizes = ["small", "medium", "large"] as const;

export const TamanhosETons: Story = {
  name: "Tamanhos e tons",
  render: () => (
    <Stack spacing={3}>
      <Box>
        <Typography variant="headingSmall" component="h2" sx={{ mb: 2 }}>
          Padrão
        </Typography>
        <Stack direction="row" spacing={3} sx={{ alignItems: "center" }}>
          {sizes.map((size) => (
            <Stack key={size} spacing={1} sx={{ alignItems: "center" }}>
              <LoadingIndicator
                label={`Carregando no tamanho ${size}`}
                size={size}
              />
              <Typography variant="caption">{size}</Typography>
            </Stack>
          ))}
        </Stack>
      </Box>

      <Box
        sx={{
          bgcolor: "var(--primary-solid)",
          color: "var(--text-on-primary)",
          borderRadius: "var(--radius-md)",
          p: 3,
        }}
      >
        <Typography variant="headingSmall" component="h2" sx={{ mb: 2 }}>
          Sobre sólido
        </Typography>
        <Stack direction="row" spacing={3} sx={{ alignItems: "center" }}>
          {sizes.map((size) => (
            <Stack key={size} spacing={1} sx={{ alignItems: "center" }}>
              <LoadingIndicator
                label={`Carregando sobre sólido no tamanho ${size}`}
                size={size}
                tone="on-solid"
              />
              <Typography variant="caption">{size}</Typography>
            </Stack>
          ))}
        </Stack>
      </Box>
    </Stack>
  ),
};

export const EmUmaAcao: Story = {
  name: "Em uma ação",
  render: () => (
    <Button
      variant="contained"
      aria-busy="true"
      aria-disabled="true"
      tabIndex={-1}
      startIcon={<LoadingIndicator decorative tone="on-solid" />}
      sx={{ minWidth: 160, pointerEvents: "none" }}
    >
      Entrando
    </Button>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Dentro de uma ação com texto, o indicador é decorativo: o rótulo do botão já comunica o andamento.",
      },
    },
  },
};

export const MovimentoReduzido: Story = {
  name: "Movimento reduzido",
  render: () => (
    <Stack spacing={1.5} sx={{ maxWidth: 520 }}>
      <LoadingIndicator label="Carregando com preferência de movimento" />
      <Typography variant="bodySmall" color="text.secondary">
        Com “reduzir movimento” ativo no sistema operacional, a rotação é
        substituída por uma pulsação suave de opacidade.
      </Typography>
    </Stack>
  ),
};
