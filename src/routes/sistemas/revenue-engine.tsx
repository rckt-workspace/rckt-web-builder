import { createFileRoute } from "@tanstack/react-router";

import SiteFooter from "@/components/rckt/SiteFooter";
import SiteNav from "@/components/rckt/SiteNav";
import SystemPageHero from "@/components/rckt/SystemPageHero";

export const Route = createFileRoute("/sistemas/revenue-engine")({
  head: () => ({
    meta: [
      { title: "Revenue Engine · RCKT.es" },
      {
        name: "description",
        content: "Revenue Engine: Demand System y Sales Flow combinados, nuestro producto principal.",
      },
      { property: "og:title", content: "Revenue Engine · RCKT.es" },
      { property: "og:description", content: "Demand + Sales Flow, combinados." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main>
        <SystemPageHero
          label="Combo"
          title="Revenue Engine"
          descriptor="Demand + Sales Flow, combinados, son nuestro producto principal."
          ctaLabel="Revenue Diagnostic →"
          ctaHref="/sistemas/revenue-diagnostic#formulario"
        />
        <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <p className="text-[15.5px] text-muted-foreground">Contenido en desarrollo.</p>
        </section>
      </main>
      <SiteFooter />
    </div>
  ),
});
