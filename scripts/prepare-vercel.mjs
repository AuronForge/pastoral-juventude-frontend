import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

export function backendOrigin(value) {
  if (!value || value !== value.trim()) {
    throw new Error("BACKEND_PUBLIC_ORIGIN deve conter uma origem HTTPS.");
  }
  const url = new URL(value);
  if (
    url.protocol !== "https:" ||
    url.username ||
    url.password ||
    url.pathname !== "/" ||
    url.search ||
    url.hash ||
    ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname)
  ) {
    throw new Error(
      "Use somente a origem HTTPS pública, sem /api, credenciais ou query.",
    );
  }
  return url.origin;
}

export function buildConfig(origin) {
  const backend = backendOrigin(origin);
  return {
    version: 3,
    routes: [
      {
        src: "^/api(?:/.*)?$",
        headers: {
          "Cache-Control": "no-store",
          "Vercel-CDN-Cache-Control": "no-store",
        },
        continue: true,
      },
      { src: "^(/api(?:/.*)?)$", dest: `${backend}$1` },
      {
        src: "^/assets/.*$",
        headers: { "Cache-Control": "public, max-age=31536000, immutable" },
        continue: true,
      },
      { handle: "filesystem" },
      // Missing assets must never receive the SPA HTML fallback.
      { src: "^/assets/.*$", status: 404 },
      {
        src: "^/.*$",
        dest: "/index.html",
        headers: { "Cache-Control": "no-cache" },
      },
    ],
  };
}

export async function prepareOutput(root, origin) {
  const config = buildConfig(origin);
  await readFile(resolve(root, "dist/index.html"), "utf8");
  const output = resolve(root, ".vercel/output");
  await rm(output, { recursive: true, force: true });
  await mkdir(output, { recursive: true });
  await cp(resolve(root, "dist"), resolve(output, "static"), {
    recursive: true,
  });
  await writeFile(
    resolve(output, "config.json"),
    JSON.stringify(config, null, 2) + "\n",
  );
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  await prepareOutput(process.cwd(), process.env.BACKEND_PUBLIC_ORIGIN);
  console.log("Artefato Vercel preparado a partir do build validado.");
}
