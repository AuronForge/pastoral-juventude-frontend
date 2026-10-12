import { Box, Stack, Typography } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { TextField } from "./TextField";
import { Icon } from "../Icon";

const meta = {
  title: "Design System/Componentes/Campo de texto",
  component: TextField,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Text Field do Figma. O tipo descreve o conteúdo esperado (Texto, E-mail, Senha, Número, Busca); o estado descreve a condição de interação e validação. Médio (40 px) é o padrão da interface; Grande (48 px) atende contextos de maior toque. Use label visível; não dependa apenas do placeholder. A Senha integra a ação Mostrar/Ocultar senha no próprio campo.",
      },
    },
  },
  args: {
    label: "E-mail",
    placeholder: "nome@exemplo.com",
    hint: "Use o e-mail cadastrado na pastoral.",
    size: "medium",
  },
  argTypes: {
    disabled: { control: "boolean" },
    errorMessage: { control: "text" },
    hint: { control: "text" },
    readOnly: { control: "boolean" },
    required: { control: "boolean" },
    size: { control: "inline-radio", options: ["medium", "large"] },
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Estados: Story = {
  render: () => (
    <Stack spacing={2.5} sx={{ maxWidth: 420 }}>
      <TextField
        label="Título da tarefa"
        placeholder="Ex.: Preparar a dinâmica"
        hint="Até 500 caracteres."
        required
      />
      <TextField
        label="Título da tarefa"
        value="Providenciar material da dinâmica"
        hint="Até 500 caracteres."
        required
      />
      <TextField
        label="Título da tarefa"
        value="X"
        errorMessage="Informe um título com pelo menos 3 caracteres."
        required
      />
      <TextField
        label="E-mail"
        value="jovem@pastoral.org"
        hint="Este dado não pode ser alterado."
        disabled
      />
      <TextField
        label="ID da pessoa"
        value="PJ-2026-001"
        hint="Definido automaticamente pelo sistema."
        readOnly
      />
    </Stack>
  ),
};

export const TiposEIcones: Story = {
  name: "Tipos e ícones",
  render: () => (
    <Stack spacing={2.5} sx={{ maxWidth: 420 }}>
      <TextField label="Nome completo" placeholder="Digite seu nome" />
      <TextField
        label="E-mail"
        type="email"
        placeholder="jovem@email.com"
        trailingIcon={<Icon name="alternate_email" />}
      />
      <TextField label="Senha" type="password" defaultValue="segredo123" />
      <TextField label="Quantidade" type="number" defaultValue={42} />
      <TextField
        label="Buscar"
        type="search"
        placeholder="Pastoral"
        leadingIcon={<Icon name="search" />}
      />
    </Stack>
  ),
};

export const Tamanhos: Story = {
  render: () => (
    <Box sx={{ maxWidth: 420 }}>
      <Stack spacing={2.5}>
        <TextField
          label="Médio — 40 px · padrão da interface"
          placeholder="Valor"
          size="medium"
        />
        <TextField
          label="Grande — 48 px · contextos de maior toque"
          placeholder="Valor"
          size="large"
        />
      </Stack>
    </Box>
  ),
};

export const Validacao: Story = {
  name: "Validação e mensagens externas",
  render: () => (
    <Stack spacing={2.5} sx={{ maxWidth: 420 }}>
      <Typography variant="bodySmall" color="text.secondary">
        O componente expõe os atributos nativos do HTML e recebe a mensagem
        validada pela camada de formulário, sem conter regras de negócio.
      </Typography>
      <TextField
        label="E-mail"
        type="email"
        placeholder="nome@exemplo.com"
        hint="Informe um e-mail válido."
        required
      />
      <TextField
        label="Senha"
        type="password"
        placeholder="Crie uma senha"
        hint="Use no mínimo 8 caracteres, sem espaços."
        minLength={8}
        required
      />
      <TextField
        label="Quantidade de participantes"
        type="number"
        placeholder="0"
        hint="Informe um número entre 1 e 100."
        inputProps={{ min: 1, max: 100 }}
        required
      />
      <TextField
        label="E-mail"
        defaultValue="jovem@"
        type="email"
        errorMessage="Informe um endereço de e-mail válido."
        required
      />
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "`errorMessage` é o ponto de integração para React Hook Form, Zod ou outro validador externo. Validações específicas, como senha e telefone, pertencem a componentes ou esquemas especializados.",
      },
    },
  },
};
