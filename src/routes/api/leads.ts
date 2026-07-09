import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const LeadSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  company: z.string().trim().min(1).max(200),
  website: z.string().trim().max(300).optional().or(z.literal("")),
  concern: z.string().trim().max(120).optional().or(z.literal("")),
  source: z.string().trim().max(60).optional().or(z.literal("")),
});

export const Route = createFileRoute("/api/leads")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const contentLength = Number(request.headers.get("content-length") ?? 0);
          if (contentLength > 8_000) {
            return Response.json({ error: "Payload demasiado grande." }, { status: 413 });
          }

          const json = await request.json();
          const parsed = LeadSchema.safeParse(json);
          if (!parsed.success) {
            return Response.json(
              { error: "Datos inválidos. Revisa los campos obligatorios." },
              { status: 400 },
            );
          }

          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
          const user_agent = request.headers.get("user-agent")?.slice(0, 500) ?? null;

          const { error } = await supabaseAdmin.from("leads").insert({
            name: parsed.data.name,
            email: parsed.data.email.toLowerCase(),
            company: parsed.data.company,
            website: parsed.data.website?.trim() || null,
            concern: parsed.data.concern?.trim() || null,
            source: parsed.data.source?.trim() || "diagnostico",
            user_agent,
          });

          if (error) {
            console.error("leads insert error:", error);
            return Response.json({ error: "No se pudo guardar." }, { status: 500 });
          }

          return Response.json({ ok: true });
        } catch (err) {
          console.error("leads handler error:", err);
          return Response.json({ error: "Error interno." }, { status: 500 });
        }
      },
    },
  },
});