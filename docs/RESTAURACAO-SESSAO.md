# Restauração da sessão

No bootstrap, AuthLifetime aguarda restoreSession antes de renderizar as rotas.
RES-106 usa POST /api/v1/autenticacao/renovar-token sem body; credentials include
envia o cookie HttpOnly. Access Token continua somente no Redux em memória.

O estado restoration coordena pending, running, complete e failed. A guarda
síncrona evita chamadas duplicadas em StrictMode e respostas tardias após a
limpeza da sessão são ignoradas. Não há retry automático nem renovação periódica.

400 TOKEN_REFRESH_AUSENTE abre o login sem aviso. 401 encerra a sessão local;
409 SESSAO_SUBSTITUIDA e 403 de usuário bloqueado/inativo apresentam avisos no
login. Rede, 5xx e rejeição de origem oferecem Tentar novamente. Configure a
origem publicada na allow-list do backend antes do deploy.

Cada reload restaurado consome uma das três renovações da sessão absoluta de
uma hora. Após o limite, novo login é obrigatório. Token TROCA_SENHA não é
persistido nem restaurado. O login não oferece a opção de continuar conectado.

Integração: backend com RES-106 primeiro, depois frontend e E2E. A validação
publicada permanece pendente até merge/deploy e confirmação do operador.
