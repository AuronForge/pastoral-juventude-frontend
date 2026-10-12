import { Stack } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar } from "./Avatar";

const meta = {
  title: "Design System/Componentes/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Avatar do Figma: identifica pessoas exclusivamente por iniciais (sem fotografias). A cor é derivada de um hash estável do identificador da pessoa, na ordem Azul, Terracota, Dourado e Neutro. Tamanhos 32 (listas compactas), 40 (padrão) e 48 px (destaque). Decorativo quando o nome está próximo; isolado, recebe o nome completo como nome acessível.",
      },
    },
  },
  args: { initials: "MS", personId: "pessoa-1", size: 40 },
  argTypes: { size: { control: "inline-radio", options: [32, 40, 48] } },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const CoresETamanhos: Story = {
  name: "Cores e tamanhos",
  render: () => (
    <Stack spacing={2}>
      {([32, 40, 48] as const).map((size) => (
        <Stack key={size} direction="row" spacing={2}>
          {["pessoa-1", "pessoa-2", "pessoa-3", "pessoa-4"].map((id, i) => (
            <Avatar
              key={id}
              initials={["JE", "MS", "AC", "RL"][i]}
              personId={id}
              size={size}
            />
          ))}
        </Stack>
      ))}
    </Stack>
  ),
};
