import { createFileRoute } from "@tanstack/react-router";
import BlogAdmin from "@/components/blog/BlogAdmin";

export const Route = createFileRoute("/ops/blog")({
  component: OpsBlogPage,
  head: () => ({
    meta: [
      { title: "Blog · Panel interno RCKT" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});

function OpsBlogPage() {
  return (
    <div className="section-light min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-5xl px-5 py-14 md:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="label-orange">Panel interno</p>
            <h1 className="font-display mt-2 text-3xl font-semibold tracking-tight text-ink">
              Gestión del blog
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-ink-soft">
              Los cambios se guardan en este navegador. Usa «Exportar JSON» para llevarlos al
              repositorio cuando quieras publicarlos de forma permanente.
            </p>
          </div>
          <a href="/blog" className="font-display text-sm font-semibold text-orange">
            Ver el blog →
          </a>
        </div>

        <div className="mt-10">
          <BlogAdmin />
        </div>
      </div>
    </div>
  );
}
