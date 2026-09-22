import type { operations } from "../../shared/api/schema";
import {
  ApiRequestError,
  createCommunicationError,
} from "../../shared/api/apiError";
import { apiClient } from "../../shared/api/client";

const LOGIN_ENDPOINT = "/api/v1/autenticacao/login" as const;
const CHANGE_PASSWORD_ENDPOINT = "/api/v1/autenticacao/alterar-senha" as const;

export type LoginCredentials =
  operations["autenticarUsuario"]["requestBody"]["content"]["application/json"];
export type LoginResponse =
  operations["autenticarUsuario"]["responses"][200]["content"]["application/json"];
export type ChangePasswordRequest =
  operations["alterarSenha"]["requestBody"]["content"]["application/json"];

export async function authenticateUser(
  credentials: LoginCredentials,
): Promise<LoginResponse> {
  try {
    const { data, error } = await apiClient.POST(LOGIN_ENDPOINT, {
      body: credentials,
    });

    if (data) {
      return data;
    }

    if (error) {
      throw new ApiRequestError(error);
    }

    throw new ApiRequestError(createCommunicationError(LOGIN_ENDPOINT));
  } catch (error: unknown) {
    if (error instanceof ApiRequestError) {
      throw error;
    }

    throw new ApiRequestError(createCommunicationError(LOGIN_ENDPOINT));
  }
}

export async function changePassword(
  token: string,
  request: ChangePasswordRequest,
): Promise<void> {
  try {
    const { error } = await apiClient.POST(CHANGE_PASSWORD_ENDPOINT, {
      body: request,
      headers: { Authorization: `Bearer ${token}` },
    });

    if (error) {
      throw new ApiRequestError(error);
    }
  } catch (error: unknown) {
    if (error instanceof ApiRequestError) {
      throw error;
    }

    throw new ApiRequestError(
      createCommunicationError(CHANGE_PASSWORD_ENDPOINT),
    );
  }
}
