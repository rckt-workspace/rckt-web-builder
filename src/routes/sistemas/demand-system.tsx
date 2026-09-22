import { createFileRoute } from "@tanstack/react-router";
import SiteFooter from "@/components/rckt/SiteFooter";
import SiteNav from "@/components/rckt/SiteNav";
import SystemPageHero from "@/components/rckt/SystemPageHero";

export const Route = createFileRoute("/sistemas/demand-system")({
  head: () => ({
    meta: [
      { title: "Demand System · RCKT.es" },
      {
        name: "description",
        content:
          "Demand System: campañas optimizadas por oportunidades que tu equipo comercial acepta y por las que terminan en venta.",
      },
      { property: "og:title", content: "Demand System · RCKT.es" },
      { property: "og:description", content: "Campañas optimizadas por oportunidades aceptadas y ventas reales." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main>
        <SystemPageHero label="Sistema · S1" title="Demand System" descriptor="Manejamos tus campañas, pero no las optimizamos por leads baratos: las optimizamos por las oportunidades que tu equipo comercial acepta y por las que terminan en venta." ctaLabel="Revenue Diagnostic →" ctaHref="/sistemas/revenue-diagnostic#formulario" />
        <section className="mx-auto max-w-6xl px-6 py-20 md:py-28"><p className="text-[15.5px] text-muted-foreground">Contenido en desarrollo.</p></section>
      </main>
      <SiteFooter />
    </div>
  ),
});
