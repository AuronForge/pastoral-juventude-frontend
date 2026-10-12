import { Box, Stack, Typography } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  primitiveColorTokens,
  resolveColor,
  semanticColorTokens,
} from "../tokens";
import { FoundationPage, FoundationSection, TokenCode } from "./FoundationPage";

const meta = {
  title: "Design System/Fundações/Cores",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Primitivos e tokens semânticos espelhados das coleções Primitives e Color do Figma. Componentes devem consumir tokens semânticos, nunca cores primitivas diretamente.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function Swatch({ color, label }: { color: string; label: string }) {
  return (
    <Box
      role="img"
      aria-label={label}
      sx={{
        width: 40,
        height: 40,
        flex: "0 0 auto",
        bgcolor: color,
        border:
          "var(--pj-border-width-default) solid var(--pj-color-border-default)",
        borderRadius: "var(--pj-radius-sm)",
      }}
    />
  );
}

export const Paleta: Story = {
  render: () => (
    <FoundationPage
      title="Tokens de cor"
      description="Direção: azul-petróleo, terracota, dourado suave e superfícies em areia/creme. Os tokens semânticos são aliases dos valores primitivos."
    >
      <FoundationSection
        title="Primitivos"
        description="Valores de referência. Não devem ser usados diretamente nos componentes."
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(2, minmax(0, 1fr))",
              lg: "repeat(3, minmax(0, 1fr))",
            },
            gap: 2,
          }}
        >
          {primitiveColorTokens.map((token) => (
            <Stack
              key={token.name}
              direction="row"
              spacing={1.5}
              sx={{ alignItems: "center" }}
            >
              <Swatch
                color={token.value}
                label={`${token.name}: ${token.value}`}
              />
              <Stack spacing={0.5} sx={{ alignItems: "flex-start" }}>
                <TokenCode>{token.name}</TokenCode>
                <Typography variant="bodySmall" color="text.secondary">
                  {token.value}
                </Typography>
              </Stack>
            </Stack>
          ))}
        </Box>
      </FoundationSection>

      <FoundationSection
        title="Semânticos"
        description="Aliases consumidos pelos componentes. A variável CSS segue o code syntax definido no Figma."
      >
        <Stack spacing={1.5}>
          {semanticColorTokens.map((token) => (
            <Stack
              key={token.name}
              direction={{ xs: "column", md: "row" }}
              spacing={1.5}
              sx={{
                alignItems: { xs: "flex-start", md: "center" },
                pb: 1.5,
                borderBottom:
                  "var(--pj-border-width-default) solid var(--pj-color-border-default)",
              }}
            >
              <Swatch
                color={`var(${token.cssVar})`}
                label={`${token.name}: ${resolveColor(token.name)}`}
              />
              <Stack spacing={0.5} sx={{ alignItems: "flex-start", flex: 1 }}>
                <TokenCode>{token.name}</TokenCode>
                <Typography variant="bodySmall" color="text.secondary">
                  {`var(${token.cssVar}) → ${token.alias}`}
                </Typography>
              </Stack>
            </Stack>
          ))}
        </Stack>
      </FoundationSection>
    </FoundationPage>
  ),
};
