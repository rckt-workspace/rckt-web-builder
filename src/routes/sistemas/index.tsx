import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import SiteFooter from "@/components/rckt/SiteFooter";
import SiteNav from "@/components/rckt/SiteNav";
import SystemPageHero from "@/components/rckt/SystemPageHero";
import heroPhotoAsset from "@/assets/rckt-hero-sunset.png.asset.json";

const heroPhoto = heroPhotoAsset.url;

const SISTEMAS = [
  {
    badge: "S1",
    title: "Demand System",
    desc: "Manejamos tus campañas, pero no las optimizamos por leads baratos: las optimizamos por las oportunidades que tu equipo comercial acepta y por las que terminan en venta. Cada semana ves el embudo completo, no solo los clics.",
    href: "/sistemas/demand-system" as const,
  },
  {
    badge: "S2",
    title: "Sales Flow (núcleo de Conversion System)",
    desc: "Hoy pagas por un lead, te escribe, y ahí empieza a perderse: respuesta tarde, sin seguimiento, fuera del CRM. Sales Flow conecta tus campañas, WhatsApp y CRM para que cada lead tenga respuesta, seguimiento y dueño, y para que sepas cuáles compran.",
    href: "/sistemas/sales-flow" as const,
  },
  {
    badge: "S3",
    title: "Operations System",
    desc: "No te vendemos IA. Elegimos un proceso que tu equipo repite cien veces por semana, medimos cuánto te cuesta hoy, y en ocho semanas lo dejamos funcionando solo, con una persona aprobando lo que importa.",
    href: "/sistemas/operations-system" as const,
  },
];

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, inView };
}

const DIAGRAM_BOXES = [
  { title: "Demand System", href: "/sistemas/demand-system" as const, Icon: Megaphone },
  { title: "Sales Flow", href: "/sistemas/sales-flow" as const, Icon: MessageCircle },
  { title: "Operations System", href: "/sistemas/operations-system" as const, Icon: Workflow },
];

const BASE_COMUN = [
  { label: "Fuente de verdad", Icon: Database },
  { label: "IA supervisada", Icon: Bot },
  { label: "Responsable de cuenta", Icon: UserRound },
];

