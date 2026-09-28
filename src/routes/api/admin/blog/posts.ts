import { createFileRoute } from "@tanstack/react-router";
import { verifyAdminSessionFromRequest } from "@/lib/admin-auth";

export const Route = createFileRoute("/api/admin/blog/posts")({
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

          const { data, error } = await supabaseAdmin
            .from("blog_posts")
            .select("*,blog_categories(id,name)")
            .order("created_at", { ascending: false });

          if (error) {
            console.error("blog posts fetch error:", error);
            return Response.json(
              { error: "Error fetching blog posts" },
              { status: 500 }
            );
          }

          return Response.json({ posts: data ?? [] });
        } catch (err) {
          console.error("admin blog posts GET error:", err);
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

          const body = (await request.json()) as {
            title?: string;
            slug?: string;
            excerpt?: string;
            content?: string;
            category_id?: string;
            status?: string;
            author_name?: string;
          };

          const { title, slug, excerpt, content, category_id, status, author_name } = body;

          if (!title || !slug || !status) {
            return Response.json(
              { error: "title, slug, and status are required" },
              { status: 400 }
            );
          }

          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

          const { data, error } = await supabaseAdmin
            .from("blog_posts")
            .insert({
              slug,
              title,
              excerpt: excerpt || null,
              content: content || null,
              category_id: category_id || null,
              author_name: author_name || "RCKT",
              status: status as any,
              cover_image_path: null,
              published_at: status === "published" ? new Date().toISOString() : null,
            })
            .select()
            .single();

          if (error) {
            console.error("blog post insert error:", error);
            return Response.json(
              { error: "Error creating blog post" },
              { status: 500 }
            );
          }

          return Response.json({ post: data });
        } catch (err) {
          console.error("admin blog posts POST error:", err);
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

          const body = (await request.json()) as Record<string, unknown>;
          const { id, ...updates } = body;

          if (!id || typeof id !== "string") {
            return Response.json(
              { error: "Post ID is required" },
              { status: 400 }
            );
          }

          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

          const { data, error } = await supabaseAdmin
            .from("blog_posts")
            .update(updates as any)
            .eq("id", id)
            .select()
            .single();

          if (error) {
            console.error("blog post update error:", error);
            return Response.json(
              { error: "Error updating blog post" },
              { status: 500 }
            );
          }

          return Response.json({ post: data });
        } catch (err) {
          console.error("admin blog posts PUT error:", err);
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
              { error: "Post ID is required" },
              { status: 400 }
            );
          }

          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

          const { error } = await supabaseAdmin
            .from("blog_posts")
            .delete()
            .eq("id", id);

          if (error) {
            console.error("blog post delete error:", error);
            return Response.json(
              { error: "Error deleting blog post" },
              { status: 500 }
            );
          }

          return Response.json({ ok: true });
        } catch (err) {
          console.error("admin blog posts DELETE error:", err);
          return Response.json({ error: "Internal server error." }, { status: 500 });
        }
      },
    },
  },
});
