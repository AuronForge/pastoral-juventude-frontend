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
