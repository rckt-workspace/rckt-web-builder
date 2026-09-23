import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertCircle, Copy, FileClock, FileCheck2, MessageSquareQuote, RefreshCw, Table2, Inbox, LifeBuoy } from "lucide-react";

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

export const Route = createFileRoute("/soluciones/operacion")({
  head: () => ({
    meta: [
      { title: "Operación — Tu equipo hace lo mismo cien veces por semana | RCKT.es" },
      {
        name: "description",
        content:
          "Un proceso a la vez, en un Sprint de 6–8 semanas, con aprobación humana en lo que importa.",
      },
      { property: "og:title", content: "Operación — Procesos que se ejecutan solos" },
      {
        property: "og:description",
        content:
          "Cotizaciones a mano, documentos que se copian entre sistemas, Excel donde debería haber un proceso.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OperacionPage,
});

const SENALES = [
  "Presupuestos que tardan horas y dependen de una persona",
  "Datos duplicados entre CRM, ERP y hojas de cálculo",
  "Reporting manual cada semana",
  "Errores que se repiten porque nadie los documenta",
];

const SPRINT = [
  { rango: "Semanas 1–2", titulo: "Mapa del proceso", detalle: "Volumen, tiempo, errores, coste" },
  { rango: "Semanas 3–6", titulo: "Construcción e integración", detalle: "Con pruebas reales" },
  { rango: "Semanas 7–8", titulo: "Piloto controlado", detalle: "Medición contra línea base, transferencia" },
  { rango: "Después", titulo: "Soporte mensual", detalle: "Monitoreo, excepciones, mejora" },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="inline-block h-4 w-[2px] bg-orange" />
      <span className="label-orange">{children}</span>
    </div>
  );
}

function OperacionPage() {
  return (
    <div className="bg-background text-foreground antialiased">
      <SiteNav />
      <main>
        <SystemPageHero
          label="Operación"
          descriptor="Cotizaciones a mano, documentos que se copian entre sistemas, Excel donde debería haber un proceso."
          title={
            <>
              Tu equipo hace lo mismo <em className="font-serif-accent">cien veces por semana.</em>
            </>
          }
          ctaLabel="Solicitar diagnóstico de proceso →"
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
                  Lo que hacemos: <em className="font-serif-accent">Operations System.</em>
                </h2>
                <p className="mt-6 max-w-lg text-[16px] leading-relaxed text-muted-foreground">
                  Un proceso a la vez, en un Sprint de 6–8 semanas, con aprobación humana en lo que importa.
                </p>
              </div>

              <div className="card-kraft rounded-2xl p-7 md:p-8">
                <span className="label-orange">La regla</span>
                <p className="font-display mt-4 text-[24px] leading-tight font-semibold tracking-tight md:text-[30px]">
                  Un proceso por sprint. El segundo reutiliza la infraestructura del primero.
                </p>
                <Link
                  to="/sistemas/operations-system"
                  className="btn-orange font-display mt-8 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[14px] font-semibold"
                >
                  Ver Operations System →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* El Sprint */}
        <section className="relative isolate overflow-hidden py-16 md:py-24" style={{ background: "var(--kraft)" }}>
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: "-120px",
              left: "-150px",
              width: "800px",
              height: "600px",
              zIndex: 0,
              pointerEvents: "none",
              background:
                "radial-gradient(ellipse 600px 450px at 0% 100%, rgba(232,103,46,0.28) 0%, rgba(244,161,95,0.14) 42%, rgba(232,103,46,0) 72%)",
            }}
          />
          <div className="relative z-10 mx-auto max-w-6xl px-6">
            <SectionLabel>El sprint</SectionLabel>
            <h2 className="font-display text-[28px] leading-tight font-semibold tracking-tight md:text-[40px]">
              Cómo funciona el Sprint.
            </h2>

            {/* Desktop: horizontal */}
            <div className="relative mt-14 hidden md:block">
              <div
                aria-hidden="true"
                className="absolute top-[5px] right-0 left-0 h-px"
                style={{ background: "rgba(232,103,46,0.35)" }}
              />
              <div className="grid grid-cols-4 gap-8">
                {SPRINT.map((s) => (
                  <div key={s.titulo} className="relative pr-4">
                    <span
                      className="absolute top-0 left-0 block h-[11px] w-[11px] rounded-full"
                      style={{ background: "var(--orange)" }}
                      aria-hidden="true"
                    />
                    <p className="label-orange mt-8">{s.rango}</p>
                    <h3 className="font-display mt-3 text-[18px] leading-snug font-semibold tracking-tight">
                      {s.titulo}
                    </h3>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground">{s.detalle}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Móvil: vertical */}
            <div className="relative mt-10 md:hidden">
              <div
                aria-hidden="true"
                className="absolute top-0 bottom-0 left-[5px] w-px"
                style={{ background: "rgba(232,103,46,0.35)" }}
              />
              <div className="flex flex-col gap-9">
                {SPRINT.map((s) => (
                  <div key={s.titulo} className="relative pl-8">
                    <span
                      className="absolute top-[6px] left-0 block h-[11px] w-[11px] rounded-full"
                      style={{ background: "var(--orange)" }}
                      aria-hidden="true"
                    />
                    <p className="label-orange">{s.rango}</p>
                    <h3 className="font-display mt-2 text-[18px] leading-snug font-semibold tracking-tight">
                      {s.titulo}
                    </h3>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground">{s.detalle}</p>
                  </div>
                ))}
              </div>
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
                Procesos sin volumen suficiente para medir · organizaciones sin un responsable que apruebe
                excepciones · equipos que no pueden documentar cómo trabajan hoy.
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
                  Solicitar diagnóstico de proceso →
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
