# DatePicker

Seletor de data do Design System, exportado por src/components. Compõe TextField
com input type date, preservando tokens, label, ajuda, erro acessível, ref,
obrigatoriedade, leitura, disabled e tamanhos. Inclui Storybook com estados.

Usa o calendário nativo do navegador, com navegação de mês/ano e teclado
fornecidos pelo navegador. A apresentação segue a configuração regional:
em pt-BR, dia/mês/ano; não se força o formato visual em navegadores de outra região.
A aparência do calendário pode variar entre desktop e celular. O campo e o
calendário acompanham o esquema claro/escuro; o indicador em Chromium tem alvo
de toque mínimo de 44 px usando o token existente.

value, defaultValue, min e max usam YYYY-MM-DD. onChange entrega o valor ISO
ou string vazia. Não cria Date no estado nem converte fusos. Limites opcionais
pertencem ao chamador; a recuperação não acrescenta regras de idade.

Na recuperação, o nascimento é obrigatório. O navegador rejeita datas
inexistentes; o formulário revalida a data antes de chamar a API e foca o campo
em erro. Durante envio fica somente leitura e durante bloqueio fica desabilitado.

Para a integração, mergear primeiro a atualização do E2E, que aceita tanto a
entrada anterior quanto o campo nativo durante a transição. Depois mergear o
frontend. O E2E continua verificando o corpo ISO enviado à recuperação.
