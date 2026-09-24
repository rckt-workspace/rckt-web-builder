import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  Briefcase,
  Check,
  Database,
  Gauge,
  Layers,
  Lock,
  PackageOpen,
  ShieldCheck,
  Tag,
  TrendingUp,
  UserRoundCheck,
  Users,
  Wallet,
  X,
} from "lucide-react";

import SiteFooter from "@/components/rckt/SiteFooter";
import SiteNav from "@/components/rckt/SiteNav";
import SystemPageHero from "@/components/rckt/SystemPageHero";
import { useInView } from "@/hooks/use-in-view";
import heroPhotoAsset from "@/assets/rckt-hero-sunset.png.asset.json";

const heroPhoto = heroPhotoAsset.url;
const DIAGNOSTIC_HREF = "/sistemas/revenue-diagnostic";

const GLOW =
  "radial-gradient(ellipse 700px 500px at 100% 0%, rgba(252, 92, 31,0.35) 0%, rgba(252, 92, 31,0.18) 40%, rgba(252, 92, 31,0) 75%)";

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
    links: [{ rel: "canonical", href: "https://www.rckt.es/nosotros" }],
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
    Icon: Database,
    nombre: "Una fuente de verdad",
    detalle:
      "Un solo modelo de datos: inversión → lead → MQL → SQL → reunión → oportunidad → venta → margen, con definiciones que el cliente firma.",
  },
  {
    n: "02",
    Icon: ShieldCheck,
    nombre: "IA supervisada",
    detalle:
      "Cada cuenta tiene un documento de una página: qué se automatiza, qué requiere aprobación humana, cómo se detectan fallos, quién interviene y en cuánto tiempo.",
  },
  {
    n: "03",
    Icon: UserRoundCheck,
    nombre: "Un responsable con autoridad",
    detalle:
      "Decide prioridades y trade-offs entre medios, creatividad, conversión y operación. No coordina: responde por el resultado.",
  },
  {
    n: "04",
    Icon: Layers,
    nombre: "Activos reutilizables",
    detalle:
      "Conectores, plantillas de tracking, evaluaciones de agentes, playbooks por sector, biblioteca creativa. Lo que se repite se documenta y se versiona.",
  },
  {
    n: "05",
    Icon: Lock,
    nombre: "Gobierno y seguridad",
    detalle:
      "Accesos, datos personales, consentimiento y cumplimiento local, con apoyo jurídico cuando haga falta.",
  },
  {
    n: "06",
    Icon: PackageOpen,
    nombre: "Transferencia",
    detalle: "Documentación y accesos completos desde el primer día. El cliente puede irse con su sistema.",
  },
];


const PERFIL: Array<[string, string, typeof Users]> = [
  ["Madurez", "Ya vende, ya invierte, ya recibe leads", TrendingUp],
  ["Tamaño", "Entre 10 y 100 empleados", Users],
  ["Inversión en marketing", "Ya existe y es significativa para su tamaño", Wallet],
  ["Ticket", "Alto: el seguimiento solo paga si cada venta vale", Tag],
  ["Equipo comercial", "Existe, aunque hoy trabaje fuera del CRM", Briefcase],
  ["Capacidad", "Puede implementar CRM y sostener la adquisición con margen", Gauge],
];

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="inline-block h-4 w-[2px] bg-orange" />
      <span className="label-orange">{children}</span>
    </div>
  );
}


/** Texto que aparece palabra por palabra. */
function WordReveal({ text, delayStart = 0 }: { text: string; delayStart?: number }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((w, i) => (
        <WordSpan key={`${w}-${i}`} word={w} delay={delayStart + i * 25} />
      ))}
    </>
  );
}

