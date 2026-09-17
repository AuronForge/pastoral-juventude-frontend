# Pastoral da Juventude — Frontend

Aplicação web do MVP da Pastoral da Juventude, construída com React, Vite e TypeScript.

## Requisitos

- Node.js 24.8.0 ou superior
- npm

## Desenvolvimento

```bash
cp .env.example .env
npm ci
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
