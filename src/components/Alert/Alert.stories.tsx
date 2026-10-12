import { Box, Stack, Typography } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Button } from "../Button";
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
          "Alert do Figma: comunica uma condição persistente dentro do fluxo sem interromper a tarefa. Severidades Sucesso, Informação, Atenção e Erro; modelos Suave (fundo com 12% da cor semântica) e Contornado (superfície clara com borda semântica). Fechável e Com ação são propriedades independentes e opcionais. Não comunique severidade somente pela cor: mantenha ícone e texto. Ao fechar, remova somente a mensagem.",
      },
    },
  },
  args: {
    children: description,
    title: "Não foi possível salvar",
    severity: "information",
    model: "soft",
  },
  argTypes: {
    closeLabel: { control: "text" },
    dismissible: { control: "boolean" },
    severity: {
      control: "inline-radio",
      options: ["success", "information", "attention", "error"],
    },
    model: { control: "inline-radio", options: ["soft", "outlined"] },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Severidades: Story = {
  render: () => (
    <Stack spacing={2} sx={{ maxWidth: 560 }}>
      <Alert title="Não foi possível salvar" severity="information">
        {description}
      </Alert>
      <Alert title="Alterações salvas" severity="success">
        As informações do encontro foram atualizadas com sucesso.
      </Alert>
      <Alert title="Cadastro incompleto" severity="attention">
        Informe o endereço do encontro antes de publicar esta atividade.
      </Alert>
      <Alert title="Não foi possível salvar" severity="error">
        Houve um conflito ao atualizar este registro. Recarregue os dados antes
        de tentar novamente.
      </Alert>
    </Stack>
  ),
};

export const Modelos: Story = {
  render: () => (
    <Stack spacing={2} sx={{ maxWidth: 560 }}>
      {(["success", "information", "attention", "error"] as const).map(
        (severity) => (
          <Alert
            key={severity}
            model="outlined"
            severity={severity}
            title="Contornado"
          >
            Superfície clara com borda semântica.
          </Alert>
        ),
      )}
    </Stack>
  ),
};

export const ComAcao: Story = {
  name: "Com ação",
  render: () => (
    <Alert
      action={{ label: "Tentar novamente", onClick: () => undefined }}
      severity="error"
      title="Não foi possível conectar"
    >
      Verifique sua conexão e tente novamente.
    </Alert>
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
            severity="information"
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
    <Alert title="Este registro foi alterado" severity="error">
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

function CloseTargetExample() {
  const [shortVisible, setShortVisible] = useState(true);
  const [longVisible, setLongVisible] = useState(true);

  return (
    <Stack spacing={2} sx={{ width: "100%", maxWidth: 560 }}>
      {shortVisible ? (
        <Alert
          closeLabel="Fechar dica"
          dismissible
          onClose={() => setShortVisible(false)}
          title="Dica"
          severity="information"
        >
          Você pode atualizar os dados depois.
        </Alert>
      ) : (
        <Typography role="status">A dica foi dispensada.</Typography>
      )}
      {longVisible ? (
        <Alert
          closeLabel="Fechar confirmação"
          dismissible
          onClose={() => setLongVisible(false)}
          title="As informações do encontro foram atualizadas"
          severity="success"
        >
          Os dados foram salvos com sucesso. Você pode revisar o endereço, a
          programação e as informações complementares a qualquer momento antes
          de compartilhar o encontro com os participantes.
        </Alert>
      ) : (
        <Typography role="status">A confirmação foi dispensada.</Typography>
      )}
      <Button
        onClick={() => {
          setShortVisible(true);
          setLongVisible(true);
        }}
      >
        Exibir avisos novamente
      </Button>
    </Stack>
  );
}

export const AlvoDeFechamento: Story = {
  name: "Alvo de fechamento",
  render: () => <CloseTargetExample />,
  parameters: {
    docs: {
      description: {
        story:
          "Compare avisos com textos curtos e longos, inclusive em viewport móvel. Toda a área de 44 × 44 px do fechamento pode ser acionada, inclusive fora do desenho do ícone. Use Tab para focar e Enter ou Espaço para dispensar. Exibir avisos novamente restaura os exemplos.",
      },
    },
  },
};
