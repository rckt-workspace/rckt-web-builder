import type { BlogPost } from "@/types/blog";
import BlogCard from "@/components/blog/BlogCard";

export default function BlogRelated({ posts }: { posts: BlogPost[] }) {
  if (!posts.length) return null;
  return (
    <section className="mx-auto mt-20 max-w-6xl px-5 md:px-6">
      <h2 className="font-display text-2xl font-semibold tracking-tight text-ink md:text-3xl">
        Artículos relacionados
      </h2>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {posts.map((p) => (
          <BlogCard key={p.id} post={p} />
        ))}
      </div>
    </section>
  );
}
