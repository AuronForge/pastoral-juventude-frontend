import {
  AccountTreeOutlined,
  CalendarMonthOutlined,
  HomeOutlined,
  PeopleOutlineRounded,
  ShieldOutlined,
} from "@mui/icons-material";
import { Box, Chip, Paper, Stack, Typography } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { AppShell } from "./AppShell";

const navigationItems = [
  { id: "inicio", icon: <HomeOutlined />, label: "Início" },
  { id: "pessoas", icon: <PeopleOutlineRounded />, label: "Pessoas", badge: 4 },
  {
    id: "encontros",
    icon: <CalendarMonthOutlined />,
    label: "Encontros",
    badge: 3,
  },
  { id: "lideranca", icon: <AccountTreeOutlined />, label: "Liderança" },
  { id: "administracao", icon: <ShieldOutlined />, label: "Administração" },
];

const meta = {
  title: "Design System/Composição/App Shell",
  component: AppShell,
  tags: ["autodocs"],
  args: {
    activeNavigationId: "encontros",
    navigationItems,
    user: { name: "José Eduardo", role: "Coordenador" },
  },
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Moldura das áreas autenticadas: barra lateral adaptável, cabeçalho, menu da conta e área de conteúdo. Os itens de navegação e as ações da conta são recebidos por propriedades.",
      },
    },
  },
} satisfies Meta<typeof AppShell>;

export default meta;
type Story = StoryObj<typeof meta>;

function ExampleContent() {
  return (
    <Stack spacing={2} sx={{ maxWidth: "var(--size-content-max)" }}>
      <Box>
        <Typography component="p" variant="labelSmall" color="primary.main">
          Início › Encontros
        </Typography>
        <Typography component="h1" variant="headingLarge">
          Espiritualidade e missão
        </Typography>
        <Typography color="text.secondary" variant="bodySmall">
          28 de setembro · 19h · Salão paroquial
        </Typography>
      </Box>
      <Paper
        sx={{
          display: "grid",
          minHeight: 360,
          placeItems: "center",
          border: "var(--border-thin) solid var(--border-subtle)",
          bgcolor: "var(--bg-surface-alt)",
        }}
        variant="outlined"
      >
        <Typography color="text.secondary" variant="bodySmall">
          Área de conteúdo da tela
        </Typography>
      </Paper>
    </Stack>
  );
}

export const Playground: Story = {
  args: { children: null },
  render: (args) => (
    <AppShell
      {...args}
      headerActions={<Chip label="3 aprovações pendentes" size="small" />}
      headerContent={
        <Paper
          component="span"
          sx={{
            display: "inline-block",
            px: 2,
            py: 1,
            borderRadius: "var(--radius-pill)",
          }}
          variant="outlined"
        >
          <Typography color="text.secondary" variant="bodySmall">
            Buscar pessoas, encontros...
          </Typography>
        </Paper>
      }
      onPasswordChange={() => undefined}
      onProfile={() => undefined}
      onSignOut={() => undefined}
    >
      <ExampleContent />
    </AppShell>
  ),
};

export const JovemNoCelular: Story = {
  args: {
    activeNavigationId: "encontros",
    children: null,
    mobileNavigationItems: [
      navigationItems[0],
      { ...navigationItems[2], label: "Meus encontros" },
      { id: "perfil", icon: <PeopleOutlineRounded />, label: "Meu perfil" },
    ],
    navigationItems: [
      navigationItems[0],
      { ...navigationItems[2], label: "Meus encontros" },
    ],
    user: { name: "Ana Lúcia", role: "Jovem" },
  },
  parameters: { viewport: { defaultViewport: "mobile1" } },
  render: (args) => (
    <AppShell {...args}>
      <ExampleContent />
    </AppShell>
  ),
};
