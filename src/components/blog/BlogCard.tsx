import { Link } from "@tanstack/react-router";
import type { BlogPost } from "@/types/blog";
import { categoryName } from "@/lib/blog.repository";
import { formatDate } from "@/lib/blog.utils";

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="card-kraft group flex h-full flex-col overflow-hidden rounded-3xl">
      <Link
        to="/blog/$slug"
        params={{ slug: post.slug }}
        className="block aspect-[16/9] w-full overflow-hidden"
        aria-label={post.title}
      >
        <img
          src={post.coverImage}
          alt={post.coverImageAlt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
        />
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <p className="label-orange !text-[10px]">{categoryName(post.category)}</p>
        <h3 className="font-display mt-3 text-xl leading-snug font-semibold tracking-tight text-ink">
          <Link to="/blog/$slug" params={{ slug: post.slug }} className="transition-colors hover:text-orange">
            {post.title}
          </Link>
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">{post.excerpt}</p>
        <div className="mt-6 flex items-center gap-3 text-xs text-ink-soft">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readingTime} min de lectura</span>
        </div>
        <Link
          to="/blog/$slug"
          params={{ slug: post.slug }}
          className="font-display mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-orange"
        >
          Leer artículo <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
