import createClient from "openapi-fetch";
import type { paths } from "./schema";

export function resolveApiBaseUrl(
  configuredUrl?: string,
  currentOrigin = window.location.origin,
) {
  return configuredUrl ?? currentOrigin;
}

export const apiClient = createClient<paths>({
  baseUrl: resolveApiBaseUrl(import.meta.env.VITE_API_BASE_URL),
});
