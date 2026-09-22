import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";

import SiteFooter from "@/components/rckt/SiteFooter";
import SiteNav from "@/components/rckt/SiteNav";
import SystemPageHero from "@/components/rckt/SystemPageHero";
import LeakFunnel from "@/components/rckt/LeakFunnel";
import heroPhotoAsset from "@/assets/rckt-hero-sunset.png.asset.json";

const heroPhoto = heroPhotoAsset.url;
const DIAGNOSTIC_HREF = "/sistemas/revenue-diagnostic";

const GLOW =
  "radial-gradient(ellipse 700px 500px at 100% 0%, rgba(232,103,46,0.35) 0%, rgba(244,161,95,0.18) 40%, rgba(232,103,46,0) 75%)";

export const Route = createFileRoute("/soluciones/captacion-y-cierre")({
  head: () => ({
    meta: [
      { title: "Captación y cierre — Pagas por leads y no sabes cuáles compran | RCKT.es" },
      {
        name: "description",
        content:
          "Campañas, WhatsApp y CRM bajo un solo responsable, con medición del clic al cierre para saber qué leads compran.",
      },
      { property: "og:title", content: "Captación y cierre — Saber qué leads compran" },
      {
        property: "og:description",
        content: "Dónde se pierde el dinero entre la inversión y la venta, y cómo se cierra cada fuga.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CaptacionYCierrePage,
});

const SENALES = [
  "Formularios sin respuesta pasadas las 48 horas",
  "Comerciales atendiendo WhatsApp fuera del CRM",
  "Tu agencia optimiza por coste por lead, no por venta",
  "Citas agendadas que nunca se presentan",
  "Nadie sabe qué campaña trajo al cliente real",
];

const INCLUYE = [
  "Demand (tier según inversión en medios)",
  "Sales Flow",
  "Landing de conversión",
  "CRM & RevOps",
  "Medición completa",
  "Responsable de cuenta",
  "Revisión mensual con decisores",
  "Ciclo de optimización de 90 días",
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="inline-block h-4 w-[2px] bg-orange" />
      <span className="label-orange">{children}</span>
    </div>
  );
}

function CaptacionYCierrePage() {
  return (
    <div className="bg-background text-foreground antialiased">
      <SiteNav />
      <main>
        <SystemPageHero
          label="Captación y cierre"
          descriptor="Meta y Google dicen una cosa; tu cuenta bancaria, otra."
          title={
            <>
              Pagas por leads y no sabes <em className="font-serif-accent">cuáles compran.</em>
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

        {/* Dónde se pierde */}
        <section className="relative isolate overflow-hidden py-16 md:py-24" style={{ background: "var(--kraft-2)" }}>
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
                "radial-gradient(ellipse 620px 460px at 0% 100%, rgba(232,103,46,0.22) 0%, rgba(244,161,95,0.11) 42%, rgba(232,103,46,0) 72%)",
            }}
          />
          <div className="relative z-10 mx-auto max-w-6xl px-6">
            <SectionLabel>El embudo</SectionLabel>
            <h2 className="font-display text-[28px] leading-tight font-semibold tracking-tight md:text-[40px]">
              Dónde se pierde el dinero.
            </h2>
            <LeakFunnel
              stages={["Inversión", "Lead", "Contacto", "Calificación", "Cita", "Propuesta", "Venta"]}
              leaks={[
                { afterStage: 1, label: "Respuesta tarde" },
                { afterStage: 2, label: "WhatsApp fuera del CRM" },
                { afterStage: 4, label: "No-show" },
                { afterStage: 7, label: "Sin saber qué campaña la trajo" },
              ]}
            />
          </div>
        </section>

        {/* Lo que hacemos */}
        <section className="relative py-16 md:py-24" style={{ background: "var(--kraft)" }}>
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid items-start gap-10 md:grid-cols-2 md:gap-14">
              <div>
                <SectionLabel>Lo que hacemos</SectionLabel>
                <h2 className="font-display text-[28px] leading-tight font-semibold tracking-tight md:text-[40px]">
                  Lo que hacemos: <em className="font-serif-accent">Revenue Engine.</em>
                </h2>
                <p className="mt-6 max-w-lg text-[16px] leading-relaxed text-muted-foreground">
                  Demand System + Sales Flow bajo un solo responsable, con una fuente de verdad y medición del clic
                  al cierre.
                </p>
              </div>

              <div className="card-kraft rounded-2xl p-7 md:p-8">
                <ul className="flex flex-col gap-3.5">
                  {INCLUYE.map((i) => (
                    <li key={i} className="flex items-start gap-3 text-[15px] leading-relaxed">
                      <span
                        className="mt-[9px] block h-[7px] w-[7px] shrink-0 rounded-full"
                        style={{ background: "var(--orange)" }}
                        aria-hidden="true"
                      />
                      {i}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-[13px] text-muted-foreground">Compromiso mínimo: 6 meses.</p>
                <Link
                  to="/sistemas/revenue-engine"
                  className="btn-orange font-display mt-7 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[14px] font-semibold"
                >
                  Ver Revenue Engine →
                </Link>
              </div>
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
