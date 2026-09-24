import { createFileRoute } from "@tanstack/react-router";

import GeneralCta from "@/components/rckt/GeneralCta";
import SectionHeader from "@/components/rckt/SectionHeader";
import SiteFooter from "@/components/rckt/SiteFooter";
import SiteNav from "@/components/rckt/SiteNav";
import SpainMap from "@/components/rckt/SpainMap";
import SystemPageHero from "@/components/rckt/SystemPageHero";

export const Route = createFileRoute("/mercados/")({
  head: () => ({
    meta: [
      { title: "Mercados: dónde opera RCKT | RCKT.es" },
      { name: "description", content: "RCKT opera en España desde Madrid. Conoce nuestros mercados activos." },
      { property: "og:title", content: "Mercados: dónde opera RCKT | RCKT.es" },
      { property: "og:description", content: "RCKT opera en España desde Madrid. Conoce nuestros mercados activos." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.rckt.es/mercados" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://www.rckt.es/mercados" }],
  }),
  component: MercadosPage,
});

function MercadosPage() {
  return (
    <div className="market-page min-h-screen bg-background text-foreground antialiased">
      <SiteNav />
      <main>
        <SystemPageHero
          label="Mercados"
          title={<>Dónde <span className="text-orange">operamos.</span></>}
          context="Operamos en España desde Madrid, nuestro primer mercado activo. Abrimos nuevas ciudades cuando tenemos capacidad real de atención y contenido útil para cada una."
          ctaLabel="Solicitar diagnóstico de captación →"
          ctaHref="/sistemas/revenue-diagnostic"
        />

        <section className="page-section">
          <div className="page-shell">
            <SectionHeader num="01." label="Mapa" title="Mercado activo." />
            <div className="market-map-grid mt-10">
              <SpainMap />
              <article className="market-feature-card flex flex-col p-7 md:p-8">
                <span className="label-orange">Mercado activo</span>
                <h2 className="font-display mt-4 text-[18px] font-semibold">Madrid</h2>
                <p className="market-copy mt-3">Base de RCKT en España. Desde aquí atendemos a empresas de todo el país.</p>
                <a href="/mercados/madrid" className="btn-orange font-display mt-8 inline-flex self-start rounded-full px-6 py-3 text-[14px] font-semibold">Ver Madrid →</a>
              </article>
            </div>
          </div>
        </section>

        <section className="page-section">
          <div className="page-shell">
            <a href="https://rckt.lat" target="_blank" rel="noopener noreferrer" className="market-note group block p-7 md:p-8">
              <span className="label-orange">Latinoamérica</span>
              <h2 className="font-display mt-4 text-[18px] font-semibold">¿Estás en Latinoamérica?</h2>
              <p className="market-copy mt-3">Visita rckt.lat, nuestro sitio para Latinoamérica.</p>
              <span className="mt-6 inline-block font-semibold text-orange group-hover:underline">Visitar rckt.lat →</span>
            </a>
          </div>
        </section>
        <GeneralCta />
      </main>
      <SiteFooter />
    </div>
  );
}