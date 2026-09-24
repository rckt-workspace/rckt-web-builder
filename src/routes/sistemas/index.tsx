import { createFileRoute, Link } from "@tanstack/react-router";
import { Bot, Database, Megaphone, MessageCircle, UserRound, Workflow } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import SiteFooter from "@/components/rckt/SiteFooter";
import SiteNav from "@/components/rckt/SiteNav";
import SystemPageHero from "@/components/rckt/SystemPageHero";
import { SystemCards, SISTEMAS_CARDS } from "@/components/rckt/SystemCards";
import heroPhotoImg from "@/assets/rckt-cta-final.jpg";

const heroPhoto = heroPhotoImg;

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
            "radial-gradient(ellipse 500px 380px at 50% 50%, rgba(252, 92, 31,0.18) 0%, rgba(252, 92, 31,0.10) 45%, rgba(252, 92, 31,0) 75%)",
        }}
      />
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
            <div className="relative z-10">
              <p className="font-display text-[19px] font-semibold" style={{ color: "#FFFFFF" }}>
                Revenue Diagnostic
              </p>
              <p className="mt-1 text-[12.5px]" style={{ color: "rgba(255,255,255,0.85)" }}>
                Toda cuenta empieza aquí
              </p>
            </div>
          </div>
          <div className="arch-layer" style={{ transitionDelay: "200ms" }} aria-hidden="true">
            <span className="arch-line" style={{ ["--arch-line-h" as string]: "18px" }} />
            <div className="hidden md:grid grid-cols-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="relative h-5">
                  <span
                    className="absolute top-0 h-px"
                    style={{
                      background: "var(--orange)",
                      left: i === 0 ? "50%" : 0,
                      right: i === 2 ? "50%" : 0,
                    }}
                  />
                  <span className="absolute left-1/2 top-0 h-5 w-px" style={{ background: "var(--orange)" }} />
                </div>
              ))}
            </div>
            <span className="arch-line md:hidden" style={{ ["--arch-line-h" as string]: "14px" }} />
          </div>


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
                  className={`flex items-center justify-center gap-2 px-5 py-5 ${
                    i === 0
                      ? ""
                      : "border-t border-[rgba(252, 92, 31,0.25)] md:border-t-0 md:border-l md:border-[rgba(252, 92, 31,0.25)]"
                  }`}
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
        <SystemCards systems={SISTEMAS_CARDS} />
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

        <div className="grid items-stretch gap-5 md:grid-cols-2">
          <div
            className="relative flex h-full flex-col overflow-hidden rounded-[28px] p-[44px]"
            style={{ background: "linear-gradient(135deg, #fc5c1f 0%, #e04d14 100%)" }}
          >
            <div className="relative z-10 flex h-full flex-col">
              <span
                className="font-mono inline-flex w-fit rounded-full px-3 py-1 text-[11px] tracking-[0.16em] uppercase"
                style={{ background: "rgba(255,255,255,0.2)", color: "#FFFFFF" }}
              >
                Producto principal
              </span>
              <h3 className="font-display mt-5 text-[40px] leading-tight font-semibold" style={{ color: "#FFFFFF" }}>
                Revenue Engine
              </h3>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <span
                  className="font-display rounded-full px-4 py-1.5 text-[13px] font-semibold"
                  style={{ border: "1px solid rgba(255,255,255,0.5)", color: "#FFFFFF" }}
                >
                  Demand System
                </span>
                <span className="font-display text-[16px] font-semibold" style={{ color: "#FFFFFF" }} aria-hidden="true">
                  +
                </span>
                <span
                  className="font-display rounded-full px-4 py-1.5 text-[13px] font-semibold"
                  style={{ border: "1px solid rgba(255,255,255,0.5)", color: "#FFFFFF" }}
                >
                  Sales Flow
                </span>
              </div>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-left" data-align="left" style={{ color: "rgba(255,255,255,0.9)" }}>
                Demand + Sales Flow, combinados, son nuestro producto principal.
              </p>
              <Link
                to="/sistemas/revenue-engine"
                className="font-display mt-auto inline-flex w-fit items-center gap-2 rounded-full bg-[#FFFFFF] px-7 py-3.5 pt-3.5 text-[14px] font-semibold"
                style={{ color: "#e04d14", marginTop: "32px" }}
              >
                Ver Revenue Engine →
              </Link>
            </div>
          </div>

          <div
            className="combo-card-light relative flex h-full flex-col overflow-hidden rounded-[28px] p-[44px]"
          >
            <div className="relative z-10 flex h-full flex-col">
              <span
                className="font-mono inline-flex w-fit rounded-full px-3 py-1 text-[11px] tracking-[0.16em] uppercase"
                style={{ border: "1px solid var(--orange)", color: "var(--orange)" }}
              >
                Etapa posterior
              </span>
              <h3 className="font-display mt-5 text-[40px] leading-tight font-semibold" style={{ color: "var(--ink)" }}>
                Growth OS
              </h3>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-left" data-align="left" style={{ color: "var(--ink-soft)" }}>
                El bundle superior, solo para cuentas maduras. No se ofrece de entrada — se llega a él.
              </p>
              <a
                href="/sistemas/revenue-engine#escalera"
                className="font-display inline-flex w-fit items-center gap-2 text-[14px] font-semibold"
                style={{ color: "var(--orange)", marginTop: "32px" }}
              >
                Ver cómo crece una cuenta →
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
          background:
            "radial-gradient(ellipse 700px 500px at 100% 0%, rgba(252, 92, 31,0.35) 0%, rgba(252, 92, 31,0.18) 40%, rgba(252, 92, 31,0) 75%)",
        }}
      />
      <div className="relative z-10 mx-auto max-w-6xl px-5 py-24 md:px-6 md:py-32">
        <div className="mx-auto max-w-[720px] text-center">
          <div className="mb-4"><span className="label-orange">¿Empezamos?</span></div>
          <h2
            className="font-display text-[34px] leading-[1.08] font-semibold tracking-tight md:text-[56px]"
            style={{ color: "#FFFFFF" }}
          >
            ¿Por dónde <em className="font-serif-accent">empezamos?</em>
          </h2>
          <div className="mt-10 flex justify-center">
            <a
              href="/sistemas/revenue-diagnostic#formulario"
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
          <span className="ml-auto">IA supervisada y documentada</span>
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
          "Demand System, Sales Flow y Operations System: tres sistemas que siguen la cadena de ingresos de cualquier negocio, del clic al cierre.",
      },
      { property: "og:title", content: "Sistemas · RCKT.es" },
      {
        property: "og:description",
        content: "Demand System, Sales Flow y Operations System: tres sistemas que siguen la cadena de ingresos de cualquier negocio, del clic al cierre.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://www.rckt.es/sistemas" }],
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
              Tres sistemas, una sola cadena de <span style={{ color: "#fc5c1f" }}>ingresos</span>.
            </>
          }
          descriptor="Empiezas por un problema y siempre por un diagnóstico. Después eliges uno de los tres sistemas, o su combinación, según dónde se pierde tu dinero. Los tres siguen la cadena de ingresos de cualquier negocio: conseguir clientes, cerrarlos y atenderlos sin fricción."
          ctaLabel="Solicitar diagnóstico de captación →"
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
