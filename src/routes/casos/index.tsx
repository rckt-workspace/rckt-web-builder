import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";

import SiteFooter from "@/components/rckt/SiteFooter";
import SiteNav from "@/components/rckt/SiteNav";
import SystemPageHero from "@/components/rckt/SystemPageHero";
import heroPhotoImg from "@/assets/rckt-cta-final.jpg";

const heroPhoto = heroPhotoImg;

/* ── Datos estáticos ─────────────────────────────────────────────── */

type Caso = {
  slug: string;
  sector: string;
  sistema: string;
  ciudad: string;
  periodo: string;
  titular: string;
};

/** Hoy vacío: no publicamos ningún caso sin ficha completa. */
const CASOS: Caso[] = [];

const SECTORES = [
  "Salud, estética y odontología",
  "Servicios B2B",
  "Construcción e inmobiliario",
  "Educación privada",
  "Ecommerce",
  "Industria y distribución",
];
const SISTEMAS = ["Demand System", "Sales Flow", "Operations System", "Revenue Engine"];
const CIUDADES = ["Madrid"];

const CAMPOS: { num: string; nombre: string; desc: string }[] = [
  {
    num: "01",
    nombre: "Situación inicial",
    desc: "Cómo estaba la cuenta antes de empezar: inversión, leads, ventas y procesos.",
  },
  { num: "02", nombre: "Periodo", desc: "Fechas exactas de inicio y cierre del periodo medido." },
  { num: "03", nombre: "Alcance", desc: "Qué sistemas, canales y equipos entraron en el trabajo." },
  { num: "04", nombre: "Inversión", desc: "Cuánto se invirtió en medios y en el sistema durante el periodo." },
  { num: "05", nombre: "Intervención", desc: "Qué cambiamos y en qué orden." },
  { num: "06", nombre: "Resultado", desc: "Qué pasó, siempre con su denominador y frente a la línea base." },
  {
    num: "07",
    nombre: "Método de medición",
    desc: "Cómo se midió y con qué fuente de verdad firmada por el cliente.",
  },
  { num: "08", nombre: "Limitaciones", desc: "Lo que el caso no demuestra." },
];

/* ── Animaciones de entrada ──────────────────────────────────────── */

function useReveal<T extends HTMLElement>(deps: unknown = null) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    items.forEach((el, i) => {
      if (!el.style.getPropertyValue("--d")) el.style.setProperty("--d", `${(i % 6) * 90}ms`);
      io.observe(el);
    });
    return () => io.disconnect();
  }, [deps]);
  return ref;
}

/* ── Selector desplegable propio ─────────────────────────────────── */

