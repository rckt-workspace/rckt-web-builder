import { createFileRoute } from "@tanstack/react-router";
import {
  Calculator,
  Check,
  Clock,
  FileSignature,
  FileText,
  Map,
  MessagesSquare,
  Route as RouteIcon,
  Search,
  Target,
  Users,
} from "lucide-react";

import SiteNav from "@/components/rckt/SiteNav";
import SiteFooter from "@/components/rckt/SiteFooter";
import SystemPageHero from "@/components/rckt/SystemPageHero";
import QualificationForm, { type QualificationValues } from "@/components/rckt/QualificationForm";
import FaqSection, { faqJsonLd } from "@/components/rckt/FaqSection";
import { REVENUE_DIAGNOSTIC_FAQS } from "@/content/faqs";
import heroPhotoImg from "@/assets/rckt-cta-final.jpg";

const heroPhoto = heroPhotoImg;

export const Route = createFileRoute("/sistemas/revenue-diagnostic")({
  head: () => ({
    meta: [
      { title: "Revenue Diagnostic — Tres semanas para saber dónde se pierde tu dinero | RCKT.es" },
      {
        name: "description",
        content:
          "Diagnóstico de ingresos de 2–3 semanas: mapa de fugas del embudo con tus números reales, línea base firmada y roadmap de 90 días.",
      },
      { property: "og:title", content: "Revenue Diagnostic — Tres semanas para saber dónde se pierde tu dinero" },
      {
        property: "og:description",
        content:
          "Te decimos cuánto pierdes entre la campaña y el cierre, en qué punto exacto, y qué haríamos en 90 días.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://www.rckt.es/sistemas/revenue-diagnostic" }],
    scripts: [faqJsonLd(REVENUE_DIAGNOSTIC_FAQS)],
  }),
  component: RevenueDiagnostic,
});

const GLOW =
  "radial-gradient(ellipse 700px 500px at 100% 0%, rgba(252, 92, 31,0.35) 0%, rgba(252, 92, 31,0.18) 40%, rgba(252, 92, 31,0) 75%)";

const STATS = [
  {
    label: "Duración",
    valor: "2–3 semanas",
    Icono: Clock,
    detalle: "de diagnóstico",
  },
  {
    label: "Entregable",
    valor: null,
    Icono: FileText,
    detalle: "Documento + línea base firmada + roadmap 90 días",
  },
  {
    label: "Para quién",
    valor: null,
    Icono: Users,
    detalle: "Toda cuenta nueva, sin excepción",
  },
  {
    label: "Qué mide el éxito",
    valor: null,
    Icono: Target,
    detalle: "Que decidas con datos",
  },
];

const INCLUYE = [
  {
    Icono: Map,
    titulo: "Mapa de fugas",
    detalle:
      "Embudo completo con tus números reales: inversión → lead → contacto → calificación → cita → propuesta → venta → margen",
  },
  {
    Icono: Search,
    titulo: "Auditoría completa",
    detalle: "Oferta, campañas activas, landing, web y tracking (GTM, GA4, píxel, CAPI)",
  },
  {
    Icono: MessagesSquare,
    titulo: "CRM y proceso comercial",
    detalle: "Uso de WhatsApp, automatizaciones existentes",
  },
  {
    Icono: Calculator,
    titulo: "Unit economics",
    detalle: "CAC, tasa MQL/SQL, show rate, close rate, payback",
  },
  {
    Icono: FileSignature,
    titulo: "Línea base firmada",
    detalle: "Documentada y acordada contigo",
  },
  {
    Icono: RouteIcon,
    titulo: "Roadmap de 90 días",
    detalle: "Priorizado por impacto económico",
  },
];

const NECESITAMOS = [
  "Acceso de lectura a Meta, Google, GA4 y GTM",
  "CRM o exportación",
  "Datos de venta del último trimestre",
  "2–3 entrevistas (comercial, marketing, operaciones)",
  "Acceso a WhatsApp Business o muestra de conversaciones",
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="inline-block h-4 w-[2px] bg-orange" />
      <span className="label-orange">{children}</span>
    </div>
  );
}

async function submitDiagnostic(v: QualificationValues) {
  const res = await fetch("/api/leads", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      name: v.nombre.trim(),
      email: v.email.trim(),
      company: v.empresa.trim(),
      website: v.web.trim(),
      concern: v.problema,
      source: "revenue-diagnostic",
      details: {
        telefono: v.telefono.trim(),
        cargo: v.cargo,
        pais: v.pais,
        ciudad: v.ciudad.trim(),
        empleados: v.empleados,
        sector: v.sector,
        inversion_marketing: v.inversion,
        leads_mes: v.leads,
        crm: v.crm,
        whatsapp: v.whatsapp,
        inicio: v.inicio,
      },
    }),
  });
  if (!res.ok) throw new Error("fail");
}

