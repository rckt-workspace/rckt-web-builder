import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { runInNewContext } from "node:vm";
import ts from "typescript";
import { describe, expect, it, vi } from "vitest";
import { featureConfig } from "../src/config/features";

function loadHandlers(path: string, fetch: ReturnType<typeof vi.fn>) {
  const source = readFileSync(resolve(path), "utf8");
  const code = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const exports: Record<string, any> = {};
  runInNewContext(code, {
    exports,
    Response,
    fetch,
    console,
    process: { env: new Proxy({}, { get() { throw new Error("Disabled handler read environment"); } }) },
    require(name: string) {
      if (name === "@tanstack/react-router") return { createFileRoute: () => (options: unknown) => options };
      if (name === "@/config/features") return { featureConfig };
      if (name === "@/lib/admin-auth" || name === "@/lib/admin-proxy") {
        return new Proxy({}, { get() { throw new Error("Disabled handler called admin helper"); } });
      }
      throw new Error(`Disabled handler loaded dependency: ${name}`);
    },
  });
  return exports.Route.server.handlers;
}

describe("Chat deployment switch", () => {
  it("ships disabled", () => {
    expect(featureConfig.chat.enabled).toBe(false);
  });

  it.each([
    ["src/routes/api/advisor-chat.ts", "POST"],
    ["src/routes/api/save-chat-lead.ts", "POST"],
    ["src/routes/api/admin/ai/config.ts", "GET"],
    ["src/routes/api/admin/ai/config.ts", "PUT"],
    ["src/routes/api/admin/ai/models.ts", "GET"],
    ["src/routes/api/admin/ai/test-provider.ts", "POST"],
    ["src/routes/api/admin/ai/usage.ts", "GET"],
  ])("%s %s returns 503 before request, service or database work", async (path, method) => {
    const fetch = vi.fn(() => { throw new Error("Disabled handler contacted a service"); });
    const handlers = loadHandlers(path, fetch);
    const request = new Proxy({}, { get() { throw new Error("Disabled handler processed request"); } });
    const response = await handlers[method]({ request });
    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({ ok: false, error: "El agente está desactivado" });
    expect(fetch).not.toHaveBeenCalled();
  });
});