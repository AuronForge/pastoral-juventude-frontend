# Frontend de desenvolvimento na Vercel

O projeto Vercel `pastoral-juventude-frontend-dev` recebe somente a branch
`develop`. É um projeto separado do futuro frontend de produção. O target
`production` da Vercel é usado para ter um endereço estável neste projeto de
desenvolvimento; não corresponde à branch `main` ou ao ambiente produtivo da aplicação.

## Fluxo de entrega

1. PR executa os gates atuais: formatação, lint, cobertura mínima de 85%, build,
   Storybook, imagem Docker e testes da configuração Vercel.
2. O push em `develop` executa os mesmos gates e guarda o `dist` aprovado.
3. Com `VERCEL_DEV_DEPLOY=true`, a CI envia esse mesmo artefato à Vercel,
   usando Build Output API v3 e CLI fixada em `59.19.1`.
4. Publica candidato com `--prod --skip-domain`, sem trocar os domínios estáveis.
5. Valida `/`, `/login` e `/api/v1/health` na URL do candidato.
6. Somente depois promove o candidato para o domínio estável do projeto dev.

A etapa está na CI de push; não exige registrar um workflow novo na branch
padrão. PRs, forks e pushes em `main` não usam credenciais Vercel. As imagens
Docker e o deploy interno Ubuntu continuam disponíveis para os E2E existentes.
Se a publicação Vercel estiver habilitada e falhar, a CI de push falha e a
publicação Docker dependente de CI bem-sucedida também não avança.

## Configuração inicial

Criar um projeto Vercel separado, com nome `pastoral-juventude-frontend-dev`.
Pode ser criado via CLI autenticada ou pela integração Vercel. Não é necessário
conectar o repositório à importação Git nativa: o Actions envia o artefato estático.
O `vercel.json` desativa deploys automáticos pela integração Git, evitando
publicações paralelas que não aguardam nossos gates.

No projeto dev, permitir acesso público às URLs dos deployments, inclusive
URLs candidatas. Com Deployment Protection ativo, o smoke recebe 401/403 e
impede promoção. O endereço estável `*.vercel.app` dispensa domínio próprio.

No GitHub do frontend, criar o Environment `vercel-development`, permitindo
deploy apenas de `develop`, e configurar:

| Local                | Nome                    | Valor                                         |
| -------------------- | ----------------------- | --------------------------------------------- |
| Repository variable  | `VERCEL_DEV_DEPLOY`     | `false` durante bootstrap; `true` para ativar |
| Environment variable | `VERCEL_ORG_ID`         | ID do owner/team do projeto Vercel            |
| Environment variable | `VERCEL_PROJECT_ID`     | ID do projeto exclusivo de desenvolvimento    |
| Environment variable | `BACKEND_PUBLIC_ORIGIN` | Origem HTTPS atual do túnel, sem `/api/v1`    |
| Environment secret   | `VERCEL_TOKEN`          | Token Vercel com acesso ao projeto            |

Os IDs podem ser obtidos do `.vercel/project.json` após `vercel link`, ou das
configurações do projeto/team na Vercel. Nunca versionar o token nem enviá-lo
em mensagens. O token é necessário no GitHub mesmo quando a integração de
Vercel estiver conectada ao ChatGPT; são autorizações diferentes.

Antes de ativar, conferir no Ubuntu o túnel para `http://127.0.0.1:8082`,
o timer `pastoral-health-report.timer` ativo e `/api/v1/health` HTTP 200.
No backend, configurar `COOKIE_SECURE=true` para acesso HTTPS e incluir o
domínio estável do frontend em `DEV_CORS_ORIGINS` de
`/opt/pastoral/dev/development.env`. Aplicar pelo próximo deploy do backend.

O projeto não precisa de `VITE_API_BASE_URL`: o build aprovado na CI usa a
mesma origem do navegador. Variáveis do painel Vercel não são incorporadas
posteriormente ao `dist` já construído. `BACKEND_PUBLIC_ORIGIN` é usada para
gerar o destino do proxy no artefato, e não contém credenciais.

Após merge e configuração, ativar `VERCEL_DEV_DEPLOY=true` e executar novamente
a CI do último push de `develop` (todos os jobs), ou fazer um novo push nessa
branch. A primeira execução com credenciais é a validação real da plataforma;
os testes de PR verificam configuração e empacotamento sem publicar um site.

## API, cookies e rotas

O navegador chama `/api/v1/...` no domínio do frontend. O proxy Vercel encaminha
`/api` e seus subcaminhos ao túnel HTTPS, mantendo o caminho completo; o Traefik
continua responsável pelas versões suportadas. `/api/v2` não vira HTML da SPA.
API não é armazenada em cache. Assets existentes têm cache longo; assets
inexistentes retornam 404. As demais rotas, como `/login`, recebem `index.html`.

O backend emite cookie `HttpOnly; SameSite=Lax` sem `Domain`, com o caminho
`/api/v1/autenticacao`. Pela mesma origem, ele pertence ao domínio do frontend.
Não alterar para `SameSite=None` apenas para viabilizar domínios separados.
Login real, Set-Cookie e chamadas autenticadas devem ser conferidos após a
primeira publicação; o smoke não usa credenciais de usuários nem substitui
os E2E funcionais de autenticação.

## Operação e recuperação

Quick Tunnel deve permanecer em execução no Ubuntu. Ao reiniciá-lo, a URL pode
mudar: atualizar `BACKEND_PUBLIC_ORIGIN` e repetir a CI do último push ou fazer
novo push em `develop`. A configuração anterior permanece nos deployments
anteriores. Um túnel parado causa falha de API mesmo com o frontend disponível.

O GitHub guarda `frontend-dist-<SHA>` por sete dias e
`vercel-development-<SHA>` por 14 dias. A evidência inclui URL, commit, resultados
do smoke e configuração de roteamento, sem tokens ou valores dos secrets.
Não publicar `.vercel/project.json` como artefato.

Se o smoke falhar, os domínios estáveis não são promovidos. Examinar o job e a
URL candidata: 503 de health pode indicar banco/cache ou coleta vencida;
401/403 pode indicar Deployment Protection; 502/504 pode indicar túnel/origem.
Depois de uma promoção, usar o rollback do projeto dev para a versão anterior
ou promover novamente um deployment conhecido. Rollback do frontend não altera
o banco nem reverte o backend. Para interromper novos deploys, definir
`VERCEL_DEV_DEPLOY=false` e cancelar execuções ainda ativas.

Referências oficiais: [Build Output API](https://vercel.com/docs/build-output-api/configuration),
[deploy prebuilt](https://vercel.com/docs/cli/deploy),
[promoção](https://vercel.com/docs/cli/promote) e
[configuração Git](https://vercel.com/docs/project-configuration/git-configuration).
