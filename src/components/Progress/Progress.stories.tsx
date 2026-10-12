import { Stack, Typography } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Progress } from "./Progress";

const meta = {
  title: "Design System/Componentes/Progress",
  component: Progress,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Comunica andamento mensurável (Determinado, de 0 a 100) ou atividade em execução quando ainda não existe uma estimativa confiável (Indeterminado, ciclo de 1,5 s, linear e contínuo). Use Linear em áreas horizontais e Circular em espaços compactos. Não avance o indicador com valores fictícios e mostre o percentual somente quando for real e útil.",
      },
    },
  },
  args: {
    label: "Carregando encontros",
    type: "linear",
    value: 64,
    showValue: true,
  },
  argTypes: {
    type: { control: "inline-radio", options: ["linear", "circular"] },
    value: { control: { type: "range", min: 0, max: 100 } },
  },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variantes: Story = {
  render: () => (
    <Stack spacing={4} sx={{ maxWidth: 320 }}>
      {(
        [
          [
            "Linear · Determinado",
            <Progress
              key="ld"
              type="linear"
              value={64}
              showValue
              label="Enviando arquivo"
            />,
          ],
          [
            "Linear · Indeterminado",
            <Progress key="li" type="linear" label="Sincronizando" />,
          ],
          [
            "Circular · Determinado",
            <Progress key="cd" value={64} showValue label="Enviando arquivo" />,
          ],
          [
            "Circular · Indeterminado",
            <Progress key="ci" label="Sincronizando" />,
          ],
        ] as const
      ).map(([title, node]) => (
        <Stack key={title} spacing={1}>
          <Typography variant="labelLarge">{title}</Typography>
          {node}
        </Stack>
      ))}
    </Stack>
  ),
};
