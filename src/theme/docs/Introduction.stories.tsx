import { Box, Chip, Stack, Typography } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage, FoundationSection, TokenCode } from "./FoundationPage";

const meta = {
  title: "Design System/Introdução",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Visão geral das fundações visuais da aplicação Pastoral da Juventude.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const metrics = [
  { value: "179", label: "tokens sincronizados" },
  { value: "2", label: "modos de cor" },
  { value: "17", label: "estilos tipográficos" },
  { value: "3", label: "grids responsivos" },
];

export const VisaoGeral: Story = {
  name: "Visão geral",
  render: () => (
    <FoundationPage
      title="Pastoral da Juventude"
      description="Uma linguagem visual acolhedora, acessível e consistente para construir as jornadas do jovem e da coordenação."
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr 1fr", lg: "repeat(4, 1fr)" },
          gap: "var(--spacing-lg)",
        }}
      >
        {metrics.map((metric) => (
          <Box
            key={metric.label}
            sx={{
              bgcolor: "var(--primary-subtle)",
              border: "var(--border-thin) solid var(--primary-border)",
              borderRadius: "var(--radius-lg)",
              p: 3,
            }}
          >
            <Typography
              variant="metricDisplay"
              component="p"
              color="primary.main"
            >
              {metric.value}
            </Typography>
            <Typography variant="bodySmall" color="text.secondary">
              {metric.label}
            </Typography>
          </Box>
        ))}
      </Box>

      <FoundationSection
        title="Fluxo da fonte de verdade"
        description="O Figma define a intenção visual; o código tipa e distribui os tokens; o Storybook documenta e valida seu uso."
      >
        <Stack direction={{ xs: "column", md: "row" }} spacing={1.5}>
          {[
            "Figma",
            "Tokens TypeScript",
            "Tema MUI",
            "Storybook",
            "Features",
          ].map((item, index, values) => (
            <Stack
              key={item}
              direction="row"
              spacing={1.5}
              sx={{ alignItems: "center" }}
            >
              <Chip label={item} color={index === 0 ? "primary" : "default"} />
              {index < values.length - 1 ? (
                <Typography aria-hidden color="text.secondary">
                  →
                </Typography>
              ) : null}
            </Stack>
          ))}
        </Stack>
      </FoundationSection>

      <FoundationSection title="Princípios de uso">
        <Stack component="ul" spacing={1.5} sx={{ m: 0, pl: 2.5 }}>
          <Typography component="li" variant="bodyMedium">
            Componentes devem consumir tokens semânticos, como{" "}
            <TokenCode>var(--text-primary)</TokenCode>, e não cores primitivas.
          </Typography>
          <Typography component="li" variant="bodyMedium">
            Interfaces são mobile first, com transições principais em 768 px e
            1200 px.
          </Typography>
          <Typography component="li" variant="bodyMedium">
            Todo estado interativo precisa preservar foco visível, contraste e
            área mínima de toque de 44 px.
          </Typography>
          <Typography component="li" variant="bodyMedium">
            O modo escuro utiliza aliases próprios; não deve ser obtido apenas
            invertendo as cores claras.
          </Typography>
        </Stack>
      </FoundationSection>
    </FoundationPage>
  ),
};
