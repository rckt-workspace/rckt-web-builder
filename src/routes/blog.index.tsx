import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import SiteNav from "@/components/rckt/SiteNav";
import SiteFooter from "@/components/rckt/SiteFooter";
import BlogHero, { BLOG_SUBTITLE, BLOG_TITLE } from "@/components/blog/BlogHero";
import BlogSearch from "@/components/blog/BlogSearch";
import BlogCategories from "@/components/blog/BlogCategories";
import BlogCard from "@/components/blog/BlogCard";
import BlogFeatured from "@/components/blog/BlogFeatured";
import { BLOG_CHANGED_EVENT, blogRepository } from "@/lib/blog.repository";
import type { BlogPost } from "@/types/blog";

export const Route = createFileRoute("/blog/")({
  component: BlogIndex,
  head: () => ({
    meta: [
      { title: "RCKT Insights — Ideas y sistemas de crecimiento | RCKT" },
      { name: "description", content: BLOG_SUBTITLE },
      { property: "og:title", content: "RCKT Insights" },
      { property: "og:description", content: BLOG_SUBTITLE },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://www.rckt.es/blog" }],
  }),
});

function BlogIndex() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [posts, setPosts] = useState<BlogPost[]>(() => blogRepository.getPublishedPosts());

  useEffect(() => {
    const sync = () => setPosts(blogRepository.getPublishedPosts());
    sync();
    window.addEventListener(BLOG_CHANGED_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(BLOG_CHANGED_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const categories = blogRepository.getCategories();

  const results = useMemo(() => {
    void posts; // recompute when the local data layer changes
    return blogRepository.searchPosts(query, category);
  }, [query, category, posts]);

  const isFiltering = query.trim() !== "" || category !== "all";
  const featured = !isFiltering ? results.find((p) => p.featured) : undefined;
  const listed = featured ? results.filter((p) => p.id !== featured.id) : results;

  return (
    <div className="bg-background text-foreground antialiased">
      <SiteNav home={false} />
      <main className="section-light">
        <BlogHero />

        <section className="mx-auto max-w-6xl px-5 md:px-6">
          <div className="flex flex-col gap-6">
            <BlogSearch value={query} onChange={setQuery} />
            <BlogCategories categories={categories} active={category} onChange={setCategory} />
          </div>

          {featured && (
            <div className="mt-12">
              <BlogFeatured post={featured} />
            </div>
          )}

          {listed.length > 0 ? (
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {listed.map((p) => (
                <BlogCard key={p.id} post={p} />
              ))}
            </div>
          ) : (
            !featured && (
              <div className="card-kraft mt-12 rounded-3xl p-10 text-center">
                <p className="font-display text-lg text-ink">No encontramos artículos con esos criterios.</p>
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setCategory("all");
                  }}
                  className="font-display mt-4 cursor-pointer text-sm font-semibold text-orange"
                >
                  Ver todos los artículos
                </button>
              </div>
            )
          )}

          <p className="sr-only">{BLOG_TITLE}</p>
        </section>

        <div className="h-20 md:h-28" />
      </main>
      <SiteFooter home={false} />
    </div>
  );
}
