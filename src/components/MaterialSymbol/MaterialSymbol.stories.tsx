import { Box, Stack, Typography } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { MaterialSymbol } from "./MaterialSymbol";

const catalog = [
  "today",
  "groups",
  "settings",
  "notifications",
  "more_horiz",
  "menu",
  "close",
  "arrow_back",
] as const;

const sizes = [
  ["small", "16 px", "Ações compactas e metadados"],
  ["medium", "20 px", "Campos e navegação secundária"],
  ["large", "24 px", "Tamanho padrão da interface"],
  ["xlarge", "32 px", "Destaques e estados vazios"],
] as const;

const meta = {
  title: "Design System/Fundações/Ícones",
  component: MaterialSymbol,
  args: { name: "home", size: "large" },
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Sistema oficial Material Symbols Outlined, auto-hospedado. Todos os símbolos usam FILL 0, weight 400, grade 0 e optical size correspondente a 16, 20, 24 ou 32 px. A cor é herdada do contexto semântico.",
      },
    },
  },
} satisfies Meta<typeof MaterialSymbol>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EscalaECatalogo: Story = {
  name: "Escala e catálogo",
  render: () => (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        bgcolor: "var(--bg-canvas)",
        color: "var(--text-primary)",
        p: { xs: 3, md: 6 },
      }}
    >
      <Stack spacing={5} sx={{ maxWidth: 1120, mx: "auto" }}>
        <Box>
          <Typography component="h1" variant="displayXl">
            Ícones
          </Typography>
          <Typography color="text.secondary" variant="bodyLarge">
            Material Symbols — estilo Outlined
          </Typography>
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, minmax(0, 1fr))",
              md: "repeat(4, minmax(0, 1fr))",
            },
            gap: 2,
          }}
        >
          {sizes.map(([size, pixels, usage]) => (
            <Stack
              key={size}
              spacing={1}
              sx={{
                alignItems: "center",
                bgcolor: "var(--bg-surface)",
                border: "var(--border-thin) solid var(--border-default)",
                borderRadius: "var(--radius-md)",
                p: 3,
                textAlign: "center",
              }}
            >
              <MaterialSymbol name="home" size={size} />
              <Typography variant="labelLarge">{pixels}</Typography>
              <Typography color="text.secondary" variant="bodySmall">
                {usage}
              </Typography>
            </Stack>
          ))}
        </Box>
        <Box>
          <Typography component="h2" sx={{ mb: 2 }} variant="headingSmall">
            Catálogo inicial oficial
          </Typography>
          <Stack
            direction="row"
            spacing={3}
            useFlexGap
            sx={{ flexWrap: "wrap" }}
          >
            {catalog.map((name) => (
              <Stack key={name} spacing={1} sx={{ alignItems: "center" }}>
                <MaterialSymbol name={name} />
                <Typography variant="labelSmall">{name}</Typography>
              </Stack>
            ))}
          </Stack>
        </Box>
      </Stack>
    </Box>
  ),
};
