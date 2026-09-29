import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/blog/posts")({
  server: {
    handlers: {
      GET: async () => {
        try {
          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
          const now = new Date().toISOString();

          const { data, error } = await supabaseAdmin
            .from("blog_posts")
            .select("id,slug,title,excerpt,content,cover_image_path,category_id,author_name,tags,status,featured,published_at,seo_title,seo_description,blog_categories(id,name,slug)")
            .eq("status", "published")
            .lte("published_at", now)
            .order("featured", { ascending: false })
            .order("published_at", { ascending: false });

          if (error) {
            console.error("blog posts fetch error:", error);
            return Response.json(
              { posts: [] },
              { status: 200, headers: { "cache-control": "public, max-age=300" } }
            );
          }

          const posts = (data ?? []).map((p: any) => {
            let coverImage: string | null = null;
            if (p.cover_image_path) {
              if (p.cover_image_path.startsWith("http://") || p.cover_image_path.startsWith("https://")) {
                coverImage = p.cover_image_path;
              } else {
                const { supabaseAdmin: sb } = require("@/integrations/supabase/client.server");
                const publicUrl = sb.storage.from("blog-media").getPublicUrl(p.cover_image_path)?.data?.publicUrl;
                coverImage = publicUrl || null;
              }
            }

            return {
              id: p.id,
              slug: p.slug,
              title: p.title,
              excerpt: p.excerpt,
              content: p.content,
              coverImage,
              category: p.blog_categories?.name || null,
              categorySlug: p.blog_categories?.slug || null,
              authorName: p.author_name,
              tags: p.tags || [],
              featured: p.featured,
              publishedAt: p.published_at,
              seoTitle: p.seo_title,
              seoDescription: p.seo_description,
            };
          });

          return Response.json(
            { posts },
            { status: 200, headers: { "cache-control": "public, max-age=300" } }
          );
        } catch (err) {
          console.error("blog posts GET error:", err);
          return Response.json(
            { posts: [] },
            { status: 200, headers: { "cache-control": "public, max-age=60" } }
          );
        }
      },
    },
  },
});
