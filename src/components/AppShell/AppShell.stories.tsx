import { Box, Typography } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { AppShell } from "./AppShell";

const navigationItems = [
  { id: "inicio", icon: "home", label: "Início" },
  { id: "encontros", icon: "calendar_month", label: "Encontros" },
  { id: "perfil", icon: "person", label: "Meu perfil" },
];

const meta = {
  title: "Design System/Composição/App Shell",
  component: AppShell,
  tags: ["autodocs"],
  args: {
    activeNavigationId: "inicio",
    navigationItems,
    user: { id: "pessoa-1", name: "Maria da Silva", initials: "MS" },
    children: null,
  },
  parameters: {
    layout: "fullscreen",
    viewport: {
      options: {
        mobile390: {
          name: "Mobile — 390 px",
          styles: { width: "390px", height: "844px" },
          type: "mobile",
        },
        tablet768: {
          name: "Tablet — 768 px",
          styles: { width: "768px", height: "1024px" },
          type: "tablet",
        },
      },
    },
    docs: {
      description: {
        component:
          "App Shell do Figma: Header / App Bar, Sidebar no desktop (280 px expandida, 72 px recolhida) e, em tablet e mobile, Navigation Drawer acionado pelo Header com Bottom Navigation de 3 a 5 atalhos. O conteúdo ocupa a área em color/bg/surface.",
      },
    },
  },
} satisfies Meta<typeof AppShell>;

export default meta;
type Story = StoryObj<typeof meta>;

function ExampleContent() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography component="h1" variant="headingMedium">
        Olá, Maria
      </Typography>
      <Typography color="text.secondary" variant="bodyMedium">
        Área de conteúdo da tela.
      </Typography>
    </Box>
  );
}

export const Desktop: Story = {
  render: (args) => (
    <AppShell {...args}>
      <ExampleContent />
    </AppShell>
  ),
};

export const Tablet: Story = {
  ...Desktop,
  globals: { viewport: { value: "tablet768" } },
};

export const Mobile: Story = {
  ...Desktop,
  globals: { viewport: { value: "mobile390" } },
};
