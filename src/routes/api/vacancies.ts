import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/vacancies")({
  server: {
    handlers: {
      GET: async () => {
        try {
          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
          const database = supabaseAdmin as any;

          const { data, error } = await database
            .from("vacantes")
            .select("id,slug,titulo,area,modalidad,ubicacion,descripcion,estado,orden,fecha_publicacion")
            .eq("estado", "activa")
            .order("orden", { ascending: true })
            .order("fecha_publicacion", { ascending: false });

          if (error) {
            console.error("vacancies fetch error:", error);
            return Response.json({ error: "Error al obtener vacantes" }, { status: 500 });
          }

          return Response.json({
            vacancies: data ?? [],
          });
        } catch (err) {
          console.error("vacancies handler error:", err);
          return Response.json({ error: "Error interno" }, { status: 500 });
        }
      },
    },
  },
});
