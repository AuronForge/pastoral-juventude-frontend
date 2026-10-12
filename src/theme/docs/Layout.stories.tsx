import { Box, Stack, Typography } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";
import {
  geometryTokens,
  iconTokens,
  layoutTokens,
  pendingLayoutTokens,
  spacingTokens,
  type NumericToken,
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
          "Coleções Spacing, Geometry, Icon e Layout do Figma: espaçamento, raios, bordas, ajustes finos, tamanhos de ícone e medidas estruturais.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function TokenRow({
  token,
  preview,
}: {
  token: NumericToken;
  preview?: ReactNode;
}) {
  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={2}
      sx={{ alignItems: { xs: "flex-start", md: "center" } }}
    >
      <Stack spacing={0.5} sx={{ minWidth: 260, alignItems: "flex-start" }}>
        <TokenCode>{token.name}</TokenCode>
        <Typography variant="bodySmall" color="text.secondary">
          {`var(${token.cssVar}) · ${token.value} px`}
        </Typography>
      </Stack>
      {preview}
    </Stack>
  );
}

const bar = (width: string) => (
  <Box
    aria-hidden
    sx={{
      width,
      height: 12,
      bgcolor: "var(--pj-color-action-primary)",
      borderRadius: "var(--pj-radius-sm)",
    }}
  />
);

export const EscalasEGrids: Story = {
  name: "Escalas",
  render: () => (
    <FoundationPage
      title="Espaçamento e geometria"
      description="Escala base de 4 px para manter ritmo, alinhamento e densidade consistentes. Use somente os tokens da escala."
    >
      <FoundationSection
        title="Espaçamento"
        description="space/1 a space/10 formam a escala principal; as extensões registram valores já usados no Figma."
      >
        <Stack spacing={2}>
          {spacingTokens.map((token) => (
            <TokenRow
              key={token.name}
              token={token}
              preview={bar(`var(${token.cssVar})`)}
            />
          ))}
        </Stack>
      </FoundationSection>

      <FoundationSection
        title="Raios, bordas e ajustes finos"
        description="Ajustes finos são reservados aos alinhamentos e microespaçamentos existentes. Para novas composições, preferir a escala estrutural."
      >
        <Stack spacing={2}>
          {geometryTokens.map((token) => (
            <TokenRow
              key={token.name}
              token={token}
              preview={
                token.name.startsWith("radius/") ? (
                  <Box
                    aria-hidden
                    sx={{
                      width: 56,
                      height: 40,
                      border:
                        "var(--pj-border-width-emphasis) solid var(--pj-color-action-primary)",
                      borderRadius: `var(${token.cssVar})`,
                    }}
                  />
                ) : undefined
              }
            />
          ))}
        </Stack>
      </FoundationSection>

      <FoundationSection
        title="Ícones"
        description="Material Symbols Outlined (FILL 0, weight 400, grade 0). Ícones herdam a cor do contexto."
      >
        <Stack spacing={2}>
          {iconTokens.map((token) => (
            <TokenRow
              key={token.name}
              token={token}
              preview={
                <Box
                  component="span"
                  aria-hidden
                  className="material-symbols-outlined"
                  sx={{ fontSize: `var(${token.cssVar})` }}
                >
                  groups
                </Box>
              }
            />
          ))}
        </Stack>
      </FoundationSection>

      <FoundationSection
        title="Medidas estruturais"
        description="Coleção Layout: navegação lateral, header, navegação inferior e avatar."
      >
        <Stack spacing={2}>
          {layoutTokens.map((token) => (
            <TokenRow key={token.name} token={token} />
          ))}
        </Stack>
      </FoundationSection>

      <FoundationSection
        title="Pendências"
        description="Valores ainda sem variável no Figma, mantidos do código anterior até serem definidos."
      >
        <Typography variant="bodyMedium">
          {`Breakpoints: ${Object.values(pendingLayoutTokens.breakpoints).join(", ")} px · Largura máxima de conteúdo: ${pendingLayoutTokens.contentMax} px · Grid: ${Object.entries(
            pendingLayoutTokens.grid,
          )
            .map(
              ([device, grid]) =>
                `${device} ${grid.columns} colunas, gutter ${grid.gutter}, margem ${grid.margin}`,
            )
            .join("; ")}`}
        </Typography>
      </FoundationSection>
    </FoundationPage>
  ),
};
