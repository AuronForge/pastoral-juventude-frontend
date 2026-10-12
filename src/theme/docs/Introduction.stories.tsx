import { Stack, Typography } from "@mui/material";
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
          "Visão geral das fundações visuais, espelhadas do arquivo Figma do MVP Pastoral da Juventude.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const VisaoGeral: Story = {
  name: "Visão geral",
  render: () => (
    <FoundationPage
      title="Pastoral da Juventude"
      description="A interface deve ser acolhedora, confiável e organizada; jovem sem infantilização. Evitar aparência burocrática, excesso de cinza, cores e ícones religiosos decorativos."
    >
      <FoundationSection
        title="Fonte de verdade"
        description="O Figma define tokens, estilos e componentes. Quando uma regra não estiver definida, ela deve ser registrada como pendência — nunca inferida."
      >
        <Stack component="ul" spacing={1.5} sx={{ m: 0, pl: 2.5 }}>
          <Typography component="li" variant="bodyMedium">
            Primitivos guardam valores; semânticos expressam intenção;
            componentes usam os semânticos, como{" "}
            <TokenCode>var(--pj-color-text-primary)</TokenCode>.
          </Typography>
          <Typography component="li" variant="bodyMedium">
            Criar ou alterar um token no Figma antes de aplicá-lo em
            componentes.
          </Typography>
          <Typography component="li" variant="bodyMedium">
            Tipografia: Roboto, com 11 estilos. Tamanhos avulsos não devem ser
            introduzidos.
          </Typography>
          <Typography component="li" variant="bodyMedium">
            Ícones: Material Symbols, estilo Outlined.
          </Typography>
          <Typography component="li" variant="bodyMedium">
            Controles acionáveis devem oferecer pelo menos 44 × 44 px.
          </Typography>
        </Stack>
      </FoundationSection>
    </FoundationPage>
  ),
};
