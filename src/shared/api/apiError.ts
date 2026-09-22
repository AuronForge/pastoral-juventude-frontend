import type { operations } from "./schema";

type ContractError =
  operations["autenticarUsuario"]["responses"][400]["content"]["application/json"];

export interface ApiErrorDetails extends Omit<
  ContractError,
  "correlationId" | "endpoint" | "status" | "timestamp"
> {
  correlationId?: string;
  endpoint: string;
  status: number;
  timestamp?: string;
}

export class ApiRequestError extends Error {
  constructor(public readonly details: ApiErrorDetails) {
    super(details.mensagem);
    this.name = "ApiRequestError";
  }
}

export function createCommunicationError(endpoint: string): ApiErrorDetails {
  return {
    status: 0,
    codigo: "ERRO_COMUNICACAO",
    titulo: "Não foi possível acessar o serviço",
    mensagem: "Verifique sua conexão e tente novamente.",
    endpoint,
  };
}
