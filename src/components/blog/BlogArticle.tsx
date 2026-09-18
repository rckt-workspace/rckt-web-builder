import { Link } from "@tanstack/react-router";
import type { BlogPost } from "@/types/blog";
import { categoryName } from "@/lib/blog.repository";
import { extractToc, formatDate } from "@/lib/blog.utils";
import { renderMarkdown } from "@/lib/markdown";
import BlogToc from "@/components/blog/BlogToc";

export default function BlogArticle({ post }: { post: BlogPost }) {
  const toc = extractToc(post.content);

  return (
    <article className="mx-auto max-w-6xl px-5 pt-32 md:px-6 md:pt-40">
      <Link
        to="/blog"
        className="font-display inline-flex items-center gap-1.5 text-sm text-ink-soft transition-colors hover:text-orange"
      >
        <span aria-hidden="true">←</span> Volver a RCKT Insights
      </Link>

      <p className="label-orange mt-8">{categoryName(post.category)}</p>
      <h1 className="font-display mt-4 max-w-4xl text-[34px] leading-[1.08] font-semibold tracking-tight text-ink md:text-[56px]">
        {post.title}
      </h1>
      <p className="mt-5 max-w-3xl text-lg leading-relaxed text-ink-soft">{post.excerpt}</p>

      <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-ink-soft">
        <span className="font-display text-ink">{post.author.name}</span>
        <span aria-hidden="true">·</span>
        <span>{post.author.role}</span>
        <span aria-hidden="true">·</span>
        <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        <span aria-hidden="true">·</span>
        <span>{post.readingTime} min de lectura</span>
      </div>

      <img
        src={post.coverImage}
        alt={post.coverImageAlt}
        className="mt-10 aspect-[16/8] w-full rounded-3xl object-cover"
      />

      <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="max-w-3xl text-[17px]">{renderMarkdown(post.content)}</div>
        <aside className="order-first lg:order-none">
          <BlogToc items={toc} />
        </aside>
      </div>
    </article>
  );
}
