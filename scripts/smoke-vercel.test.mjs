import { test } from "node:test";
import assert from "node:assert/strict";
import { verifyDeployment } from "./smoke-vercel.mjs";

const url = "https://candidate.vercel.app";
const retry = { maxAttempts: 3, wait: async () => {} };
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
  assert.deepEqual(calls, [
    "/",
    "/login",
    "/recuperar-senha",
    "/api/v1/health",
  ]);
  assert.equal(result.results.length, 4);
});

test("recusa API fora do ar e API servida como HTML da SPA", async () => {
  for (const response of [new Response("error", { status: 503 }), html()]) {
    await assert.rejects(
      verifyDeployment(
        url,
        async (request) =>
          request.pathname.startsWith("/api/") ? response : html(),
        retry,
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

test("aguarda disponibilidade da URL candidata sem promover resposta 404", async () => {
  let requests = 0;
  let waits = 0;
  const result = await verifyDeployment(
    url,
    async (request) => {
      if (request.pathname === "/" && ++requests < 3)
        return new Response("not ready", { status: 404 });
      return request.pathname.startsWith("/api/") ? healthy() : html();
    },
    {
      ...retry,
      wait: async () => {
        waits++;
      },
    },
  );
  assert.equal(requests, 3);
  assert.equal(waits, 2);
  assert.equal(result.results.length, 4);
});

test("limita retries de HTTP 404, 503 e falha de rede", async () => {
  for (const status of [404, 503, null]) {
    let calls = 0;
    await assert.rejects(
      verifyDeployment(
        url,
        async () => {
          calls++;
          if (status === null) throw new Error("network unavailable");
          return new Response("unavailable", { status });
        },
        retry,
      ),
    );
    assert.equal(calls, 3);
  }
});

test("recusa autenticação e HTML inválido sem nova tentativa", async () => {
  for (const status of [401, 403, 200]) {
    let calls = 0;
    await assert.rejects(
      verifyDeployment(
        url,
        async () => {
          calls++;
          return new Response("not the SPA", { status });
        },
        retry,
      ),
    );
    assert.equal(calls, 1);
  }
});
