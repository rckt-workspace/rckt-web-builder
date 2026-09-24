import { createFileRoute } from "@tanstack/react-router";

import GeneralCta from "@/components/rckt/GeneralCta";
import SectionHeader from "@/components/rckt/SectionHeader";
import SiteFooter from "@/components/rckt/SiteFooter";
import SiteNav from "@/components/rckt/SiteNav";
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
    <div className="min-h-screen bg-background text-foreground antialiased">
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
            <SectionHeader num="01." label="Mapa" title="España, desde Madrid." />
            <div className="market-map-grid mt-10">
              <div className="market-map" aria-label="Mapa simplificado de España con Madrid como mercado activo">
                <svg viewBox="0 0 520 390" role="img" aria-labelledby="spain-map-title">
                  <title id="spain-map-title">Madrid, mercado activo de RCKT en España</title>
                  <path className="market-map__country" d="M72 83 116 57l58 10 43-26 67 13 47-13 35 26 65 9 31 39-18 34 16 35-28 31-2 45-53 18-33 40-72-5-49 24-49-27-56 8-20-34-46-17-15-51 26-35-11-47 32-20-8-38Z" />
                  <circle className="market-map__halo" cx="278" cy="193" r="20" />
                  <circle className="market-map__point" cx="278" cy="193" r="7" />
                  <path className="market-map__line" d="M290 188h68" />
                  <text className="market-map__label" x="368" y="194">Madrid · activo</text>
                </svg>
              </div>
              <article className="content-card flex flex-col p-8 md:p-10">
                <span className="label-orange">Mercado activo</span>
                <h2 className="font-display mt-4 text-[32px] font-semibold">Madrid</h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">Base de RCKT en España. Desde aquí atendemos a empresas de todo el país.</p>
                <a href="/mercados/madrid" className="btn-orange font-display mt-8 inline-flex self-start rounded-full px-6 py-3 text-[14px] font-semibold">Ver Madrid →</a>
              </article>
            </div>
          </div>
        </section>

        <section className="page-section">
          <div className="page-shell">
            <a href="https://rckt.lat" target="_blank" rel="noopener noreferrer" className="content-card group block p-8 md:p-10">
              <span className="label-orange">Latinoamérica</span>
              <h2 className="font-display mt-4 text-[28px] font-semibold">¿Estás en Latinoamérica?</h2>
              <p className="mt-3 text-muted-foreground">Visita rckt.lat, nuestro sitio para Latinoamérica.</p>
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