import { createServerFn } from "@tanstack/react-start";

/**
 * Artículos publicados del blog, leídos SIEMPRE en el servidor.
 *
 * Es una "server function": se puede llamar desde el loader de una página.
 * - Cuando Google, Bing o ChatGPT piden la página, corre en el servidor y la
 *   página sale con los artículos ya escritos en el HTML.
 * - Cuando una persona navega dentro del sitio, TanStack la llama por detrás
 *   y la ejecuta igual en el servidor.
 * Así la llave de servicio de Supabase nunca llega al navegador.
 */

export type PublicBlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string | null;
  category: string | null;
  categorySlug: string | null;
  authorName: string;
  tags: string[];
  featured: boolean;
  publishedAt: string;
  updatedAt: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
};

type Row = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  cover_image_path: string | null;
  author_name: string | null;
  tags: string[] | null;
  featured: boolean | null;
  published_at: string;
  updated_at: string | null;
  seo_title: string | null;
  seo_description: string | null;
  blog_categories: { id: string; name: string; slug: string } | null;
};

export const getPublishedBlogPosts = createServerFn({ method: "GET" }).handler(
  async (): Promise<{ ok: boolean; posts: PublicBlogPost[] }> => {
    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const db = supabaseAdmin as any;
      const { data, error } = await db
        .from("blog_posts")
        .select(
          "id,slug,title,excerpt,content,cover_image_path,author_name,tags,featured,published_at,updated_at,seo_title,seo_description,blog_categories(id,name,slug)",
        )
        .eq("status", "published")
        .lte("published_at", new Date().toISOString())
        .order("featured", { ascending: false })
        .order("published_at", { ascending: false });

      if (error) {
        console.error("Blog (servidor): error leyendo artículos:", error);
        return { ok: false, posts: [] };
      }

      const posts = ((data ?? []) as Row[]).map((p) => {
        let coverImage: string | null = null;
        if (p.cover_image_path) {
          coverImage = /^https?:\/\//.test(p.cover_image_path)
            ? p.cover_image_path
            : db.storage.from("blog-media").getPublicUrl(p.cover_image_path)?.data?.publicUrl || null;
        }
        return {
          id: p.id,
          slug: p.slug,
          title: p.title,
          excerpt: p.excerpt || "",
          content: p.content || "",
          coverImage,
          category: p.blog_categories?.name || null,
          categorySlug: p.blog_categories?.slug || null,
          authorName: p.author_name || "RCKT",
          tags: p.tags || [],
          featured: Boolean(p.featured),
          publishedAt: p.published_at,
          updatedAt: p.updated_at,
          seoTitle: p.seo_title,
          seoDescription: p.seo_description,
        };
      });
      return { ok: true, posts };
    } catch (err) {
      console.error("Blog (servidor): no se pudieron leer los artículos:", err);
      return { ok: false, posts: [] };
    }
  },
);
