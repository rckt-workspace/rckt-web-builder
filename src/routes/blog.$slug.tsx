import { useEffect, useState } from "react";
import { createFileRoute, notFound } from "@tanstack/react-router";
import SiteNav from "@/components/rckt/SiteNav";
import SiteFooter from "@/components/rckt/SiteFooter";
import BlogArticle from "@/components/blog/BlogArticle";
import BlogRelated from "@/components/blog/BlogRelated";
import { BLOG_CHANGED_EVENT, blogRepository } from "@/lib/blog.repository";
import type { BlogPost } from "@/types/blog";

const SITE_URL = "https://www.rckt.es";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = blogRepository.getPostBySlug(params.slug);
    if (!post || post.status !== "published") throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Artículo no disponible — RCKT Insights" }, { name: "robots", content: "noindex" }],
      };
    }
    const { post } = loaderData;
    const url = post.seo.canonical || `${SITE_URL}/blog/${post.slug}`;
    const title = post.seo.title || `${post.title} | RCKT Insights`;
    const description = post.seo.description || post.excerpt;
    const image = `${SITE_URL}${post.coverImage}`;

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: post.title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:image", content: image },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: image },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description,
            datePublished: post.publishedAt,
            dateModified: post.updatedAt,
            image,
            author: { "@type": "Organization", name: post.author.name },
            publisher: {
              "@type": "Organization",
              name: "RCKT",
              url: SITE_URL,
            },
            mainEntityOfPage: url,
          }),
        },
      ],
    };
  },
  notFoundComponent: PostNotFound,
  component: BlogPostPage,
});

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background text-foreground antialiased">
      <SiteNav home={false} />
      <main className="section-light pb-24">{children}</main>
      <SiteFooter home={false} />
    </div>
  );
}

function PostNotFound() {
  return (
    <Shell>
      <div className="mx-auto max-w-3xl px-5 pt-40 text-center md:px-6">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-ink">Artículo no disponible</h1>
        <p className="mt-4 text-ink-soft">
          Puede que se haya movido o que todavía sea un borrador.
        </p>
        <a href="/blog" className="font-display mt-6 inline-block text-sm font-semibold text-orange">
          Volver a RCKT Insights
        </a>
      </div>
    </Shell>
  );
}

function BlogPostPage() {
  const { post: initial } = Route.useLoaderData();
  const { slug } = Route.useParams();
  const [post, setPost] = useState<BlogPost>(initial);
  const [related, setRelated] = useState<BlogPost[]>(() => blogRepository.getRelatedPosts(initial, 3));

  useEffect(() => {
    const sync = () => {
      const fresh = blogRepository.getPostBySlug(slug);
      if (fresh) {
        setPost(fresh);
        setRelated(blogRepository.getRelatedPosts(fresh, 3));
      }
    };
    sync();
    window.addEventListener(BLOG_CHANGED_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(BLOG_CHANGED_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, [slug]);

  return (
    <Shell>
      <BlogArticle post={post} />
      <BlogRelated posts={related} />
    </Shell>
  );
}
