import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { MaterialSymbol } from "../../components/MaterialSymbol";
import { primitiveColors, radiusTokens, sizeTokens } from "../tokens";
import { FoundationPage, FoundationSection, TokenCode } from "./FoundationPage";

const meta = {
  title: "Design System/Fundações/Alinhamento com o Figma",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Revisão consolidada dos itens FND-01 a FND-05. O modo Light corresponde às variáveis publicadas no Figma; o tema escuro continua como extensão do produto.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const swatches = [
  ["Azul", primitiveColors.blue[600]],
  ["Terracota", primitiveColors.terracotta[600]],
  ["Dourado", primitiveColors.gold[500]],
  ["Canvas", primitiveColors.sand[50]],
  ["Superfície", primitiveColors.cream[0]],
  ["Texto", primitiveColors.brown[900]],
] as const;

const symbols = [
  "today",
  "groups",
  "settings",
  "notifications",
  "more_horiz",
  "menu",
  "close",
  "arrow_back",
] as const;

function AlignmentReview() {
  const [annotations, setAnnotations] = useState(true);

  return (
    <FoundationPage
      eyebrow="Prioridade 4"
      title="Fundações alinhadas"
      description="Tipografia, cores, superfícies, geometria e ícones usam a referência vigente do Design System."
    >
      <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap" }}>
        {["FND-01", "FND-02", "FND-03", "FND-04", "FND-05"].map((item) => (
          <Chip color="primary" key={item} label={item} variant="outlined" />
        ))}
        <Button
          onClick={() => setAnnotations((current) => !current)}
          size="small"
          variant="outlined"
        >
          {annotations ? "Ocultar medidas" : "Exibir medidas"}
        </Button>
      </Stack>

      <FoundationSection
        title="Roboto"
        description="Uma única família nos pesos oficiais 400, 500 e 700."
      >
        <Stack spacing={2}>
          <Typography variant="displayXl">Pastoral da Juventude</Typography>
          <Typography variant="headingSmall">
            Acolher, servir e celebrar
          </Typography>
          <Typography color="text.secondary" variant="bodyLarge">
            Uma comunidade que caminha com cada jovem.
          </Typography>
          {annotations ? (
            <TokenCode>Display · 40/48 · Bold 700</TokenCode>
          ) : null}
        </Stack>
      </FoundationSection>

      <FoundationSection
        title="Paleta e superfícies"
        description="Valores primitivos e aliases Light publicados no Figma."
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, minmax(0, 1fr))",
              md: "repeat(3, minmax(0, 1fr))",
              lg: "repeat(6, minmax(0, 1fr))",
            },
            gap: 2,
          }}
        >
          {swatches.map(([label, color]) => (
            <Stack key={label} spacing={1}>
              <Box
                aria-label={`${label}: ${color}`}
                role="img"
                sx={{
                  height: 72,
                  bgcolor: color,
                  border: "var(--border-thin) solid var(--border-default)",
                  borderRadius: "var(--radius-md)",
                }}
              />
              <Typography variant="labelMedium">{label}</Typography>
              {annotations ? (
                <Typography color="text.secondary" variant="caption">
                  {color.toUpperCase()}
                </Typography>
              ) : null}
            </Stack>
          ))}
        </Box>
      </FoundationSection>

      <FoundationSection
        title="Geometria e controles"
        description="Raios de 0, 4, 8, 12 e 16 px; alvos acionáveis com pelo menos 44 × 44 px."
      >
        <Stack direction="row" spacing={3} useFlexGap sx={{ flexWrap: "wrap" }}>
          {(
            [
              ["sm", radiusTokens.sm],
              ["md", radiusTokens.md],
              ["lg", radiusTokens.lg],
              ["xl", radiusTokens.xl],
              ["full", radiusTokens.full],
            ] as const
          ).map(([name, radius]) => (
            <Stack key={name} spacing={1} sx={{ alignItems: "center" }}>
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  bgcolor: "var(--accent-solid)",
                  borderRadius: `${radius}px`,
                }}
              />
              <TokenCode>{`radius/${name} · ${radius}px`}</TokenCode>
            </Stack>
          ))}
        </Stack>
        {annotations ? (
          <Typography sx={{ mt: 3 }} variant="bodyMedium">
            Controles: {sizeTokens.controlSm} / {sizeTokens.controlMd} /{" "}
            {sizeTokens.controlLg} px · toque mínimo {sizeTokens.touchMin} px
          </Typography>
        ) : null}
      </FoundationSection>

      <FoundationSection
        title="Material Symbols Outlined"
        description="SVGs oficiais auto-hospedados, FILL 0 e weight 400. A cor é herdada do contexto."
      >
        <Stack direction="row" spacing={3} useFlexGap sx={{ flexWrap: "wrap" }}>
          {symbols.map((name) => (
            <Stack key={name} spacing={1} sx={{ alignItems: "center" }}>
              <MaterialSymbol name={name} />
              <Typography variant="labelSmall">{name}</Typography>
            </Stack>
          ))}
        </Stack>
      </FoundationSection>
    </FoundationPage>
  );
}

export const Revisao: Story = {
  name: "Revisão",
  render: () => <AlignmentReview />,
};
