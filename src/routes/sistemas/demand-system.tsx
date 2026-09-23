import { createFileRoute } from "@tanstack/react-router";
import {
  CalendarCheck,
  BarChart3,
  Calendar,
  Check,
  Layout,
  Megaphone,
  Search,
  Target,
  Users,
  Wand2,
} from "lucide-react";

import SiteNav from "@/components/rckt/SiteNav";
import SiteFooter from "@/components/rckt/SiteFooter";
import SystemPageHero from "@/components/rckt/SystemPageHero";
import heroPhotoAsset from "@/assets/rckt-hero-sunset.png.asset.json";

const heroPhoto = heroPhotoAsset.url;
const DIAGNOSTIC_FORM = "/sistemas/revenue-diagnostic#formulario";

const GLOW =
  "radial-gradient(ellipse 700px 500px at 100% 0%, rgba(232,103,46,0.35) 0%, rgba(244,161,95,0.18) 40%, rgba(232,103,46,0) 75%)";

export const Route = createFileRoute("/sistemas/demand-system")({
  head: () => ({
    meta: [
      { title: "Demand System — Generación de demanda medida hasta la venta | RCKT.es" },
      {
        name: "description",
        content:
          "Campañas optimizadas por oportunidades aceptadas por ventas y por ventas cerradas, no por leads baratos. Embudo completo cada semana.",
      },
      { property: "og:title", content: "Demand System — Generación de demanda medida hasta la venta" },
      {
        property: "og:description",
        content: "Optimizamos por SQL y venta, no por coste por lead. Reporte semanal por etapa del embudo.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DemandSystemPage,
});

const STATS = [
  {
    label: "Para quién",
    valor: null as string | null,
    Icono: Users,
    detalle:
      "Cuentas con oferta probada que necesitan volumen o calidad de oportunidades y ya tienen proceso comercial y CRM funcionando",
  },
  {
    label: "Cadencia",
    valor: null as string | null,
    Icono: Calendar,
    detalle: "Semanal de rendimiento · mensual con decisores · trimestral de estrategia",
  },
  {
    label: "Compromiso mínimo",
    valor: "3 meses",
    Icono: CalendarCheck,
    detalle: "",
  },
  {
    label: "Qué mide el éxito",
    valor: null as string | null,
    Icono: Target,
    detalle:
      "Coste por oportunidad aceptada por ventas (SQL) y por venta — mínimo 45% de leads califican como MQL",
  },
];

const CAPACIDADES = [
  {
    Icono: Megaphone,
    titulo: "Performance Media",
    detalle: "Meta, Google Search, PMax, LinkedIn selectivo B2B, YouTube y Display en retargeting",
  },
  {
    Icono: Wand2,
    titulo: "Creative Performance",
    detalle: "Producción y testing con IA: hooks, ángulos, formatos, iteración semanal",
  },
  {
    Icono: Search,
    titulo: "Search & AI Visibility",
    detalle: "SEO técnico y de contenido, presencia en respuestas de IA con snapshot trimestral",
  },
  {
    Icono: BarChart3,
    titulo: "Medición",
    detalle: "Tracking completo, valores por etapa, reporte semanal por etapa del embudo",
  },
  {
    Icono: Layout,
    titulo: "Landing de campaña",
    detalle: "Recomendaciones y ajustes menores (una landing nueva es de Sales Flow)",
  },
];

const TIERS = [
  {
    nombre: "Core",
    alcance: "1–2 canales, inversión baja-media",
    detalle: "Media + medición + 4 creativos/mes + reporte semanal",
    destacado: false,
  },
  {
    nombre: "Growth",
    alcance: "2–3 canales, inversión media-alta",
    detalle: "Core + creative testing continuo + AI Visibility + revisión mensual de calidad de pipeline",
    destacado: true,
  },
  {
    nombre: "Scale",
    alcance: "Multicanal o multipaís, inversión alta",
    detalle: "Growth + squad dedicado + experimentación estructurada + creative studio",
    destacado: false,
  },
];

const CONDICIONES = [
  "Solo se vende suelto si el cliente tiene proceso comercial y CRM operativos — si no los tiene, lo que necesita es Revenue Engine",
  "Tiene un precio piso que no se negocia",
  "Nunca optimizamos por coste por lead — la unidad es SQL o venta",
];

const ACEPTACION = [
  "Tracking validado de extremo a extremo",
  "Estructura de campañas activa",
  "Primer reporte por etapa entregado",
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

function DemandSystemPage() {
  return (
    <div className="bg-background text-foreground antialiased">
      <SiteNav />
      <main>
        <SystemPageHero
          label="Demand System"
          title={
            <>
              Generación de demanda medida hasta la <em className="font-serif-accent">venta.</em>
            </>
          }
          quoteLabel="En 30 segundos"
          quote="Manejamos tus campañas, pero no las optimizamos por leads baratos: las optimizamos por las oportunidades que tu equipo comercial acepta y por las que terminan en venta. Cada semana ves el embudo completo, no solo los clics."
          ctaLabel="Solicitar Revenue Diagnostic →"
          ctaHref={DIAGNOSTIC_FORM}
        />

        {/* Stats */}
        <section className="relative py-16 md:py-20" style={{ background: "var(--kraft)" }}>
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

        {/* Capacidades */}
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
            <SectionLabel>Capacidades</SectionLabel>
            <h2 className="font-display text-[28px] leading-tight font-semibold tracking-tight md:text-[40px]">
              Qué hacemos
            </h2>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {CAPACIDADES.map((c) => (
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

        {/* Tiers */}
        <section className="relative py-16 md:py-24" style={{ background: "var(--kraft)" }}>
          <div className="mx-auto max-w-6xl px-6">
            <SectionLabel>Niveles</SectionLabel>
            <h2 className="font-display text-[28px] leading-tight font-semibold tracking-tight md:text-[40px]">
              Tres niveles
            </h2>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {TIERS.map((t) => (
                <article
                  key={t.nombre}
                  className="relative flex flex-col rounded-2xl p-7"
                  style={{
                    background: t.destacado ? "var(--orange-bg)" : "rgba(255,255,255,0.6)",
                    border: t.destacado
                      ? "1.5px solid var(--orange)"
                      : "1px solid rgba(232,103,46,0.18)",
                  }}
                >
                  {t.destacado ? (
                    <span
                      className="absolute -top-3 left-7 rounded-full px-3 py-1 font-mono text-[10px] tracking-[0.16em] uppercase"
                      style={{ background: "var(--orange)", color: "#FFFFFF" }}
                    >
                      Más elegido
                    </span>
                  ) : null}
                  <h3 className="font-display text-[22px] leading-none font-semibold tracking-tight md:text-[26px]">
                    {t.nombre}
                  </h3>
                  <p className="mt-3 font-mono text-[11px] tracking-[0.14em] uppercase text-muted-foreground">
                    {t.alcance}
                  </p>
                  <p className="mt-5 text-[15px] leading-relaxed">{t.detalle}</p>
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
                El gasto en medios, desarrollo web, CRM y RevOps, agentes conversacionales, community
                management, branding.
              </p>
            </div>
          </div>
        </section>

        {/* Condiciones de venta */}
        <section className="relative py-16 md:py-24" style={{ background: "var(--kraft)" }}>
          <div className="mx-auto max-w-6xl px-6">
            <SectionLabel>Condiciones</SectionLabel>
            <h2 className="font-display text-[28px] leading-tight font-semibold tracking-tight md:text-[40px]">
              Condiciones de venta
            </h2>
            <Checklist items={CONDICIONES} />
          </div>
        </section>

        {/* Aceptación */}
        <section className="relative isolate overflow-hidden py-16 md:py-24" style={{ background: "var(--kraft)" }}>
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
            <SectionLabel>Aceptación · máx. 21 días</SectionLabel>
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
                  href={DIAGNOSTIC_FORM}
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
