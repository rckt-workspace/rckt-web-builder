import { useEffect, useRef, useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Toaster, toast } from "sonner";
import SiteNav from "@/components/rckt/SiteNav";
import SiteFooter from "@/components/rckt/SiteFooter";
import heroPhotoAsset from "@/assets/rckt-hero-sunset.png.asset.json";


const heroPhoto = heroPhotoAsset.url;

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "RCKT — Sistemas de crecimiento con IA | Resultados, no horas" },
      {
        name: "description",
        content:
          "Diseñamos y operamos sistemas de marketing con IA: medios, creativo, visibilidad en ChatGPT y ventas por conversación. Pagas por resultados medibles. Empieza con un diagnóstico.",
      },
      { property: "og:title", content: "RCKT — Sistemas de crecimiento con IA" },
      {
        property: "og:description",
        content:
          "Diseñamos y operamos sistemas de marketing con IA. Pagas por resultados medibles, no por horas.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://www.rckt.es/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "RCKT",
          description:
            "Diseñamos y operamos sistemas de marketing con IA: medios, creativo, visibilidad en ChatGPT y ventas por conversación. Pagas por resultados medibles.",
          url: "https://www.rckt.es/",
          email: "contacto@rckt.es",
          areaServed: "Worldwide",
          knowsAbout: [
            "Performance marketing",
            "Creative direction",
            "Answer Engine Optimization (AEO)",
            "Conversational sales",
            "Artificial intelligence marketing",
          ],
        }),
      },
    ],
  }),
});

// ─── Nav: src/components/rckt/SiteNav.tsx ───────────────────────────────────


// ─── Hero ────────────────────────────────────────────────────────────────────

function useTyping(line: string, cps = 24) {
  const [out, setOut] = useState("");
  useEffect(() => {
    let i = 0;
    const id = window.setInterval(() => {
      i = Math.min(line.length, i + Math.max(1, Math.round(line.length / (1000 / cps / 16))));
      setOut(line.slice(0, i));
      if (i >= line.length) window.clearInterval(id);
    }, 16);
    return () => window.clearInterval(id);
  }, [line, cps]);
  return out;
}

function TerminalLine() {
  const text = useTyping(
    "$ rckt --brief “para la próxima board meeting: un crecimiento que podamos defender con números.”",
  );
  return (
    <p className="font-mono text-[11px] leading-relaxed text-paper/50 md:text-xs">
      <span aria-hidden="true">{text}</span>
      <span className="sr-only">
        rckt --brief “para la próxima board meeting: un crecimiento que podamos defender con
        números.”
      </span>
      <span className="rckt-caret" aria-hidden="true">
        &nbsp;
      </span>
    </p>
  );
}

const HERO_TITLE = "No vendemos horas.\nInstalamos un sistema.";
const HERO_ITALIC_START = HERO_TITLE.indexOf("un sistema.");

function HeroTypewriter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(HERO_TITLE.length);
      return;
    }
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setCount(i);
      if (i >= HERO_TITLE.length) window.clearInterval(id);
    }, 45);
    return () => window.clearInterval(id);
  }, []);

  const typed = HERO_TITLE.slice(0, count);
  const plain = typed.slice(0, Math.min(typed.length, HERO_ITALIC_START));
  const italic = typed.slice(HERO_ITALIC_START > typed.length ? typed.length : HERO_ITALIC_START);
  const lines = plain.split("\n");

  return (
    <>
      {lines.map((line, i) => (
        <span key={i}>
          {i > 0 && <br />}
          {line}
        </span>
      ))}
      <em className="font-serif-accent">{italic}</em>
      {count < HERO_TITLE.length && <span className="rckt-caret" aria-hidden="true" />}
    </>
  );
}

