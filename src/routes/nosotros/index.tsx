import { createFileRoute } from "@tanstack/react-router";
import { Check, X } from "lucide-react";

import HandUnderline from "@/components/rckt/HandUnderline";
import SiteFooter from "@/components/rckt/SiteFooter";
import SiteNav from "@/components/rckt/SiteNav";
import SystemPageHero from "@/components/rckt/SystemPageHero";
import { useInView } from "@/hooks/use-in-view";
import heroPhotoAsset from "@/assets/rckt-hero-sunset.png.asset.json";

const heroPhoto = heroPhotoAsset.url;
const DIAGNOSTIC_HREF = "/sistemas/revenue-diagnostic";

const GLOW =
  "radial-gradient(ellipse 700px 500px at 100% 0%, rgba(232,103,46,0.35) 0%, rgba(244,161,95,0.18) 40%, rgba(232,103,46,0) 75%)";

export const Route = createFileRoute("/nosotros/")({
  head: () => ({
    meta: [
      { title: "Nosotros — Sistemas que convierten demanda en ventas | RCKT.es" },
      {
        name: "description",
        content:
          "RCKT diseña y opera el sistema entre la inversión en marketing y la venta: campañas, conversaciones, CRM e IA supervisada, medidos hasta el ingreso.",
      },
      { property: "og:title", content: "Nosotros — RCKT.es" },
      {
        property: "og:description",
        content: "Diseñamos y operamos el sistema que hay entre la inversión en marketing y la venta.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NosotrosPage,
});

const SOMOS = [
  "Una firma que se hace responsable del resultado comercial, no de una tarea.",
  "Un equipo que conecta lo que el cliente hoy tiene separado: campañas, WhatsApp, web, CRM, ventas y operación.",
  "Una forma de trabajar donde todo se mide hasta la venta, con una sola fuente de verdad que el cliente firma.",
  "IA en cada sistema, siempre con supervisión humana y con un documento que dice qué hace sola y qué no.",
];

const NO_SOMOS = [
  "No somos una agencia de medios que optimiza por coste por lead.",
  "No hacemos webs sueltas, community management ni diseño gráfico por encargo.",
  "No vendemos chatbots ni «IA» como producto. Vendemos un proceso que mejora y se puede medir.",
  "No prometemos lo que no controlamos: stock, precios, cierre o calidad de atención del cliente.",
];

const PRINCIPIOS = [
  {
    n: "01",
    nombre: "Una fuente de verdad",
    detalle:
      "Un solo modelo de datos: inversión → lead → MQL → SQL → reunión → oportunidad → venta → margen, con definiciones que el cliente firma.",
  },
  {
    n: "02",
    nombre: "IA supervisada",
    detalle:
      "Cada cuenta tiene un documento de una página: qué se automatiza, qué requiere aprobación humana, cómo se detectan fallos, quién interviene y en cuánto tiempo.",
  },
  {
    n: "03",
    nombre: "Un responsable con autoridad",
    detalle:
      "Decide prioridades y trade-offs entre medios, creatividad, conversión y operación. No coordina: responde por el resultado.",
  },
  {
    n: "04",
    nombre: "Activos reutilizables",
    detalle:
      "Conectores, plantillas de tracking, evaluaciones de agentes, playbooks por sector, biblioteca creativa. Lo que se repite se documenta y se versiona.",
  },
  {
    n: "05",
    nombre: "Gobierno y seguridad",
    detalle:
      "Accesos, datos personales, consentimiento y cumplimiento local, con apoyo jurídico cuando haga falta.",
  },
  {
    n: "06",
    nombre: "Transferencia",
    detalle: "Documentación y accesos completos desde el primer día. El cliente puede irse con su sistema.",
  },
];

const PERFIL = [
  ["Madurez", "Ya vende, ya invierte, ya recibe leads"],
  ["Tamaño", "Entre 10 y 100 empleados"],
  ["Inversión en marketing", "Ya existe y es significativa para su tamaño"],
  ["Ticket", "Alto: el seguimiento solo paga si cada venta vale"],
  ["Equipo comercial", "Existe, aunque hoy trabaje fuera del CRM"],
  ["Capacidad", "Puede implementar CRM y sostener la adquisición con margen"],
];

const NO_ATENDEMOS = [
  "Emprendimientos sin ventas",
  "Quien quiere empezar un negocio",
  "Community management",
  "Diseño gráfico suelto",
  "Webs baratas",
  "Chatbot por curiosidad",
  "Sin presupuesto de marketing",
  "SEO masivo low-cost",
  "Consultoría de IA teórica",
  "Quien pide que cobremos solo por resultados",
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="inline-block h-4 w-[2px] bg-orange" />
      <span className="label-orange">{children}</span>
    </div>
  );
}

function PrincipioBlock({ p, i }: { p: (typeof PRINCIPIOS)[number]; i: number }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);
  return (
    <div
      ref={ref}
      className={`nos-rise pt-5 ${inView ? "is-in" : ""}`}
      style={{ borderTop: "2px solid #E8672E", transitionDelay: `${i * 80}ms` }}
    >
      <span className="font-serif-accent block text-[40px] leading-none text-orange italic">{p.n}</span>
      <h3 className="font-display mt-3 text-[20px] font-semibold tracking-tight">{p.nombre}</h3>
      <p className="mt-2 text-[16px] leading-relaxed text-muted-foreground">{p.detalle}</p>
    </div>
  );
}

function NosotrosPage() {
  return (
    <div className="nos-page bg-background text-foreground antialiased">
      <SiteNav />
      <main>
        <SystemPageHero
          label="Nosotros"
          title={
            <>
              RCKT diseña y opera sistemas que convierten{" "}
              <em className="font-serif-accent">demanda en ventas.</em>
            </>
          }
          descriptor="Campañas, conversaciones, CRM e IA supervisada, medidos hasta el ingreso."
          extra={
            <p className="font-script mt-4 text-[32px] leading-none text-orange">Del clic al cierre.</p>
          }
          ctaLabel="Solicitar diagnóstico →"
          ctaHref={DIAGNOSTIC_HREF}
        />

        {/* 2. En una frase */}
        <section className="nos-sec nos-sec--warm">
          <div className="mx-auto max-w-[900px] px-6 text-center">
            <span className="label-orange">En una frase</span>
            <p
              className="font-display mt-6 font-semibold"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1.3, textAlign: "center" }}
            >
              No vendemos campañas sueltas, ni webs, ni chatbots. Diseñamos y operamos el sistema que hay entre la
              inversión en marketing de un cliente y su venta, y{" "}
              <HandUnderline>respondemos por lo que pasa en el medio</HandUnderline>.
            </p>
          </div>
        </section>

        {/* 3. Lo que somos / lo que no somos */}
        <section className="nos-sec">
          <div className="mx-auto grid max-w-6xl items-stretch gap-6 px-6 md:grid-cols-2">
            <div className="band--orange" style={{ borderRadius: "28px", padding: "44px" }}>
              <h2 className="font-display text-[28px] font-semibold tracking-tight">Lo que somos</h2>
              <ul className="mt-6 space-y-4">
                {SOMOS.map((t) => (
                  <li key={t} className="flex gap-3 text-[16px] leading-relaxed">
                    <Check className="mt-1 h-4 w-4 shrink-0" strokeWidth={2} aria-hidden="true" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="nos-outline-card">
              <h2 className="font-display text-[28px] font-semibold tracking-tight">Lo que no somos</h2>
              <ul className="mt-6 space-y-4">
                {NO_SOMOS.map((t) => (
                  <li key={t} className="flex gap-3 text-[16px] leading-relaxed text-muted-foreground">
                    <X className="mt-1 h-4 w-4 shrink-0 text-orange" strokeWidth={2} aria-hidden="true" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 4. Principios */}
        <section className="nos-sec nos-sec--warm">
          <div className="mx-auto max-w-6xl px-6">
            <SectionLabel>Principios</SectionLabel>
            <h2 className="font-display text-[28px] leading-tight font-semibold tracking-tight md:text-[40px]">
              La base común de <HandUnderline>toda cuenta</HandUnderline>.
            </h2>
            <div className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {PRINCIPIOS.map((p, i) => (
                <PrincipioBlock key={p.n} p={p} i={i} />
              ))}
            </div>
          </div>
        </section>

        {/* 5. A quién servimos */}
        <section className="nos-sec">
          <div className="mx-auto max-w-6xl px-6">
            <SectionLabel>A quién servimos</SectionLabel>
            <p
              className="font-display max-w-[820px] font-semibold"
              style={{ fontSize: "clamp(1.5rem, 2.4vw, 2rem)", lineHeight: 1.3 }}
            >
              Nuestro cliente es una empresa consolidada que ya vende, ya invierte en marketing o ventas, y{" "}
              <HandUnderline>pierde dinero entre la campaña y el cierre</HandUnderline>.
            </p>
            <dl className="mt-12 max-w-4xl">
              {PERFIL.map(([k, v]) => (
                <div
                  key={k}
                  className="flex flex-col gap-1 border-t py-5 md:flex-row md:gap-10"
                  style={{ borderColor: "rgba(232,103,46,0.18)" }}
                >
                  <dt className="font-mono text-[11px] tracking-[0.16em] text-orange uppercase md:w-[240px] md:shrink-0">
                    {k}
                  </dt>
                  <dd className="text-[16px] leading-relaxed">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* 6. A quién no atendemos */}
        <section className="nos-sec nos-sec--warm">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <span className="label-orange">A quién no atendemos</span>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {NO_ATENDEMOS.map((t) => (
                <span key={t} className="nos-pill">
                  <X className="h-3.5 w-3.5 text-orange" strokeWidth={2} aria-hidden="true" />
                  {t}
                </span>
              ))}
            </div>
            <p className="font-serif-accent mt-10 text-[24px] text-orange italic" style={{ textAlign: "center" }}>
              Decir no a estos perfiles es parte del trabajo, no una pérdida.
            </p>
          </div>
        </section>

        {/* 7. Cómo trabajamos */}
        <section className="nos-sec">
          <div className="mx-auto max-w-6xl px-6">
            <div className="nos-next-card flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div>
                <span className="label-orange">Siguiente</span>
                <h2 className="font-display mt-3 text-[32px] font-semibold tracking-tight">Cómo trabajamos</h2>
                <p className="mt-3 text-[16px] leading-relaxed">
                  Operar, Sprint o Partner: las modalidades, la cadencia y cómo crece una cuenta.
                </p>
              </div>
              <a
                href="/nosotros/como-trabajamos"
                className="btn-orange font-display inline-flex shrink-0 items-center justify-center rounded-full px-8 py-4 text-[15px] font-semibold"
              >
                Ver cómo trabajamos →
              </a>
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
                  Solicitar diagnóstico →
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
