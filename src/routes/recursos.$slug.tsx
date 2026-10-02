import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { isValidElement, useMemo, type ReactNode } from "react";
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

/** Lo que devuelve el loader: el artículo y sus artículos relacionados */
type ArticleData = { post: BlogPost; related: BlogPost[] };

export const Route = createFileRoute("/recursos/$slug")({
  head: ({ loaderData }) => {
    const post = (loaderData as unknown as ArticleData | null)?.post ?? null;
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
      if (!post) return null;
      return { post, related: pickRelated(post, data.posts, 3) } satisfies ArticleData;
    } catch (err) {
      console.error("Error loading post:", err);
      return null;
    }
  },
  component: ResourceDetail,
  notFoundComponent: ResourceNotFound,
});

/* ---------- Artículos relacionados ---------- */

/** Elige los artículos más parecidos: misma categoría suma 3, cada etiqueta compartida suma 1 */
function pickRelated(post: BlogPost, all: BlogPost[], limit: number): BlogPost[] {
  return all
    .filter((candidate) => candidate.id !== post.id)
    .map((candidate) => {
      const sameCategory = candidate.category && candidate.category === post.category ? 3 : 0;
      const sharedTags = (candidate.tags || []).filter((tag) => (post.tags || []).includes(tag)).length;
      return { candidate, score: sameCategory + sharedTags };
    })
    .sort((a, b) => b.score - a.score || b.candidate.publishedAt.localeCompare(a.candidate.publishedAt))
    .slice(0, limit)
    .map(({ candidate }) => candidate);
}

/** Tarjeta igual a las del listado de /recursos */
function RelatedCard({ post }: { post: BlogPost }) {
  return (
    <Link to="/recursos/$slug" params={{ slug: post.slug }} className="res-card is-in">
      {post.coverImage ? (
        <div className="res-cover" aria-hidden="true">
          <img src={post.coverImage} alt="" />
        </div>
      ) : (
        <div className="res-cover" aria-hidden="true">
          <span className="res-cover__brand">RCKT</span>
          <span className="res-cover__theme">{post.category || "Recursos"}</span>
        </div>
      )}
      <div className="flex flex-1 flex-col p-5 text-left">
        {post.category && <span className="res-chip self-start">{post.category}</span>}
        <h3 className="font-display mt-3 text-[17px] leading-[1.25] font-semibold text-foreground">
          {post.title}
        </h3>
        <p className="mt-2 text-[14px] leading-[1.55] text-muted-foreground">{post.excerpt}</p>
        <p className="mt-3 font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
          {post.publishedAt
            ? new Intl.DateTimeFormat("es-ES", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(post.publishedAt))
            : ""}
        </p>
        <span className="res-card__read mt-auto inline-flex items-center gap-1 pt-5 text-[13.5px] font-semibold">
          Leer →
        </span>
      </div>
    </Link>
  );
}

/* ---------- Índice "En este artículo" ---------- */

type TocItem = { id: string; text: string; level: 2 | 3 };

/** Convierte un subtítulo en un id para el enlace: "Qué automatizar" -> "que-automatizar" */
function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/** Quita negritas, cursivas, código y enlaces de Markdown para quedarse con el texto */
function stripMarkdown(text: string) {
  return text
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*_`~]/g, "")
    .trim();
}

/** Lee los subtítulos ## y ### del artículo para armar el índice */
function extractToc(markdown: string): TocItem[] {
  const items: TocItem[] = [];
  let inCodeBlock = false;
  for (const line of markdown.split("\n")) {
    if (line.trim().startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;
    const match = /^(#{2,3})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!match) continue;
    const text = stripMarkdown(match[2]);
    if (!text) continue;
    items.push({ id: slugify(text), text, level: match[1].length === 2 ? 2 : 3 });
  }
  return items;
}

/** Saca el texto plano de lo que React va a pintar dentro de un subtítulo */
function nodeText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(nodeText).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) return nodeText(node.props.children);
  return "";
}

function TableOfContents({ items, className = "" }: { items: TocItem[]; className?: string }) {
  if (items.length < 2) return null;
  return (
    <nav aria-label="Índice del artículo" className={className}>
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        En este artículo
      </p>
      <ul className="grid gap-2">
        {items.map((item, index) => (
          <li key={`${item.id}-${index}`} className={item.level === 3 ? "pl-3.5" : undefined}>
            <a
              href={`#${item.id}`}
              className="text-[13.5px] leading-snug text-muted-foreground no-underline transition-colors hover:text-orange"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/* ---------- Página del artículo ---------- */

function ResourceDetail() {
  const navigate = useNavigate();
  const data = Route.useLoaderData() as unknown as ArticleData | null;
  const post = data?.post ?? null;
  const related = data?.related ?? [];
  const toc = useMemo(() => (post ? extractToc(post.content) : []), [post]);

  if (!post) {
    return <ResourceNotFound />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main>
        {/* Todo va dentro de un único <section>: así GlobalSectionBlobs le pone
            las manchas de fondo y el fondo queda continuo, sin cambio de tono. */}
        <section>
          {/* Desde 1100px: [índice 220px] [artículo 720px], centrados juntos.
              En pantallas más pequeñas: una sola columna.
              pt-28 / md:pt-36 dejan espacio para que el menú fijo no tape
              "Volver a recursos". */}
          <div className="mx-auto px-5 pt-28 pb-10 md:px-6 md:pt-36 md:pb-16 min-[1100px]:grid min-[1100px]:grid-cols-[220px_minmax(0,720px)] min-[1100px]:justify-center min-[1100px]:gap-x-12">
            {/* Índice en la columna izquierda: empieza arriba y se queda fijo al bajar */}
            <aside className="hidden min-[1100px]:block min-[1100px]:sticky min-[1100px]:top-32 min-[1100px]:self-start">
              <TableOfContents items={toc} />
            </aside>

            <article className="mx-auto max-w-[720px] min-[1100px]:mx-0 min-[1100px]:max-w-none">
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
                    {new Intl.DateTimeFormat("es-ES", { day: "2-digit", month: "long", year: "numeric", timeZone: "UTC" }).format(
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

              {/* En pantallas pequeñas el índice aparece aquí, en un recuadro antes del texto */}
              <TableOfContents
                items={toc}
                className="mt-10 rounded-xl border border-border p-5 min-[1100px]:hidden"
              />

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
          </div>

          {/* Artículos que te podrían interesar: mismas tarjetas que en /recursos */}
          {related.length > 0 && (
            <div className="mx-auto max-w-[1040px] px-5 pb-16 md:px-6 md:pb-24">
              <h2 className="font-display text-2xl font-semibold md:text-3xl">
                Artículos que te podrían interesar
              </h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((item) => (
                  <RelatedCard key={item.id} post={item} />
                ))}
              </div>
            </div>
          )}
        </section>
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
        // h2 y h3 reciben un id para que el índice pueda enlazarlos;
        // scroll-mt-32 deja espacio para el menú fijo al saltar al subtítulo.
        h2: ({ children }) => (
          <h2 id={slugify(nodeText(children))} className="font-display mt-10 mb-4 scroll-mt-32 text-2xl font-semibold text-foreground">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 id={slugify(nodeText(children))} className="font-display mt-8 mb-3 scroll-mt-32 text-xl font-semibold text-foreground">
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
