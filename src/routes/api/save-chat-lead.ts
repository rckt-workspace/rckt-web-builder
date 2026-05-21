import { createFileRoute } from "@tanstack/react-router";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

type Msg = { role: "user" | "assistant"; content: string };

const EMAIL_RE = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;
const PHONE_RE = /(\+?\d[\d\s().-]{7,}\d)/;

function extractContact(messages: Msg[]) {
  const userText = messages
    .filter((m) => m.role === "user")
    .map((m) => m.content)
    .join("\n");
  const email = userText.match(EMAIL_RE)?.[0]?.toLowerCase() ?? null;
  const phoneRaw = userText.match(PHONE_RE)?.[0] ?? null;
  const phone = phoneRaw ? phoneRaw.replace(/\s+/g, " ").trim() : null;
  return { email, phone };
}

function sanitize(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const v = value.trim().slice(0, max);
  return v.length > 0 ? v : null;
}

export const Route = createFileRoute("/api/save-chat-lead")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as {
            session_id?: string;
            messages?: Msg[];
            name?: string;
            company?: string;
            email?: string;
            phone?: string;
          };

          const session_id = sanitize(body.session_id, 64);
          if (!session_id) {
            return Response.json({ error: "session_id requerido" }, { status: 400 });
          }

          if (!Array.isArray(body.messages) || body.messages.length === 0) {
            return Response.json({ error: "messages requerido" }, { status: 400 });
          }

          const messages: Msg[] = body.messages
            .filter(
              (m) =>
                m &&
                (m.role === "user" || m.role === "assistant") &&
                typeof m.content === "string",
            )
            .slice(-50)
            .map((m) => ({ role: m.role, content: m.content.slice(0, 4000) }));

          const extracted = extractContact(messages);
          const user_agent = request.headers.get("user-agent")?.slice(0, 500) ?? null;

          const row = {
            session_id,
            messages,
            name: sanitize(body.name, 120),
            company: sanitize(body.company, 200),
            email: sanitize(body.email, 200)?.toLowerCase() ?? extracted.email,
            phone: sanitize(body.phone, 50) ?? extracted.phone,
            user_agent,
          };

          const { error } = await supabaseAdmin
            .from("chat_leads")
            .upsert(row, { onConflict: "session_id" });

          if (error) {
            console.error("save-chat-lead upsert error:", error);
            return Response.json({ error: "No se pudo guardar." }, { status: 500 });
          }

          return Response.json({ ok: true });
        } catch (e) {
          console.error("save-chat-lead error:", e);
          return Response.json({ error: "Error desconocido" }, { status: 500 });
        }
      },
    },
  },
});