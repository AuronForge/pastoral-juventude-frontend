import { spawnSync } from "node:child_process";

const openApiUrl =
  process.env.OPENAPI_URL ?? "http://localhost:3000/documentation/json";
const output = "src/shared/api/schema.d.ts";
const command =
  process.platform === "win32"
    ? "openapi-typescript.cmd"
    : "openapi-typescript";

const result = spawnSync(command, [openApiUrl, "--output", output], {
  stdio: "inherit",
});

if (result.error) {
  throw result.error;
}

process.exitCode = result.status ?? 1;
