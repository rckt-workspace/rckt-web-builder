import { createFileRoute } from "@tanstack/react-router";
import { verifyAdminSessionFromRequest } from "@/lib/admin-auth";

export const Route = createFileRoute("/api/admin/cv-url")({
  server: {
    handlers: {
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

          const { cvPath } = (await request.json()) as { cvPath?: string };

          if (!cvPath || typeof cvPath !== "string") {
            return Response.json(
              { error: "cv_path is required" },
              { status: 400 }
            );
          }

          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

          const { data, error } = await supabaseAdmin.storage
            .from("cvs")
            .createSignedUrl(cvPath, 60);

          if (error) {
            console.error("Signed URL creation error:", error);
            return Response.json(
              { error: "No se pudo generar URL del CV." },
              { status: 500 }
            );
          }

          return Response.json({
            signedUrl: data.signedUrl,
          });
        } catch (err) {
          console.error("cv-url handler error:", err);
          return Response.json({ error: "Error interno." }, { status: 500 });
        }
      },
    },
  },
});
