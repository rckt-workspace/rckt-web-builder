import { createFileRoute } from "@tanstack/react-router";
import { verifyAdminSessionFromRequest } from "@/lib/admin-auth";

export const Route = createFileRoute("/api/admin/leads")({
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

          const { supabaseAdmin } = await import("@/lib/db-admin.server");
          const database = supabaseAdmin as any;

          const { data, error } = await database
            .from("leads")
            .select(
              "id,created_at,name,email,company,website,concern,source,numero_sedes,tratamientos_principales,details"
            )
            .order("created_at", { ascending: false })
            .limit(500);

          if (error) {
            console.error("leads fetch error:", error);
            return Response.json(
              { error: "Error fetching leads" },
              { status: 500 }
            );
          }

          return Response.json({ leads: data ?? [] });
        } catch (err) {
          console.error("admin leads GET error:", err);
          return Response.json({ error: "Internal server error." }, { status: 500 });
        }
      },
    },
  },
});
