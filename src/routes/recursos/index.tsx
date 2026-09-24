import { createFileRoute, Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import SiteFooter from "@/components/rckt/SiteFooter";
import SiteNav from "@/components/rckt/SiteNav";
import SystemPageHero from "@/components/rckt/SystemPageHero";
import heroPhotoImg from "@/assets/rckt-hero-sunset.jpg";

const heroPhoto = heroPhotoImg;

type Tema = "lead-venta" | "medios" | "ia" | "whatsapp" | "web";
type Formato = "Guía" | "Artículo" | "Comparativa" | "Plantilla" | "Caso";

const TEMAS: {
  id: Tema;
  num: string;
  nombre: string;
  pregunta: string;
  sistema: string;
  href: "/sistemas/revenue-engine" | "/sistemas/demand-system" | "/sistemas/operations-system" | "/sistemas/sales-flow";
  angulo: string;
}[] = [
  {
    id: "lead-venta",
    num: "01",
    nombre: "Del lead a la venta",
    pregunta: "¿Por qué tengo leads y no ventas?",
    sistema: "Revenue Engine",
    href: "/sistemas/revenue-engine",
    angulo: "135deg",
  },
  {
    id: "medios",
    num: "02",
    nombre: "Medios con medición",
    pregunta: "¿Meta o Google? ¿Por qué mi agencia me da leads baratos que no compran?",
    sistema: "Demand System",
    href: "/sistemas/demand-system",
    angulo: "100deg",
  },
  {
    id: "ia",
    num: "03",
    nombre: "IA que se paga sola",
    pregunta: "¿Dónde me da retorno la IA?",
    sistema: "Operations System",
    href: "/sistemas/operations-system",
    angulo: "165deg",
  },
  {
    id: "whatsapp",
    num: "04",
    nombre: "WhatsApp y CRM",
    pregunta: "¿Cómo dejo de perder leads en WhatsApp?",
    sistema: "Sales Flow",
    href: "/sistemas/sales-flow",
    angulo: "205deg",
  },
  {
    id: "web",
    num: "05",
    nombre: "Web y conversión",
    pregunta: "¿Por qué mi web no genera oportunidades?",
    sistema: "Sales Flow",
    href: "/sistemas/sales-flow",
    angulo: "60deg",
  },
];


type Recurso = { tema: Tema; titulo: string; formato: Formato; extracto: string };

const DESTACADO: Recurso = {
  tema: "lead-venta",
  titulo: "Más leads no significa más ventas",
  formato: "Guía",
  extracto:
    "Por qué el volumen de leads no predice la venta, y qué medir en cada etapa para saber dónde se pierde el dinero.",
};

const RECURSOS: Recurso[] = [
  {
    tema: "lead-venta",
    titulo: "Cómo medir de lead a venta",
    formato: "Guía",
    extracto: "Qué eventos registrar y cómo conectarlos para ver el embudo completo.",
  },
  {
    tema: "lead-venta",
    titulo: "Cómo saber si te falta inversión o seguimiento",
    formato: "Artículo",
    extracto: "Dos problemas que se parecen y se resuelven distinto.",
  },
  {
    tema: "lead-venta",
    titulo: "Atribución frente a causalidad",
    formato: "Artículo",
    extracto: "Lo que la plataforma se atribuye y lo que de verdad causó la venta.",
  },
  {
    tema: "medios",
    titulo: "Meta frente a Google según intención",
    formato: "Comparativa",
    extracto: "Qué canal usar según lo que el cliente ya está buscando.",
  },
  {
    tema: "medios",
    titulo: "Google Ads genera leads pero no ventas",
    formato: "Artículo",
    extracto: "Las causas más comunes y cómo detectarlas en tu cuenta.",
  },
  {
    tema: "medios",
    titulo: "Por qué no optimizar por coste por lead",
    formato: "Artículo",
    extracto: "El lead barato suele ser el que no compra.",
  },
  {
    tema: "medios",
    titulo: "Qué es una conversión offline y por qué importa",
    formato: "Guía",
    extracto: "Cómo devolver a Meta y Google la señal de venta real.",
  },
  {
    tema: "ia",
    titulo: "IA para ventas sin humo",
    formato: "Guía",
    extracto: "Dónde la IA mejora la venta y dónde solo añade ruido.",
  },
  {
    tema: "ia",
    titulo: "Automatización de presupuestos",
    formato: "Caso",
    extracto: "Un proceso repetitivo, medido antes y después.",
  },
  {
    tema: "ia",
    titulo: "Cuánto cuesta automatizar un proceso",
    formato: "Plantilla",
    extracto: "Plantilla para calcular el coste por ejecución correcta.",
  },
  {
    tema: "ia",
    titulo: "Cómo medir la IA",
    formato: "Artículo",
    extracto: "Indicadores que sí dicen si un agente está funcionando.",
  },
  {
    tema: "whatsapp",
    titulo: "Pagaste por el lead: ¿cuánto tardas en responderlo?",
    formato: "Artículo",
    extracto: "Por qué el tiempo de respuesta decide la venta.",
  },
  {
    tema: "whatsapp",
    titulo: "Qué automatizar primero",
    formato: "Guía",
    extracto: "Por dónde empezar sin romper el proceso comercial.",
  },
  {
    tema: "web",
    titulo: "Diseño web no es decoración",
    formato: "Artículo",
    extracto: "Una web se mide por las oportunidades que genera.",
  },
  {
    tema: "web",
    titulo: "Rediseño o CRO",
    formato: "Comparativa",
    extracto: "Cuándo rehacer la web y cuándo optimizar la que tienes.",
  },
  {
    tema: "web",
    titulo: "Cómo conectar la web al CRM",
    formato: "Guía",
    extracto: "Que cada formulario llegue con su origen y su dueño.",
  },
];

function temaDe(id: Tema) {
  return TEMAS.find((t) => t.id === id)!;
}

function Portada({ tema }: { tema: Tema }) {
  const t = temaDe(tema);
  return (
    <div className="res-cover" style={{ ["--res-ang" as string]: t.angulo }} aria-hidden="true">
      <span className="res-cover__brand">RCKT</span>
      <span className="res-cover__theme">{t.nombre}</span>
    </div>
  );
}

function useReveal(count: number) {
  const ref = useRef<HTMLDivElement | null>(null);
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
      el.style.setProperty("--d", `${(i % 6) * 80}ms`);
      io.observe(el);
    });
    return () => io.disconnect();
  }, [count]);
  return ref;
}

