import { Box, Stack, Typography } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Alert } from "./Alert";

const description =
  "Este registro foi alterado por outra pessoa. Recarregue os dados antes de salvar novamente.";

const meta = {
  title: "Design System/Componentes/Alerta",
  component: Alert,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Aviso ancorado no conteúdo, usado quando a pessoa precisa compreender uma situação antes de continuar. O ícone acompanha o tom para que a distinção não dependa somente de cor.",
      },
    },
  },
  args: {
    children: description,
    title: "Não foi possível salvar",
    tone: "info",
  },
  argTypes: {
    closeLabel: { control: "text" },
    dismissible: { control: "boolean" },
    tone: {
      control: "inline-radio",
      options: ["info", "success", "warning", "danger"],
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Tons: Story = {
  render: () => (
    <Stack spacing={2} sx={{ maxWidth: 560 }}>
      <Alert title="Não foi possível salvar" tone="info">
        {description}
      </Alert>
      <Alert title="Alterações salvas" tone="success">
        As informações do encontro foram atualizadas com sucesso.
      </Alert>
      <Alert title="Cadastro incompleto" tone="warning">
        Informe o endereço do encontro antes de publicar esta atividade.
      </Alert>
      <Alert title="Não foi possível salvar" tone="danger">
        Houve um conflito ao atualizar este registro. Recarregue os dados antes
        de tentar novamente.
      </Alert>
    </Stack>
  ),
};

export const Dispensavel: Story = {
  name: "Aviso dispensável",
  render: function DismissibleAlertStory() {
    const [visible, setVisible] = useState(true);

    return (
      <Box sx={{ maxWidth: 560 }}>
        {visible ? (
          <Alert
            dismissible
            onClose={() => setVisible(false)}
            title="Dica para o cadastro"
            tone="info"
          >
            Você pode complementar o endereço do encontro em outro momento.
          </Alert>
        ) : (
          <Typography color="text.secondary" variant="bodySmall">
            O aviso foi dispensado.
          </Typography>
        )}
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Use apenas para informações que podem ser dispensadas. Avisos que bloqueiam uma ação devem permanecer visíveis até a resolução.",
      },
    },
  },
};

export const ConflitoDeConcorrencia: Story = {
  name: "Conflito de concorrência (409)",
  render: () => (
    <Alert title="Este registro foi alterado" tone="danger">
      Outra pessoa atualizou este registro. Recarregue os dados antes de salvar
      novamente.
    </Alert>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "O conflito de concorrência recebe estado próprio; não deve ser comunicado como um erro genérico.",
      },
    },
  },
};