function Arquitectura() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section className="relative isolate overflow-hidden py-16 md:py-24" style={{ background: "var(--kraft)" }}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "900px",
          height: "700px",
          zIndex: 0,
          background:
            "radial-gradient(ellipse 500px 380px at 50% 50%, rgba(232,103,46,0.18) 0%, rgba(244,161,95,0.10) 45%, rgba(232,103,46,0) 75%)",
        }}
      />
      <DotGrid style={{ top: 24, right: 24 }} />
      <DotGrid style={{ bottom: 24, left: 24, top: "auto", right: "auto" }} />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="mb-10 flex items-center gap-3">
          <span className="inline-block h-4 w-[2px] bg-orange" />
          <span className="label-orange">Arquitectura</span>
        </div>

        <div ref={ref} data-in={inView ? "true" : "false"} className="arch mx-auto max-w-[960px] text-center">
          {/* Capa 1 */}
          <div className="arch-layer" style={{ transitionDelay: "0ms" }}>
            <span
              className="font-display inline-flex items-center rounded-full px-4 py-1.5 text-[12px] font-semibold"
              style={{ border: "1px solid var(--orange)", color: "var(--orange)" }}
            >
              Tu problema
            </span>
          </div>
          <span className="arch-line" style={{ ["--arch-line-h" as string]: "32px", transitionDelay: "80ms" }} aria-hidden="true" />

          {/* Capa 2 */}
          <div className="arch-layer relative overflow-hidden rounded-2xl px-6 py-5" style={{ background: "var(--orange)", transitionDelay: "120ms" }}>
            <span className="arch-bar-texture" aria-hidden="true" />
            <div className="relative z-10">
              <p className="font-display text-[19px] font-semibold" style={{ color: "#FFFFFF" }}>
                Revenue Diagnostic
              </p>
              <p className="mt-1 text-[12.5px]" style={{ color: "rgba(255,255,255,0.85)" }}>
                Única puerta de entrada
              </p>
            </div>
          </div>
          <span className="arch-line" style={{ ["--arch-line-h" as string]: "32px", transitionDelay: "200ms" }} aria-hidden="true" />

          {/* Capa 3 */}
          <div className="arch-layer grid gap-4 md:grid-cols-3" style={{ transitionDelay: "240ms" }}>
            {DIAGRAM_BOXES.map(({ title, href, Icon }) => (
              <Link key={title} to={href} className="arch-box flex flex-col items-center gap-2 rounded-2xl px-5 py-6 transition-colors hover:border-orange">
                <Icon className="h-5 w-5" style={{ color: "var(--orange)" }} strokeWidth={1.5} />
                <span className="font-display text-[14.5px] font-semibold">{title}</span>
              </Link>
            ))}
          </div>

          {/* Capa 4 — agrupaciones */}
          <div className="arch-layer mt-6" style={{ transitionDelay: "360ms" }}>
            <div className="hidden md:block">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 arch-bracket" aria-hidden="true" />
              </div>
            </div>
            <div className="mt-3 flex justify-center md:justify-start">
              <span
                className="font-display inline-flex rounded-full px-4 py-1.5 text-[12px] font-semibold md:ml-[16%]"
                style={{ background: "var(--orange)", color: "#FFFFFF" }}
              >
                Revenue Engine · Demand + Sales Flow
              </span>
            </div>
            <div className="mt-6 hidden md:block arch-bracket arch-bracket--dashed" aria-hidden="true" />
            <div className="mt-3 flex justify-center">
              <span
                className="font-display inline-flex rounded-full px-4 py-1.5 text-[12px] font-semibold"
                style={{ border: "1.5px dashed var(--orange)", color: "var(--orange)" }}
              >
                Growth OS · los tres sistemas
              </span>
            </div>
          </div>

          {/* Capa 5 — la base */}
          <div className="arch-layer mt-10" style={{ transitionDelay: "480ms" }}>
            <p className="font-mono text-[11px] tracking-[0.18em] uppercase" style={{ color: "var(--ink-soft)" }}>
              La base común
            </p>
            <div className="arch-base mt-3 grid grid-cols-1 rounded-2xl md:grid-cols-3">
              {BASE_COMUN.map(({ label, Icon }, i) => (
                <div
                  key={label}
                  className="flex items-center justify-center gap-2 px-5 py-5"
                  style={
                    i === 0
                      ? undefined
                      : { borderTop: "1px solid rgba(232,103,46,0.25)" }
                  }
                >
                  <Icon className="h-4 w-4 shrink-0" style={{ color: "var(--orange)" }} strokeWidth={1.5} />
                  <span className="font-display text-[13.5px] font-semibold" style={{ color: "var(--ink)" }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Cards() {
  return (
    <section className="relative isolate overflow-hidden py-14 md:py-20" style={{ background: "var(--kraft-2)" }}>
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="grid gap-5 md:grid-cols-3">
          {SISTEMAS.map((s) => (
            <Link key={s.badge} to={s.href} className="card-kraft group flex flex-col overflow-hidden p-0">
              <div className="relative h-40 w-full overflow-hidden">
                <div
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(232,103,46,0.35) 0%, rgba(242,161,95,0.5) 45%, rgba(253,228,208,0.9) 100%)",
                  }}
                />
                <span className="absolute top-4 left-4 rounded-full bg-[rgba(255,255,255,0.85)] px-3 py-1 font-mono text-[11px] tracking-wider text-ink">
                  {s.badge}
                </span>
                <span className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(255,255,255,0.85)] text-ink transition-transform group-hover:scale-110">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-lg leading-snug font-semibold">{s.title}</h3>
                <p className="mt-3 flex-1 text-[13.5px] leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Combos() {
  return (
    <section className="relative isolate overflow-hidden py-14 md:py-20" style={{ background: "var(--kraft)" }}>
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="mb-8 flex items-center gap-3">
          <span className="inline-block h-4 w-[2px] bg-orange" />
          <span className="label-orange">Los dos combos</span>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div
            className="relative overflow-hidden rounded-3xl px-8 py-10 md:px-10"
            style={{ background: "linear-gradient(110deg, #E8672E 0%, #C94F1E 100%)" }}
          >
            <span className="band-texture" aria-hidden="true" />
            <div className="relative z-10">
              <h3 className="font-display text-[28px] leading-tight font-semibold" style={{ color: "#FFFFFF" }}>
                Revenue Engine
              </h3>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed" style={{ color: "rgba(255,255,255,0.88)" }}>
                Demand + Sales Flow, combinados, son nuestro producto principal.
              </p>
              <Link
                to="/sistemas/revenue-engine"
                className="font-display mt-8 inline-flex items-center gap-2 rounded-full bg-[#FFFFFF] px-7 py-3.5 text-[14px] font-semibold"
                style={{ color: "#C94F1E" }}
              >
                Ver Revenue Engine →
              </Link>
            </div>
          </div>

          <div
            className="relative overflow-hidden rounded-3xl px-8 py-10 md:px-10"
            style={{ background: "var(--deep)" }}
          >
            <span className="band-texture" aria-hidden="true" />
            <div className="relative z-10">
              <h3 className="font-display text-[28px] leading-tight font-semibold" style={{ color: "#FFFFFF" }}>
                Growth OS
              </h3>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed" style={{ color: "rgba(255,255,255,0.78)" }}>
                El bundle superior, solo para cuentas maduras. No se ofrece de entrada — se llega a él.
              </p>
              <a
                href="/nosotros/como-trabajamos"
                className="font-display mt-8 inline-flex items-center gap-2 text-[14px] font-semibold"
                style={{ color: "var(--orange-2)" }}
              >
                Se explica en Cómo trabajamos →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CtaFinal() {
  return (
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
          background:
            "radial-gradient(ellipse 700px 500px at 100% 0%, rgba(232,103,46,0.35) 0%, rgba(244,161,95,0.18) 40%, rgba(232,103,46,0) 75%)",
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
            ¿Por dónde <em className="font-serif-accent">empezamos?</em>
          </h2>
          <div className="mt-10 flex justify-end">
            <a
              href="/sistemas/revenue-diagnostic#formulario"
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
  );
}

export const Route = createFileRoute("/sistemas/")({
  head: () => ({
    meta: [
      { title: "Sistemas · RCKT.es" },
      {
        name: "description",
        content:
          "Tres sistemas, no más: Demand System, Sales Flow y Operations System. Si algo no cabe en uno de los tres, no lo vendemos.",
      },
      { property: "og:title", content: "Sistemas · RCKT.es" },
      {
        property: "og:description",
        content: "Demand System, Sales Flow y Operations System — la arquitectura de crecimiento de RCKT.es.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SistemasIndex,
});

function SistemasIndex() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main>
        <SystemPageHero
          label="Sistemas"
          title={
            <>
              Tres sistemas, <em className="font-serif-accent text-orange">no más.</em>
            </>
          }
          descriptor="Si algo no cabe en uno de los tres, no lo vendemos."
          ctaLabel="Solicitar Revenue Diagnostic →"
          ctaHref="/sistemas/revenue-diagnostic#formulario"
        />
        <Arquitectura />
        <Cards />
        <Combos />
        <CtaFinal />
      </main>
      <SiteFooter />
    </div>
  );
}
