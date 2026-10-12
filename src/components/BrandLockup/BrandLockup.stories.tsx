import { Box, Stack, Typography } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { BrandLockup } from "./BrandLockup";

const meta = {
  title: "Design System/Componentes/Assinatura da marca",
  component: BrandLockup,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Brand / Logo do Figma: Assinatura (horizontal) ou Símbolo, para fundo claro ou escuro. Não altere cores, proporção ou tipografia da marca.",
      },
    },
  },
  args: {
    size: "default",
    tone: "on-light",
  },
  argTypes: {
    decorative: { control: "boolean" },
    format: { control: "inline-radio", options: ["signature", "symbol"] },
    size: {
      control: "inline-radio",
      options: ["compact", "default"],
    },
    tone: {
      control: "inline-radio",
      options: ["on-light", "on-dark"],
    },
  },
} satisfies Meta<typeof BrandLockup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Box
      sx={{
        display: "inline-flex",
        bgcolor:
          args.tone === "on-dark"
            ? "var(--color-bg-access)"
            : "var(--pj-color-bg-canvas)",
        p: 4,
      }}
    >
      <BrandLockup {...args} />
    </Box>
  ),
};

export const Fundos: Story = {
  render: () => (
    <Stack direction="row" sx={{ flexWrap: "wrap", gap: 3 }}>
      <Box sx={{ bgcolor: "var(--pj-color-bg-canvas)", p: 4 }}>
        <BrandLockup tone="on-light" />
      </Box>
      <Box sx={{ bgcolor: "var(--color-bg-access)", p: 4 }}>
        <BrandLockup tone="on-dark" />
      </Box>
    </Stack>
  ),
};

export const FormatosETamanhos: Story = {
  name: "Formatos e tamanhos",
  render: () => (
    <Stack spacing={3} sx={{ alignItems: "flex-start" }}>
      <BrandLockup size="default" />
      <BrandLockup size="compact" />
      <BrandLockup format="symbol" />
      <Typography color="text.secondary" variant="bodySmall">
        Assinatura 240 × 72 px, Assinatura compacta 144 × 43 px (App Shell) e
        Símbolo 72 × 72 px, já com a área de respiro do Figma.
      </Typography>
    </Stack>
  ),
};
