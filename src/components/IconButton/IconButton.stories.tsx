import Add from "@mui/icons-material/Add";
import DeleteOutlined from "@mui/icons-material/DeleteOutlined";
import EditOutlined from "@mui/icons-material/EditOutlined";
import Refresh from "@mui/icons-material/Refresh";
import { Stack } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { IconButton } from "./IconButton";

const meta = {
  title: "Design System/Componentes/Botão de ícone",
  component: IconButton,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Ação compacta acionada por um único ícone. Use apenas quando o símbolo for reconhecível no contexto; o rótulo acessível é obrigatório.",
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
