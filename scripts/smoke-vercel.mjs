import { writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";

export async function verifyDeployment(value, fetchImpl = fetch) {
  const origin = new URL(value);
  if (
    origin.protocol !== "https:" ||
    !origin.hostname.endsWith(".vercel.app")
  ) {
    throw new Error("URL de deployment Vercel inválida.");
  }
  const results = [];
  for (const path of ["/", "/login", "/api/v1/health"]) {
    const response = await fetchImpl(new URL(path, origin), {
      signal: AbortSignal.timeout(15000),
      redirect: "error",
    });
    if (response.status !== 200) {
      throw new Error(`Smoke ${path}: HTTP ${response.status}`);
    }
    if (path.startsWith("/api/")) {
      if (!response.headers.get("content-type")?.includes("application/json")) {
        throw new Error("A API retornou HTML em vez de JSON.");
      }
      const body = await response.json();
      if (body.status !== "ok") throw new Error("Backend indisponível.");
    } else if (!(await response.text()).includes('id="root"')) {
      throw new Error("O fallback da SPA não retornou a aplicação.");
    }
    results.push({ path, status: response.status });
  }
  return { deployment: origin.origin, results };
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  const result = await verifyDeployment(process.env.DEPLOYMENT_URL);
  await writeFile(
    "vercel-smoke.json",
    JSON.stringify(
      {
        commit: process.env.GITHUB_SHA,
        deployment: result.deployment,
        timestamp: new Date().toISOString(),
        results: result.results,
      },
      null,
      2,
    ) + "\n",
  );
  console.log("Smoke Vercel aprovado: aplicação, rota SPA e API via proxy.");
}
