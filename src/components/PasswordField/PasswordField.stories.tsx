import { Stack } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { MaterialSymbol } from "../MaterialSymbol";
import { useState } from "react";
import { Button } from "../Button";
import { PasswordField } from "./PasswordField";

const meta = {
  title: "Design System/Componentes/Campo de senha",
  component: PasswordField,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Especialização do Campo de texto para informações sigilosas. Mantém os mesmos tamanhos, estados, ajuda, erro e adornos, fixando o tipo nativo como senha. O estado desabilitado também bloqueia a ação de mostrar/ocultar senha e a retira da navegação por Tab. Reabilitar o campo permite usar a ação novamente, sem alterar o valor ou o estado de visibilidade já escolhido.",
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
        leadingIcon={<MaterialSymbol name="lock" />}
        placeholder="Digite sua senha"
        size="medium"
      />
      <PasswordField
        label="Senha"
        placeholder="Digite sua senha"
        size="large"
      />
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "O ícone à direita alterna entre mostrar e ocultar a senha, mantendo nome acessível e estado anunciado. Ícones à esquerda seguem o contrato do Campo de texto.",
      },
    },
  },
};

function DisabledVisibilityExample() {
  const [disabled, setDisabled] = useState(true);

  return (
    <Stack spacing={2.5} sx={{ maxWidth: 420 }}>
      <PasswordField
        defaultValue="exemplo123"
        hint="Use o ícone para mostrar ou ocultar esta senha de exemplo."
        label="Senha habilitada"
        size="large"
      />
      <PasswordField
        defaultValue="exemplo123"
        disabled={disabled}
        hint={
          disabled
            ? "Campo e ícone indisponíveis."
            : "Campo e ícone disponíveis novamente."
        }
        label="Senha com estado alternável"
        size="large"
      />
      <Button onClick={() => setDisabled((current) => !current)}>
        {disabled ? "Habilitar campo" : "Desabilitar campo"}
      </Button>
    </Stack>
  );
}

export const VisibilidadeComCampoDesabilitado: Story = {
  name: "Visibilidade com campo desabilitado",
  render: () => <DisabledVisibilityExample />,
  parameters: {
    docs: {
      description: {
        story:
          "Compare o campo habilitado com o desabilitado. O ícone do segundo não pode ser acionado nem receber foco por Tab. Use Habilitar campo para conferir a retomada da ação. Desabilitar novamente bloqueia a ação e preserva o valor e a visibilidade já escolhida.",
      },
    },
  },
};
