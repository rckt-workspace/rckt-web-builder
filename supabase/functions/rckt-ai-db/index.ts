import { createClient } from "https://esm.sh/@supabase/supabase-js@2.43.2";

interface SaveChatLeadPayload {
  session_id: string;
  messages: Array<{ role: "user" | "assistant"; content: string }>;
  name: string | null;
  company: string | null;
  email: string | null;
  phone: string | null;
  user_agent: string | null;
}

interface RequestBody {
  action: string;
  payload: SaveChatLeadPayload;
}

Deno.serve(async (req: Request) => {
  // Only accept POST
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    // Create Supabase client using environment variables
    // In Edge Functions, Deno.env.get() retrieves from Supabase secret configuration
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

    if (action === "save_chat_lead") {
      const { error } = await supabase.from("chat_leads").upsert(payload, {
        onConflict: "session_id",
      });

      if (error) {
        console.error("Chat lead upsert error:", error);
        return new Response(JSON.stringify({ error: "Failed to save chat lead" }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Unknown action" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("rckt-ai-db error:", e);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
