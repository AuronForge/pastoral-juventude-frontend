import type { Meta, StoryObj } from "@storybook/react-vite";
import { Stack } from "@mui/material";
import { PasswordRequirements } from "./PasswordRequirements";

const meta = {
  title: "Design System/Componentes/Indicador de requisitos de senha",
  component: PasswordRequirements,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Indicador de requisitos de senha do Figma (página 02.6.50, nós 714:64 e 711:12). Regular em desktop/tablet e Compacto em mobile. Cada requisito tem os estados Pendente, Atendido e Não atendido, comunicados por ícone, texto e cor; o agrupamento usa aria-live polite.",
      },
    },
  },
  args: {
    requirements: [
      { label: "Entre 8 e 128 caracteres", state: "pending" },
      { label: "Não conter espaços", state: "pending" },
      { label: "Ser diferente da senha atual", state: "pending" },
    ],
  },
} satisfies Meta<typeof PasswordRequirements>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Estados: Story = {
  render: () => (
    <Stack spacing={3} sx={{ maxWidth: 520 }}>
      <PasswordRequirements
        requirements={[
          { label: "Entre 8 e 128 caracteres", state: "met" },
          { label: "Não conter espaços", state: "unmet" },
          { label: "Ser diferente da senha atual", state: "pending" },
        ]}
      />
      <div style={{ maxWidth: 356 }}>
        <PasswordRequirements
          size="compact"
          requirements={[
            { label: "8 a 128 caracteres", state: "met" },
            { label: "Sem espaços", state: "unmet" },
            { label: "Diferente da senha atual", state: "pending" },
          ]}
        />
      </div>
    </Stack>
  ),
};
