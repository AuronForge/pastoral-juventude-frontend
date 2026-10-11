# App Shell

Composição para as rotas autenticadas. Recebe os itens permitidos para a pessoa,
o item ativo, a identificação da pessoa e o conteúdo da página.

## Responsividade

- A partir de 1200 px, a sidebar inicia expandida em 260 px.
- Entre 768 e 1199 px, inicia recolhida em 72 px e pode ser expandida.
- Abaixo de 768 px, a sidebar é substituída pela navegação inferior e por um
  menu lateral aberto pelo cabeçalho.

O botão de abrir o menu fica disponível em toda a faixa abaixo de 768 px,
incluindo celulares com 360, 390 e 414 px de largura. O menu lateral apresenta
todos os `navigationItems`; a barra inferior mantém até três atalhos, definidos
por `mobileNavigationItems` ou pelos três primeiros itens da navegação principal.
Escolher um destino no menu lateral executa a ação do item e fecha o menu.
Também é possível fechá-lo pela tecla Esc ou clicando fora dele.

O botão anuncia seu estado por `aria-expanded` e, quando aberto, referencia
o menu lateral móvel por `aria-controls`.

O componente não define permissões nem busca dados de usuário. A aplicação
fornece somente as opções que a pessoa pode acessar, evitando renderizar
destinos não autorizados.

O menu da conta disponibiliza perfil, alteração de senha e saída quando as
respectivas ações são informadas. A escolha claro/escuro atualiza o tema do MUI
e também é exposta por `onThemeModeChange`.
