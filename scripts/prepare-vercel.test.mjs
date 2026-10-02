import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  backendOrigin,
  buildConfig,
  prepareOutput,
} from "./prepare-vercel.mjs";

test("recusa configurações de backend incorretas", () => {
  for (const value of [
    undefined,
    "",
    "http://backend.test",
    "https://localhost",
    "https://backend.test/api/v1",
    "https://user:password@backend.test",
    "https://backend.test?token=secret",
    "https://backend.test#fragment",
    " https://backend.test",
  ]) {
    assert.throws(() => backendOrigin(value));
  }
  assert.equal(backendOrigin("https://backend.test/"), "https://backend.test");
});

test("API é encaminhada antes do filesystem e da SPA; versões continuam no Traefik", () => {
  const { routes } = buildConfig("https://backend.test");
  const proxy = routes[1];
  for (const path of [
    "/api",
    "/api/v1/health",
    "/api/v1/autenticacao/login",
    "/api/v2/pessoas",
  ]) {
    assert.equal(
      path.replace(new RegExp(proxy.src), proxy.dest),
      `https://backend.test${path}`,
    );
  }
  assert.equal(new RegExp(proxy.src).test("/apiculture"), false);
  assert.equal(routes[0].headers["Cache-Control"], "no-store");
  assert.equal(routes[3].handle, "filesystem");
  assert.equal(routes[4].status, 404);
  assert.equal(routes[5].dest, "/index.html");
});

test("empacota o dist validado, sem tokens, e substitui a origem após troca do túnel", async () => {
  const root = await mkdtemp(join(tmpdir(), "pastoral-vercel-"));
  try {
    await mkdir(join(root, "dist/assets"), { recursive: true });
    await writeFile(join(root, "dist/index.html"), '<div id="root"></div>');
    await writeFile(
      join(root, "dist/assets/app-hash.js"),
      "console.log('application')",
    );
    await prepareOutput(root, "https://first.test");
    assert.equal(
      await readFile(join(root, ".vercel/output/static/index.html"), "utf8"),
      '<div id="root"></div>',
    );
    await prepareOutput(root, "https://second.test");
    const config = JSON.parse(
      await readFile(join(root, ".vercel/output/config.json"), "utf8"),
    );
    assert.equal(config.routes[1].dest, "https://second.test$1");
    assert.equal(
      await readFile(
        join(root, ".vercel/output/static/assets/app-hash.js"),
        "utf8",
      ),
      "console.log('application')",
    );
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
