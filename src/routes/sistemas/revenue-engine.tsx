import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CalendarCheck,
  BarChart3,
  CalendarDays,
  Check,
  Database,
  Megaphone,
  MonitorSmartphone,
  Target,
  UserRound,
  Users,
  Wrench,
  Workflow,
} from "lucide-react";

import HandNote from "@/components/rckt/HandNote";
import SiteNav from "@/components/rckt/SiteNav";
import SiteFooter from "@/components/rckt/SiteFooter";
import SystemPageHero from "@/components/rckt/SystemPageHero";
import heroPhotoAsset from "@/assets/rckt-hero-sunset.png.asset.json";

const heroPhoto = heroPhotoAsset.url;
const DIAGNOSTIC_HREF = "/sistemas/revenue-diagnostic";

const GLOW =
  "radial-gradient(ellipse 700px 500px at 100% 0%, rgba(232,103,46,0.35) 0%, rgba(244,161,95,0.18) 40%, rgba(232,103,46,0) 75%)";

export const Route = createFileRoute("/sistemas/revenue-engine")({
  head: () => ({
    meta: [
      { title: "Revenue Engine — El sistema completo de captación a cierre | RCKT.es" },
      {
        name: "description",
        content:
          "Demand System + Sales Flow en un solo sistema con un solo responsable: campañas, WhatsApp y CRM conectados y una sola cifra, el coste por cliente nuevo.",
      },
      { property: "og:title", content: "Revenue Engine — El sistema completo de captación a cierre" },
      {
        property: "og:description",
        content: "Campañas, conversación y CRM como un solo sistema medido del clic al cierre.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RevenueEnginePage,
});

const STATS = [
  {
    label: "Para quién",
    Icono: Users,
    detalle: "Negocios de captación y cierre. Salud y estética, educación, inmobiliario, servicios B2B",
  },
  {
    label: "Setup",
    Icono: Wrench,
    detalle: "Sales Flow, landing, CRM y tracking. Acredita lo pagado en el Diagnostic",
  },
  {
    label: "Compromiso mínimo",
    Icono: CalendarCheck,
    detalle: "6 meses — el sistema necesita un ciclo completo para demostrar",
  },
  {
    label: "Qué mide el éxito",
    Icono: Target,
    detalle: "Coste por cliente adquirido · cuánto vale ese cliente frente a lo que costó traerlo",
  },
];

const INCLUYE: {
  Icono: typeof Megaphone;
  titulo: string;
  detalle: string;
  href?: string;
}[] = [
  {
    Icono: Megaphone,
    titulo: "Demand System",
    detalle: "Tier según inversión en medios",
    href: "/sistemas/demand-system",
  },
  {
    Icono: Workflow,
    titulo: "Sales Flow",
    detalle: "Campañas, WhatsApp y CRM conectados",
    href: "/sistemas/sales-flow",
  },
  {
    Icono: MonitorSmartphone,
    titulo: "Landing de conversión",
    detalle: "Con tracking y CRM conectados",
  },
  {
    Icono: Database,
    titulo: "CRM & RevOps",
    detalle: "Pipeline, etapas, automatizaciones y dashboards",
  },
  {
    Icono: BarChart3,
    titulo: "Medición completa",
    detalle: "Del clic al cierre, con una sola fuente de verdad",
  },
  {
    Icono: UserRound,
    titulo: "Responsable de cuenta",
    detalle: "Un solo responsable para todo el sistema",
  },
  {
    Icono: CalendarDays,
    titulo: "Revisión mensual con decisores",
    detalle: "Fugas y decisiones del mes",
  },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="inline-block h-4 w-[2px] bg-orange" />
      <span className="label-orange">{children}</span>
    </div>
  );
}

function RevenueEnginePage() {
  return (
    <div className="bg-background text-foreground antialiased">
      <SiteNav />
      <main className="sys-page">
        <SystemPageHero
          label="Revenue Engine"
          descriptor="Demand System + Sales Flow · nuestro producto principal"
          title={
            <>
              El sistema completo de <em className="font-serif-accent">captación a cierre.</em>
            </>
          }
          quoteLabel="En 30 segundos"
          quote="Tus campañas, tu WhatsApp y tu CRM hoy son tres cosas separadas que gestionan tres personas distintas. Revenue Engine las convierte en un solo sistema con un solo responsable: nosotros. Tú ves una cifra: cuánto te cuesta cada cliente nuevo."
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

        {/* Qué incluye */}
        <section className="relative isolate overflow-hidden py-16 md:py-24 sys-sec sys-sec--warm section--glow" data-corner="tr">
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: "-140px",
              left: "-160px",
              width: "820px",
              height: "620px",
              zIndex: 0,
              pointerEvents: "none",
              background:
                "radial-gradient(ellipse 620px 460px at 0% 100%, rgba(232,103,46,0.26) 0%, rgba(244,161,95,0.13) 42%, rgba(232,103,46,0) 72%)",
            }}
          />
          <div className="relative z-10 mx-auto max-w-6xl px-6">
            <SectionLabel>Qué incluye</SectionLabel>
            <div className="md:flex md:items-end md:justify-between md:gap-10">
              <h2 className="font-display text-[28px] leading-tight font-semibold tracking-tight md:text-[40px]">
                Todo el sistema, un solo responsable.
              </h2>
              <HandNote text="un solo responsable" />
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {INCLUYE.map((c) => {
                const inner = (
                  <>
                    <span
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full"
                      style={{ background: "var(--orange-bg)" }}
                    >
                      <c.Icono className="h-5 w-5 text-orange" strokeWidth={1.6} aria-hidden="true" />
                    </span>
                    <h3 className="font-display mt-5 text-[17px] leading-snug font-semibold tracking-tight">
                      {c.titulo}
                    </h3>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground">{c.detalle}</p>
                  </>
                );
                const cls = "card-kraft rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1";
                return c.href ? (
                  <Link key={c.titulo} to={c.href} className={`${cls} block`}>
                    {inner}
                  </Link>
                ) : (
                  <div key={c.titulo} className={cls}>
                    {inner}
                  </div>
                );
              })}
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
