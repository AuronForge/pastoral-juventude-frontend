# Recuperação de senha

A rota pública `/recuperar-senha` implementa a jornada JA-02, usando o contrato RES-003 v1.1. O link "Esqueci minha senha" fica no Login. Nome completo, e-mail, data de nascimento e nome da paróquia são obrigatórios; a data usa o `DatePicker` do Design System (modelo Data, `DD/MM/AAAA`) e é enviada como `YYYY-MM-DD`, sem conversão de fuso horário. Datas inexistentes são rejeitadas.

A composição segue a página `03.01.2 — JA-02 / Recuperação de senha` do Figma `lQ6RSAYx20cFkPBeH8kgO2` (desktop, tablet e mobile), sobre o `AccessLayout`: identificar usuário, gerando, senha temporária gerada, dados obrigatórios, identificação não localizada, recuperação em andamento, limite de tentativas, falha de conexão e calendário aberto. Durante o envio e no limite de tentativas os campos ficam desabilitados.

O cliente chama `/api/v1/autenticacao/recuperar-senha` na mesma origem. A resposta fica apenas no estado local do componente: não vai para Redux, storage, URL nem telemetria. A senha temporária aparece em um campo somente leitura, mascarada e com a ação de revelar; "Copiar senha" exige ação explícita. Sair ou recarregar descarta a resposta. Após expirar, o valor deixa de ser exibido e o botão para pedir outra senha é liberado (contagem, expiração e nova solicitação ainda não têm desenho no Figma).

A resposta não autentica o usuário. "Entrar com senha temporária" leva ao Login, onde a senha temporária encaminha para a troca obrigatória (JA-03). Recuperação bem-sucedida limpa a sessão mantida em memória pelo frontend, porque o backend invalida as sessões existentes.

404 não identifica qual dado divergiu ("Confira os dados informados"). 409 informa recuperação já iniciada. 403 (conta inativa, sem tela no Figma) orienta falar com a coordenação. 429 respeita `Retry-After`; sem prazo, informa a espera de 30 minutos. Rede e 503 permitem nova tentativa. Os valores digitados são preservados em todos os erros.

## Verificação e integração

`npm run check` cobre formatação, lint, testes com cobertura mínima de 85%, build e Storybook. As histórias incluem os estados de erro e sucesso interativo com valores fictícios. Os testes verificam validação com as mensagens do Figma, calendário, obrigatoriedade, duplicação, cópia, expiração, ausência de storage/Redux e navegação.

Os testes Playwright estão no repositório E2E. Eles controlam respostas HTTP para validar navegador e interface; a persistência real é verificada separadamente na CI do backend. A validação pública completa deve ocorrer depois dos merges/deploys, sem compartilhar ou capturar senhas.

Ordem: backend com migration V022 e deploy aprovado; E2E com CI aprovada; frontend com publicação Vercel e deploy aprovados. A documentação central registra o roteiro operacional. Os tipos foram gerados a partir de `backend/docs/api/openapi.json`.