function RevenueDiagnostic() {
  return (
    <div className="bg-background text-foreground antialiased">
      <SiteNav />
      <main className="sys-page">
        <SystemPageHero
          label="Revenue Diagnostic"
          title={<>Tres semanas para saber dónde se pierde tu <span style={{ color: "#fc5c1f" }}>dinero</span>.</>}
          descriptor="Diagnóstico de ingresos"
          quote="En tres semanas te decimos cuánto pierdes entre la campaña y el cierre, en qué punto exacto, y qué haríamos en 90 días. Si sigues con nosotros, lo que pagas por el diagnóstico se descuenta del sistema."
          ctaLabel="Solicitar diagnóstico de captación →"
          ctaHref="#formulario"
        />

        {/* Datos clave — fila de stats */}
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

        {/* Qué incluye — grid de cards */}
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
            <div className="md:flex md:items-end md:justify-between md:gap-10">
              <h2 className="font-display text-[28px] leading-tight font-semibold tracking-tight md:text-[40px]">
                Qué incluye
              </h2>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {INCLUYE.map((c) => (
                <article
                  key={c.titulo}
                  className="rounded-2xl p-6"
                  style={{
                    background: "var(--card-surface)",
                    border: "1px solid rgba(252, 92, 31,0.18)",
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
            {/* Qué no incluye — integrada en la sección anterior */}
            <div
              className="band--orange mt-10 md:mt-14 rounded-[28px] px-8 py-10 md:px-12 md:py-12"
            >
              <p className="label-on-orange">Qué no incluye</p>
              <p
                className="font-display mt-5 max-w-3xl text-[22px] leading-[1.3] font-semibold tracking-tight md:text-[30px]"
                style={{ color: "#FFFFFF" }}
              >
                Implementación, cambios en campañas, desarrollo, configuración de CRM, creatividades.
              </p>
            </div>
          </div>
        </section>

        {/* Qué necesitamos de ti — checklist */}
        <section className="relative py-16 md:py-24 sys-sec">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="font-display text-[28px] leading-tight font-semibold tracking-tight md:text-[40px]">
              Qué necesitamos de ti
            </h2>
            <ul className="mt-10 grid gap-5 md:grid-cols-2">
              {NECESITAMOS.map((t) => (
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
          </div>
        </section>

        {/* Regla */}
        <section className="relative isolate overflow-hidden" >
          <div
            className="relative"
            style={{ background: "linear-gradient(110deg, #fc5c1f 0%, #e04d14 100%)" }}
          >
            <div className="relative z-10 mx-auto max-w-6xl px-6 py-16 md:py-20">
              <p className="label-orange !text-white/80">Regla</p>
              <p
                className="mt-5 max-w-4xl text-[24px] leading-[1.25] md:text-[38px]"
                style={{ fontFamily: '"Newsreader", Georgia, serif', fontStyle: "italic", color: "#FFFFFF" }}
              >
                Sin línea base no arrancamos ningún sistema: primero medimos, después decidimos contigo.
              </p>
            </div>
          </div>
        </section>

        {/* Formulario */}
        <section
          id="formulario"
          className="relative isolate overflow-hidden scroll-mt-28 py-20 md:py-28 sys-sec sys-sec--warm section--glow" data-corner="bl">
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
          <div className="relative z-10 mx-auto max-w-4xl px-6">
            <SectionLabel>Formulario</SectionLabel>
            <div className="md:flex md:items-end md:justify-between md:gap-10">
              <h2 className="font-display text-[30px] leading-tight font-semibold tracking-tight md:text-[46px]">
                Solicitar diagnóstico de captación
              </h2>
            </div>
            <div className="mt-10">
              <QualificationForm onSubmit={submitDiagnostic} />
            </div>
          </div>
        </section>

        <FaqSection items={REVENUE_DIAGNOSTIC_FAQS} />

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
                style={{ color: "#FFFFFF" }}
              >
                Solicitar <em className="font-serif-accent">Revenue Diagnostic</em>
              </h2>
              <div className="mt-10 flex justify-center">
                <a
                  href="#formulario"
                  className="btn-orange font-display inline-flex items-center gap-2 rounded-full px-8 py-4 text-[15px] font-semibold"
                >
                  Ir al formulario →
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
      </main>
      <SiteFooter />
    </div>
  );
}
