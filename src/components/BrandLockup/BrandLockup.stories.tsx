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
          "Assinatura horizontal oficial do PastorApp, renderizada a partir dos arquivos de marca fornecidos. Use `on-light` ou `on-dark` conforme o fundo; não altere cores, proporção ou tipografia da marca.",
      },
    },
  },
  args: {
    size: "default",
    tone: "on-light",
  },
  argTypes: {
    decorative: { control: "boolean" },
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
          args.tone === "on-dark" ? "var(--bg-inverse)" : "var(--bg-canvas)",
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
      <Box sx={{ bgcolor: "var(--bg-canvas)", p: 4 }}>
        <BrandLockup tone="on-light" />
      </Box>
      <Box sx={{ bgcolor: "var(--bg-inverse)", p: 4 }}>
        <BrandLockup tone="on-dark" />
      </Box>
    </Stack>
  ),
};

export const Tamanhos: Story = {
  render: () => (
    <Stack spacing={3} sx={{ alignItems: "flex-start" }}>
      <BrandLockup size="compact" />
      <BrandLockup size="default" />
      <Typography color="text.secondary" variant="bodySmall">
        O tamanho compacto tem 36 px de altura e é o menor uso permitido da
        assinatura horizontal.
      </Typography>
    </Stack>
  ),
};
