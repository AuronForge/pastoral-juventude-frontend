import { Box, Chip, Paper, Stack, Typography } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { MaterialSymbol } from "../MaterialSymbol";
import { AppShell } from "./AppShell";

const navigationItems = [
  { id: "inicio", icon: <MaterialSymbol name="home" />, label: "Início" },
  {
    id: "pessoas",
    icon: <MaterialSymbol name="groups" />,
    label: "Pessoas",
    badge: 4,
  },
  {
    id: "encontros",
    icon: <MaterialSymbol name="calendar_month" />,
    label: "Encontros",
    badge: 3,
  },
  {
    id: "lideranca",
    icon: <MaterialSymbol name="account_tree" />,
    label: "Liderança",
  },
  {
    id: "administracao",
    icon: <MaterialSymbol name="shield" />,
    label: "Administração",
  },
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
    viewport: {
      options: {
        celular390: {
          name: "Celular — 390 px",
          styles: { width: "390px", height: "844px" },
          type: "mobile",
        },
        limiteMovel767: {
          name: "Limite móvel — 767 px",
          styles: { width: "767px", height: "900px" },
          type: "mobile",
        },
        tablet768: {
          name: "Tablet — 768 px",
          styles: { width: "768px", height: "900px" },
          type: "tablet",
        },
      },
    },
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
      {
        id: "perfil",
        icon: <MaterialSymbol name="groups" />,
        label: "Meu perfil",
      },
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

function InteractiveNavigation(args: React.ComponentProps<typeof AppShell>) {
  const [activeId, setActiveId] = useState("encontros");
  const activeItem = navigationItems.find((item) => item.id === activeId);

  return (
    <AppShell
      {...args}
      activeNavigationId={activeId}
      headerContent={
        <Typography variant="bodySmallStrong">PastorApp</Typography>
      }
      navigationItems={navigationItems.map((item) => ({
        ...item,
        onClick: () => setActiveId(item.id),
      }))}
    >
      <Stack spacing={2}>
        <Typography component="h1" variant="headingLarge">
          {activeItem?.label}
        </Typography>
        <Typography color="text.secondary" variant="bodySmall">
          Abra o menu no cabeçalho para acessar os cinco destinos. Escolha
          Liderança ou Administração: o menu fecha e esta área mostra o destino
          selecionado. Os três atalhos inferiores continuam disponíveis.
        </Typography>
        <Paper sx={{ p: 2 }} variant="outlined">
          <Typography variant="bodySmallStrong">
            Destino selecionado: {activeItem?.label}
          </Typography>
        </Paper>
      </Stack>
    </AppShell>
  );
}

export const NavegacaoCompletaNoCelular: Story = {
  name: "Navegação completa no celular (390 px)",
  args: { children: null },
  globals: { viewport: { value: "celular390", isRotated: false } },
  render: (args) => <InteractiveNavigation {...args} />,
  parameters: {
    docs: {
      description: {
        story:
          "Regressão da faixa de 360 a 767 px: o acionador fica disponível e o menu apresenta todos os destinos permitidos, inclusive os que não cabem nos três atalhos inferiores. Valide também fechamento por Esc e clique fora.",
      },
    },
  },
};

export const LimiteDaNavegacaoMovel: Story = {
  name: "Limite da navegação móvel (767 px)",
  args: { children: null },
  globals: { viewport: { value: "limiteMovel767", isRotated: false } },
  render: (args) => <InteractiveNavigation {...args} />,
};

export const NavegacaoNoTablet: Story = {
  name: "Navegação no tablet (768 px)",
  args: { children: null },
  globals: { viewport: { value: "tablet768", isRotated: false } },
  render: (args) => <InteractiveNavigation {...args} />,
};