function Selector({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string | null;
  onChange: (v: string | null) => void;
}) {
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  return (
    <div className="relative w-full md:w-auto" ref={boxRef}>
      <button
        type="button"
        className="cs-select w-full md:w-auto"
        data-selected={value !== null}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span>{value ?? label}</span>
        <span aria-hidden="true" className="text-[10px] opacity-70">
          ▾
        </span>
      </button>
      {open ? (
        <div className="cs-menu" role="listbox">
          <button type="button" onClick={() => { onChange(null); setOpen(false); }}>
            Todos
          </button>
          {options.map((o) => (
            <button key={o} type="button" onClick={() => { onChange(o); setOpen(false); }}>
              {o}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

/* ── Página ──────────────────────────────────────────────────────── */

function CasosPage() {
  const manifiestoRef = useReveal<HTMLDivElement>();
  const [activo, setActivo] = useState(0);
  const fichaRef = useRef<HTMLDivElement | null>(null);

  const [sector, setSector] = useState<string | null>(null);
  const [sistema, setSistema] = useState<string | null>(null);
  const [ciudad, setCiudad] = useState<string | null>(null);

  const filtrados = useMemo(
    () =>
      CASOS.filter(
        (c) =>
          (!sector || c.sector === sector) &&
          (!sistema || c.sistema === sistema) &&
          (!ciudad || c.ciudad === ciudad),
      ),
    [sector, sistema, ciudad],
  );

  const fichasRef = useReveal<HTMLDivElement>(filtrados.length);

  // Animaciones + scroll-spy de la ficha
  useEffect(() => {
    const root = fichaRef.current;
    if (!root) return;
    const bloques = Array.from(root.querySelectorAll<HTMLElement>("[data-field]"));
    const reveal = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("is-in");
            reveal.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    const spy = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        const first = visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        setActivo(Number((first.target as HTMLElement).dataset["field"]));
      },
      { threshold: 0.15, rootMargin: "-120px 0px -45% 0px" },
    );
    bloques.forEach((el) => {
      reveal.observe(el);
      spy.observe(el);
    });
    return () => {
      reveal.disconnect();
      spy.disconnect();
    };
  }, []);

  const hayFiltros = sector !== null || sistema !== null || ciudad !== null;
  const limpiar = () => {
    setSector(null);
    setSistema(null);
    setCiudad(null);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main>
        <SystemPageHero
          label="Casos"
          title={
            <>
              Ningún resultado <em className="font-serif-accent">sin ficha.</em>
            </>
          }
          descriptor="Cada caso que publicamos trae situación inicial, inversión, intervención y método de medición, o no lo publicamos."
          ctaLabel="Solicitar diagnóstico de captación →"
          ctaHref="/sistemas/revenue-diagnostic"
        />

        {/* 2 · Manifiesto */}
        <section className="relative isolate" style={{ background: "var(--kraft)", overflow: "clip" }}>
          <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ overflow: "clip" }}>
            <div className="cs-orb cs-orb--1" style={{ top: "-120px", left: "8%", width: "420px", height: "420px" }} />
            <div className="cs-orb cs-orb--2" style={{ bottom: "-140px", right: "6%", width: "460px", height: "460px" }} />
            <div className="cs-orb cs-orb--3" style={{ top: "20%", left: "45%", width: "360px", height: "360px" }} />
          </div>

          <div ref={manifiestoRef} className="relative z-10 mx-auto max-w-[820px] px-5 py-24 text-center md:px-6 md:py-32">
            <p
              data-reveal
              className="cs-rev cs-strike font-display font-semibold tracking-tight"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", lineHeight: 1.05 }}
            >
              +300% de leads
            </p>
            <p
              data-reveal
              className="cs-rev font-serif-accent mx-auto mt-8 max-w-[26ch] text-[28px] leading-[1.3]"
              style={{ ["--d" as string]: "500ms" }}
            >
              Sin denominador no es un caso, es un titular.
            </p>
            <p
              data-reveal
              className="cs-rev mx-auto mt-5 max-w-[46ch] text-[16px] leading-[1.6] text-muted-foreground"
              style={{ ["--d" as string]: "700ms" }}
            >
              Ninguna cifra se publica sin su línea base ni su denominador.
            </p>
          </div>
        </section>

        {/* 3 · Anatomía de una ficha */}
        <section className="cs-anatomy relative isolate" style={{ overflow: "clip" }}>
          <div className="brand-mark brand-mark--c" aria-hidden="true" />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-[140px] -right-[120px] h-[520px] w-[520px] opacity-70"
          >
            <span className="brand-mark brand-mark--a block h-full w-full" />
          </div>

          <div className="relative z-10 mx-auto max-w-6xl px-5 py-24 md:px-6 md:py-32">
            <div className="grid gap-12 lg:grid-cols-[35%_1fr] lg:gap-16">
              {/* Columna izquierda sticky */}
              <div>
                <div className="lg:sticky" style={{ top: "120px" }}>
                  <div className="mb-4 flex items-center gap-3">
                    <span className="inline-block h-4 w-[2px] bg-orange" />
                    <span className="label-orange">Anatomía de una ficha</span>
                  </div>
                  <h2 className="font-display text-[30px] leading-[1.12] font-semibold tracking-tight md:text-[38px]">
                    Ocho campos, <em className="font-serif-accent">siempre los mismos.</em>
                  </h2>
                  <ul className="mt-8 space-y-0.5">
                    {CAMPOS.map((c, i) => (
                      <li key={c.num}>
                        <div className="cs-idx" data-active={activo === i}>
                          <span className="font-mono text-[11px] tracking-[0.14em]">{c.num}</span>
                          <span className="text-[14.5px] font-semibold">{c.nombre}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Columna derecha: hoja de ficha */}
              <div ref={fichaRef} className="cs-sheet px-6 py-7 md:px-9 md:py-9">
                <div className="flex items-baseline justify-between gap-4 border-b pb-5" style={{ borderColor: "rgba(252, 92, 31,0.16)" }}>
                  <span className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
                    Ficha de caso · RCKT.es
                  </span>
                  <span className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">Nº —</span>
                </div>

                {CAMPOS.map((c, i) => (
                  <div key={c.num} data-field={i} className="cs-rev cs-field py-7">
                    <div className="flex items-baseline gap-4">
                      <span className="font-serif-accent text-[32px] leading-none">{c.num}</span>
                      <h3 className="font-display text-[20px] font-semibold tracking-tight">{c.nombre}</h3>
                    </div>
                    <p className="mt-2 text-[15px] leading-[1.6] text-muted-foreground">{c.desc}</p>
                    <div className="cs-bar mt-4" aria-hidden="true" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 4 · Filtros y fichas */}
        <section className="relative" style={{ background: "var(--kraft)", overflow: "clip" }}>
          <div ref={fichasRef} className="mx-auto max-w-6xl px-5 py-24 md:px-6 md:py-32">
            <div className="mb-4 flex items-center gap-3">
              <span className="inline-block h-4 w-[2px] bg-orange" />
              <span className="label-orange">Fichas</span>
            </div>
            <h2 className="font-display text-[30px] leading-[1.12] font-semibold tracking-tight md:text-[38px]">
              Casos <em className="font-serif-accent">publicados.</em>
            </h2>

            {/* Barra de filtros */}
            <div className="cs-selbar mt-8 flex flex-col gap-3 rounded-[20px] p-4 md:flex-row md:items-center md:gap-4 md:rounded-full md:px-5 md:py-3">
              <Selector label="Sector" options={SECTORES} value={sector} onChange={setSector} />
              <Selector label="Sistema" options={SISTEMAS} value={sistema} onChange={setSistema} />
              <Selector label="Ciudad" options={CIUDADES} value={ciudad} onChange={setCiudad} />
              {hayFiltros ? (
                <button
                  type="button"
                  onClick={limpiar}
                  className="self-start text-[13.5px] font-semibold text-orange hover:underline md:ml-auto md:self-auto"
                >
                  Quitar filtros
                </button>
              ) : null}
            </div>

            {filtrados.length === 0 ? (
              <>
                <div className="mt-12 grid gap-6 md:grid-cols-3">
                  {["Ficha 01", "Ficha 02", "Ficha 03"].map((f, i) => (
                    <article key={f} data-reveal className="cs-rev cs-dossier p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 space-y-3 pt-1">
                          <div className="cs-skel" style={{ width: "72%" }} />
                          <div className="cs-skel" style={{ width: "54%" }} />
                        </div>
                      </div>
                      <div className="mt-8 space-y-3">
                        <div className="cs-skel" style={{ width: "100%" }} />
                        <div className="cs-skel" style={{ width: "88%" }} />
                        <div className="cs-skel" style={{ width: "64%" }} />
                        <div className="cs-skel" style={{ width: "40%" }} />
                      </div>
                      <p className="font-serif-accent mt-8 text-[20px]">{f}</p>
                      <span className="sr-only">Ficha en preparación {i + 1}</span>
                    </article>
                  ))}
                </div>

                <div className="mx-auto mt-14 max-w-[620px] text-center">
                  <p className="text-[16px] leading-[1.6] text-foreground">
                    Publicaremos las primeras fichas cuando tengan línea base y resultado medido.
                  </p>
                  <p className="mt-3 text-[14px] leading-[1.6] text-muted-foreground">
                    Primero casos de España. Un caso de otro mercado solo se publica si el sector coincide, y siempre
                    indicando su país.
                  </p>
                </div>
              </>
            ) : (
              <div className="mt-12">
                {filtrados.map((c) => (
                  <article key={c.slug} data-reveal className="cs-rev cs-row px-1 py-7 md:px-3">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
                      <span>{c.sector}</span>
                      <span aria-hidden="true">·</span>
                      <span>{c.sistema}</span>
                      <span aria-hidden="true">·</span>
                      <span>{c.ciudad}</span>
                      <span aria-hidden="true">·</span>
                      <span>{c.periodo}</span>
                    </div>
                    <h3 className="font-display mt-3 max-w-[38ch] text-[22px] leading-[1.2] font-semibold tracking-tight md:text-[26px]">
                      {c.titular}
                    </h3>
                    <span className="mt-4 inline-flex items-center gap-1 text-[13.5px] font-semibold text-orange">
                      Ver ficha →
                    </span>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        <CtaFinal />
      </main>
      <SiteFooter />
    </div>
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
          <div className="mb-4">
            <span className="label-orange">¿Empezamos?</span>
          </div>
          <h2
            className="font-display text-[34px] leading-[1.08] font-semibold tracking-tight md:text-[56px]"
            style={{ color: "#FFFFFF" }}
          >
            ¿Por dónde <em className="font-serif-accent">empezamos?</em>
          </h2>
          <div className="mt-10 flex justify-center">
            <a
              href="/sistemas/revenue-diagnostic"
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

export const Route = createFileRoute("/casos/")({
  head: () => ({
    meta: [
      { title: "Casos con ficha completa | RCKT.es" },
      {
        name: "description",
        content:
          "Casos de RCKT con situación inicial, inversión, intervención, resultado y método de medición. Ninguna cifra sin su denominador.",
      },
      { property: "og:title", content: "Casos con ficha completa | RCKT.es" },
      {
        property: "og:description",
        content:
          "Casos de RCKT con situación inicial, inversión, intervención, resultado y método de medición. Ninguna cifra sin su denominador.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.rckt.es/casos" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://www.rckt.es/casos" }],
  }),
  component: CasosPage,
});
