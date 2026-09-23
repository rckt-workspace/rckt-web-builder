import { createFileRoute } from "@tanstack/react-router";
import { Calendar, CalendarCheck, Check, Database, Monitor, MessagesSquare, Target, Users, Workflow } from "lucide-react";

import SiteNav from "@/components/rckt/SiteNav";
import SiteFooter from "@/components/rckt/SiteFooter";
import SystemPageHero from "@/components/rckt/SystemPageHero";
import heroPhotoAsset from "@/assets/rckt-hero-sunset.png.asset.json";

const heroPhoto = heroPhotoAsset.url;
const DIAGNOSTIC_HREF = "/sistemas/revenue-diagnostic";

const GLOW =
  "radial-gradient(ellipse 700px 500px at 100% 0%, rgba(232,103,46,0.35) 0%, rgba(244,161,95,0.18) 40%, rgba(232,103,46,0) 75%)";

export const Route = createFileRoute("/sistemas/sales-flow")({
  head: () => ({
    meta: [
      { title: "Sales Flow — De lead a venta sin fugas | RCKT.es" },
      {
        name: "description",
        content:
          "Conectamos campañas, WhatsApp y CRM para que cada lead tenga respuesta, seguimiento y dueño, y para que sepas cuáles compran.",
      },
      { property: "og:title", content: "Sales Flow — De lead a venta sin fugas" },
      {
        property: "og:description",
        content: "Integración Ads ↔ WhatsApp ↔ CRM, SLAs de respuesta y atribución offline.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SalesFlowPage,
});

const STATS = [
  {
    label: "Para quién",
    valor: null as string | null,
    Icono: Users,
    detalle:
      "Negocios donde la venta pasa por conversación humana: WhatsApp, llamada, asesor, cita. También clientes con media propia o con otra agencia que solo necesitan cerrar mejor",
  },
  {
    label: "Cadencia",
    valor: null as string | null,
    Icono: Calendar,
    detalle: "Semanal (SLAs y fugas) · mensual con decisores",
  },
  {
    label: "Compromiso mínimo",
    valor: null as string | null,
    Icono: CalendarCheck,
    detalle: "Setup por alcance + 3 meses de operación",
  },
  {
    label: "Qué mide el éxito",
    valor: null as string | null,
    Icono: Target,
    detalle: "% de leads con seguimiento dentro del SLA · lead → reunión · coste por cliente adquirido",
  },
];

const COMPONENTES = [
  {
    Icono: Workflow,
    titulo: "Sales Flow núcleo",
    detalle:
      "Integración Ads ↔ WhatsApp Business API ↔ CRM; routing y asignación a asesores; calificación automática con agente supervisado y paso a humano; lead scoring; SLAs de respuesta; secuencias de seguimiento y recuperación; recordatorios de cita y gestión de no-show; atribución offline de vuelta a Meta y Google",
  },
  {
    Icono: MessagesSquare,
    titulo: "Conversational Revenue",
    detalle:
      "Agentes de WhatsApp y voz para primera respuesta, calificación, agenda y FAQ, siempre con aprobación humana en decisiones de venta",
  },
  {
    Icono: Database,
    titulo: "CRM & RevOps",
    detalle:
      "Configuración o limpieza del pipeline, etapas, campos, automatizaciones, dashboards, gobierno de datos",
  },
  {
    Icono: Monitor,
    titulo: "Conversion Platforms",
    detalle: "Landing de conversión, web corporativa, ecommerce, siempre con tracking y CRM conectados",
  },
];

const REGLAS = [
  "La web nunca se vende sola: sin tracking y CRM conectados no hay web de RCKT.es",
  "Un agente nunca cierra una venta ni promete condiciones sin aprobación humana",
  "El CRM del cliente es la fuente de verdad: lo configuramos y conectamos, no lo sustituimos",
];

const ACEPTACION = [
  "Flujo probado de extremo a extremo con leads reales",
  "100% de los leads entrando al CRM con su origen",
  "SLA visible en dashboard",
  "Atribución offline enviando eventos a las plataformas",
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="inline-block h-4 w-[2px] bg-orange" />
      <span className="label-orange">{children}</span>
    </div>
  );
}

function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="mt-10 grid gap-5 md:grid-cols-2">
      {items.map((t) => (
        <li key={t} className="flex items-start gap-4">
          <span
            className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
            style={{ background: "var(--orange-bg)" }}
          >
            <Check className="h-4 w-4 text-orange" strokeWidth={2.2} aria-hidden="true" />
          </span>
          <span className="text-[15.5px] leading-relaxed">{t}</span>
        </li>
      ))}
    </ul>
  );
}

function SalesFlowPage() {
  return (
    <div className="bg-background text-foreground antialiased">
      <SiteNav />
      <main className="sys-page">
        <SystemPageHero
          label="Sales Flow"
          title={
            <>
              De lead a venta <em className="font-serif-accent">sin fugas.</em>
            </>
          }
          descriptor="Núcleo de Conversion System"
          quoteLabel="En 30 segundos"
          quote="Hoy pagas por un lead, te escribe por WhatsApp, y ahí empieza a perderse: respuesta tarde, sin seguimiento, fuera del CRM, sin saber de qué campaña vino. Sales Flow conecta tus campañas, WhatsApp y CRM para que cada lead tenga respuesta, seguimiento y dueño, y para que sepas cuáles compran."
          ctaLabel="Solicitar Revenue Diagnostic →"
          ctaHref={DIAGNOSTIC_HREF}
        />

        {/* Stats */}
        <section className="relative py-16 md:py-20 sys-sec section--ruled">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {STATS.map((s) => {
                const valor = (s as { valor?: string | null }).valor ?? null;
                return (
                  <div key={s.label} className="stat-card">
                    <span className="stat-card__icon">
                      <s.Icono className="h-5 w-5 text-orange" strokeWidth={1.6} aria-hidden="true" />
                    </span>
                    <p className="font-mono mt-4 text-[11px] tracking-[0.16em] text-orange uppercase">{s.label}</p>
                    {valor ? (
                      <p className="font-display mt-2 text-[28px] leading-tight font-semibold tracking-tight">
                        {valor}
                      </p>
                    ) : null}
                    {s.detalle ? (
                      <p
                        className="mt-2 text-[16px] leading-[1.55]"
                        data-align="left"
                        style={{ textAlign: "left", color: "var(--ink)" }}
                      >
                        {s.detalle}
                      </p>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Componentes */}
        <section className="relative isolate overflow-hidden py-16 md:py-24 sys-sec sys-sec--warm section--glow" data-corner="tr">
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
            <SectionLabel>Componentes</SectionLabel>
            <h2 className="font-display text-[28px] leading-tight font-semibold tracking-tight md:text-[40px]">
              Qué hacemos
            </h2>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {COMPONENTES.map((c) => (
                <article
                  key={c.titulo}
                  className="rounded-2xl p-6"
                  style={{
                    background: "var(--card-surface)",
                    border: "1px solid rgba(232,103,46,0.18)",
                  }}
                >
                  <span
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full"
                    style={{ background: "var(--orange-bg)" }}
                  >
                    <c.Icono className="h-5 w-5 text-orange" strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <h3 className="font-display mt-5 text-[18px] leading-snug font-semibold tracking-tight">
                    {c.titulo}
                  </h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground">{c.detalle}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Qué no incluye */}
        <section className="relative py-10 md:py-14" style={{ background: "var(--kraft)" }}>
          <div className="mx-auto max-w-6xl px-6">
            <div
              className="band--orange rounded-[28px] px-8 py-10 md:px-12 md:py-12"
            >
              <p className="label-on-orange">Qué no incluye</p>
              <p
                className="font-display mt-5 max-w-3xl text-[22px] leading-[1.3] font-semibold tracking-tight md:text-[30px]"
                style={{ color: "#FFFFFF" }}
              >
                Media spend ni gestión de campañas (eso es Demand) · licencias de CRM y WhatsApp API (las paga
                el cliente) · redacción de contenidos editoriales · procesos internos no comerciales (eso es
                Operations).
              </p>
            </div>
          </div>
        </section>

        {/* Reglas */}
        <section className="relative py-16 md:py-24 sys-sec section--ruled">
          <div className="mx-auto max-w-6xl px-6">
            <SectionLabel>Reglas</SectionLabel>
            <h2 className="font-display text-[28px] leading-tight font-semibold tracking-tight md:text-[40px]">
              Cómo trabajamos aquí
            </h2>
            <Checklist items={REGLAS} />
          </div>
        </section>

        {/* Aceptación */}
        <section className="relative isolate overflow-hidden py-16 md:py-24 sys-sec sys-sec--warm section--glow" data-corner="bl">
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "-50px",
              right: "-100px",
              width: "900px",
              height: "650px",
              zIndex: 0,
              pointerEvents: "none",
              background: GLOW,
            }}
          />
          <div className="relative z-10 mx-auto max-w-6xl px-6">
            <SectionLabel>Aceptación · máx. 30 días desde el inicio del setup</SectionLabel>
            <h2 className="font-display text-[28px] leading-tight font-semibold tracking-tight md:text-[40px]">
              Cuándo damos el sistema por aceptado
            </h2>
            <Checklist items={ACEPTACION} />
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
            style={{
              position: "absolute",
              top: "-80px",
              right: "-120px",
              width: "900px",
              height: "650px",
              zIndex: 1,
              pointerEvents: "none",
              background: GLOW,
            }}
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
                  Solicitar Revenue Diagnostic →
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