function RecursosPage() {
  const [query, setQuery] = useState("");
  const [tema, setTema] = useState<Tema | "todos">("todos");


  const filtrados = useMemo(() => {
    const q = query.trim().toLowerCase();
    return RECURSOS.filter((r) => {
      if (tema !== "todos" && r.tema !== tema) return false;
      if (!q) return true;
      return r.titulo.toLowerCase().includes(q) || r.extracto.toLowerCase().includes(q);
    });
  }, [query, tema]);

  const gridRef = useReveal(filtrados.length);

  const limpiar = () => {
    setQuery("");
    setTema("todos");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main>
        <SystemPageHero
          label="Recursos"
          title={
            <>
              Respuestas antes de la <em className="font-serif-accent">primera llamada.</em>
            </>
          }
          descriptor="Artículos y guías para captar mejor, medir hasta la venta y usar la IA donde de verdad rinde."
          ctaLabel="Solicitar diagnóstico de captación →"
          ctaHref="/sistemas/revenue-diagnostic"
        />


        {/* Buscador + filtros + destacado + grid */}
        <section className="relative overflow-hidden pb-16 md:pb-24" style={{ background: "var(--kraft-2)" }}>
          <div className="mx-auto max-w-6xl px-5 pt-10 md:px-6 md:pt-16">
            <div className="max-w-md">
              <div className="relative">
                <Search
                  className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar recursos"
                  aria-label="Buscar recursos"
                  className="res-input w-full rounded-full py-3 pr-4 pl-11 text-[14px] text-foreground outline-none" 
                />
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <button type="button" className="res-filter" data-active={tema === "todos"} onClick={() => setTema("todos")}>
                Todos
              </button>
              {TEMAS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className="res-filter"
                  data-active={tema === t.id}
                  onClick={() => setTema(t.id)}
                >
                  {t.nombre}
                </button>
              ))}
            </div>


            {/* Destacado */}
            <div className="mt-12">
              <div className="mb-4 flex items-center gap-3">
                <span className="inline-block h-4 w-[2px] bg-orange" />
                <span className="label-orange">Destacado</span>
              </div>
              <article
                className="res-featured grid overflow-hidden rounded-[14px] md:grid-cols-2"
              >
                <Portada tema={DESTACADO.tema} />
                <div className="flex flex-col justify-center p-6 text-left md:p-8">
                  <div className="flex flex-wrap gap-2">
                    <span className="res-chip">{temaDe(DESTACADO.tema).nombre}</span>
                  </div>
                  <h2 className="font-display mt-4 text-[24px] leading-[1.15] font-semibold tracking-tight text-foreground md:text-[30px]">
                    {DESTACADO.titulo}
                  </h2>
                  <p className="mt-3 text-[15px] leading-[1.6] text-muted-foreground">{DESTACADO.extracto}</p>
                  <p className="mt-5 font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
                    {DESTACADO.formato} · Próximamente
                  </p>
                </div>
              </article>
            </div>

            {/* Grid */}
            {filtrados.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-[15px] text-muted-foreground">No hay recursos con esos filtros todavía.</p>
                <button
                  type="button"
                  onClick={limpiar}
                  className="mt-3 text-[14px] font-semibold text-orange hover:underline"
                >
                  Quitar filtros
                </button>
              </div>
            ) : (
              <div ref={gridRef} className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filtrados.map((r) => (
                  <article key={r.titulo} data-reveal className="res-card">
                    <Portada tema={r.tema} />
                    <div className="flex flex-1 flex-col p-5 text-left">
                      <span className="res-chip self-start">{temaDe(r.tema).nombre}</span>
                      <h3 className="font-display mt-3 text-[17px] leading-[1.25] font-semibold tracking-tight text-foreground">
                        {r.titulo}
                      </h3>
                      <p className="mt-2 text-[14px] leading-[1.55] text-muted-foreground">{r.extracto}</p>
                      <p className="mt-3 font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
                        {r.formato} · Próximamente
                      </p>
                      <span
                        className="mt-auto inline-flex items-center gap-1 pt-5 text-[13.5px] font-semibold"
                        style={{ color: "rgba(252, 92, 31,0.55)" }}
                      >
                        Leer →
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            )}

            <p className="mt-16 text-center text-[14px] text-muted-foreground">
              Sin registro ni formularios: los recursos se leen y se descargan libremente.
            </p>
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

export const Route = createFileRoute("/recursos/")({
  head: () => ({
    meta: [
      { title: "Recursos: guías y artículos sobre captación, medición e IA | RCKT.es" },
      {
        name: "description",
        content:
          "Guías, artículos y plantillas sobre las fugas entre la inversión en marketing y la venta: medición, medios, WhatsApp y CRM, web e IA supervisada.",
      },
      { property: "og:title", content: "Recursos: guías y artículos sobre captación, medición e IA | RCKT.es" },
      {
        property: "og:description",
        content:
          "Guías, artículos y plantillas sobre las fugas entre la inversión en marketing y la venta: medición, medios, WhatsApp y CRM, web e IA supervisada.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.rckt.es/recursos" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://www.rckt.es/recursos" }],
  }),
  component: RecursosPage,
});
