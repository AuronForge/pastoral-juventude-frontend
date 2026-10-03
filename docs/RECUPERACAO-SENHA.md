# Recuperação de senha

A rota pública `/recuperar-senha` implementa Journey002, usando o contrato RES-003 v1.1. O link fica disponível no Login. Nome, e-mail, nascimento e paróquia são obrigatórios; a data é informada em `dd/mm/aaaa` e enviada como `YYYY-MM-DD`, com validação de calendário.

A composição segue os estados desktop, tablet e celular da página Figma `150:1274` do arquivo `Q3XWkh0oPSxbEM5o3NnAXR`: padrão, carregamento, sucesso, dados não conferem, recuperação em andamento, conta inativa e excesso de tentativas. Reutiliza o Design System existente, Figtree/Fraunces, espaçamentos e cores de acesso. A marca PastorApp existente substitui o placeholder textual PJ do protótipo. Controles móveis preservam o alvo de toque de 44 px do Design System.

O cliente chama `/api/v1/autenticacao/recuperar-senha` na mesma origem. A resposta fica apenas no estado local do componente: não vai para Redux, storage, URL nem telemetria. A cópia para a área de transferência exige ação explícita. Sair ou recarregar descarta a resposta. Após expirar, o valor deixa de ser exibido e o botão para pedir outra senha é liberado.

A resposta não autentica o usuário. É necessário voltar ao Login, usar a senha temporária, concluir a troca obrigatória e entrar novamente com a definitiva. Recuperação bem-sucedida limpa a sessão mantida em memória pelo frontend, porque o backend invalida as sessões existentes.

404 não identifica qual dado divergiu. 409 orienta usar a senha recebida ou aguardar sua expiração. 403 orienta falar com a coordenação. 429 respeita `Retry-After`; os campos ficam bloqueados durante o prazo. Rede e 503 permitem nova tentativa preservando os dados.

## Verificação e integração

`npm run check` cobre formatação, lint, testes com cobertura mínima de 85%, build e Storybook. As histórias incluem os estados de erro e sucesso interativo com valores fictícios. Os testes verificam calendário, obrigatoriedade, duplicação, cópia, expiração, ausência de storage/Redux e navegação.

Os testes Playwright estão no repositório E2E. Eles controlam respostas HTTP para validar navegador e interface; a persistência real é verificada separadamente na CI do backend. A validação pública completa deve ocorrer depois dos merges/deploys, sem compartilhar ou capturar senhas.

Ordem: backend com migration V022 e deploy aprovado; E2E com CI aprovada; frontend com publicação Vercel e deploy aprovados. A documentação central registra o roteiro operacional. Os tipos foram gerados a partir de `backend/docs/api/openapi.json`.
