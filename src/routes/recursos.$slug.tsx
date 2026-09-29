import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

import SiteFooter from "@/components/rckt/SiteFooter";
import SiteNav from "@/components/rckt/SiteNav";
import { Button } from "@/components/ui/button";

type BlogPost = {
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
  seoTitle: string | null;
  seoDescription: string | null;
};

export const Route = createFileRoute("/recursos/$slug")({
  head: ({ loaderData }) => {
    const post = loaderData as unknown as BlogPost | null;
    return {
      meta: [
        { title: post ? (post.seoTitle || post.title) : "Recurso no encontrado" },
        { name: "description", content: post ? (post.seoDescription || post.excerpt) : "Este recurso no existe o aún no ha sido publicado." },
        { property: "og:title", content: post?.seoTitle || post?.title || "Recurso" },
        { property: "og:description", content: post?.seoDescription || post?.excerpt || "" },
        { property: "og:type", content: "article" },
        ...(post?.coverImage ? [{ property: "og:image", content: post.coverImage }] : []),
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [
        { rel: "canonical", href: `https://www.rckt.es/recursos/${post?.slug}` },
      ],
    };
  },
  loader: async ({ params }) => {
    try {
      const res = await fetch("/api/blog/posts");
      if (!res.ok) return null;
      const data = (await res.json()) as { posts: BlogPost[] };
      const post = data.posts.find((p) => p.slug === params.slug);
      return post || null;
    } catch (err) {
      console.error("Error loading post:", err);
      return null;
    }
  },
  component: ResourceDetail,
  notFoundComponent: ResourceNotFound,
});

function ResourceDetail() {
  const navigate = useNavigate();
  const post = Route.useLoaderData() as unknown as BlogPost | null;

  if (!post) {
    return <ResourceNotFound />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main>
        <article className="mx-auto max-w-3xl px-5 py-10 md:px-6 md:py-16">
          <button type="button" onClick={() => navigate({ to: "/recursos" })} className="inline-flex items-center gap-2 text-sm font-semibold text-orange hover:underline cursor-pointer bg-transparent border-0 p-0">
            <ArrowLeft className="h-4 w-4" />
            Volver a recursos
          </button>

          <div className="mt-8">
            {post.category && (
              <span className="inline-block rounded-full bg-orange/10 px-3 py-1 text-xs font-semibold text-orange">
                {post.category}
              </span>
            )}
            <h1 className="font-display mt-4 text-4xl font-semibold md:text-5xl">
              {post.title}
            </h1>
            <p className="mt-3 text-lg text-muted-foreground">
              {post.excerpt}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span>{post.authorName}</span>
              <span>•</span>
              <span>
                {new Intl.DateTimeFormat("es-ES", { day: "2-digit", month: "long", year: "numeric" }).format(
                  new Date(post.publishedAt)
                )}
              </span>
            </div>
          </div>

          {post.coverImage && (
            <div className="mt-10 overflow-hidden rounded-lg">
              <img
                src={post.coverImage}
                alt={post.title}
                className="h-auto w-full object-cover"
              />
            </div>
          )}

          <div className="prose prose-invert mt-12 max-w-none">
            <Content markdown={post.content} />
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 border-t border-muted pt-8">
              <h3 className="text-sm font-semibold">Tags</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block rounded-full bg-muted px-3 py-1 text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-12 border-t border-muted pt-8">
            <Button variant="outline" className="rounded-full" onClick={() => navigate({ to: "/recursos" })}>
              <ArrowLeft className="h-4 w-4" />
              Volver a recursos
            </Button>
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}

function Content({ markdown }: { markdown: string }) {
  return (
    <div className="space-y-4 text-muted-foreground">
      {markdown
        .split("\n")
        .filter((line) => line.trim())
        .map((line, idx) => {
          if (line.startsWith("## ")) {
            return (
              <h2 key={idx} className="font-display mt-8 text-2xl font-semibold text-foreground">
                {line.slice(3)}
              </h2>
            );
          }
          if (line.startsWith("### ")) {
            return (
              <h3 key={idx} className="font-display mt-6 text-xl font-semibold text-foreground">
                {line.slice(4)}
              </h3>
            );
          }
          if (line.startsWith("- ")) {
            return (
              <ul key={idx} className="list-inside list-disc">
                {markdown
                  .split("\n")
                  .filter((l) => l.startsWith("- "))
                  .map((l, i) => (
                    <li key={i}>{l.slice(2)}</li>
                  ))}
              </ul>
            );
          }
          if (line.startsWith("**") || line.includes("**")) {
            const parts = line.split(/\*\*(.+?)\*\*/g);
            return (
              <p key={idx}>
                {parts.map((part, i) => (
                  <span key={i} className={i % 2 === 1 ? "font-semibold text-foreground" : ""}>
                    {part}
                  </span>
                ))}
              </p>
            );
          }
          return (
            <p key={idx} className="leading-relaxed">
              {line}
            </p>
          );
        })}
    </div>
  );
}

function ResourceNotFound() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main className="mx-auto max-w-3xl px-5 py-16 md:px-6">
        <h1 className="font-display text-4xl font-semibold">Recurso no encontrado</h1>
        <p className="mt-4 text-muted-foreground">
          Este recurso no existe o aún no ha sido publicado.
        </p>
        <div className="mt-8">
          <Button className="rounded-full" onClick={() => navigate({ to: "/recursos" })}>
            <ArrowLeft className="h-4 w-4" />
            Volver a recursos
          </Button>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
