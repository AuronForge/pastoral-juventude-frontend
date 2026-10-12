import { Box, Stack, Typography } from "@mui/material";
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
          "Os quatro estilos de elevação do Figma. Elevação representa hierarquia funcional, não decoração.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const elevations = [
  ["Elevation/None", "none", "Superfícies planas."],
  ["Elevation/Small", "small", "Elementos discretamente elevados."],
  ["Elevation/Medium", "medium", "Menus e popovers."],
  ["Elevation/Large", "large", "Dialogs e superfícies modais."],
] as const;

export const SombrasEFoco: Story = {
  name: "Sombras",
  render: () => (
    <FoundationPage
      title="Elevação"
      description="Preferir borda ou mudança de superfície antes de adicionar sombra. Estados de foco devem permanecer visíveis independentemente da elevação."
    >
      <FoundationSection title="Estilos">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
            gap: 3,
          }}
        >
          {elevations.map(([name, token, usage]) => (
            <Stack
              key={name}
              spacing={1}
              sx={{
                p: 3,
                bgcolor: "var(--pj-color-bg-surface)",
                borderRadius: "var(--pj-radius-md)",
                boxShadow: elevationTokens[token],
              }}
            >
              <TokenCode>{name}</TokenCode>
              <Typography variant="bodySmall" color="text.secondary">
                {usage}
              </Typography>
            </Stack>
          ))}
        </Box>
      </FoundationSection>
    </FoundationPage>
  ),
};
