import { test } from "node:test";
import assert from "node:assert/strict";
import { verifyDeployment } from "./smoke-vercel.mjs";

const url = "https://candidate.vercel.app";
const html = () => new Response('<div id="root"></div>');
const healthy = () =>
  new Response('{"status":"ok"}', {
    headers: { "content-type": "application/json" },
  });

test("valida a aplicação e o health pela URL do frontend", async () => {
  const calls = [];
  const result = await verifyDeployment(url, async (request, options) => {
    calls.push(request.pathname);
    assert.equal(options.redirect, "error");
    return request.pathname.startsWith("/api/") ? healthy() : html();
  });
  assert.deepEqual(calls, ["/", "/login", "/api/v1/health"]);
  assert.equal(result.results.length, 3);
});

test("recusa API fora do ar e API servida como HTML da SPA", async () => {
  for (const response of [new Response("error", { status: 503 }), html()]) {
    await assert.rejects(
      verifyDeployment(url, async (request) =>
        request.pathname.startsWith("/api/") ? response : html(),
      ),
    );
  }
});

test("recusa URL incorreta, página protegida e fallback inválido", async () => {
  await assert.rejects(verifyDeployment("https://other.test"));
  await assert.rejects(
    verifyDeployment(
      url,
      async () => new Response("protected", { status: 401 }),
    ),
  );
  await assert.rejects(
    verifyDeployment(url, async () => new Response("not the application")),
  );
});
