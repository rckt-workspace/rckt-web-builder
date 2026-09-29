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
            category?: string;
            status?: string;
            author_name?: string;
            tags?: string[];
            featured?: boolean;
            published_at?: string | null;
            seo_title?: string | null;
            seo_description?: string | null;
            cover_image_path?: string | null;
          };

          const { title, slug, excerpt, content, category, status, author_name, tags, featured, published_at, seo_title, seo_description, cover_image_path } = body;

          if (!title || !slug || !status) {
            return Response.json(
              { error: "title, slug, and status are required" },
              { status: 400 }
            );
          }

          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

          let category_id: string | null = null;
          if (category) {
            const categorySlug = category.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
            const { data: catData } = await supabaseAdmin
              .from("blog_categories")
              .select("id")
              .eq("name", category)
              .single();

            if (catData?.id) {
              category_id = catData.id;
            } else {
              const { data: newCat } = await supabaseAdmin
                .from("blog_categories")
                .insert({ name: category, slug: categorySlug, active: true })
                .select("id")
                .single();
              category_id = newCat?.id || null;
            }
          }

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
              cover_image_path: cover_image_path || null,
              tags: tags && tags.length > 0 ? tags : null,
              featured: featured || false,
              published_at: published_at || (status === "published" ? new Date().toISOString() : null),
              seo_title: seo_title || title,
              seo_description: seo_description || excerpt || "",
            })
            .select()
            .single();

          if (error) {
            console.error("blog post insert error:", error);
            if (error.code === "23505") {
              return Response.json(
                { error: "El slug ya existe. Usa uno diferente." },
                { status: 409 }
              );
            }
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

          const body = (await request.json()) as {
            id?: string;
            title?: string;
            slug?: string;
            excerpt?: string;
            content?: string;
            category?: string;
            status?: string;
            author_name?: string;
            tags?: string[];
            featured?: boolean;
            published_at?: string | null;
            seo_title?: string | null;
            seo_description?: string | null;
            cover_image_path?: string | null;
          };

          const { id, category, ...updates } = body;

          if (!id || typeof id !== "string") {
            return Response.json(
              { error: "Post ID is required" },
              { status: 400 }
            );
          }

          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

          const updatePayload: any = updates;

          const currentPost = await supabaseAdmin
            .from("blog_posts")
            .select("title, excerpt")
            .eq("id", id)
            .single();

          if (updatePayload.seo_title === "" || updatePayload.seo_title === null) {
            updatePayload.seo_title = updatePayload.title || currentPost.data?.title || null;
          }
          if (updatePayload.seo_description === "" || updatePayload.seo_description === null) {
            updatePayload.seo_description = updatePayload.excerpt || currentPost.data?.excerpt || "";
          }

          if (category) {
            const categorySlug = category.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
            const { data: catData } = await supabaseAdmin
              .from("blog_categories")
              .select("id")
              .eq("name", category)
              .single();

            if (catData?.id) {
              updatePayload.category_id = catData.id;
            } else {
              const { data: newCat } = await supabaseAdmin
                .from("blog_categories")
                .insert({ name: category, slug: categorySlug, active: true })
                .select("id")
                .single();
              updatePayload.category_id = newCat?.id || null;
            }
          }

          const { data, error } = await supabaseAdmin
            .from("blog_posts")
            .update(updatePayload)
            .eq("id", id)
            .select()
            .single();

          if (error) {
            console.error("blog post update error:", error);
            if (error.code === "23505") {
              return Response.json(
                { error: "El slug ya existe. Usa uno diferente." },
                { status: 409 }
              );
            }
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
