import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { verifyAdminSessionFromRequest } from "@/lib/admin-auth";

const VacancyCreateSchema = z.object({
  titulo: z.string().min(1).max(200),
  area: z.string().min(1).max(100),
  modalidad: z.string().max(100).optional().or(z.literal("")),
  ubicacion: z.string().max(200).optional().or(z.literal("")),
  descripcion: z.string().max(5000).optional().or(z.literal("")),
  requisitos: z.string().max(5000).optional().or(z.literal("")),
  responsabilidades: z.string().max(5000).optional().or(z.literal("")),
  estado: z.enum(["borrador", "activa", "cerrada"]).optional(),
  orden: z.number().int().min(0).optional().or(z.null()),
  destacada: z.boolean().optional(),
});

const VacancyUpdateSchema = z.object({
  titulo: z.string().min(1).max(200).optional(),
  area: z.string().min(1).max(100).optional(),
  modalidad: z.string().max(100).optional().or(z.literal("")),
  ubicacion: z.string().max(200).optional().or(z.literal("")),
  descripcion: z.string().max(5000).optional().or(z.literal("")),
  requisitos: z.string().max(5000).optional().or(z.literal("")),
  responsabilidades: z.string().max(5000).optional().or(z.literal("")),
  estado: z.enum(["borrador", "activa", "cerrada"]).optional(),
  orden: z.number().int().min(0).optional().or(z.null()),
  destacada: z.boolean().optional(),
});

export const Route = createFileRoute("/api/admin/vacancies")({
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
            .from("vacantes")
            .select("*")
            .order("created_at", { ascending: false });

          if (error) {
            console.error("vacancies fetch error:", error);
            return Response.json(
              { error: "Error fetching vacancies" },
              { status: 500 }
            );
          }

          return Response.json({ vacancies: data ?? [] });
        } catch (err) {
          console.error("admin vacancies GET error:", err);
          return Response.json({ error: "Internal server error." }, { status: 500 });
        }
      },

      POST: async ({ request }) => {
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
          const parsed = VacancyCreateSchema.safeParse(body);

          if (!parsed.success) {
            return Response.json(
              { error: "Invalid request data" },
              { status: 400 }
            );
          }

          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
          const database = supabaseAdmin as any;
          const slug = parsed.data.titulo
            .toLowerCase()
            .normalize("NFD")
            .replace(/[̀-ͯ]/g, "")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");

          const { data, error } = await database
            .from("vacantes")
            .insert({
              slug,
              titulo: parsed.data.titulo,
              area: parsed.data.area,
              modalidad: parsed.data.modalidad || null,
              ubicacion: parsed.data.ubicacion || null,
              descripcion: parsed.data.descripcion || null,
              requisitos: parsed.data.requisitos || null,
              responsabilidades: parsed.data.responsabilidades || null,
              estado: parsed.data.estado,
              destacada: parsed.data.destacada ?? false,
              orden: parsed.data.orden ?? null,
              fecha_publicacion: parsed.data.estado === "activa" ? new Date().toISOString() : null,
            })
            .select()
            .single();

          if (error) {
            console.error("vacancy insert error:", error);
            return Response.json(
              { error: "Error creating vacancy" },
              { status: 500 }
            );
          }

          return Response.json({ vacancy: data });
        } catch (err) {
          console.error("admin vacancies POST error:", err);
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
          const { id, ...updates } = body as Record<string, unknown>;

          if (!id || typeof id !== "string") {
            return Response.json(
              { error: "Vacancy ID is required" },
              { status: 400 }
            );
          }

          const parsed = VacancyUpdateSchema.partial().safeParse(updates);

          if (!parsed.success) {
            return Response.json(
              { error: "Invalid update data" },
              { status: 400 }
            );
          }

          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
          const database = supabaseAdmin as any;

          const { data, error } = await database
            .from("vacantes")
            .update(parsed.data)
            .eq("id", id)
            .select()
            .single();

          if (error) {
            console.error("vacancy update error:", error);
            return Response.json(
              { error: "Error updating vacancy" },
              { status: 500 }
            );
          }

          return Response.json({ vacancy: data });
        } catch (err) {
          console.error("admin vacancies PUT error:", err);
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
              { error: "Vacancy ID is required" },
              { status: 400 }
            );
          }

          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
          const database = supabaseAdmin as any;

          const { error } = await database
            .from("vacantes")
            .delete()
            .eq("id", id);

          if (error) {
            console.error("vacancy delete error:", error);
            return Response.json(
              { error: "Error deleting vacancy" },
              { status: 500 }
            );
          }

          return Response.json({ ok: true });
        } catch (err) {
          console.error("admin vacancies DELETE error:", err);
          return Response.json({ error: "Internal server error." }, { status: 500 });
        }
      },
    },
  },
});
