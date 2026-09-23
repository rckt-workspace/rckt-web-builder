import { createFileRoute, Link } from "@tanstack/react-router";
import { Image as ImageIcon, LineChart, Megaphone, MessageCircle, Search, Sparkles, Tag, TrendingUp, Workflow } from "lucide-react";

import SiteFooter from "@/components/rckt/SiteFooter";
import SiteNav from "@/components/rckt/SiteNav";
import SystemPageHero from "@/components/rckt/SystemPageHero";
import MilestoneCards from "@/components/rckt/MilestoneCards";
import SignalCards from "@/components/rckt/SignalCards";
import { Blob, DotGrid } from "@/components/rckt/SectionDecor";
import heroPhotoAsset from "@/assets/rckt-hero-sunset.png.asset.json";

const heroPhoto = heroPhotoAsset.url;
const DIAGNOSTIC_HREF = "/sistemas/revenue-diagnostic";

const GLOW =
  "radial-gradient(ellipse 700px 500px at 100% 0%, rgba(232,103,46,0.35) 0%, rgba(244,161,95,0.18) 40%, rgba(232,103,46,0) 75%)";

export const Route = createFileRoute("/soluciones/ecommerce-rentable")({
  head: () => ({
    meta: [
      { title: "Ecommerce rentable — Inviertes en campañas y no crece con margen | RCKT.es" },
      {
        name: "description",
        content:
          "Medios, creatividad y medición por margen de contribución tras adquisición, no solo por ROAS de plataforma.",
      },
      { property: "og:title", content: "Ecommerce rentable — Crecer con margen" },
      {
        property: "og:description",
        content: "El ROAS sube en la plataforma; el margen no sube en el banco. Así se corrige.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EcommerceRentablePage,
});

const SENALES = [
  "Creatividad agotada: el mismo anuncio desde hace meses",
  "Catálogo sin lectura comercial: no sabes qué producto realmente paga la inversión en medios",
  "WhatsApp entra en el proceso de venta, pero nadie lo mide",
  "El coste de adquisición sube más rápido que el ticket medio",
];

const HITOS = [
  { dia: "01", texto: "Testing creativo continuo con IA: hooks, ángulos, formatos" },
  { dia: "02", texto: "Medición por margen de contribución, no solo ROAS" },
  { dia: "03", texto: "WhatsApp integrado al embudo, si aplica" },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="inline-block h-4 w-[2px] bg-orange" />
      <span className="label-orange">{children}</span>
    </div>
  );
}

function EcommerceRentablePage() {
  return (
    <div className="bg-background text-foreground antialiased">
      <SiteNav />
      <main>
        <SystemPageHero
          label="Ecommerce rentable"
          descriptor="El ROAS sube en la plataforma; el margen no sube en el banco."
          title={
            <>
              Inviertes en campañas y no crece <em className="font-serif-accent">con margen.</em>
            </>
          }
          ctaLabel="Solicitar diagnóstico de captación →"
          ctaHref={DIAGNOSTIC_HREF}
        />

        {/* Te pasa esto */}
        <section className="relative py-16 md:py-24" style={{ background: "var(--kraft)" }}>
          <div className="mx-auto max-w-6xl px-6">
            <SectionLabel>Señales</SectionLabel>
            <h2 className="font-display text-[28px] leading-tight font-semibold tracking-tight md:text-[40px]">
              Te pasa esto.
            </h2>
            <ul className="mt-10 grid gap-5 md:grid-cols-2">
              {SENALES.map((s) => (
                <li key={s} className="flex items-start gap-4">
                  <span
                    className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                    style={{ background: "var(--orange-bg)" }}
                  >
                    <AlertTriangle className="h-4 w-4 text-orange" strokeWidth={2} aria-hidden="true" />
                  </span>
                  <span className="text-[15.5px] leading-relaxed">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Lo que hacemos */}
        <section className="relative py-16 md:py-24" style={{ background: "var(--kraft-2)" }}>
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid items-start gap-10 md:grid-cols-2 md:gap-14">
              <div>
                <SectionLabel>Lo que hacemos</SectionLabel>
                <h2 className="font-display text-[28px] leading-tight font-semibold tracking-tight md:text-[40px]">
                  Lo que hacemos: <em className="font-serif-accent">Demand System.</em>
                </h2>
                <p className="mt-6 max-w-lg text-[16px] leading-relaxed text-muted-foreground">
                  Demand System, con Sales Flow si WhatsApp pesa en la conversión.
                </p>
              </div>

              <div className="card-kraft rounded-2xl p-7 md:p-8">
                <span className="label-orange">Indicador que manda</span>
                <p className="font-display mt-4 text-[24px] leading-tight font-semibold tracking-tight md:text-[30px]">
                  Margen de contribución tras adquisición.
                </p>
                <Link
                  to="/sistemas/demand-system"
                  className="btn-orange font-display mt-8 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[14px] font-semibold"
                >
                  Ver Demand System →
                </Link>
                <div className="mt-5">
                  <Link
                    to="/sistemas/sales-flow"
                    className="font-display text-[14px] font-semibold text-orange underline-offset-4 hover:underline"
                  >
                    Ver Sales Flow →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Qué cambia en 90 días */}
        <section className="relative py-16 md:py-24" style={{ background: "var(--kraft)" }}>
          <div className="mx-auto max-w-6xl px-6">
            <SectionLabel>Los primeros 90 días</SectionLabel>
            <h2 className="font-display text-[28px] leading-tight font-semibold tracking-tight md:text-[40px]">
              Qué cambia en 90 días.
            </h2>
            <div className="mt-14 flex flex-col gap-10 md:flex-row md:gap-0">
              {HITOS.map((hito) => (
                <div key={hito.dia} className="relative flex-1 md:px-6 md:first:pl-0 md:last:pr-0">
                  <div
                    aria-hidden="true"
                    className="absolute top-0 left-0 hidden h-px w-full md:block"
                    style={{ background: "rgba(232,103,46,0.35)" }}
                  />
                  <div
                    aria-hidden="true"
                    className="absolute top-0 bottom-0 left-[5px] w-px md:hidden"
                    style={{ background: "rgba(232,103,46,0.35)" }}
                  />
                  <span
                    aria-hidden="true"
                    className="absolute top-[-4px] left-0 hidden h-[9px] w-[9px] rounded-full md:block"
                    style={{ background: "var(--orange)" }}
                  />
                  <span
                    aria-hidden="true"
                    className="absolute top-1 left-0 h-[11px] w-[11px] rounded-full md:hidden"
                    style={{ background: "var(--orange)" }}
                  />
                  <div className="pl-8 md:pt-8 md:pl-0">
                    <span className="label-orange">{hito.dia}</span>
                    <p className="mt-3 max-w-xs text-[15.5px] leading-relaxed">{hito.texto}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Un caso */}
        <section className="relative py-16 md:py-24" style={{ background: "var(--kraft-2)" }}>
          <div className="mx-auto max-w-6xl px-6">
            <SectionLabel>Prueba</SectionLabel>
            <h2 className="font-display text-[28px] leading-tight font-semibold tracking-tight md:text-[40px]">
              Un caso.
            </h2>
            <div
              className="mt-10 rounded-2xl border border-dashed p-7 md:p-10"
              style={{ borderColor: "rgba(232,103,46,0.45)", background: "var(--card-surface)" }}
            >
              <dl className="grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  "Situación inicial",
                  "Periodo",
                  "Alcance",
                  "Inversión",
                  "Intervención",
                  "Resultado",
                  "Método de medición",
                  "Limitaciones",
                ].map((campo) => (
                  <div key={campo}>
                    <dt className="label-orange">{campo}</dt>
                    <dd
                      className="mt-2 h-4 w-4/5 rounded-full"
                      style={{ background: "rgba(16,24,43,0.08)" }}
                      aria-hidden="true"
                    />
                  </div>
                ))}
              </dl>
              <p className="mt-10 text-center font-mono text-[12px] tracking-[0.14em] text-muted-foreground uppercase">
                [ Ficha de caso en preparación — publicaremos resultados solo con línea base y método de medición. ]
              </p>
            </div>
          </div>
        </section>

        {/* Para quién no es */}
        <section className="relative isolate overflow-hidden py-14 md:py-20" style={{ background: "var(--deep)" }}>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute"
            style={{ top: "-160px", right: "-140px", width: "760px", height: "560px", zIndex: 0, background: GLOW }}
          />
          <div className="relative z-10 mx-auto max-w-6xl px-6">
            <div className="max-w-3xl border-l-2 pl-7" style={{ borderColor: "var(--orange)" }}>
              <span className="label-orange">Honestidad primero</span>
              <h2
                className="font-display mt-4 text-[28px] leading-tight font-semibold tracking-tight md:text-[40px]"
                style={{ color: "#FFFFFF" }}
              >
                Para quién no es.
              </h2>
              <p className="mt-5 text-[16px] leading-relaxed" style={{ color: "rgba(255,255,255,0.72)" }}>
                Tiendas sin margen para sostener la inversión en medios · catálogos sin unit economics claras.
              </p>
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="relative isolate overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, rgba(232,103,46,0.9) 0%, rgba(244,161,95,0.6) 45%, rgba(232,103,46,0) 100%)",
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
            <div className="ml-auto max-w-2xl text-right">
              <div className="mb-4 flex items-center justify-end gap-3">
                <span className="label-orange">¿Empezamos?</span>
                <span className="inline-block h-4 w-[2px] bg-orange" />
              </div>
              <h2
                className="font-display text-[34px] leading-[1.08] font-semibold tracking-tight md:text-[56px]"
                style={{ color: "#FFFFFF" }}
              >
                El siguiente paso empieza con <em className="font-serif-accent">claridad.</em>
              </h2>
              <div className="mt-10 flex justify-end">
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
              <span>Más inteligencia. Más crecimiento.</span>
              <span>Tecnología × Personas × Resultados</span>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
