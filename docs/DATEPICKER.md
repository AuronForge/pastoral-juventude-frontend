# DatePicker

Seletor de data do Design System, exportado por `src/components`, construído
conforme o componente Date Picker do Figma (fonte de verdade). Possui quatro
modelos, escolhidos pela prop `mode`:

| Modelo      | `mode`      | Valor (`value`, `defaultValue`, `onChange`) | Texto no campo            |
| ----------- | ----------- | ------------------------------------------- | ------------------------- |
| Data        | `date`      | `YYYY-MM-DD`                                | `DD/MM/AAAA`              |
| Intervalo   | `range`     | `{ start, end }`, cada um `YYYY-MM-DD`      | `DD/MM/AAAA – DD/MM/AAAA` |
| Mês e ano   | `monthYear` | `YYYY-MM`                                   | `MM/AAAA`                 |
| Data e hora | `dateTime`  | `YYYY-MM-DDTHH:mm` (24 h)                   | `DD/MM/AAAA` + hora       |

Valores ausentes ou incompletos são entregues como string vazia (ou `start`/`end`
vazios no intervalo). O estado não usa `Date` nem converte fusos.

## Comportamento

- O campo aceita digitação direta com máscara; datas inexistentes ou fora de
  `min`, `max` e `disabledDates` não são aceitas.
- O botão de calendário (ícone `today`, alvo de 44 px) abre um painel com
  `role="dialog"`, rotulado pelo `label` do campo.
- Grade com semana iniciando no domingo, navegação por mês e foco gerenciado:
  setas movem um dia/semana, PageUp/PageDown trocam o mês, Enter seleciona e
  Escape fecha devolvendo o foco ao botão de calendário.
- Intervalo: o primeiro clique define o início, o segundo o fim; o painel fecha
  ao completar. As extremidades ficam destacadas e os dias intermediários usam
  `bg/canvas`.
- Data e hora: escolher o dia não fecha o painel; o valor só é emitido com
  horário válido em 24 h.
- Mês e ano: grade de meses em 3 colunas.
- Suporta `size`, `disabled`, `readOnly`, `required`, `errorMessage` (acessível
  via `aria-describedby`) e `hint`.

## Uso na recuperação de senha

O nascimento é obrigatório e usa o modelo `date`. O formulário revalida a data
antes de chamar a API e foca o campo em erro. Durante o envio fica somente
leitura e durante o bloqueio fica desabilitado. O corpo enviado à API continua
em ISO (`YYYY-MM-DD`).

## Pendências

- Cor de datas indisponíveis não definida no Figma; usado `text/disabled`.
- Estilo do texto de ajuda não definido no Figma; usado Label/Small em
  `text/secondary`.
- No Figma o fim do intervalo não aparece destacado; seguida a documentação,
  que destaca as duas extremidades.
- No Figma o painel do Intervalo tem 520 px de largura com um único mês;
  reproduzido literalmente (sobra espaço à direita).
- O campo deixou de ser `input type="date"` nativo. Testes E2E que preenchem a
  data no formato ISO precisam passar a digitar `DD/MM/AAAA` no campo de texto.
