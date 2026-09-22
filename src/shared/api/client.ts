import createClient from "openapi-fetch";
import type { paths } from "./schema";

export function resolveApiBaseUrl(
  configuredUrl?: string,
  currentOrigin = window.location.origin,
) {
  return configuredUrl ?? currentOrigin;
}

interface CreateApiClientOptions {
  baseUrl?: string;
  fetch?: typeof globalThis.fetch;
}

export function createApiClient(options: CreateApiClientOptions = {}) {
  return createClient<paths>({
    baseUrl:
      options.baseUrl ?? resolveApiBaseUrl(import.meta.env.VITE_API_BASE_URL),
    credentials: "include",
    fetch: options.fetch,
  });
}

export const apiClient = createApiClient();
