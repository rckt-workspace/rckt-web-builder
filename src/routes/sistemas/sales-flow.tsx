import { createFileRoute } from "@tanstack/react-router";
import SiteFooter from "@/components/rckt/SiteFooter";
import SiteNav from "@/components/rckt/SiteNav";
import SystemPageHero from "@/components/rckt/SystemPageHero";

export const Route = createFileRoute("/sistemas/sales-flow")({
  head: () => ({
    meta: [
      { title: "Sales Flow · RCKT.es" },
      {
        name: "description",
        content:
          "Sales Flow: conecta campañas, WhatsApp y CRM para que cada lead tenga respuesta, seguimiento y dueño.",
      },
      { property: "og:title", content: "Sales Flow · RCKT.es" },
      { property: "og:description", content: "Campañas, WhatsApp y CRM conectados para convertir cada lead en una oportunidad medible." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main>
        <SystemPageHero label="Sistema · S2" title="Sales Flow" descriptor="Hoy pagas por un lead, te escribe, y ahí empieza a perderse: respuesta tarde, sin seguimiento, fuera del CRM. Sales Flow conecta tus campañas, WhatsApp y CRM para que cada lead tenga respuesta, seguimiento y dueño, y para que sepas cuáles compran." ctaLabel="Revenue Diagnostic →" ctaHref="/sistemas/revenue-diagnostic#formulario" />
        <section className="mx-auto max-w-6xl px-6 py-20 md:py-28"><p className="text-[15.5px] text-muted-foreground">Contenido en desarrollo.</p></section>
      </main>
      <SiteFooter />
    </div>
  ),
});
