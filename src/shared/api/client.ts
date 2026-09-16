import createClient from "openapi-fetch";
import type { paths } from "./schema";

export function resolveApiBaseUrl(configuredUrl?: string) {
  return configuredUrl ?? "http://localhost:3000";
}

export const apiClient = createClient<paths>({
  baseUrl: resolveApiBaseUrl(import.meta.env.VITE_API_BASE_URL),
});
