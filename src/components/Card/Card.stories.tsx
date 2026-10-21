import { Stack } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Button } from "../Button";
import { Card } from "./Card";

const meta: Meta<typeof Card> = {
  title: "Design System/Componentes/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Card do Figma (página 02.6.22): agrupa conteúdo relacionado em uma superfície delimitada. Modelos Informativo simples, Cabeçalho e conteúdo, Cabeçalho + conteúdo + ações e Clicável ou selecionável. Hover, Foco e Selecionado existem só no modelo clicável, em que toda a superfície é um único controle; não misture outros controles dentro dele. Título e conteúdo ocupam toda a largura e a altura acompanha o conteúdo. A ação contextual (…) é opcional.",
      },
    },
  },
  args: {
    title: "Título do card",
    children: "Conteúdo principal do card.",
  },
  decorators: [
    (Story, { parameters }) => (
      <div style={{ maxWidth: (parameters.cardWidth as number) ?? 360 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const InformativoSimples: Story = {
  name: "Informativo simples",
  args: { model: "informative" },
};

export const CabecalhoEConteudo: Story = {
  name: "Cabeçalho e conteúdo",
  args: {
    model: "header",
    contextAction: { label: "Mais ações", onClick: () => undefined },
  },
};

export const CabecalhoConteudoEAcoes: Story = {
  name: "Cabeçalho + conteúdo + ações",
  render: () => (
    <Card
      title="Título do card"
      model="actions"
      contextAction={{ label: "Mais ações", onClick: () => undefined }}
      actions={
        <>
          <Button variant="secondary" size="small">
            Cancelar
          </Button>
          <Button size="small">Confirmar</Button>
        </>
      }
    >
      Conteúdo principal do card.
    </Card>
  ),
};

export const Clicavel: Story = {
  name: "Clicável",
  args: { model: "interactive", href: "#" },
};

function SelectableCards({ title }: { title: string }) {
  const [selected, setSelected] = useState("a");
  return (
    <Stack spacing={2}>
      {["a", "b"].map((id) => (
        <Card
          key={id}
          model="interactive"
          selected={selected === id}
          onClick={() => setSelected(id)}
          title={`${title} ${id.toUpperCase()}`}
        >
          Conteúdo principal do card.
        </Card>
      ))}
    </Stack>
  );
}

export const Selecionavel: Story = {
  name: "Selecionável",
  render: () => <SelectableCards title="Opção" />,
};

export const LarguraTotal: Story = {
  name: "Largura total",
  parameters: { cardWidth: 1096 },
  render: () => (
    <Card model="interactive" href="#" title="Espiritualidade e missão">
      Encontro nº 15 · Seg, 28 set · 19h30 · Salão paroquial
    </Card>
  ),
};
