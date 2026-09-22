import { createFileRoute } from "@tanstack/react-router";
import SiteFooter from "@/components/rckt/SiteFooter";
import SiteNav from "@/components/rckt/SiteNav";
import SystemPageHero from "@/components/rckt/SystemPageHero";

export const Route = createFileRoute("/sistemas/operations-system")({
  head: () => ({
    meta: [
      { title: "Operations System · RCKT.es" },
      {
        name: "description",
        content:
          "Operations System: elegimos un proceso que tu equipo repite cien veces por semana y lo dejamos funcionando solo.",
      },
      { property: "og:title", content: "Operations System · RCKT.es" },
      { property: "og:description", content: "Procesos repetitivos convertidos en operaciones automatizadas y medibles." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main>
        <SystemPageHero label="Sistema · S3" title="Operations System" descriptor="No te vendemos IA. Elegimos un proceso que tu equipo repite cien veces por semana, medimos cuánto te cuesta hoy, y en ocho semanas lo dejamos funcionando solo, con una persona aprobando lo que importa." ctaLabel="Revenue Diagnostic →" ctaHref="/sistemas/revenue-diagnostic#formulario" />
        <section className="mx-auto max-w-6xl px-6 py-20 md:py-28"><p className="text-[15.5px] text-muted-foreground">Contenido en desarrollo.</p></section>
      </main>
      <SiteFooter />
    </div>
  ),
});
