# Entrega contínua — desenvolvimento

PRs para `develop` executam a CI existente (incluindo cobertura mínima de 85%).
Após uma CI bem-sucedida de push na `develop`, `publish-development.yml` publica
`ghcr.io/auronforge/pastoral-juventude-frontend:dev-<SHA completo>`.
O checkout usa o SHA validado. PRs e pushes de outras branches não publicam.
As publicações de releases por tags semânticas continuam independentes.

O workflow deve existir também na branch padrão para receber `workflow_run`.
Promova os arquivos de workflow para a branch padrão pelo processo de revisão;
isso não implanta produção. Depois faça um push na `develop` para iniciar a esteira.

Configure `DEV_AUTO_DEPLOY=true` somente após preparar o Ubuntu e o workflow
`deploy-development.yml` do repositório infra. `INFRA_DISPATCH_TOKEN` precisa
de Actions: write apenas no repositório infra. O GITHUB_TOKEN comum não dispara
workflows em outro repositório. Com a variável desativada, só as imagens são publicadas.

O procedimento completo, permissões, bootstrap, diagnóstico e rollback estão em
[infra/docs/DESENVOLVIMENTO.md](https://github.com/AuronForge/pastoral-juventude-infra/blob/develop/docs/DESENVOLVIMENTO.md).

O frontend público será publicado na Vercel por um job da CI após os gates,
com proxy de `/api` para o backend no Ubuntu. Bootstrap, variáveis, smoke,
promoção e rollback: [Vercel de desenvolvimento](./VERCEL-DESENVOLVIMENTO.md).

## Disponibilidade da URL candidata

O smoke verifica `/`, `/login`, `/recuperar-senha` e `/api/v1/health` antes de promover o domínio estável. A URL pode responder 404 brevemente após o CLI concluir a publicação. Cada rota permite até seis tentativas, com intervalo de cinco segundos, somente para 404, 5xx ou falha de rede. Cada request tem timeout de 15 segundos. Autenticação 401/403 e conteúdo inválido falham imediatamente; o smoke continua exigindo HTTP 200, aplicação React e health JSON saudável.

O erro transitório observado em 03/10/2026 ocorreu na execução 37164415173; a mesma URL candidata respondeu 200 depois, sem alteração de artefato. O deploy interno 37164663171 falhou com E2E novo e frontend anterior. A referência da release validada foi preservada, mas isso não comprova rollback dos containers. Confirmar nova execução de deploy e E2E antes de declarar o ambiente atualizado.

Para integrar esta correção, atualizar primeiro a infraestrutura que seleciona backend/frontend aprovados em conjunto e depois este frontend. A publicação do frontend dispara o deploy interno com as duas imagens validadas; não é necessário redefinir contas nem compartilhar secrets.
