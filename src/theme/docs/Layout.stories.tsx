import { Box, Stack, Typography } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  borderTokens,
  breakpointTokens,
  gridTokens,
  radiusTokens,
  screenTokens,
  sizeTokens,
  spacingTokens,
} from "../tokens";
import { FoundationPage, FoundationSection, TokenCode } from "./FoundationPage";

const meta = {
  title: "Design System/Fundações/Layout",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Espaçamento, raios, dimensões estruturais, breakpoints e grids responsivos.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const EscalasEGrids: Story = {
  name: "Escalas e grids",
  render: () => (
    <FoundationPage
      title="Layout e responsividade"
      description="Uma escala compacta para interfaces densas, mantendo áreas de toque confortáveis e três faixas responsivas previsíveis."
    >
      <FoundationSection title="Espaçamento">
        <Stack spacing={2}>
          {Object.entries(spacingTokens).map(([name, value]) => (
            <Box
              key={name}
              sx={{
                display: "grid",
                gridTemplateColumns: "80px minmax(0, 1fr) 64px",
                gap: 2,
                alignItems: "center",
              }}
            >
              <TokenCode>{name}</TokenCode>
              <Box
                aria-label={`Espaçamento ${name}: ${value} pixels`}
                sx={{
                  width: Math.max(value, 2),
                  height: 12,
                  bgcolor: "primary.main",
                  borderRadius: "var(--radius-pill)",
                }}
              />
              <Typography variant="caption" color="text.secondary">
                {value} px
              </Typography>
            </Box>
          ))}
        </Stack>
      </FoundationSection>

      <FoundationSection title="Raios de borda">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)",
              md: "repeat(4, 1fr)",
            },
            gap: 2,
          }}
        >
          {Object.entries(radiusTokens).map(([name, value]) => (
            <Stack key={name} spacing={1} sx={{ alignItems: "center" }}>
              <Box
                aria-label={`Raio ${name}: ${value} pixels`}
                sx={{
                  width: 96,
                  height: 72,
                  bgcolor: "var(--primary-subtle)",
                  border: "var(--border-thick) solid var(--primary-border)",
                  borderRadius: `${value}px`,
                }}
              />
              <TokenCode>{`radius/${name}`}</TokenCode>
              <Typography variant="caption" color="text.secondary">
                {value} px
              </Typography>
            </Stack>
          ))}
        </Box>
      </FoundationSection>

      <FoundationSection
        title="Grids responsivos"
        description="As margens e gutters coincidem com os estilos locais criados no Figma."
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "repeat(3, 1fr)" },
            gap: 2,
          }}
        >
          {Object.entries(gridTokens).map(([name, grid]) => (
            <Stack
              key={name}
              spacing={2}
              sx={{
                border: "var(--border-thin) solid var(--border-default)",
                borderRadius: "var(--radius-md)",
                p: 2,
              }}
            >
              <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                <Typography
                  variant="headingSmall"
                  sx={{ textTransform: "capitalize" }}
                >
                  {name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {screenTokens[name as keyof typeof screenTokens]} px
                </Typography>
              </Stack>
              <Box
                aria-label={`Grid ${name} com ${grid.columns} colunas`}
                sx={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${grid.columns}, minmax(0, 1fr))`,
                  gap: `${Math.max(grid.gutter / 4, 2)}px`,
                  px: `${grid.margin / 4}px`,
                  height: 88,
                  bgcolor: "var(--bg-surface-sunken)",
                  borderRadius: "var(--radius-sm)",
                }}
              >
                {Array.from({ length: grid.columns }, (_, index) => (
                  <Box key={index} sx={{ bgcolor: "var(--primary-border)" }} />
                ))}
              </Box>
              <Typography variant="bodySmall" color="text.secondary">
                {grid.columns} coluna{grid.columns > 1 ? "s" : ""} · margem{" "}
                {grid.margin} px · gutter {grid.gutter} px
              </Typography>
            </Stack>
          ))}
        </Box>
      </FoundationSection>

      <FoundationSection title="Breakpoints e dimensões estruturais">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 3,
          }}
        >
          <Stack spacing={1.25}>
            <Typography variant="headingSmall">Breakpoints</Typography>
            {Object.entries(breakpointTokens).map(([name, value]) => (
              <Stack
                key={name}
                direction="row"
                sx={{ justifyContent: "space-between" }}
              >
                <TokenCode>{name}</TokenCode>
                <Typography variant="bodyMedium">{value} px</Typography>
              </Stack>
            ))}
          </Stack>
          <Stack spacing={1.25}>
            <Typography variant="headingSmall">
              Estrutura e controles
            </Typography>
            {Object.entries(sizeTokens).map(([name, value]) => (
              <Stack
                key={name}
                direction="row"
                sx={{ justifyContent: "space-between" }}
              >
                <TokenCode>{name}</TokenCode>
                <Typography variant="bodyMedium">{value} px</Typography>
              </Stack>
            ))}
            <Stack direction="row" sx={{ justifyContent: "space-between" }}>
              <TokenCode>border/thin · border/thick</TokenCode>
              <Typography variant="bodyMedium">
                {borderTokens.thin} px · {borderTokens.thick} px
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </FoundationSection>
    </FoundationPage>
  ),
};
