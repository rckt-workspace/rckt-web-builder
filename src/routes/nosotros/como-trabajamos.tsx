import { createFileRoute } from "@tanstack/react-router";

import SiteFooter from "@/components/rckt/SiteFooter";
import SiteNav from "@/components/rckt/SiteNav";
import SystemPageHero from "@/components/rckt/SystemPageHero";

export const Route = createFileRoute("/nosotros/como-trabajamos")({
  head: () => ({
    meta: [
      { title: "Cómo trabajamos · RCKT.es" },
      {
        name: "description",
        content: "Cómo trabajamos en RCKT.es: diagnóstico primero, sistemas después, Growth OS solo para cuentas maduras.",
      },
      { property: "og:title", content: "Cómo trabajamos · RCKT.es" },
      { property: "og:description", content: "Diagnóstico primero, sistemas después." },
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
          label="Nosotros"
          title="Cómo trabajamos"
          descriptor="Diagnóstico primero, sistemas después. Growth OS no se ofrece de entrada — se llega a él."
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