function Hero() {
  return (
    <section
      className="section-light relative overflow-hidden"
      id="top"
    >
      {/* Glows radiales naranja + azul */}
      <div
        className="glow-hero-blue pointer-events-none absolute -top-[200px] -left-[10%] h-[600px] w-[600px]"
        aria-hidden="true"
      />
      <div
        className="glow-hero-orange pointer-events-none absolute -right-[5%] -bottom-[250px] h-[700px] w-[700px]"
        aria-hidden="true"
      />

      {/* Foto de fondo con degradado blanco de legibilidad */}
      <div className="hero-photo" aria-hidden="true">
        <img src={heroPhoto} alt="" className="hero-photo-img" />
        <div className="hero-photo-fade" />
      </div>

      <p className="hero-tagline font-display absolute right-5 bottom-6 z-10 text-right text-[10px] tracking-[0.22em] uppercase md:right-10 md:bottom-10 md:text-xs">
        People move ideas. Ideas move people.
      </p>


      <div className="relative z-10 mx-auto max-w-6xl px-5 md:px-6 pt-32 pb-24 md:pt-40 md:pb-32">
        <p className="label-orange rckt-reveal">
          Sistemas de crecimiento con IA
        </p>
        <h1 className="mt-6 max-w-4xl font-display text-[42px] leading-[1.05] font-semibold tracking-tight text-paper md:text-[74px]">
          <HeroTypewriter />
        </h1>
        <p
          className="rckt-reveal mt-2 font-display text-[42px] leading-[1.05] font-semibold tracking-tight text-paper md:text-[74px]"
          style={{ animationDelay: "120ms" }}
        >
          y respondemos por él.
        </p>
        <p
          className="rckt-reveal mt-6 max-w-xl text-base leading-relaxed text-paper/60 md:text-lg"
          style={{ animationDelay: "160ms" }}
        >
          Medios, creativo, visibilidad en ChatGPT y ventas por conversación. Sistemas de
          marketing que operan con IA y responden por resultados medibles — no por entregables.
        </p>
        <div
          className="rckt-reveal mt-10 flex flex-wrap items-center gap-4"
          style={{ animationDelay: "240ms" }}
        >
          <a
            href="#contacto"
            className="btn-orange inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-medium"
          >
            Pedir diagnóstico
          </a>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent("rckt:advisor-open"))}
            className="btn-outline-lt inline-flex cursor-pointer items-center justify-center rounded-full px-7 py-3 text-sm font-medium"
          >
            Ver cómo trabajamos
          </button>
        </div>
        <div
          className="rckt-reveal mt-14 max-w-2xl rounded-2xl px-5 py-4"
          style={{
            animationDelay: "320ms",
            border: "1px solid var(--line-lt)",
            background: "rgba(255,255,255,0.55)",
          }}
        >
          <TerminalLine />
        </div>
      </div>
    </section>
  );
}

// ─── Divisoria / estadísticas ────────────────────────────────────────────────

const STATS = [
  {
    value: "90 días",
    color: "text-orange",
    label: "de diagnóstico y sistema instalado antes de escalar inversión.",
  },
  {
    value: "4",
    color: "text-blue-soft",
    label: "sistemas operando en paralelo: medios, creativo, respuestas y conversación.",
  },
  {
    value: "1",
    color: "text-paper",
    label: "responsable del resultado. Sin subcontratas, sin capas de coordinación.",
  },
];

