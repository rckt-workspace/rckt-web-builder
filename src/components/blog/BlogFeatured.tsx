import { Link } from "@tanstack/react-router";
import type { BlogPost } from "@/types/blog";
import { categoryName } from "@/lib/blog.repository";
import { formatDate } from "@/lib/blog.utils";

export default function BlogFeatured({ post }: { post: BlogPost }) {
  return (
    <article className="card-kraft grid overflow-hidden rounded-3xl md:grid-cols-2">
      <Link
        to="/blog/$slug"
        params={{ slug: post.slug }}
        className="block aspect-[16/10] w-full overflow-hidden md:aspect-auto md:h-full"
        aria-label={post.title}
      >
        <img
          src={post.coverImage}
          alt={post.coverImageAlt}
          className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.02]"
        />
      </Link>
      <div className="flex flex-col justify-center p-7 md:p-10">
        <div className="flex items-center gap-3">
          <span className="label-orange !text-[10px]">Destacado</span>
          <span className="text-xs text-ink-soft">{categoryName(post.category)}</span>
        </div>
        <h2 className="font-display mt-4 text-3xl leading-[1.1] font-semibold tracking-tight text-ink md:text-4xl">
          <Link to="/blog/$slug" params={{ slug: post.slug }} className="transition-colors hover:text-orange">
            {post.title}
          </Link>
        </h2>
        <p className="mt-4 leading-relaxed text-ink-soft">{post.excerpt}</p>
        <div className="mt-6 flex items-center gap-3 text-xs text-ink-soft">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readingTime} min de lectura</span>
        </div>
        <Link
          to="/blog/$slug"
          params={{ slug: post.slug }}
          className="btn-signal font-display mt-7 inline-flex w-fit items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold"
        >
          Leer artículo
        </Link>
      </div>
    </article>
  );
}
