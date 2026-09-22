import { createFileRoute } from "@tanstack/react-router";
import SiteFooter from "@/components/rckt/SiteFooter";
import SiteNav from "@/components/rckt/SiteNav";
import SystemPageHero from "@/components/rckt/SystemPageHero";

export const Route = createFileRoute("/soluciones/ecommerce-rentable")({
  head: () => ({
    meta: [
      { title: "Ecommerce rentable · RCKT" },
      {
        name: "description",
        content:
          "Inviertes en pauta y no crece con margen. Diagnóstico y sistema para ecommerce rentable.",
      },
      { property: "og:title", content: "Ecommerce rentable · RCKT.es" },
      { property: "og:description", content: "Diagnóstico y sistema para convertir inversión en crecimiento rentable." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main>
        <SystemPageHero label="Solución" title="Ecommerce rentable" descriptor="Inviertes en pauta y no crece con margen." ctaLabel="Revenue Diagnostic →" ctaHref="/sistemas/revenue-diagnostic#formulario" />
        <section className="mx-auto max-w-6xl px-6 py-20 md:py-28"><p className="text-[15.5px] text-muted-foreground">Contenido en desarrollo.</p></section>
      </main>
      <SiteFooter />
    </div>
  ),
});
