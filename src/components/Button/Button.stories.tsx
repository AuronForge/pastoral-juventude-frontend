import { Box, Stack, Typography } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Button } from "./Button";
import { Icon } from "../Icon";

const meta = {
  title: "Design System/Componentes/Botão",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Button do Figma. Escolha a hierarquia pela intenção: Primário (uma ação principal por contexto), Secundário (ação complementar), Terciário (menor ênfase) e Perigo (ação destrutiva ou irreversível). Tamanhos Pequeno e Médio com 44 px e Grande com 48 px. O ícone complementa o rótulo; nunca é o único significado. Clique, Enter e Espaço acionam o botão; estados desabilitado e carregando não recebem foco por Tab.",
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
      options: ["primary", "secondary", "tertiary", "danger"],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

const variants = [
  ["primary", "Primário"],
  ["secondary", "Secundário"],
  ["tertiary", "Terciário"],
  ["danger", "Perigo"],
] as const;
const sizes = ["small", "medium", "large"] as const;

export const VariantesETamanhos: Story = {
  name: "Variantes e tamanhos",
  render: () => (
    <Stack spacing={3}>
      {variants.map(([variant, label]) => (
        <Box key={variant}>
          <Typography variant="title" component="h2" sx={{ mb: 1.5 }}>
            {label}
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
      <Button startIcon={<Icon name="add" />}>Adicionar pessoa</Button>
      <Button variant="secondary" endIcon={<Icon name="arrow_forward" />}>
        Avançar
      </Button>
      <Button variant="danger" startIcon={<Icon name="delete" />}>
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
      <Button loading variant="tertiary">
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
          "Carregando: o conteúdo é substituído pelo indicador de três pontos do Figma; o rótulo permanece como nome acessível, o botão fica indisponível e expõe `aria-busy`.",
      },
    },
  },
};

function InteractionTargetsExample() {
  const [activations, setActivations] = useState(0);
  const activate = () => setActivations((current) => current + 1);

  return (
    <Stack spacing={2} sx={{ alignItems: "flex-start" }}>
      <Stack
        direction="row"
        spacing={2}
        useFlexGap
        sx={{ alignItems: "flex-end", flexWrap: "wrap" }}
      >
        {(
          [
            ["small", "Pequeno", "44 px"],
            ["medium", "Médio", "44 px"],
            ["large", "Grande", "48 px"],
          ] as const
        ).map(([size, label, height]) => (
          <Stack key={size} spacing={1} sx={{ alignItems: "center" }}>
            <Typography>{label}</Typography>
            <Button onClick={activate} size={size}>
              Continuar
            </Button>
            <Typography variant="bodyMedium">{height}</Typography>
          </Stack>
        ))}
      </Stack>
      <Stack direction="row" spacing={2} useFlexGap sx={{ flexWrap: "wrap" }}>
        <Button disabled size="small" variant="secondary">
          Indisponível
        </Button>
        <Button loading size="medium">
          Carregando
        </Button>
      </Stack>
      <Typography aria-live="polite" role="status">
        Ações realizadas: {activations}
      </Typography>
    </Stack>
  );
}

export const AlvosDeInteracao: Story = {
  name: "Alvos de interação",
  render: () => <InteractionTargetsExample />,
  parameters: {
    docs: {
      description: {
        story:
          "Compare as alturas efetivas de 44/44/48 px. Clique próximo às bordas ou use Tab seguido de Enter ou Espaço. Os estados indisponível e carregando não incrementam o contador nem recebem foco por Tab.",
      },
    },
  },
};
