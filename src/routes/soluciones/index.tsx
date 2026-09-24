import { createFileRoute, Link } from "@tanstack/react-router";

import SiteFooter from "@/components/rckt/SiteFooter";
import SiteNav from "@/components/rckt/SiteNav";
import SystemPageHero from "@/components/rckt/SystemPageHero";
import heroPhotoImg from "@/assets/rckt-hero-sunset.jpg";

const heroPhoto = heroPhotoImg;
const DIAGNOSTIC_HREF = "/sistemas/revenue-diagnostic";

const GLOW =
  "radial-gradient(ellipse 700px 500px at 100% 0%, rgba(252, 92, 31,0.35) 0%, rgba(252, 92, 31,0.18) 40%, rgba(252, 92, 31,0) 75%)";

export const Route = createFileRoute("/soluciones/")({
  head: () => ({
    meta: [
      { title: "Soluciones — Entras por tu problema | RCKT.es" },
      {
        name: "description",
        content:
          "Tres problemas, tres caminos: captación y cierre, ecommerce rentable y operación. Entras por tu problema, no por el nombre de un sistema.",
      },
      { property: "og:title", content: "Soluciones — Entras por tu problema, no por el nombre de un sistema" },
      {
        property: "og:description",
        content: "Captación y cierre, ecommerce rentable y operación: el sistema se decide después del problema.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://www.rckt.es/soluciones" }],
  }),
  component: SolucionesIndexPage,
});

const SOLUCIONES = [
  {
    badge: "01",
    titulo: "Pagas por leads y no sabes cuáles compran.",
    subtitulo: "Meta y Google dicen una cosa; tu cuenta bancaria, otra.",
    label: "Sistema recomendado · Revenue Engine",
    botonLabel: "Ver captación y cierre →",
    href: "/soluciones/captacion-y-cierre" as const,
  },
  {
    badge: "02",
    titulo: "Inviertes en campañas y no crece con margen.",
    subtitulo: "El ROAS sube en la plataforma; el margen no sube en el banco.",
    label: "Sistema recomendado · Demand System",
    botonLabel: "Ver ecommerce rentable →",
    href: "/soluciones/ecommerce-rentable" as const,
  },
  {
    badge: "03",
    titulo: "Tu equipo hace lo mismo cien veces por semana.",
    subtitulo:
      "Cotizaciones a mano, documentos que se copian entre sistemas, Excel donde debería haber un proceso.",
    label: "Sistema recomendado · Operations System",
    botonLabel: "Ver operación →",
    href: "/soluciones/operacion" as const,
  },
];

function Cards() {
  return (
    <section className="relative isolate overflow-hidden py-16 md:py-24" style={{ background: "var(--kraft)" }}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          bottom: "-140px",
          left: "-160px",
          width: "820px",
          height: "620px",
          zIndex: 0,
          background:
            "radial-gradient(ellipse 620px 460px at 0% 100%, rgba(252, 92, 31,0.24) 0%, rgba(252, 92, 31,0.12) 42%, rgba(252, 92, 31,0) 72%)",
        }}
      />
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="grid items-stretch gap-5 md:grid-cols-3">
          {SOLUCIONES.map((s) => (
            <article key={s.badge} className="card-kraft flex flex-col overflow-hidden p-0">
              <div className="relative h-40 w-full overflow-hidden">
                <img src={heroPhoto} alt="" className="h-full w-full object-cover" />
                <div
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(252, 92, 31,0.45) 0%, rgba(242,161,95,0.35) 55%, rgba(252, 92, 31,0.35) 100%)",
                  }}
                />
                <span className="absolute top-4 left-4 rounded-full bg-[rgba(255,255,255,0.9)] px-3 py-1 font-mono text-[11px] tracking-wider text-ink">
                  {s.badge}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-7">
                <h2 className="font-display text-[21px] leading-snug font-semibold tracking-tight">{s.titulo}</h2>
                <p
                  className="mt-3 text-[16px] leading-relaxed text-muted-foreground"
                  style={{ fontFamily: '"Newsreader", Georgia, serif', fontStyle: "italic" }}
                >
                  {s.subtitulo}
                </p>
                <p className="label-orange mt-6">{s.label}</p>

                <div className="mt-auto pt-7">
                  <Link
                    to={s.href}
                    className="btn-orange font-display inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[14px] font-semibold"
                  >
                    {s.botonLabel}
                  </Link>
                  <div className="mt-4 text-center">
                    <a
                      href={DIAGNOSTIC_HREF}
                      className="font-display text-[13.5px] font-semibold text-orange underline-offset-4 hover:underline"
                    >
                      Solicitar diagnóstico de captación
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaFinal() {
  return (
    <section className="relative isolate overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, rgba(252, 92, 31,0.9) 0%, rgba(252, 92, 31,0.6) 45%, rgba(252, 92, 31,0) 100%)",
          zIndex: 3,
        }}
      />
      <div className="hero-photo" aria-hidden="true">
        <img src={heroPhoto} alt="" className="hero-photo-img" />
        <div className="cta-photo-fade" />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{ top: "-80px", right: "-120px", width: "900px", height: "650px", zIndex: 1, background: GLOW }}
      />
      <div className="relative z-10 mx-auto max-w-6xl px-5 py-24 md:px-6 md:py-32">
        <div className="mx-auto max-w-[720px] text-center">
          <div className="mb-4"><span className="label-orange">¿Empezamos?</span></div>
          <h2
            className="font-display text-[34px] leading-[1.08] font-semibold tracking-tight md:text-[56px]"
            style={{ color: "#FFFFFF" }}
          >
            El siguiente paso empieza con <em className="font-serif-accent">claridad.</em>
          </h2>
          <div className="mt-10 flex justify-center">
            <a
              href={DIAGNOSTIC_HREF}
              className="btn-orange font-display inline-flex items-center gap-2 rounded-full px-8 py-4 text-[15px] font-semibold"
            >
              Solicitar diagnóstico de captación →
            </a>
          </div>
        </div>
        <div
          className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t pt-6 font-mono text-[11px] tracking-[0.18em] uppercase"
          style={{ borderColor: "rgba(255,255,255,0.22)", color: "rgba(255,255,255,0.7)" }}
        >
          <span className="ml-auto">IA supervisada y documentada</span>
        </div>
      </div>
    </section>
  );
}

function SolucionesIndexPage() {
  return (
    <div className="bg-background text-foreground antialiased">
      <SiteNav />
      <main>
        <SystemPageHero
          label="Soluciones"
          title={
            <>
              Entras por <em className="font-serif-accent">tu problema,</em> no por el nombre de un sistema.
            </>
          }
          ctaLabel="Solicitar diagnóstico de captación →"
          ctaHref={DIAGNOSTIC_HREF}
        />
        <Cards />
        <CtaFinal />
      </main>
      <SiteFooter />
    </div>
  );
}
