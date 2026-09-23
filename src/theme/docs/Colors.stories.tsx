import { Box, Stack, Typography } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { primitiveColors, semanticColors } from "../tokens";
import { FoundationPage, FoundationSection, TokenCode } from "./FoundationPage";
import { flattenTokens } from "./tokenHelpers";

const meta = {
  title: "Design System/Fundações/Cores",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Paleta primitiva e tokens semânticos usados nos modos claro e escuro.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const semanticLight = flattenTokens(semanticColors.light);
const semanticDark = new Map(flattenTokens(semanticColors.dark));

export const Paleta: Story = {
  render: () => (
    <FoundationPage
      title="Cores"
      description="A paleta combina o azul-marinho institucional, o âmbar acolhedor e neutros quentes. Estados de sucesso e erro possuem escalas próprias."
    >
      <FoundationSection
        title="Primitivas"
        description="Valores de referência. Não devem ser usados diretamente nos componentes da aplicação."
      >
        <Stack spacing={4}>
          {Object.entries(primitiveColors).map(([family, scale]) => (
            <Stack key={family} spacing={1.5}>
              <Typography
                variant="headingSmall"
                sx={{ textTransform: "capitalize" }}
              >
                {family}
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "repeat(2, minmax(0, 1fr))",
                    md: "repeat(5, minmax(0, 1fr))",
                    lg: "repeat(10, minmax(0, 1fr))",
                  },
                  gap: 1.5,
                }}
              >
                {Object.entries(scale).map(([step, color]) => (
                  <Stack key={step} spacing={0.75}>
                    <Box
                      role="img"
                      aria-label={`${family} ${step}: ${color}`}
                      sx={{
                        height: 64,
                        bgcolor: color,
                        border:
                          "var(--border-thin) solid var(--border-default)",
                        borderRadius: "var(--radius-sm)",
                      }}
                    />
                    <Typography variant="labelSmall">{step}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {color.toUpperCase()}
                    </Typography>
                  </Stack>
                ))}
              </Box>
            </Stack>
          ))}
        </Stack>
      </FoundationSection>

      <FoundationSection
        title="Semânticas"
        description="Aliases consumidos pela aplicação. Cada token possui resolução específica para Light e Dark."
      >
        <Box sx={{ overflowX: "auto" }}>
          <Box
            role="table"
            aria-label="Tokens de cor semânticos"
            sx={{ minWidth: 720 }}
          >
            <Box
              role="row"
              sx={{
                display: "grid",
                gridTemplateColumns: "minmax(280px, 1fr) 180px 180px",
                gap: 2,
                pb: 1.5,
                borderBottom: "var(--border-thin) solid var(--border-default)",
              }}
            >
              <Typography role="columnheader" variant="labelMedium">
                Token
              </Typography>
              <Typography role="columnheader" variant="labelMedium">
                Light
              </Typography>
              <Typography role="columnheader" variant="labelMedium">
                Dark
              </Typography>
            </Box>
            {semanticLight.map(([name, lightValue]) => {
              const darkValue = semanticDark.get(name);
              const cssVariable = `--${name.replaceAll("/", "-")}`;

              return (
                <Box
                  role="row"
                  key={name}
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "minmax(280px, 1fr) 180px 180px",
                    alignItems: "center",
                    gap: 2,
                    py: 1.25,
                    borderBottom:
                      "var(--border-thin) solid var(--border-subtle)",
                  }}
                >
                  <Stack
                    role="cell"
                    spacing={0.5}
                    sx={{ alignItems: "flex-start" }}
                  >
                    <TokenCode>{`color/${name}`}</TokenCode>
                    <Typography variant="caption" color="text.secondary">
                      {cssVariable}
                    </Typography>
                  </Stack>
                  {[lightValue, darkValue].map((value, index) => (
                    <Stack
                      role="cell"
                      key={`${name}-${index}`}
                      direction="row"
                      spacing={1}
                      sx={{ alignItems: "center" }}
                    >
                      <Box
                        aria-hidden
                        sx={{
                          width: 32,
                          height: 32,
                          flex: "0 0 auto",
                          bgcolor: String(value),
                          border:
                            "var(--border-thin) solid var(--border-default)",
                          borderRadius: "var(--radius-xs)",
                        }}
                      />
                      <Typography variant="caption">
                        {String(value).toUpperCase()}
                      </Typography>
                    </Stack>
                  ))}
                </Box>
              );
            })}
          </Box>
        </Box>
      </FoundationSection>
    </FoundationPage>
  ),
};
