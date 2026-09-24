import { createFileRoute } from "@tanstack/react-router";
import { Calendar, CalendarCheck, Database, Monitor, MessagesSquare, Target, Users, Workflow } from "lucide-react";

import SiteNav from "@/components/rckt/SiteNav";
import SiteFooter from "@/components/rckt/SiteFooter";
import { AcceptanceSteps, CapabilityCards, RuleList } from "@/components/rckt/SystemBlocks";
import SystemPageHero from "@/components/rckt/SystemPageHero";
import FaqSection, { faqJsonLd } from "@/components/rckt/FaqSection";
import { SALES_FLOW_FAQS } from "@/content/faqs";
import heroPhotoImg from "@/assets/rckt-cta-final.jpg";

const heroPhoto = heroPhotoImg;
const DIAGNOSTIC_HREF = "/sistemas/revenue-diagnostic";

const GLOW =
  "radial-gradient(ellipse 700px 500px at 100% 0%, rgba(252, 92, 31,0.35) 0%, rgba(252, 92, 31,0.18) 40%, rgba(252, 92, 31,0) 75%)";

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
    links: [{ rel: "canonical", href: "https://www.rckt.es/sistemas/sales-flow" }],
    scripts: [faqJsonLd(SALES_FLOW_FAQS)],
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

function SalesFlowPage() {
  return (
    <div className="bg-background text-foreground antialiased">
      <SiteNav />
      <main className="sys-page">
        <SystemPageHero
          label="Sales Flow"
          title={
            <>
              De lead a venta <span style={{ color: "#fc5c1f" }}>sin fugas</span>.
            </>
          }
          descriptor="Núcleo de Conversion System"
          quote="Hoy pagas por un lead, te escribe por WhatsApp, y ahí empieza a perderse: respuesta tarde, sin seguimiento, fuera del CRM, sin saber de qué campaña vino. Sales Flow conecta tus campañas, WhatsApp y CRM para que cada lead tenga respuesta, seguimiento y dueño, y para que sepas cuáles compran."
          ctaLabel="Solicitar diagnóstico de captación →"
          ctaHref={DIAGNOSTIC_HREF}
        />

        {/* Stats */}
        <section className="relative py-16 md:py-20 sys-sec">
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
                      <p className="mt-2 text-[16px] leading-[1.55]" style={{ color: "var(--ink)" }}>
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
                "radial-gradient(ellipse 600px 450px at 0% 100%, rgba(252, 92, 31,0.28) 0%, rgba(252, 92, 31,0.14) 42%, rgba(252, 92, 31,0) 72%)",
            }}
          />
          <div className="relative z-10 mx-auto max-w-6xl px-6">
            <SectionLabel>Componentes</SectionLabel>
            <div className="md:flex md:items-end md:justify-between md:gap-10">
              <h2 className="font-display text-[28px] leading-tight font-semibold tracking-tight md:text-[40px]">
                Qué hacemos
              </h2>
              <span className="text-sm font-semibold text-orange">cada lead con dueño</span>
            </div>
            <CapabilityCards items={COMPONENTES} />
            {/* Qué no incluye — integrada en la sección anterior */}
            <div
              className="band--orange mt-10 md:mt-14 rounded-[28px] px-8 py-10 md:px-12 md:py-12"
            >
              <p className="label-on-orange">Qué no incluye</p>
              <p
                className="font-display mt-5 max-w-3xl text-[22px] leading-[1.3] font-semibold tracking-tight md:text-[30px]"
                style={{ color: "#f5f2ed" }}
              >
                Media spend ni gestión de campañas (eso es Demand) · licencias de CRM y WhatsApp API (las paga
                el cliente) · redacción de contenidos editoriales · procesos internos no comerciales (eso es
                Operations).
              </p>
            </div>
          </div>
        </section>

        {/* Reglas */}
        <section className="relative py-16 md:py-24 sys-sec">
          <div className="mx-auto max-w-6xl px-6">
            <SectionLabel>Reglas</SectionLabel>
            <div className="md:flex md:items-end md:justify-between md:gap-10">
              <h2 className="font-display text-[28px] leading-tight font-semibold tracking-tight md:text-[40px]">
                Cómo trabajamos aquí
              </h2>
              <span className="text-sm font-semibold text-orange">tu CRM es la fuente de verdad</span>
            </div>
            <RuleList items={REGLAS} />
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
            <SectionLabel>Aceptación</SectionLabel>
            <h2 className="font-display text-[28px] leading-tight font-semibold tracking-tight md:text-[40px]">
              Cuándo damos el sistema por aceptado
            </h2>
            <AcceptanceSteps plazo="Sistema aceptado en máximo 30 días desde el inicio del setup" items={ACEPTACION.map((texto) => ({ texto }))} />
          </div>
        </section>

        <FaqSection items={SALES_FLOW_FAQS} />

        {/* CTA final */}
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
            <img src={heroPhoto} alt="" className="hero-photo-img cta-photo-img" />
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
            <div className="mx-auto max-w-[720px] text-center">
              <div className="mb-4"><span className="label-orange">¿Empezamos?</span></div>
              <h2
                className="font-display text-[34px] leading-[1.08] font-semibold tracking-tight md:text-[56px]"
                style={{ color: "#f5f2ed" }}
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
              style={{ borderColor: "rgba(245,242,237,0.22)", color: "rgba(245,242,237,0.7)" }}
            >
              <span className="ml-auto">IA supervisada y documentada</span>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
