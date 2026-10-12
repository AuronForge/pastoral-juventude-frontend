import { Stack } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { DatePicker } from "./DatePicker";

const meta = {
  title: "Design System/Componentes/Seletor de data",
  component: DatePicker,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Date Picker do Figma: seleção de data, intervalo, mês e ano ou data e hora em convenção brasileira (DD/MM/AAAA, relógio de 24 horas e semana iniciada no domingo). Permite digitação direta, navegação por setas no calendário, Enter para selecionar, Escape para fechar e Tab para continuar. Médio com 40 px e Grande com 48 px.",
      },
    },
  },
  args: {
    label: "Data",
    mode: "date",
    size: "medium",
    defaultValue: "2026-09-15",
  },
  argTypes: {
    mode: {
      control: "inline-radio",
      options: ["date", "range", "monthYear", "dateTime"],
    },
    size: { control: "inline-radio", options: ["medium", "large"] },
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Modelos: Story = {
  render: () => (
    <Stack spacing={3} sx={{ maxWidth: 420 }}>
      <DatePicker defaultValue="2026-09-15" label="Data" />
      <DatePicker
        defaultValue={{ start: "2026-09-15", end: "2026-09-18" }}
        label="Intervalo"
        mode="range"
      />
      <DatePicker defaultValue="2026-09" label="Mês e ano" mode="monthYear" />
      <DatePicker
        defaultValue="2026-09-15T14:30"
        label="Data e hora"
        mode="dateTime"
      />
    </Stack>
  ),
};

export const Estados: Story = {
  render: () => (
    <Stack spacing={3} sx={{ maxWidth: 320 }}>
      <DatePicker label="Vazio" size="large" />
      <DatePicker defaultValue="2026-09-15" label="Preenchido" size="large" />
      <DatePicker
        defaultValue="2026-09-15"
        errorMessage="Data inválida"
        label="Erro"
        size="large"
      />
      <DatePicker
        defaultValue="2026-09-15"
        disabled
        label="Desabilitado"
        size="large"
      />
      <DatePicker
        defaultValue="2026-09-15"
        label="Somente leitura"
        readOnly
        size="large"
      />
    </Stack>
  ),
};