function WordSpan({ word, delay }: { word: string; delay: number }) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.15);
  return (
    <span
      ref={ref}
      className={`nos-word ${inView ? "is-in" : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {word}&nbsp;
    </span>
  );
}


function PrincipioBlock({ p, i }: { p: (typeof PRINCIPIOS)[number]; i: number }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);
  const Icon = p.Icon;
  return (
    <div
      ref={ref}
      className={`nos-ficha nos-rise ${inView ? "is-in" : ""}`}
      style={{ transitionDelay: `${i * 80}ms` }}
    >
      <div className="flex items-center gap-3">
        <Icon className="h-7 w-7 text-orange" strokeWidth={1.5} aria-hidden="true" />
        <span className="font-serif-accent block text-[40px] leading-none text-orange italic">{p.n}</span>
      </div>
      <h3 className="font-display mt-3 text-[20px] font-semibold tracking-tight">{p.nombre}</h3>
      <p data-align="left" className="mt-2 text-[16px] leading-relaxed text-muted-foreground">
        {p.detalle}
      </p>
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
            <p data-align="left" className="font-display mt-4 text-[32px] leading-none text-orange">
              Del clic al cierre.
            </p>
          }
          ctaLabel="Solicitar diagnóstico →"
          ctaHref={DIAGNOSTIC_HREF}
        />

        {/* 2. En una frase */}
        <section className="nos-sec nos-quote nos-glow--c">
          <div className="relative mx-auto max-w-[900px] px-6 text-center">
            <span className="label-orange">En una frase</span>
            <p
              data-center
              className="font-display mt-6 font-semibold"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1.3 }}
            >
              <WordReveal text="No vendemos campañas sueltas, ni webs, ni chatbots. Diseñamos y operamos el sistema que hay entre la inversión en marketing de un cliente y su venta, y" />
              <em className="font-serif-accent">respondemos por lo que pasa en el medio</em>.
            </p>
          </div>
        </section>


        {/* 3. Lo que somos / lo que no somos */}
        <section className="nos-sec nos-glow--bl">
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

        {/* 5. Principios */}
        <section className="nos-sec nos-sec--warm nos-glow--c">
          <div className="mx-auto max-w-6xl px-6">
            <SectionLabel>Principios</SectionLabel>
            <h2 className="font-display text-[28px] leading-tight font-semibold tracking-tight md:text-[40px]">
              La base común de <em className="font-serif-accent">toda cuenta</em>.
            </h2>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {PRINCIPIOS.map((p, i) => (
                <PrincipioBlock key={p.n} p={p} i={i} />
              ))}
            </div>
          </div>
        </section>

        {/* 6. A quién servimos */}
        <section className="nos-sec nos-glow--br">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-[40%_1fr]">
            <div className="md:sticky md:top-[120px] md:self-start">
              <SectionLabel>A quién servimos</SectionLabel>
              <p
                className="font-display font-semibold"
                style={{ fontSize: "clamp(1.5rem, 2.4vw, 2rem)", lineHeight: 1.3 }}
              >
                Nuestro cliente es una empresa consolidada que ya vende, ya invierte en marketing o ventas, y{" "}
                <em className="font-serif-accent">pierde dinero entre la campaña y el cierre</em>.
              </p>
            </div>
            <dl>
              {PERFIL.map(([k, v, Icon]) => (
                <div
                  key={k}
                  className="nos-row flex flex-col gap-1 border-t py-5 md:flex-row md:gap-8"
                  style={{ borderColor: "rgba(252, 92, 31,0.18)" }}
                >
                  <dt className="flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] text-orange uppercase md:w-[220px] md:shrink-0">
                    <Icon className="h-[22px] w-[22px] shrink-0 text-orange" strokeWidth={1.5} aria-hidden="true" />
                    {k}
                  </dt>
                  <dd className="text-[16px] leading-relaxed">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>


        {/* 8. Cómo trabajamos */}
        <section className="nos-sec nos-glow--tr">
          <div className="mx-auto max-w-6xl px-6">
            <div className="nos-next-card flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div>
                <span className="label-orange">Siguiente</span>
                <h2 className="font-display mt-3 text-[32px] font-semibold tracking-tight">Cómo trabajamos</h2>
                <p data-align="left" className="mt-3 text-[16px] leading-relaxed">
                  Operar, Sprint o Partner: las modalidades, la cadencia y cómo crece una cuenta.
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <a
                  href="/nosotros/como-trabajamos"
                  className="btn-orange font-display inline-flex shrink-0 items-center justify-center rounded-full px-8 py-4 text-[15px] font-semibold"
                >
                  Ver cómo trabajamos <span className="nos-arrow">→</span>
                </a>
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
                "linear-gradient(90deg, rgba(252, 92, 31,0.9) 0%, rgba(252, 92, 31,0.6) 45%, rgba(252, 92, 31,0) 100%)",
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
            <div className="mx-auto max-w-[720px] text-center">
              <div className="mb-4 flex items-center justify-center gap-3">
                <span className="label-orange">¿Empezamos?</span>
                <span className="inline-block h-4 w-[2px] bg-orange" />
                <span className="inline-block h-4 w-[2px] bg-orange" />
              </div>
              <h2
                className="font-display text-[34px] leading-[1.08] font-semibold tracking-tight md:text-[56px]"
                style={{ color: "#FFFFFF" }}
              >
                El siguiente paso empieza con <em className="font-serif-accent">claridad.</em>
              </h2>
              <div className="mt-10 flex justify-center">
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
