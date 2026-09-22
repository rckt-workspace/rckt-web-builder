import { createFileRoute } from "@tanstack/react-router";
import SiteFooter from "@/components/rckt/SiteFooter";
import SiteNav from "@/components/rckt/SiteNav";
import SystemPageHero from "@/components/rckt/SystemPageHero";

export const Route = createFileRoute("/soluciones/captacion-y-cierre")({
  head: () => ({
    meta: [
      { title: "Captación y cierre · RCKT" },
      {
        name: "description",
        content:
          "Pagas por leads y no sabes cuáles compran. Diagnóstico y sistema para captación y cierre.",
      },
      { property: "og:title", content: "Captación y cierre · RCKT.es" },
      { property: "og:description", content: "Diagnóstico y sistema para conectar captación, seguimiento y cierre." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main>
        <SystemPageHero label="Solución" title="Captación y cierre" descriptor="Pagas por leads y no sabes cuáles compran." ctaLabel="Revenue Diagnostic →" ctaHref="/sistemas/revenue-diagnostic#formulario" />
        <section className="mx-auto max-w-6xl px-6 py-20 md:py-28"><p className="text-[15.5px] text-muted-foreground">Contenido en desarrollo.</p></section>
      </main>
      <SiteFooter />
    </div>
  ),
});
