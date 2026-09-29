import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h2: ({ children }) => (
          <h2 className="font-display mt-10 mb-4 text-2xl font-semibold text-foreground">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="font-display mt-8 mb-3 text-xl font-semibold text-foreground">
            {children}
          </h3>
        ),
        h4: ({ children }) => (
          <h4 className="font-display mt-6 mb-2 text-lg font-semibold text-foreground">
            {children}
          </h4>
        ),
        p: ({ children }) => (
          <p className="mb-5 leading-7 text-muted-foreground">
            {children}
          </p>
        ),
        ul: ({ children }) => (
          <ul className="my-5 list-disc space-y-2 pl-6 text-muted-foreground">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="my-5 list-decimal space-y-2 pl-6 text-muted-foreground">
            {children}
          </ol>
        ),
        li: ({ children }) => (
          <li className="ml-2">
            {children}
          </li>
        ),
        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-orange underline underline-offset-4 hover:text-orange/80"
          >
            {children}
          </a>
        ),
        blockquote: ({ children }) => (
          <blockquote className="my-6 border-l-4 border-orange pl-5 italic text-muted-foreground">
            {children}
          </blockquote>
        ),
        table: ({ children }) => (
          <div className="my-8 overflow-x-auto rounded-xl border border-border">
            <table className="w-full border-collapse text-left text-sm">
              {children}
            </table>
          </div>
        ),
        thead: ({ children }) => (
          <thead className="bg-muted/60 text-foreground">
            {children}
          </thead>
        ),
        tbody: ({ children }) => (
          <tbody>
            {children}
          </tbody>
        ),
        tr: ({ children }) => (
          <tr>
            {children}
          </tr>
        ),
        th: ({ children }) => (
          <th className="border-b border-border px-4 py-3 font-semibold">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="border-b border-border px-4 py-3 align-top text-muted-foreground">
            {children}
          </td>
        ),
        code: ({ children, className }) => {
          const isBlock = className?.includes("language-");
          if (isBlock) {
            return (
              <code className="block rounded-lg bg-muted p-4 font-mono text-sm overflow-x-auto text-orange">
                {children}
              </code>
            );
          }
          return (
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-orange">
              {children}
            </code>
          );
        },
        pre: ({ children }) => (
          <pre className="my-6 rounded-lg bg-muted p-4 overflow-x-auto">
            {children}
          </pre>
        ),
        em: ({ children }) => (
          <em className="italic text-foreground">
            {children}
          </em>
        ),
        strong: ({ children }) => (
          <strong className="font-semibold text-foreground">
            {children}
          </strong>
        ),
        hr: () => (
          <hr className="my-8 border-border" />
        ),
      }}
    >
      {markdown}
    </ReactMarkdown>
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
