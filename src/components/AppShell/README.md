# App Shell

Composição para as rotas autenticadas. Recebe os itens permitidos para a pessoa,
o item ativo, a identificação da pessoa e o conteúdo da página.

## Responsividade

- A partir de 1200 px, a sidebar inicia expandida em 260 px.
- Entre 768 e 1199 px, inicia recolhida em 72 px e pode ser expandida.
- Abaixo de 768 px, a sidebar é substituída pela navegação inferior e por um
  menu lateral aberto pelo cabeçalho.

O componente não define permissões nem busca dados de usuário. A aplicação
fornece somente as opções que a pessoa pode acessar, evitando renderizar
destinos não autorizados.

O menu da conta disponibiliza perfil, alteração de senha e saída quando as
respectivas ações são informadas. A escolha claro/escuro atualiza o tema do MUI
e também é exposta por `onThemeModeChange`.
