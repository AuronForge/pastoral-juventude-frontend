import { Add, ArrowForward, DeleteOutlined } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";

const meta = {
  title: "Design System/Componentes/Botão",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Aciona uma ação. O catálogo contém as variantes primária, secundária, discreta e de perigo, nos tamanhos P, M e G.",
      },
    },
  },
  args: {
    children: "Continuar",
    size: "medium",
    variant: "primary",
  },
  argTypes: {
    children: { control: "text" },
    loading: { control: "boolean" },
    size: {
      control: "inline-radio",
      options: ["small", "medium", "large"],
    },
    variant: {
      control: "inline-radio",
      options: ["primary", "secondary", "discreet", "danger"],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

const variants = ["primary", "secondary", "discreet", "danger"] as const;
const sizes = ["small", "medium", "large"] as const;

export const VariantesETamanhos: Story = {
  name: "Variantes e tamanhos",
  render: () => (
    <Stack spacing={3}>
      {variants.map((variant) => (
        <Box key={variant}>
          <Typography variant="headingSmall" component="h2" sx={{ mb: 1.5 }}>
            {variant}
          </Typography>
          <Stack
            direction="row"
            spacing={1.5}
            sx={{ alignItems: "center", flexWrap: "wrap" }}
          >
            {sizes.map((size) => (
              <Button key={size} size={size} variant={variant}>
                Continuar
              </Button>
            ))}
          </Stack>
        </Box>
      ))}
    </Stack>
  ),
};

export const ComIcones: Story = {
  name: "Com ícones",
  render: () => (
    <Stack
      direction="row"
      spacing={1.5}
      sx={{ alignItems: "center", flexWrap: "wrap" }}
    >
      <Button startIcon={<Add />}>Adicionar pessoa</Button>
      <Button variant="secondary" endIcon={<ArrowForward />}>
        Avançar
      </Button>
      <Button variant="danger" startIcon={<DeleteOutlined />}>
        Excluir encontro
      </Button>
    </Stack>
  ),
};

export const CarregandoEDesabilitado: Story = {
  name: "Carregando e desabilitado",
  render: () => (
    <Stack
      direction="row"
      spacing={1.5}
      sx={{ alignItems: "center", flexWrap: "wrap" }}
    >
      <Button loading>Entrando</Button>
      <Button disabled variant="secondary">
        Salvar
      </Button>
      <Button loading variant="discreet">
        Carregando
      </Button>
      <Button disabled variant="danger">
        Excluir
      </Button>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Enquanto carrega, o botão fica indisponível, preserva seu rótulo e expõe `aria-busy` para tecnologias assistivas.",
      },
    },
  },
};
