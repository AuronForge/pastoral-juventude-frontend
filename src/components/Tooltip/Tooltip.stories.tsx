import { Stack } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../Button";
import { Tooltip } from "./Tooltip";

const meta = {
  title: "Design System/Componentes/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Tooltip do Figma: explicação contextual curta para controles e informações. Balão escuro, texto curto de alto contraste e seta apontando para a origem. Exibido após 300 ms de hover ou foco; não recebe foco nem contém conteúdo interativo.",
      },
    },
  },
  args: {
    text: "Abrir filtros",
    position: "top",
    children: <Button variant="secondary">Filtros</Button>,
  },
  argTypes: {
    position: {
      control: "inline-radio",
      options: ["top", "bottom", "left", "right"],
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Stack sx={{ p: 8, alignItems: "flex-start" }}>
      <Tooltip {...args} />
    </Stack>
  ),
};
