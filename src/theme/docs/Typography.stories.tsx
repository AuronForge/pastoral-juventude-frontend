import { Stack, Typography } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { typographyTokens, type TypographyStyleName } from "../tokens";
import { FoundationPage, FoundationSection, TokenCode } from "./FoundationPage";

const meta = {
  title: "Design System/Fundações/Tipografia",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Os 11 estilos tipográficos do Figma. Roboto é a família oficial; escolha o estilo pela função semântica, não apenas pela proximidade do tamanho.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/** Exemplos e usos conforme a página 02.2 — Tipografia do Figma. */
const specimens: Array<[TypographyStyleName, string]> = [
  ["display", "Pastoral da Juventude"],
  ["headingLarge", "Fundação do Design System"],
  ["headingMedium", "Estrutura e navegação"],
  ["headingSmall", "Detalhes do encontro"],
  ["title", "Informações da pessoa"],
  [
    "bodyLarge",
    "Texto principal para leitura confortável em conteúdos e formulários.",
  ],
  ["bodyMedium", "Conteúdo padrão de componentes e campos."],
  ["bodySmall", "Textos de apoio, ajuda e metadados."],
  ["labelLarge", "Ações e rótulos de maior destaque"],
  ["labelMedium", "Botões, campos e controles compactos"],
  ["labelSmall", "Badges, paginação e rótulos mínimos"],
];

const weightName = { 400: "Regular", 500: "Medium", 700: "Bold" } as const;

export const Escala: Story = {
  render: () => (
    <FoundationPage
      title="Tipografia"
      description="Roboto · escala normalizada por função para componentes, conteúdos e hierarquia."
    >
      <FoundationSection title="Estilos">
        <Stack spacing={3}>
          {specimens.map(([variant, sample]) => {
            const token = typographyTokens[variant];
            return (
              <Stack
                key={variant}
                spacing={0.75}
                sx={{
                  pb: 2,
                  borderBottom:
                    "var(--pj-border-width-default) solid var(--pj-color-border-default)",
                }}
              >
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ alignItems: "center", flexWrap: "wrap" }}
                >
                  <TokenCode>{token.name}</TokenCode>
                  <Typography variant="bodySmall" color="text.secondary">
                    {`${token.fontSize} / ${token.lineHeight} · ${weightName[token.fontWeight]} · variant="${variant}"`}
                  </Typography>
                </Stack>
                <Typography variant={variant}>{sample}</Typography>
              </Stack>
            );
          })}
        </Stack>
      </FoundationSection>
    </FoundationPage>
  ),
};