function Divisoria() {
  return (
    <section className="section-deep-alt relative overflow-hidden">
      <div className="deco-dots top-8 left-6 md:left-10" aria-hidden="true" />
      <div className="deco-blob -right-32 -bottom-40" aria-hidden="true" />
      <div className="mx-auto max-w-6xl px-5 md:px-6 py-14 md:py-20">
        <div className="mb-10 flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="num-orange">01.</span>
          <span className="font-script text-3xl text-orange-2 md:text-4xl">precisión</span>
          <div className="rule-lt" />
          <span className="label-orange">El mercado cambió de lado</span>
        </div>
        <h2 className="max-w-3xl font-display text-3xl leading-tight font-semibold text-paper md:text-5xl">
          El mercado ya no premia la cobertura.
          <br />
          Premia <em className="font-serif-accent">la precisión.</em>
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-paper/60 md:text-lg">
          Comprar alcance es fácil. Construir un sistema que aprende y decide es otra cosa. La
          pregunta ya no es cuánto inviertes en marketing. Es quién responde por el resultado.
        </p>
        <div className="mt-14 grid gap-x-8 gap-y-10 md:grid-cols-3">
          {STATS.map((s) => (
            <div key={s.value} className="border-t pt-5" style={{ borderColor: "var(--line-lt)" }}>
              <p className={`font-display text-5xl font-semibold tracking-tight md:text-6xl ${s.color}`}>
                {s.value}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-paper/50">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Sistema / manifiesto ────────────────────────────────────────────────────

const PILARES = [
  {
    num: "01",
    title: "Diagnóstico antes que táctica",
    text: "No tocamos nada hasta entender dónde se genera el valor y dónde se fuga.",
  },
  {
    num: "02",
    title: "Sistema antes que escala",
    text: "Escalar algo roto solo acelera la fuga. Primero la estructura, después el volumen.",
  },
  {
    num: "03",
    title: "Resultados antes que actividad",
    text: "Cada línea de trabajo está ligada a los resultados que producen, no a las horas que consumen.",
  },
];

function Sistema() {
  return (
    <section id="sistema" className="relative isolate overflow-hidden mx-auto max-w-6xl scroll-mt-28 px-6 py-14 md:py-20">
      <div className="mb-10 flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="num-orange">02.</span>
        <div className="rule" />
        <span className="label-orange">Un sistema operativo de crecimiento</span>
      </div>
      <h2 className="max-w-3xl font-display text-3xl leading-tight font-semibold md:text-5xl">
        No hacemos campañas.
        <br />
        Instalamos <em className="font-serif-accent">un sistema operativo</em> de crecimiento.
      </h2>

      <div className="mt-16 grid gap-x-10 gap-y-12 md:grid-cols-3">
        {PILARES.map((p) => (
          <div key={p.num} className="relative border-t pt-10" style={{ borderColor: "var(--line)" }}>
            <span
              className="font-display pointer-events-none absolute top-2 right-0 text-[64px] leading-none font-semibold select-none md:text-[100px]"
              style={{ color: "rgba(10, 16, 36, 0.07)" }}
              aria-hidden="true"
            >
              {p.num}
            </span>
            <p className="num-orange relative text-lg">{p.num}</p>
            <h3 className="relative mt-8 font-display text-xl font-semibold">{p.title}</h3>
            <p className="relative mt-3 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
          </div>
        ))}
      </div>

      <div className="card-kraft card-soft mx-auto mt-20 max-w-3xl p-8 text-center md:p-10">
        <p className="font-script text-3xl text-orange md:text-4xl">Juicio.</p>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg" style={{ textAlign: "center" }}>
          La IA ejecuta. Las personas deciden. Cada recomendación pasa por alguien que conoce tu
          negocio antes de tocar el mercado.
        </p>
      </div>
    </section>
  );
}

// ─── Servicios ───────────────────────────────────────────────────────────────

const DIAGNOSTICOS = [
  {
    num: "D1",
    title: "Motor de Respuestas",
    what: "Auditamos y reconstruimos cómo aparece tu empresa en ChatGPT, Claude, Perplexity y Gemini. Qué preguntas activan tu categoría, qué responden hoy los modelos y qué hay que cambiar para que la respuesta te incluya.",
    includes: ["Mapa de preguntas de la categoría", "Brecha de visibilidad frente a competidores", "Plan de contenidos y señales de autoridad"],
    metric: "Visibilidad en respuestas de IA",
  },
  {
    num: "D2",
    title: "Sistema de Conversación",
    what: "Auditamos tu flujo comercial completo — mensajes, tiempos, seguimiento, cierre — y diseñamos el sistema de venta por conversación con agentes de IA supervisados por tu equipo.",
    includes: ["Mapa del flujo comercial actual", "Diseño del sistema de conversación", "Protocolo de supervisión humana"],
    metric: "Conversaciones que cierran",
  },
];

const SISTEMAS = [
  {
    num: "S1",
    title: "Medios + Creativo",
    desc: "Planificación y ejecución de medios con creatividad generativa. Cada euro de inversión se mide contra pipeline, no contra clics.",
    metric: "Pipeline generado",
  },
  {
    num: "S2",
    title: "Motor de Respuestas",
    desc: "Tu empresa como respuesta en los motores de IA. Contenido, señales de autoridad y estructura técnica para que los modelos te citen.",
    metric: "Visibilidad y citas en IA",
  },
  {
    num: "S3",
    title: "Sistema de Conversación",
    desc: "Agentes de IA que venden por WhatsApp, web y correo, supervisados por tu equipo comercial. Cada conversación con contexto y criterio de cierre.",
    metric: "Tasa de cierre por canal",
  },
  {
    num: "S4",
    title: "Infraestructura de Decisión",
    desc: "Datos, atribución y tableros que convierten la actividad en decisiones. Una sola fuente de verdad para marketing y ventas.",
    metric: "Decisiones con datos propios",
  },
];

const AGENTES = [
  {
    num: "T1",
    title: "Agente de Respuestas",
    desc: "Monitorea cómo responden los modelos de IA sobre tu categoría y ejecuta el plan de visibilidad de forma continua.",
  },
  {
    num: "T2",
    title: "Agente de Conversación",
    desc: "Atiende, califica y hace seguimiento en tus canales de conversación, con escalado a humanos cuando el criterio lo exige.",
  },
  {
    num: "T3",
    title: "Agente de Decisión",
    desc: "Consolida señales de todos los sistemas y propone decisiones de inversión y prioridad cada semana.",
  },
];

function ServiceCard({
  num,
  title,
  subtitle,
  what,
  includes,
  metric,
}: {
  num: string;
  title: string;
  subtitle: string;
  what: string;
  includes: string[];
  metric: string;
}) {
  return (
    <article className="card-kraft group grid gap-8 p-8 md:grid-cols-[96px_1fr_1.2fr] md:p-10">
      <span className="font-display text-3xl font-semibold text-orange md:text-4xl">{num}</span>
      <div>
        <h3 className="font-display text-2xl font-semibold">{title}</h3>
        <p className="mt-1 text-sm font-medium text-blue">{subtitle}</p>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{what}</p>
      </div>
      <div>
        <p className="label-orange !text-[10px]">Incluye</p>
        <ul className="mt-3 space-y-2">
          {includes.map((i) => (
            <li key={i} className="flex gap-2.5 text-sm text-muted-foreground">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-orange" aria-hidden="true" />
              {i}
            </li>
          ))}
        </ul>
        <p className="mt-5 border-t pt-4 text-sm" style={{ borderColor: "var(--line)" }}>
          <span className="text-muted-foreground">Se mide en: </span>
          <span className="font-display font-semibold text-foreground">{metric}</span>
        </p>
      </div>
    </article>
  );
}

function Servicios() {
  return (
    <section id="servicios" className="relative isolate overflow-hidden mx-auto max-w-6xl scroll-mt-28 px-6 py-14 md:py-20">
      <div className="mb-10 flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="num-orange">03.</span>
        <div className="rule" />
        <span className="label-orange">Servicios</span>
      </div>
      <h2 className="max-w-3xl font-display text-3xl leading-tight font-semibold md:text-5xl">
        Empieza por <em className="font-serif-accent">aquí.</em>
      </h2>

      {/* Diagnósticos */}
      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {DIAGNOSTICOS.map((d, i) => (
          <article
            key={d.num}
            className="card-kraft p-8 md:p-10"
            style={{ borderLeft: `3px solid ${i === 0 ? "var(--orange)" : "var(--blue)"}` }}
          >
            <p className="num-orange text-base">{d.num}</p>
            <h3 className="mt-2 font-display text-2xl font-semibold">{d.title}</h3>
            <p className="mt-1 text-sm font-medium text-blue">Diagnóstico · 2–3 semanas</p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{d.what}</p>
            <p className="label-orange mt-6 !text-[10px]">Incluye</p>
            <ul className="mt-3 space-y-2">
              {d.includes.map((inc) => (
                <li key={inc} className="flex gap-2.5 text-sm text-muted-foreground">
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-orange" aria-hidden="true" />
                  {inc}
                </li>
              ))}
            </ul>
            <p className="mt-5 border-t pt-4 text-sm" style={{ borderColor: "var(--line)" }}>
              <span className="text-muted-foreground">Se mide en: </span>
              <span className="font-display font-semibold">{d.metric}</span>
            </p>
            <a
              href="#contacto"
              onClick={() => presetConcern(d.title)}
              className="mt-5 inline-block border-b-2 border-orange pb-0.5 text-sm font-medium text-foreground transition-colors hover:text-orange"
            >
              Empezar por aquí →
            </a>
          </article>
        ))}
      </div>

      {/* Sistemas */}
      <div className="mt-24">
        <h3 className="max-w-2xl font-display text-2xl leading-tight font-semibold md:text-4xl">
          Luego, el <em className="font-serif-accent">sistema completo.</em>
        </h3>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
          Cuatro sistemas que operan como uno. Cada uno con su métrica, su responsable y su
          cadencia de mejora.
        </p>
        <div className="mt-12">
          {SISTEMAS.map((s) => (
            <div
              key={s.num}
              className="grid items-start gap-4 border-t py-8 md:grid-cols-[90px_1fr_1.3fr] md:gap-8"
              style={{ borderColor: "var(--line)" }}
            >
              <span className="font-display text-3xl font-semibold text-orange">{s.num}</span>
              <div>
                <h4 className="font-display text-xl font-semibold">{s.title}</h4>
                <p className="mt-1 text-sm font-medium text-blue">Operación continua</p>
              </div>
              <div>
                <p className="text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                <p className="mt-3 text-sm">
                  <span className="text-muted-foreground">Se mide en: </span>
                  <span className="font-display font-semibold">{s.metric}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Growth Partners */}
      <div className="card-stripe mt-24 p-8 md:p-10">
        <p className="num-orange">P</p>
        <div className="mt-2 flex flex-wrap items-baseline gap-x-3">
          <h3 className="font-display text-2xl font-semibold">Growth Partners</h3>
          <p className="text-sm font-medium text-blue">Acompañamiento continuo · 3–12 meses</p>
        </div>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Tu equipo de crecimiento externo: dirección de los cuatro sistemas, agentes dedicados y
          revisión semanal de decisiones. Pocas compañías al año. Las que encajan, escalan.
        </p>
        <div className="mt-6 grid gap-x-8 gap-y-3 border-t pt-6 text-sm md:grid-cols-3" style={{ borderColor: "var(--line)" }}>
          <p>
            <span className="text-muted-foreground">Mínimo: </span>
            <span className="font-display font-semibold">3 meses</span>
          </p>
          <p>
            <span className="text-muted-foreground">Precio: </span>
            <span className="font-display font-semibold">Según alcance</span>
          </p>
          <p>
            <span className="text-muted-foreground">Se mide en: </span>
            <span className="font-display font-semibold">Crecimiento atribuible</span>
          </p>
        </div>
        <a
          href="#contacto"
          onClick={() => presetConcern("Growth Partners")}
          className="mt-6 inline-block border-b-2 border-orange pb-0.5 text-sm font-medium transition-colors hover:text-orange"
        >
          Aplicar como partner →
        </a>
      </div>

      {/* Agentes dedicados */}
      <div className="mt-24">
        <h3 className="max-w-2xl font-display text-2xl leading-tight font-semibold md:text-4xl">
          Agentes <em className="font-serif-accent">dedicados.</em>
        </h3>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
          Un agente de IA entrenado con tu información, supervisado por nosotros, integrado en tus
          canales.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {AGENTES.map((t) => (
            <article key={t.num} className="card-kraft p-7">
              <p className="num-orange text-base">{t.num}</p>
              <h4 className="mt-2 font-display text-lg font-semibold">{t.title}</h4>
              <p className="mt-1 text-xs font-medium text-blue">Agente dedicado</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.desc}</p>
            </article>
          ))}
        </div>
        <div className="card-stripe mt-8 flex flex-wrap items-center justify-between gap-4 p-6">
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            <span className="font-display font-semibold text-foreground">Stack completo:</span> los
            tres agentes operando como un solo sistema, con un único responsable de resultados.
          </p>
          <a
            href="#contacto"
            onClick={() => presetConcern("Stack completo de agentes")}
            className="inline-block border-b-2 border-orange pb-0.5 text-sm font-medium transition-colors hover:text-orange"
          >
            Hablar del stack →
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Lo que no vendemos ──────────────────────────────────────────────────────

function NoVendemos() {
  return (
    <section className="section-deep relative overflow-hidden">
      <div className="deco-dots top-10 left-6 md:left-10" aria-hidden="true" />
      <div className="deco-blob -top-40 -left-32" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-6xl px-5 md:px-6 py-14 md:py-20">
        <p className="label-orange">Lo que no vendemos</p>
        <h2 className="mt-6 max-w-3xl font-display text-3xl leading-tight font-semibold text-paper md:text-5xl">
          No vendemos campañas.
          <br />
          Instalamos <em className="font-serif-accent">sistemas.</em>
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-paper/60">
          Las campañas terminan. Los sistemas quedan — aprendiendo, decidiendo y produciendo
          resultados que se pueden defender en una board meeting.
        </p>
        <p className="font-script mt-8 text-3xl text-orange-2 md:text-4xl">
          lo que queda, opera.
        </p>
      </div>
    </section>
  );
}

// ─── Método ──────────────────────────────────────────────────────────────────

const PASOS = [
  {
    num: "01",
    title: "Diagnóstico",
    text: "Dos a tres semanas para entender dónde está el valor, dónde se fuga y qué sistema hace falta.",
  },
  {
    num: "02",
    title: "Instalación",
    text: "Noventa días para dejar el sistema operando: medios, respuestas, conversación y decisión.",
  },
  {
    num: "03",
    title: "Operación",
    text: "El sistema corre y mejora cada semana. Tú decides con datos; nosotros respondemos por el resultado.",
  },
];

function Metodo() {
  return (
    <section id="metodo" className="relative isolate overflow-hidden mx-auto max-w-6xl scroll-mt-28 px-6 py-14 md:py-20">
      <div className="blob-grande" aria-hidden="true" />
      <div className="mb-10 flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="num-orange">04.</span>
        <span className="font-script text-3xl text-orange md:text-4xl">paso a paso</span>
        <div className="rule" />
        <span className="label-orange">Método</span>
      </div>
      <h2 className="max-w-3xl font-display text-3xl leading-tight font-semibold md:text-5xl">
        Un método, <em className="font-serif-accent">no un pitch.</em>
      </h2>
      <div className="mt-16 grid gap-x-10 gap-y-12 md:grid-cols-3">
        {PASOS.map((p) => (
          <div key={p.num} className="border-t-2 pt-6" style={{ borderColor: "var(--orange)" }}>
            <p className="font-display text-2xl font-semibold text-orange">{p.num}</p>
            <h3 className="mt-3 font-display text-xl font-semibold">{p.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Principios ──────────────────────────────────────────────────────────────

const PRINCIPIOS = [
  {
    title: "Diagnóstico antes que táctica",
    text: "Ninguna recomendación sin entender primero el negocio. Ninguna.",
  },
  {
    title: "Sistema antes que escala",
    text: "El volumen amplifica lo que existe. Si la estructura falla, la escala la rompe.",
  },
  {
    title: "Resultados antes que actividad",
    text: "Medimos lo que el negocio siente: pipeline, cierre, crecimiento atribuible.",
  },
  {
    title: "Juicio humano en el loop",
    text: "La IA propone y ejecuta. Las decisiones de negocio las toman personas que conocen el contexto.",
  },
];

function Principios() {
  return (
    <section id="principios" className="relative isolate overflow-hidden mx-auto max-w-6xl scroll-mt-28 px-6 pb-14 md:pb-20">
      <div className="mb-10 flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="num-orange">—</span>
        <div className="rule" />
        <span className="label-orange">Principios</span>
      </div>
      <h2 className="max-w-3xl font-display text-3xl leading-tight font-semibold md:text-5xl">
        Cuatro principios que no se negocian.
      </h2>
      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {PRINCIPIOS.map((p, i) => (
          <div
            key={p.title}
            className="card-kraft p-8"
            style={{ borderTop: `2px solid ${i % 2 === 0 ? "var(--orange)" : "var(--blue)"}` }}
          >
            <h3 className="font-display text-lg font-semibold">{p.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────

const FAQS = [
  {
    q: "¿En qué se diferencia esto de una agencia?",
    a: "Una agencia vende horas y entregables. Nosotros instalamos un sistema que opera con IA, lo medimos contra resultados de negocio y respondemos por ellos. La relación empieza con un diagnóstico, no con una propuesta de campaña.",
  },
  {
    q: "¿Cuánto tarda en verse el resultado?",
    a: "El diagnóstico toma de 2 a 3 semanas. La instalación del sistema, unos 90 días. A partir de ahí, cada semana hay datos para decidir: qué escalar, qué corregir y qué apagar.",
  },
  {
    q: "¿La IA reemplaza a nuestro equipo?",
    a: "No. La IA ejecuta con velocidad y memoria; las personas deciden con juicio y contexto. Cada sistema tiene supervisión humana explícita, y las decisiones de negocio siempre las toma una persona.",
  },
  {
    q: "¿Cómo se mide el resultado?",
    a: "Cada sistema tiene una métrica de negocio: pipeline generado, visibilidad en respuestas de IA, tasa de cierre por canal, decisiones tomadas con datos propios. Nada de métricas de vanidad.",
  },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative isolate overflow-hidden mx-auto max-w-6xl scroll-mt-28 px-6 pb-14 md:pb-20">
      <div className="blob-esquina" aria-hidden="true" />
      <div className="mb-10 flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="num-orange">05.</span>
        <div className="rule" />
        <span className="label-orange">FAQ</span>
      </div>
      <h2 className="max-w-3xl font-display text-3xl leading-tight font-semibold md:text-5xl">
        Preguntas <em className="font-serif-accent">frecuentes.</em>
      </h2>
      <div className="mt-12">
        {FAQS.map((f, i) => (
          <div key={f.q} className="border-b" style={{ borderColor: "var(--line)" }}>
            <button
              type="button"
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
              className="flex w-full cursor-pointer items-center justify-between gap-6 border-t py-6 text-left"
              style={{ borderColor: "var(--line)" }}
            >
              <span className="font-display text-lg font-semibold">{f.q}</span>
              <span
                className={`font-display text-2xl text-orange transition-transform duration-300 ${
                  open === i ? "rotate-45" : ""
                }`}
                aria-hidden="true"
              >
                +
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                open === i ? "grid-rows-[1fr] pb-6 opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
                  {f.a}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Contacto ────────────────────────────────────────────────────────────────

const CONCERNS = [
  "Diagnóstico Motor de Respuestas",
  "Diagnóstico Sistema de Conversación",
  "Sistemas (S1–S4)",
  "Growth Partners",
  "Agentes dedicados",
  "Stack completo de agentes",
  "Otro",
];

const CONCERN_EVENT = "rckt:concern";

function presetConcern(c: string) {
  window.dispatchEvent(new CustomEvent(CONCERN_EVENT, { detail: c }));
}

const inputClass =
  "w-full rounded-xl border px-4 py-3 text-sm text-paper outline-none transition placeholder:text-paper/40 focus:border-orange/60";

const inputStyle = {
  borderColor: "var(--line-lt)",
  background: "rgba(255,255,255,0.6)",
} as const;

function ContactForm() {
  const [concern, setConcern] = useState(CONCERNS[0]);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const onPreset = (e: Event) => setConcern((e as CustomEvent<string>).detail);
    window.addEventListener(CONCERN_EVENT, onPreset);
    return () => window.removeEventListener(CONCERN_EVENT, onPreset);
  }, []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;
    const form = e.currentTarget;
    const data = new FormData(form);
    setSending(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") ?? ""),
          company: String(data.get("company") ?? ""),
          email: String(data.get("email") ?? ""),
          concern,
          message: String(data.get("message") ?? ""),
          website: String(data.get("website") ?? ""),
        }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        toast.error(body?.error ?? "No se pudo enviar. Inténtalo de nuevo.");
        return;
      }
      setSent(true);
      form.reset();
      toast.success("Recibido. Respondemos en menos de 48 horas.");
    } catch {
      toast.error("Error de conexión. Inténtalo de nuevo.");
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div
        className="form-dark form-surface rounded-3xl p-10 text-center"
      >
        <p className="font-script text-4xl text-orange">Recibido.</p>
        <p className="mt-4 text-sm leading-relaxed text-paper">
          Tu solicitud ya está en el sistema. Te escribimos en menos de 48 horas con los próximos
          pasos.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-6 cursor-pointer text-sm text-paper underline underline-offset-4 transition-colors hover:text-paper"
        >
          Enviar otra solicitud
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      className="form-dark form-surface rounded-3xl p-8 md:p-10"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-xs font-medium tracking-wide text-paper uppercase">
            Nombre *
          </span>
          <input name="name" required maxLength={120} autoComplete="name" className={inputClass} style={inputStyle} />
        </label>
        <label className="block">
          <span className="mb-2 block text-xs font-medium tracking-wide text-paper uppercase">
            Empresa *
          </span>
          <input name="company" required maxLength={160} autoComplete="organization" className={inputClass} style={inputStyle} />
        </label>
        <label className="block">
          <span className="mb-2 block text-xs font-medium tracking-wide text-paper uppercase">
            Correo corporativo *
          </span>
          <input name="email" type="email" required maxLength={160} autoComplete="email" className={inputClass} style={inputStyle} />
        </label>
        <label className="block">
          <span className="mb-2 block text-xs font-medium tracking-wide text-paper uppercase">
            Motivo
          </span>
          <select
            value={concern}
            onChange={(e) => setConcern(e.target.value)}
            className={`${inputClass} cursor-pointer`}
            style={inputStyle}
          >
            {CONCERNS.map((c) => (
              <option key={c} value={c} className="bg-card text-card-foreground">
                {c}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className="mt-5 block">
        <span className="mb-2 block text-xs font-medium tracking-wide text-paper uppercase">
          Contexto (opcional)
        </span>
        <textarea
          name="message"
          rows={4}
          maxLength={2000}
          placeholder="Qué estás intentando resolver, en una frase."
          className={`${inputClass} resize-none`}
          style={inputStyle}
        />
      </label>
      {/* Honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      <button
        type="submit"
        disabled={sending}
        className="btn-orange mt-7 inline-flex w-full items-center justify-center rounded-full px-6 py-3.5 text-sm font-semibold disabled:opacity-60 sm:w-auto"
      >
        {sending ? "Enviando…" : "Pedir diagnóstico"}
      </button>
      <p className="mt-4 text-xs text-paper">
        Al enviar aceptas nuestra{" "}
        <a href="/privacidad" className="underline underline-offset-2 transition-colors hover:text-paper">
          política de privacidad
        </a>
        .
      </p>
    </form>
  );
}

function Contacto() {
  return (
    <section
      id="contacto"
      className="section-deep relative scroll-mt-20 overflow-hidden"
    >
      <div
        className="glow-cta pointer-events-none absolute right-[-10%] bottom-[-20%] h-[600px] w-[600px]"
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto max-w-6xl px-5 md:px-6 py-14 md:py-20">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <p className="label-orange">Diagnóstico</p>
            <h2 className="mt-6 font-display text-4xl leading-tight font-semibold text-paper md:text-5xl">
              Empieza por saber <em className="font-serif-accent">dónde estás.</em>
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-paper/60">
              Dos a tres semanas. Un mapa claro de dónde está el valor, dónde se fuga y qué
              sistema hace falta. Sin compromiso de continuidad.
            </p>
            <div className="mt-10 space-y-4 text-sm">
              {[
                "Respuesta en menos de 48 horas",
                "Número acotado de compañías por año",
                "contacto@rckt.es",
              ].map((t) => (
                <p key={t} className="flex items-center gap-3 text-paper/60">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange" aria-hidden="true" />
                  {t}
                </p>
              ))}
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────


// ─── Página ──────────────────────────────────────────────────────────────────

function useScrollReveal() {
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll("main > section")).slice(1);
    const targets: HTMLElement[] = [];

    sections.forEach((section) => {
      const blocks = section.querySelectorAll<HTMLElement>(":scope > div > *");
      const list = blocks.length ? Array.from(blocks) : [section as HTMLElement];
      list.forEach((el, i) => {
        el.classList.add("reveal-scroll");
        el.style.setProperty("--reveal-delay", `${Math.min(i, 5) * 80}ms`);
        targets.push(el);
      });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function Index() {
  useScrollReveal();
  return (
    <div className="bg-background text-foreground antialiased">
      <Toaster position="bottom-right" richColors closeButton />
      <SiteNav />
      <main>
        <Hero />
        <Divisoria />
        <Sistema />
        <Servicios />
        <NoVendemos />
        <Metodo />
        <Principios />
        <FAQ />
        <Contacto />
      </main>
      <SiteFooter />
    </div>
  );
}
