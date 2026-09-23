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
          "Escala tipográfica oficial: Fraunces para expressão e Figtree para interface.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const specimens = [
  ["Display/XL", "displayXl", "Celebração que transforma"],
  ["Display/L", "displayLarge", "Próximo encontro"],
  ["Display/M", "displayMedium", "Pastoral da Juventude"],
  ["Display/S", "displaySmall", "Detalhes do encontro"],
  ["Heading/L", "headingLarge", "Informações principais"],
  ["Heading/M", "headingMedium", "Participação e presença"],
  ["Heading/S", "headingSmall", "Dados pessoais"],
  ["Body/L", "bodyLarge", "Uma comunidade que acolhe e caminha junto."],
  ["Body/M", "bodyMedium", "Texto padrão para conteúdos e formulários."],
  ["Body/M Strong", "bodyMediumStrong", "Informação em destaque"],
  ["Body/S", "bodySmall", "Texto de apoio e metadados."],
  ["Body/S Strong", "bodySmallStrong", "Apoio em destaque"],
  ["Label/M", "labelMedium", "Rótulo do campo"],
  ["Label/S", "labelSmall", "Cabeçalho de coluna"],
  ["Caption", "caption", "Legenda complementar"],
  ["Overline", "overline", "Próximo passo"],
  ["Metric/Display", "metricDisplay", "128"],
] as const;

export const Escala: Story = {
  render: () => (
    <FoundationPage
      title="Tipografia"
      description="Fraunces dá personalidade aos títulos e métricas. Figtree mantém a interface clara, contemporânea e confortável para leitura."
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: "var(--spacing-lg)",
        }}
      >
        <FoundationSection title="Display · Fraunces">
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
            <TokenCode>Fraunces</TokenCode>
            <TokenCode>Semibold 600</TokenCode>
          </Stack>
        </FoundationSection>
        <FoundationSection title="Interface · Figtree">
          <Typography sx={{ fontFamily: fontFamilyTokens.body, fontSize: 24 }}>
            Informação simples para todos.
          </Typography>
          <Stack
            direction="row"
            spacing={1}
            useFlexGap
            sx={{ flexWrap: "wrap" }}
          >
            <TokenCode>Figtree</TokenCode>
            <TokenCode>400 · 500 · 600 · 700</TokenCode>
          </Stack>
        </FoundationSection>
      </Box>

      <FoundationSection
        title="Estilos"
        description="Amostra dos 17 estilos locais definidos no Figma e disponíveis no tema MUI."
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
