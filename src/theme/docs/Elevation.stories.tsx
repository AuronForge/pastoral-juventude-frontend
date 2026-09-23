import { Box, Button, Stack, Typography } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { elevationTokens } from "../tokens";
import { FoundationPage, FoundationSection, TokenCode } from "./FoundationPage";

const meta = {
  title: "Design System/Fundações/Elevação",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Sombras quentes e indicação de foco usadas para comunicar profundidade e navegação por teclado.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const elevations = [
  {
    name: "Elevation/1 · Sutil",
    token: "subtle",
    usage: "Botão secundário, segmento ativo e input elevado.",
  },
  {
    name: "Elevation/2 · Cartão",
    token: "card",
    usage: "Cards e painéis de conteúdo.",
  },
  {
    name: "Elevation/3 · Flutuante",
    token: "floating",
    usage: "Dropdowns, popovers, menus e toasts.",
  },
  {
    name: "Elevation/4 · Modal",
    token: "modal",
    usage: "Diálogos e folhas inferiores com overlay.",
  },
] as const;

export const SombrasEFoco: Story = {
  name: "Sombras e foco",
  render: () => (
    <FoundationPage
      title="Elevação e foco"
      description="Sombras com temperatura quente separam superfícies sem deixar a interface rígida. O foco de teclado permanece sempre visível."
    >
      <FoundationSection title="Níveis de elevação">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 3,
            bgcolor: "var(--bg-surface-sunken)",
            borderRadius: "var(--radius-lg)",
            p: { xs: 3, md: 5 },
          }}
        >
          {elevations.map(({ name, token, usage }) => (
            <Stack
              key={token}
              spacing={2}
              sx={{
                minHeight: 176,
                justifyContent: "space-between",
                bgcolor: "var(--bg-surface)",
                borderRadius: "var(--radius-md)",
                boxShadow: elevationTokens[token],
                p: 3,
              }}
            >
              <Box>
                <Typography variant="headingSmall">{name}</Typography>
                <Typography
                  variant="bodySmall"
                  color="text.secondary"
                  sx={{ mt: 0.5 }}
                >
                  {usage}
                </Typography>
              </Box>
              <TokenCode>{`elevationTokens.${token}`}</TokenCode>
            </Stack>
          ))}
        </Box>
      </FoundationSection>

      <FoundationSection
        title="Anel de foco"
        description="Três pixels, sem deslocamento interno, derivados de border/focus. Use Tab para conferir."
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={3}
          sx={{ alignItems: "flex-start" }}
        >
          <Button variant="contained">Receber foco</Button>
          <Box
            tabIndex={0}
            sx={{
              borderRadius: "var(--radius-sm)",
              bgcolor: "var(--bg-surface-alt)",
              px: 2,
              py: 1.25,
              "&:focus-visible": {
                outline: "none",
                boxShadow: elevationTokens.focusRing,
              },
            }}
          >
            <Typography variant="bodyMedium">Superfície focável</Typography>
          </Box>
          <TokenCode>elevationTokens.focusRing</TokenCode>
        </Stack>
      </FoundationSection>
    </FoundationPage>
  ),
};
