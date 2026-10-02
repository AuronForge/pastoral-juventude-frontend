import type { ApiErrorDetails } from "../../shared/api/apiError";

export function loginFeedback(error?: ApiErrorDetails) {
  switch (error?.codigo) {
    case "CREDENCIAIS_INVALIDAS":
      return {
        title: "E-mail ou senha incorretos",
        message: "Confira os dados e tente de novo.",
      };
    case "USUARIO_BLOQUEADO":
      return {
        title: "Acesso bloqueado",
        message:
          "Fale com o coordenador da sua pastoral para verificar seu acesso.",
      };
    case "USUARIO_INATIVO":
      return {
        title: "Acesso inativo",
        message:
          "Fale com o coordenador da sua pastoral para verificar seu acesso.",
      };
    case "SENHA_TEMPORARIA_EXPIRADA":
    case "SENHA_TEMPORARIA_INVALIDADA":
      return {
        title: "Senha temporária indisponível",
        message:
          "Solicite uma nova senha temporária ao coordenador da sua pastoral.",
      };
  }
  if (error?.status === 429)
    return {
      title: "Limite de tentativas atingido",
      message:
        "Tente novamente mais tarde. Se precisar, fale com o coordenador da sua pastoral.",
    };
  if (error?.status === 400)
    return {
      title: "Confira os dados",
      message: "Verifique o e-mail e a senha informados.",
    };
  return {
    title: "Não foi possível entrar",
    message: "Verifique sua conexão e tente novamente.",
  };
}
