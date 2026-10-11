import Add from "@mui/icons-material/Add";
import DeleteOutlined from "@mui/icons-material/DeleteOutlined";
import EditOutlined from "@mui/icons-material/EditOutlined";
import Refresh from "@mui/icons-material/Refresh";
import { Stack, Typography } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { IconButton } from "./IconButton";

const meta = {
  title: "Design System/Componentes/Botão de ícone",
  component: IconButton,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Ação compacta acionada por um único ícone. Use apenas quando o símbolo for reconhecível no contexto; o rótulo acessível é obrigatório. Conforme o Figma, pequeno e médio têm alvo de 44 × 44 px e grande de 48 × 48 px. Os ícones continuam com 16, 20 e 24 px. Em linhas flexíveis, o botão não encolhe; organize as ações com quebra de linha se faltar espaço.",
      },
    },
  },
  args: {
    icon: <EditOutlined />,
    label: "Editar encontro",
    size: "medium",
    variant: "tertiary",
  },
  argTypes: {
    disabled: { control: "boolean" },
    label: { control: "text" },
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
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Hierarquias: Story = {
  render: () => (
    <Stack direction="row" spacing={2}>
      <IconButton icon={<Add />} label="Adicionar encontro" variant="primary" />
      <IconButton
        icon={<EditOutlined />}
        label="Editar encontro"
        variant="secondary"
      />
      <IconButton
        icon={<Refresh />}
        label="Atualizar lista"
        variant="tertiary"
      />
      <IconButton
        icon={<DeleteOutlined />}
        label="Excluir encontro"
        variant="danger"
      />
    </Stack>
  ),
};

export const Tamanhos: Story = {
  render: () => (
    <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
      <IconButton
        icon={<EditOutlined />}
        label="Editar (pequeno)"
        size="small"
      />
      <IconButton
        icon={<EditOutlined />}
        label="Editar (médio)"
        size="medium"
      />
      <IconButton
        icon={<EditOutlined />}
        label="Editar (grande)"
        size="large"
      />
    </Stack>
  ),
};

export const Estados: Story = {
  render: () => (
    <Stack direction="row" spacing={2}>
      <IconButton icon={<Refresh />} label="Atualizar" variant="primary" />
      <IconButton
        icon={<Refresh />}
        label="Atualizando"
        loading
        variant="primary"
      />
      <IconButton
        icon={<Refresh />}
        label="Atualização indisponível"
        disabled
      />
      <IconButton
        icon={<DeleteOutlined />}
        label="Exclusão indisponível"
        disabled
        variant="danger"
      />
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "O estado de carregamento substitui o ícone, desabilita novas interações e mantém o nome acessível da ação.",
      },
    },
  },
};

function InteractionTargetsExample() {
  const [activations, setActivations] = useState(0);
  const activate = () => setActivations((current) => current + 1);

  return (
    <Stack spacing={2}>
      <Stack direction="row" useFlexGap spacing={2} sx={{ flexWrap: "wrap" }}>
        {(
          [
            ["small", "Pequeno", "44 × 44 px"],
            ["medium", "Médio", "44 × 44 px"],
            ["large", "Grande", "48 × 48 px"],
          ] as const
        ).map(([size, name, dimensions]) => (
          <Stack key={size} spacing={1} sx={{ alignItems: "center" }}>
            <Typography>{name}</Typography>
            <IconButton
              icon={<EditOutlined />}
              label={`Editar (${name.toLowerCase()})`}
              onClick={activate}
              size={size}
              variant="secondary"
            />
            <Typography variant="body2">{dimensions}</Typography>
          </Stack>
        ))}
      </Stack>
      <Stack direction="row" useFlexGap spacing={2} sx={{ flexWrap: "wrap" }}>
        <IconButton
          disabled
          icon={<EditOutlined />}
          label="Editar indisponível"
          onClick={activate}
          size="small"
          variant="secondary"
        />
        <IconButton
          icon={<Refresh />}
          label="Atualizando"
          loading
          onClick={activate}
          size="medium"
          variant="primary"
        />
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
          "Acione qualquer ponto do botão, inclusive as bordas fora do desenho do ícone. Clique, Enter e Espaço incrementam o contador. Tab percorre as três ações disponíveis e ignora as ações desabilitada e em carregamento. Pequeno e médio compartilham o alvo de 44 px, mas têm ícones de tamanhos diferentes.",
      },
    },
  },
};
