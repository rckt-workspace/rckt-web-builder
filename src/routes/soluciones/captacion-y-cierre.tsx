import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BarChart3,
  CalendarX,
  Clock,
  Gauge,
  Layout,
  LineChart,
  MessageCircle,
  Megaphone,
  RefreshCw,
  Search,
  Users,
  Workflow,
} from "lucide-react";

import SiteFooter from "@/components/rckt/SiteFooter";
import SiteNav from "@/components/rckt/SiteNav";
import SystemPageHero from "@/components/rckt/SystemPageHero";
import FunnelBars from "@/components/rckt/FunnelBars";
import MilestoneCards from "@/components/rckt/MilestoneCards";
import SignalCards from "@/components/rckt/SignalCards";
import { Blob, DotGrid } from "@/components/rckt/SectionDecor";
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
  { titulo: "Respuesta tarde", frase: "Formularios sin respuesta pasadas las 48 horas", Icono: Clock },
  { titulo: "Fuera del CRM", frase: "Comerciales atendiendo WhatsApp fuera del CRM", Icono: MessageCircle },
  {
    titulo: "Métrica equivocada",
    frase: "Tu agencia optimiza por coste por lead, no por venta",
    Icono: BarChart3,
  },
  { titulo: "Citas perdidas", frase: "Citas agendadas que nunca se presentan", Icono: CalendarX },
  { titulo: "Sin atribución", frase: "Nadie sabe qué campaña trajo al cliente real", Icono: Search },
];

const INCLUYE = [
  { nombre: "Demand", detalle: "Tier según inversión en medios", Icono: Megaphone },
  { nombre: "Sales Flow", detalle: "Campañas, WhatsApp y CRM conectados", Icono: Workflow },
  { nombre: "Landing de conversión", detalle: "Con tracking y CRM conectados", Icono: Layout },
  { nombre: "CRM & RevOps", detalle: "Pipeline, etapas, automatizaciones y dashboards", Icono: Gauge },
  { nombre: "Medición completa", detalle: "Del clic al cierre, con una sola fuente de verdad", Icono: LineChart },
  { nombre: "Responsable de cuenta", detalle: "Un solo responsable para todo el sistema", Icono: Users },
  { nombre: "Revisión mensual con decisores", detalle: "Fugas y prioridades", Icono: BarChart3 },
  { nombre: "Ciclo de optimización de 90 días", detalle: "Línea base frente a resultado", Icono: RefreshCw },
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

        {/* Qué cambia en 90 días */}
        <section className="relative py-16 md:py-24" style={{ background: "var(--kraft-2)" }}>
          <div className="mx-auto max-w-6xl px-6">
            <SectionLabel>Los primeros 90 días</SectionLabel>
            <h2 className="font-display text-[28px] leading-tight font-semibold tracking-tight md:text-[40px]">
              Qué cambia en 90 días.
            </h2>
            <div className="mt-14 flex flex-col gap-10 md:flex-row md:gap-0">
              {[
                { dia: "Día 30", texto: "Sistema operativo con fuente de verdad" },
                { dia: "Día 60", texto: "Oportunidades entrando al CRM con seguimiento dentro del SLA" },
                { dia: "Día 90", texto: "Revisión de línea base frente a resultado" },
              ].map((hito, i) => (
                <div key={hito.dia} className="relative flex-1 md:px-6 md:first:pl-0 md:last:pr-0">
                  {/* línea */}
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
                  {/* punto */}
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
                  <div className="pl-8 md:pl-0 md:pt-8">
                    <span className="label-orange">{hito.dia}</span>
                    <p className="mt-3 max-w-xs text-[15.5px] leading-relaxed">{hito.texto}</p>
                  </div>
                  {i === 0 && <span className="sr-only">primer hito</span>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Un caso */}
        <section className="relative py-16 md:py-24" style={{ background: "var(--kraft)" }}>
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
                Negocios que aún no venden · sin presupuesto de marketing · que solo quieren optimizar por coste por
                lead · que buscan pagar solo por resultados.
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
