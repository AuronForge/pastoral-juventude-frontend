import { Box, Stack, Typography } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  fontFamilyTokens,
  fontSizeTokens,
  fontWeightTokens,
  typographyTokens,
} from "../tokens";
import { FoundationPage, FoundationSection, TokenCode } from "./FoundationPage";

const meta = {
  title: "Design System/Fundações/Tipografia",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Escala tipográfica oficial do Figma: Roboto nos pesos 400, 500 e 700.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const specimens = [
  ["Typography/Display", "displayXl", "Celebração que transforma"],
  ["Typography/Heading/Large", "headingLarge", "Informações principais"],
  ["Typography/Heading/Medium", "headingMedium", "Participação e presença"],
  ["Typography/Heading/Small", "headingSmall", "Dados pessoais"],
  ["Typography/Title", "title", "Próximo encontro"],
  ["Body/L", "bodyLarge", "Uma comunidade que acolhe e caminha junto."],
  ["Body/M", "bodyMedium", "Texto padrão para conteúdos e formulários."],
  ["Body/S", "bodySmall", "Texto de apoio e metadados."],
  ["Label/L", "labelLarge", "Ação principal"],
  ["Label/M", "labelMedium", "Rótulo do campo"],
  ["Label/S", "labelSmall", "Cabeçalho de coluna"],
] as const;

export const Escala: Story = {
  render: () => (
    <FoundationPage
      title="Tipografia"
      description="Roboto mantém as mesmas métricas e pesos usados pelos componentes do arquivo de design."
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: "var(--spacing-lg)",
        }}
      >
        <FoundationSection title="Família oficial">
          <Typography
            sx={{ fontFamily: fontFamilyTokens.display, fontSize: 40 }}
          >
            Acolher, servir e celebrar.
          </Typography>
          <Stack
            direction="row"
            spacing={1}
            useFlexGap
            sx={{ flexWrap: "wrap" }}
          >
            <TokenCode>Roboto</TokenCode>
            <TokenCode>400 · 500 · 700</TokenCode>
          </Stack>
        </FoundationSection>
        <FoundationSection title="Regra de normalização">
          <Typography sx={{ fontFamily: fontFamilyTokens.body, fontSize: 24 }}>
            Pesos, tamanhos e alturas de linha seguem os estilos locais.
          </Typography>
          <Stack
            direction="row"
            spacing={1}
            useFlexGap
            sx={{ flexWrap: "wrap" }}
          >
            <TokenCode>letter-spacing 0</TokenCode>
            <TokenCode>semibold → medium 500</TokenCode>
          </Stack>
        </FoundationSection>
      </Box>

      <FoundationSection
        title="Estilos"
        description="Amostra dos 11 estilos locais definidos no Figma. Variantes de compatibilidade do tema reutilizam essas métricas."
      >
        <Stack
          divider={
            <Box
              sx={{
                borderTop: "var(--border-thin) solid var(--border-subtle)",
              }}
            />
          }
        >
          {specimens.map(([figmaName, tokenName, sample]) => {
            const token = typographyTokens[tokenName];

            return (
              <Box
                key={figmaName}
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    md: "180px minmax(0, 1fr)",
                  },
                  gap: 2,
                  py: 2.5,
                  alignItems: "center",
                }}
              >
                <Stack spacing={0.5} sx={{ alignItems: "flex-start" }}>
                  <Typography variant="labelMedium">{figmaName}</Typography>
                  <TokenCode>{tokenName}</TokenCode>
                  <Typography variant="caption" color="text.secondary">
                    {token.fontSize}px · {token.lineHeight} · {token.fontWeight}
                  </Typography>
                </Stack>
                <Typography sx={token}>{sample}</Typography>
              </Box>
            );
          })}
        </Stack>
      </FoundationSection>

      <FoundationSection title="Escalas-base">
        <Stack spacing={1.5}>
          <Typography variant="bodyMedium">
            Tamanhos: {Object.values(fontSizeTokens).join(", ")} px
          </Typography>
          <Typography variant="bodyMedium">
            Pesos: {Object.values(fontWeightTokens).join(", ")}
          </Typography>
        </Stack>
      </FoundationSection>
    </FoundationPage>
  ),
};
