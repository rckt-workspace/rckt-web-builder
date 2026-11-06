import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

function isNewSupabaseApiKey(value: string): boolean {
  return value.startsWith("sb_publishable_") || value.startsWith("sb_secret_");
}

function createSupabaseFetch(supabaseKey: string): typeof fetch {
  return (input, init) => {
    const headers = new Headers(
      typeof Request !== "undefined" && input instanceof Request ? input.headers : undefined,
    );

    if (init?.headers) {
      new Headers(init.headers).forEach((value, key) => headers.set(key, value));
    }

    if (
      isNewSupabaseApiKey(supabaseKey) &&
      headers.get("Authorization") === `Bearer ${supabaseKey}`
    ) {
      headers.delete("Authorization");
    }

    headers.set("apikey", supabaseKey);
    return fetch(input, { ...init, headers });
  };
}

function createSupabaseAdminClient() {
  const url = process.env.RCKT_SUPABASE_URL;
  const key = process.env.RCKT_SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    const missing = [
      ...(!url ? ["RCKT_SUPABASE_URL"] : []),
      ...(!key ? ["RCKT_SUPABASE_SERVICE_ROLE_KEY"] : []),
    ];
    throw new Error(`Missing production database environment variable(s): ${missing.join(", ")}.`);
  }

  return createClient<Database>(url, key, {
    global: { fetch: createSupabaseFetch(key) },
    auth: {
      storage: undefined,
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

let adminClient: ReturnType<typeof createSupabaseAdminClient> | undefined;

// Initialize only when a server handler uses the client, after secrets are available.
export const supabaseAdmin = new Proxy({} as ReturnType<typeof createSupabaseAdminClient>, {
  get(_, prop, receiver) {
    if (!adminClient) adminClient = createSupabaseAdminClient();
    return Reflect.get(adminClient, prop, receiver);
  },
});