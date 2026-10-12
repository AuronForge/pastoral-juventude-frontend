import { Stack, Typography } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Icon } from "./Icon";

const meta = {
  title: "Design System/Componentes/Ícone",
  component: Icon,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Material Symbols, estilo Outlined (FILL 0, weight 400, grade 0). Ícones complementam rótulos, herdam a cor do contexto e usam os tamanhos 16, 20, 24 e 32 px da coleção Icon do Figma.",
      },
    },
  },
  args: { name: "groups", size: "lg" },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg", "xl"] },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

const catalog = [
  "today",
  "groups",
  "settings",
  "notifications",
  "more_horiz",
  "menu",
  "close",
  "arrow_back",
  "home",
  "calendar_month",
  "person",
  "lock",
];

export const CatalogoInicial: Story = {
  name: "Catálogo inicial",
  render: () => (
    <Stack direction="row" spacing={3} sx={{ flexWrap: "wrap", rowGap: 3 }}>
      {catalog.map((name) => (
        <Stack key={name} spacing={1} sx={{ alignItems: "center", width: 96 }}>
          <Icon name={name} />
          <Typography variant="bodySmall" color="text.secondary">
            {name}
          </Typography>
        </Stack>
      ))}
    </Stack>
  ),
};

export const Tamanhos: Story = {
  render: () => (
    <Stack direction="row" spacing={3} sx={{ alignItems: "flex-end" }}>
      {(["sm", "md", "lg", "xl"] as const).map((size) => (
        <Stack key={size} spacing={1} sx={{ alignItems: "center" }}>
          <Icon name="groups" size={size} />
          <Typography variant="bodySmall" color="text.secondary">
            {size}
          </Typography>
        </Stack>
      ))}
    </Stack>
  ),
};
