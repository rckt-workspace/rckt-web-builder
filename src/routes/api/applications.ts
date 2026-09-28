import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { randomUUID } from "crypto";

const ApplicationSchema = z.object({
  nombre: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  telefono: z.string().trim().max(20).optional().or(z.literal("")),
  portafolio: z.string().trim().max(500).optional().or(z.literal("")),
  descripcion: z.string().trim().min(1).max(5000),
  privacidad: z.string().refine((v) => v === "on" || v === "true", {
    message: "Debe aceptar la política de privacidad",
  }),
});

export const Route = createFileRoute("/api/applications")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const contentType = request.headers.get("content-type") ?? "";
          if (!contentType.includes("multipart/form-data")) {
            return Response.json(
              { error: "Content-Type debe ser multipart/form-data" },
              { status: 400 },
            );
          }

          const contentLength = Number(request.headers.get("content-length") ?? 0);
          if (contentLength > 12_000_000) {
            return Response.json({ error: "Payload demasiado grande." }, { status: 413 });
          }

          const formData = await request.formData();
          const nombre = formData.get("nombre")?.toString() ?? "";
          const email = formData.get("email")?.toString() ?? "";
          const telefono = formData.get("telefono")?.toString() ?? "";
          const portafolio = formData.get("portafolio")?.toString() ?? "";
          const descripcion = formData.get("descripcion")?.toString() ?? "";
          const privacidad = formData.get("privacidad")?.toString() ?? "";
          const cvFile = formData.get("cv") as File | null;

          const parsed = ApplicationSchema.safeParse({
            nombre,
            email,
            telefono,
            portafolio,
            descripcion,
            privacidad,
          });

          if (!parsed.success) {
            return Response.json(
              { error: "Datos inválidos. Revisa los campos obligatorios." },
              { status: 400 },
            );
          }

          let cvPath: string | null = null;

          if (cvFile && cvFile.size > 0) {
            if (cvFile.type !== "application/pdf") {
              return Response.json({ error: "El CV debe ser un PDF." }, { status: 400 });
            }

            if (cvFile.size > 10 * 1024 * 1024) {
              return Response.json({ error: "El CV no puede exceder 10 MB." }, { status: 413 });
            }

            const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
            const uuid = randomUUID();
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, "0");
            cvPath = `${year}/${month}/${uuid}/curriculum.pdf`;

            const buffer = await cvFile.arrayBuffer();
            const { error: uploadError } = await supabaseAdmin.storage
              .from("cvs")
              .upload(cvPath, new Uint8Array(buffer), {
                contentType: "application/pdf",
                upsert: false,
              });

            if (uploadError) {
              console.error("CV upload error:", uploadError);
              return Response.json({ error: "No se pudo guardar el CV." }, { status: 500 });
            }
          }

          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
          const userAgent = request.headers.get("user-agent")?.slice(0, 500) ?? null;

          const { error } = await supabaseAdmin.from("postulaciones").insert({
            tipo: "servicio",
            nombre: parsed.data.nombre,
            email: parsed.data.email.toLowerCase(),
            telefono: parsed.data.telefono ? parsed.data.telefono.trim() || null : null,
            portafolio_url: parsed.data.portafolio ? parsed.data.portafolio.trim() || null : null,
            mensaje: parsed.data.descripcion.trim(),
            cv_path: cvPath,
            estado: "nueva",
            source: "trabaja-con-nosotros",
            consent_at: new Date().toISOString(),
          } as any);

          if (error) {
            console.error("applications insert error:", error);
            return Response.json({ error: "No se pudo guardar la candidatura." }, { status: 500 });
          }

          return Response.json({ ok: true });
        } catch (err) {
          console.error("applications handler error:", err);
          return Response.json({ error: "Error interno." }, { status: 500 });
        }
      },
    },
  },
});
