import { createFileRoute } from "@tanstack/react-router";
import { verifyAdminSessionFromRequest } from "@/lib/admin-auth";

export const Route = createFileRoute("/api/admin/applications")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const sessionSecret = process.env.ADMIN_SESSION_SECRET;
          if (!sessionSecret) {
            return Response.json(
              { error: "Server configuration error." },
              { status: 500 }
            );
          }

          const isValid = await verifyAdminSessionFromRequest(request, sessionSecret);
          if (!isValid) {
            return Response.json({ error: "Unauthorized." }, { status: 401 });
          }

          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
          const database = supabaseAdmin as any;

          const { data, error } = await database
            .from("postulaciones")
            .select(
              "id,nombre,email,telefono,portafolio_url,mensaje,cv_path,estado,tipo,vacante_id,source,created_at,consent_at"
            )
            .order("created_at", { ascending: false });

          if (error) {
            console.error("applications fetch error:", error);
            return Response.json(
              { error: "Error fetching applications" },
              { status: 500 }
            );
          }

          return Response.json({ applications: data ?? [] });
        } catch (err) {
          console.error("admin applications GET error:", err);
          return Response.json({ error: "Internal server error." }, { status: 500 });
        }
      },

      PUT: async ({ request }) => {
        try {
          const sessionSecret = process.env.ADMIN_SESSION_SECRET;
          if (!sessionSecret) {
            return Response.json(
              { error: "Server configuration error." },
              { status: 500 }
            );
          }

          const isValid = await verifyAdminSessionFromRequest(request, sessionSecret);
          if (!isValid) {
            return Response.json({ error: "Unauthorized." }, { status: 401 });
          }

          const body = await request.json();
          const { id, estado, nota } = body as {
            id?: string;
            estado?: string;
            nota?: string;
          };

          if (!id || typeof id !== "string") {
            return Response.json(
              { error: "Application ID is required" },
              { status: 400 }
            );
          }

          const validStates = ["nueva", "revision", "contactado", "entrevista", "descartado", "seleccionado"];
          if (estado && typeof estado === "string" && !validStates.includes(estado)) {
            return Response.json(
              { error: "Invalid estado value" },
              { status: 400 }
            );
          }

          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
          const database = supabaseAdmin as any;

          if (estado && typeof estado === "string") {
            const { data: appData, error: fetchErr } = await database
              .from("postulaciones")
              .select("estado")
              .eq("id", id)
              .single();

            if (fetchErr || !appData) {
              return Response.json(
                { error: "Application not found" },
                { status: 404 }
              );
            }

            const oldEstado = appData.estado;

            const { error: updateErr } = await database
              .from("postulaciones")
              .update({ estado: estado as any })
              .eq("id", id);

            if (updateErr) {
              console.error("application update error:", updateErr);
              return Response.json(
                { error: "Error updating application" },
                { status: 500 }
              );
            }

            const notaStr = typeof nota === "string" ? nota : null;
            await database.from("postulacion_eventos").insert({
              postulacion_id: id,
              tipo: "estado_cambio",
              estado_anterior: oldEstado,
              estado_nuevo: estado as any,
              nota: notaStr,
            });
          }

          return Response.json({ ok: true });
        } catch (err) {
          console.error("admin applications PUT error:", err);
          return Response.json({ error: "Internal server error." }, { status: 500 });
        }
      },

      DELETE: async ({ request }) => {
        try {
          const sessionSecret = process.env.ADMIN_SESSION_SECRET;
          if (!sessionSecret) {
            return Response.json(
              { error: "Server configuration error." },
              { status: 500 }
            );
          }

          const isValid = await verifyAdminSessionFromRequest(request, sessionSecret);
          if (!isValid) {
            return Response.json({ error: "Unauthorized." }, { status: 401 });
          }

          const { id } = (await request.json()) as { id?: string };

          if (!id || typeof id !== "string") {
            return Response.json(
              { error: "Application ID is required" },
              { status: 400 }
            );
          }

          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
          const database = supabaseAdmin as any;

          const { error } = await database
            .from("postulaciones")
            .delete()
            .eq("id", id);

          if (error) {
            console.error("application delete error:", error);
            return Response.json(
              { error: "Error deleting application" },
              { status: 500 }
            );
          }

          return Response.json({ ok: true });
        } catch (err) {
          console.error("admin applications DELETE error:", err);
          return Response.json({ error: "Internal server error." }, { status: 500 });
        }
      },
    },
  },
});
