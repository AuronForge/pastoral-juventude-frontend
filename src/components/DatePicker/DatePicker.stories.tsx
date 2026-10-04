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
          "Calendário nativo composto com TextField. A apresentação e o calendário seguem o navegador; valores, defaultValue e limites usam YYYY-MM-DD. Reutiliza os estados, tokens, foco e mensagens do Design System. Sem conversão de fuso horário.",
      },
    },
  },
  args: { label: "Data de nascimento", autoComplete: "bday", size: "large" },
} satisfies Meta<typeof DatePicker>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: Story = {};
export const Estados: Story = {
  render: () => (
    <Stack spacing={2} sx={{ maxWidth: 420 }}>
      <DatePicker label="Data de nascimento" required />
      <DatePicker
        label="Com valor"
        defaultValue="2000-01-01"
        hint="Selecione no calendário."
      />
      <DatePicker label="Com erro" errorMessage="Selecione uma data válida." />
      <DatePicker label="Somente leitura" defaultValue="2000-01-01" readOnly />
      <DatePicker label="Desabilitado" defaultValue="2000-01-01" disabled />
    </Stack>
  ),
};
