# Pastoral da Juventude — Frontend

Aplicação web do MVP da Pastoral da Juventude, construída com React, Vite e TypeScript.

## Requisitos

- Node.js 24.8.0 ou superior
- npm

## Desenvolvimento

```bash
cp .env.example .env
npm ci --ignore-scripts
npm run dev
```

## Qualidade

`npm run check` executa formatação, lint, testes com cobertura mínima de 85% e build de produção.

## Contrato da API

O backend é a fonte de verdade do OpenAPI. Com a API disponível em `http://localhost:3000`, execute:

```bash
npm run api:generate
```

Para outra URL, defina `OPENAPI_URL`. Durante o desenvolvimento, o cliente usa
`VITE_API_BASE_URL`; no build de produção, a ausência dessa variável faz o cliente
usar a mesma origem da aplicação, permitindo o roteamento pelo Traefik.

O cliente envia `credentials: include` para permitir o cookie HttpOnly de
Refresh Token durante o desenvolvimento entre portas diferentes. Os tokens de
acesso e de troca obrigatória de senha permanecem somente no estado Redux em
memória; não devem ser gravados em `localStorage` ou `sessionStorage`.

## Jornada inicial de autenticação

A base da J001 já contém:

- contrato tipado para login e alteração de senha;
- estado Redux para login normal e troca obrigatória;
- chamadas autenticadas com o token restrito `TROCA_SENHA`;
- normalização do envelope de erro e do `correlationId`;
- hooks e seletores tipados para as futuras telas.

As páginas, formulários, validações visuais e rotas serão implementados conforme
o protótipo de alta fidelidade aprovado.

## Docker

```bash
docker build -t pastoral-juventude-frontend:local .
docker run --rm -p 8080:8080 pastoral-juventude-frontend:local
```

O healthcheck fica disponível em `GET /health`.

## Publicação da imagem

A imagem é publicada no GHCR somente por tags Git no formato exato `vMAJOR.MINOR.PATCH`. A versão da tag precisa coincidir com a versão do `package.json`.

```bash
git tag -a v0.1.0 -m "release: frontend v0.1.0"
git push origin v0.1.0
```

O exemplo publica `ghcr.io/auronforge/pastoral-juventude-frontend:0.1.0`. Não são criadas tags flutuantes como `latest`, `0` ou `0.1`.

Após a primeira publicação, confirme que o pacote está público no GHCR ou configure autenticação no host de implantação.
