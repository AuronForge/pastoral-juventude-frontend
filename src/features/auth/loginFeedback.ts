import type { ApiErrorDetails } from "../../shared/api/apiError";

export function loginFeedback(error?: ApiErrorDetails) {
  switch (error?.codigo) {
    case "CREDENCIAIS_INVALIDAS":
      return {
        title: "Não foi possível entrar",
        message:
          "E-mail ou senha inválidos. Confira os dados e tente novamente.",
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
      title: "Aguarde para tentar novamente",
      message: "Muitas tentativas. Tente novamente em 15 minutos.",
    };
  if (error?.status === 400)
    return {
      title: "Confira os dados",
      message: "Verifique o e-mail e a senha informados.",
    };
  return {
    title: "Serviço indisponível",
    message: "Não foi possível conectar. Tente novamente.",
  };
}
