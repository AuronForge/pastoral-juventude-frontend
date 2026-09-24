import { LockOutlined, VisibilityOff } from "@mui/icons-material";
import { Stack } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { PasswordField } from "./PasswordField";

const meta = {
  title: "Design System/Componentes/Campo de senha",
  component: PasswordField,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Especialização do Campo de texto para informações sigilosas. Mantém os mesmos tamanhos, estados, ajuda, erro e adornos, fixando o tipo nativo como senha.",
      },
    },
  },
  args: {
    autoComplete: "current-password",
    hint: "Use sua senha de acesso.",
    label: "Senha",
    placeholder: "Digite sua senha",
    size: "large",
  },
  argTypes: {
    disabled: { control: "boolean" },
    errorMessage: { control: "text" },
    hint: { control: "text" },
    readOnly: { control: "boolean" },
    required: { control: "boolean" },
    size: { control: "inline-radio", options: ["medium", "large"] },
  },
} satisfies Meta<typeof PasswordField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Estados: Story = {
  render: () => (
    <Stack spacing={2.5} sx={{ maxWidth: 420 }}>
      <PasswordField
        hint="Use no mínimo 8 caracteres."
        label="Senha"
        placeholder="Digite sua senha"
      />
      <PasswordField
        defaultValue="segredo123"
        hint="Use no mínimo 8 caracteres."
        label="Senha"
      />
      <PasswordField
        defaultValue="123"
        errorMessage="A senha deve ter ao menos 8 caracteres."
        label="Senha"
      />
      <PasswordField
        defaultValue="segredo123"
        disabled
        hint="Este campo está indisponível."
        label="Senha"
      />
      <PasswordField
        defaultValue="segredo123"
        hint="Este valor não pode ser alterado."
        label="Senha"
        readOnly
      />
    </Stack>
  ),
};

export const Icones: Story = {
  name: "Ícones e tamanhos",
  render: () => (
    <Stack spacing={2.5} sx={{ maxWidth: 420 }}>
      <PasswordField
        label="Senha"
        leadingIcon={<LockOutlined />}
        placeholder="Digite sua senha"
        size="medium"
      />
      <PasswordField
        label="Senha"
        placeholder="Digite sua senha"
        size="large"
        trailingIcon={<VisibilityOff />}
      />
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Os ícones seguem o contrato do Campo de texto. O protótipo permite ícones opcionais nos dois lados; um controle específico de visibilidade será avaliado com o componente IconButton.",
      },
    },
  },
};
