import { Box, Stack, Typography } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { MaterialSymbol } from "../MaterialSymbol";
import { Button } from "./Button";

const meta = {
  title: "Design System/Componentes/Botão",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Aciona uma ação. O catálogo contém as variantes primária, secundária, discreta e de perigo, nos tamanhos P, M e G. As 216 variantes publicadas no Figma definem raio de 8 px, alturas de 44 px para pequeno e médio e 48 px para grande. Durante o carregamento, texto e ícones dão lugar a três pontos, mas o rótulo continua disponível para tecnologias assistivas. Clique, Enter e Espaço acionam o botão. Estados desabilitado e carregando não recebem foco por Tab.",
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
      <Button startIcon={<MaterialSymbol name="add" />}>
        Adicionar pessoa
      </Button>
      <Button
        variant="secondary"
        endIcon={<MaterialSymbol name="arrow_forward" />}
      >
        Avançar
      </Button>
      <Button variant="danger" startIcon={<MaterialSymbol name="delete" />}>
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
          "Enquanto carrega, o conteúdo visível dá lugar ao indicador de três pontos do Figma. O botão fica indisponível, preserva seu nome acessível e expõe `aria-busy` para tecnologias assistivas.",
      },
    },
  },
};

export const AlinhamentoComFigma: Story = {
  name: "Alinhamento com o Figma",
  render: () => (
    <Stack spacing={3} sx={{ alignItems: "flex-start" }}>
      <Typography variant="headingSmall" component="h2">
        Raio, alturas e carregamento
      </Typography>
      {variants.map((variant) => (
        <Stack key={variant} spacing={1} sx={{ alignItems: "flex-start" }}>
          <Typography>{variant}</Typography>
          <Stack
            direction="row"
            spacing={1.5}
            useFlexGap
            sx={{ alignItems: "center", flexWrap: "wrap" }}
          >
            {sizes.map((size) => (
              <Button key={size} size={size} variant={variant}>
                Continuar
              </Button>
            ))}
            <Button
              loading
              startIcon={<MaterialSymbol name="add" />}
              endIcon={<MaterialSymbol name="arrow_forward" />}
              variant={variant}
            >
              Carregando
            </Button>
          </Stack>
        </Stack>
      ))}
      <Typography variant="body2" sx={{ maxWidth: 680 }}>
        Todos os botões usam raio de 8 px. Pequeno e médio têm 44 px de altura;
        grande tem 48 px. No carregamento, texto e ícones ficam visualmente
        ocultos e apenas os três pontos permanecem visíveis.
      </Typography>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Revisão consolidada das quatro hierarquias, três tamanhos e do estado de carregamento conforme o componente publicado no Figma.",
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
            <Typography variant="body2">{height}</Typography>
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
