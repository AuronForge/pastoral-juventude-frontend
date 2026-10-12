# App Shell

Composição do Figma para as rotas autenticadas: Header / App Bar, Sidebar,
Navigation Drawer e Bottom Navigation. Recebe os destinos permitidos para a
pessoa, o destino atual, a identificação da pessoa e o conteúdo da página.

## Responsividade

- Desktop (a partir de 1200 px): Header de 64 px e Sidebar fixa, expandida
  (280 px) ou recolhida (72 px) pelo controle no rodapé. Bottom Navigation
  ausente.
- Tablet e mobile (abaixo de 1200 px): Header de 56 px com o controle de
  menu, que abre o Navigation Drawer (320 px, limitado à viewport) com a
  navegação completa, e Bottom Navigation de 64 px com 3 a 5 atalhos.

Os breakpoints ainda não têm variável no Figma (pendência registrada).

## Comportamento e acessibilidade

- Cada navegação usa `nav` com rótulo; o destino atual recebe
  `aria-current="page"`.
- Na Sidebar recolhida, os itens mostram somente o ícone e oferecem Tooltip
  acessível com o rótulo.
- O Drawer abre pelo menu do Header e fecha pelo botão ×, pela seleção de um
  destino, pelo scrim ou pela tecla Esc, devolvendo o foco ao acionador.
- A Bottom Navigation usa os `bottomNavigationItems` ou, sem eles, os
  primeiros destinos da navegação completa (até 5).

O componente não define permissões nem busca dados de usuário. A aplicação
fornece somente os destinos que a pessoa pode acessar.
