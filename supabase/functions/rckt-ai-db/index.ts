import { createClient } from "https://esm.sh/@supabase/supabase-js@2.43.2";

// Request/Response Types
interface RequestBody {
  action: string;
  payload?: Record<string, any>;
}

interface SaveChatLeadPayload {
  session_id: string;
  messages: Array<{ role: "user" | "assistant"; content: string }>;
  name: string | null;
  company: string | null;
  email: string | null;
  phone: string | null;
  user_agent: string | null;
}

interface SaveLeadPayload {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
}

interface RecordUsagePayload {
  provider: string;
  model: string;
  tokens_used: number;
  cost_usd: number;
  request_duration_ms: number;
}

// Bridge security: validate X-RCKT-Internal-Secret
function validateSecret(req: Request): boolean {
  const secret = req.headers.get("X-RCKT-Internal-Secret");
  const expectedSecret = Deno.env.get("RCKT_INTERNAL_SECRET");

  if (!secret || !expectedSecret) {
    return false;
  }

  // Constant-time comparison to prevent timing attacks
  return timingSafeEqual(secret, expectedSecret);
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

async function getConfig(supabase: any): Promise<Response> {
  try {
    const { data, error } = await supabase
      .from("ai_runtime_config")
      .select("*")
      .limit(1)
      .single();

    if (error) {
      console.error("get_config error:", error);
      return new Response(JSON.stringify({ error: "Failed to fetch config" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ config: data }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("get_config exception:", e);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

async function updateConfig(supabase: any, payload: Record<string, any>): Promise<Response> {
  try {
    const { config_id, updates } = payload;
    if (!config_id || !updates) {
      return new Response(JSON.stringify({ error: "Missing config_id or updates" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { data, error } = await supabase
      .from("ai_runtime_config")
      .update(updates)
      .eq("id", config_id)
      .select()
      .single();

    if (error) {
      console.error("update_config error:", error);
      return new Response(JSON.stringify({ error: "Failed to update config" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Write audit record
    await supabase.from("ai_config_audit").insert({
      config_version: data.version,
      fields_changed: Object.keys(updates),
      previous_values: {},
      new_values: data,
      updated_by: "bridge",
    }).catch((e: any) => console.error("Audit write error:", e));

    return new Response(JSON.stringify({ config: data }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("update_config exception:", e);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

async function recordUsage(supabase: any, payload: RecordUsagePayload): Promise<Response> {
  try {
    const { error } = await supabase.from("ai_usage_events").insert({
      provider: payload.provider,
      model: payload.model,
      tokens_used: payload.tokens_used,
      cost_usd: payload.cost_usd,
      request_duration_ms: payload.request_duration_ms,
      created_at: new Date().toISOString(),
    });

    if (error) {
      console.error("record_usage error:", error);
      return new Response(JSON.stringify({ error: "Failed to record usage" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("record_usage exception:", e);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

async function getUsage(supabase: any, payload?: Record<string, any>): Promise<Response> {
  try {
    const period = payload?.period || "day";
    const { data, error } = await supabase
      .from("ai_usage_events")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1000);

    if (error) {
      console.error("get_usage error:", error);
      return new Response(JSON.stringify({ error: "Failed to fetch usage" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ usage: data, period }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("get_usage exception:", e);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

async function saveChatLead(supabase: any, payload: SaveChatLeadPayload): Promise<Response> {
  try {
    const { error } = await supabase.from("chat_leads").upsert(payload, {
      onConflict: "session_id",
    });

    if (error) {
      console.error("save_chat_lead error:", error);
      return new Response(JSON.stringify({ error: "Failed to save chat lead" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ ok: true, persisted: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("save_chat_lead exception:", e);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

async function saveLead(supabase: any, payload: SaveLeadPayload): Promise<Response> {
  try {
    const { error } = await supabase.from("leads").insert({
      name: payload.name,
      email: payload.email,
      phone: payload.phone || null,
      company: payload.company || null,
      message: payload.message || null,
      created_at: new Date().toISOString(),
    });

    if (error) {
      console.error("save_lead error:", error);
      return new Response(JSON.stringify({ error: "Failed to save lead" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("save_lead exception:", e);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

Deno.serve(async (req: Request) => {
  // Only accept POST
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Validate X-RCKT-Internal-Secret header
  if (!validateSecret(req)) {
    console.warn("Unauthorized request: invalid or missing X-RCKT-Internal-Secret");
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    // Create Supabase client using environment variables
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("Missing Supabase configuration");
      return new Response(
        JSON.stringify({ error: "Server configuration error" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const body: RequestBody = await req.json();
    const { action, payload } = body;

    // Explicit action dispatch
    switch (action) {
      case "get_config":
        return await getConfig(supabase);
      case "update_config":
        return await updateConfig(supabase, payload || {});
      case "record_usage":
        return await recordUsage(supabase, payload || {});
      case "get_usage":
        return await getUsage(supabase, payload);
      case "save_chat_lead":
        return await saveChatLead(supabase, payload || {});
      case "save_lead":
        return await saveLead(supabase, payload || {});
      default:
        return new Response(JSON.stringify({ error: "Unknown action" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
    }
  } catch (e) {
    console.error("rckt-ai-db error:", e);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
