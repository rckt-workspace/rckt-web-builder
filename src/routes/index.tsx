import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Toaster } from "sonner";
import SiteNav from "@/components/rckt/SiteNav";
import SiteFooter from "@/components/rckt/SiteFooter";
import { SystemCards, SISTEMAS_CARDS } from "@/components/rckt/SystemCards";
import heroPhotoAsset from "@/assets/rckt-hero-sunset.png.asset.json";

const heroPhoto = heroPhotoAsset.url;

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "RCKT — Sistemas que convierten demanda en ventas" },
      {
        name: "description",
        content:
          "Diseñamos y operamos sistemas que convierten demanda en ventas: campañas, conversaciones, CRM e IA supervisada, medidos hasta el ingreso. Empieza con un Revenue Diagnostic.",
      },
      { property: "og:title", content: "RCKT — Sistemas que convierten demanda en ventas" },
      {
        property: "og:description",
        content:
          "Diseñamos y operamos sistemas que convierten demanda en ventas: campañas, conversaciones, CRM e IA supervisada, medidos hasta el ingreso. Empieza con un Revenue Diagnostic.",
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
            "Diseñamos y operamos sistemas que convierten demanda en ventas: campañas, conversaciones, CRM e IA supervisada, medidos hasta el ingreso. Empieza con un Revenue Diagnostic.",
          url: "https://www.rckt.es/",
          email: "hola@rckt.es",
          areaServed: "ES",
          knowsAbout: [
            "Performance marketing",
            "Creative direction",
            "AI Visibility",
            "Conversational sales",
            "Artificial intelligence marketing",
          ],
        }),
      },
    ],
  }),
});

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
      className="section-light relative overflow-clip"
      id="top"
    >
      {/* Glows radiales naranja + azul */}
      <div
        className="glow-hero-warm pointer-events-none absolute -top-[200px] -left-[10%] h-[600px] w-[600px]"
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
        <h1 className="mt-6 max-w-4xl font-display text-[34px] leading-[1.05] font-semibold tracking-tight text-paper md:text-[58px]">
          <HeroTypewriter />
        </h1>
        <p
          className="rckt-reveal mt-2 font-display text-[34px] leading-[1.05] font-semibold tracking-tight text-paper md:text-[58px]"
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
          className="rckt-reveal mt-5 flex flex-wrap items-center gap-4"
          style={{ animationDelay: "240ms" }}
        >
          <a
            href="/sistemas/revenue-diagnostic#formulario"
            className="btn-orange inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-medium"
          >
            Solicitar diagnóstico
          </a>
          <Link
            to="/nosotros/como-trabajamos"
            className="btn-outline-lt inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-medium"
          >
            Ver cómo trabajamos
          </Link>
        </div>
        <div
          className="rckt-reveal mt-14 max-w-2xl rounded-2xl px-5 py-4"
          style={{
            animationDelay: "320ms",
            border: "1px solid var(--line-lt)",
            background: "var(--card-surface)",
          }}
        >
          <TerminalLine />
        </div>
      </div>
    </section>
  );
}

// ─── Problemas (Sección 2) ───────────────────────────────────────────────────

const PROBLEMAS = [
  {
    num: "01",
    title: "Pago por leads y no sé cuáles compran",
    senales: [
      "Meta o Google reportan X conversiones y ventas reporta otra cosa",
      "los comerciales atienden WhatsApp fuera del CRM",
      "tardan más de una hora en responder",
      "muchos leads no se presentan a la cita",
      "la agencia actual optimiza por coste por lead",
    ],
    href: "/soluciones/captacion-y-cierre",
  },
  {
    num: "02",
    title: "Invierto en campañas y no crece con margen",
    senales: [
      "ROAS alto en la plataforma y margen bajo en el banco",
      "creatividad agotada",
      "catálogo sin lectura comercial",
      "WhatsApp en el proceso de venta sin medir",
    ],
    href: "/soluciones/ecommerce-rentable",
  },
  {
    num: "03",
    title: "Mi equipo hace lo mismo cien veces por semana",
    senales: [
      "presupuestos hechos a mano",
      "documentos que se copian entre sistemas",
      "correo + Excel + CRM sin conectar",
      "reporting manual",
      "errores y retrabajo",
    ],
    href: "/soluciones/operacion",
  },
];

function Problemas() {
  return (
    <section
      id="problemas"
      className="relative isolate overflow-clip scroll-mt-28 py-20 md:py-32"
    >
      <div className="problemas-bg" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-6 md:grid-cols-[35fr_65fr] md:gap-12">
          {/* Izquierda: label + titular */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="inline-block h-4 w-[2px] bg-orange" />
              <span className="label-orange">01. Tres problemas</span>
            </div>
            <h2 className="font-display text-[32px] leading-tight font-semibold tracking-tight md:text-[52px]">
              Entras por tu problema, no por el nombre de un{" "}
              <em className="font-serif-accent">sistema</em>.
            </h2>
          </div>
          {/* Derecha: 3 problemas */}
          <div className="flex flex-col gap-8">
            {PROBLEMAS.map((p) => (
              <article key={p.num} className="relative pl-5">
                <span className="absolute left-0 top-1 h-full w-px bg-[var(--line)]" />
                <div className="space-y-2">
                  <span className="num-orange">{p.num}</span>
                  <h3 className="text-[15px] leading-snug tracking-[-0.02em] font-semibold">
                    «{p.title}»
                  </h3>
                  <p className="text-[13.5px] leading-relaxed text-muted-foreground">
                    {p.senales.join(" · ")}
                  </p>
                  <div className="flex items-center gap-3 pt-1">
                    <Link
                      to={p.href}
                      className="text-[13px] font-medium text-orange hover:underline"
                    >
                      Ver solución →
                    </Link>
                    <a
                      href="/sistemas/revenue-diagnostic#formulario"
                      className="btn-orange inline-flex items-center justify-center rounded-full px-3 py-1 text-[12px] font-medium"
                    >
                      Revenue Diagnostic
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
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
    <section
      id="sistema"
      className="relative isolate overflow-clip scroll-mt-28 py-14 md:py-20"
      style={{ background: "var(--kraft)" }}
    >
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
          background:
            "radial-gradient(ellipse 700px 500px at 100% 0%, rgba(252, 92, 31,0.35) 0%, rgba(252, 92, 31,0.18) 40%, rgba(252, 92, 31,0) 75%)",
        }}
      />
      <div className="relative z-10 mx-auto max-w-6xl px-6">
      <div className="mb-10 flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="num-orange">02.</span>
        <div className="rule" />
        <span className="label-orange">Un sistema operativo de crecimiento</span>
      </div>

      <div className="grid gap-6 md:grid-cols-2 md:items-start md:gap-12">
        <h2 className="font-display text-3xl leading-tight font-semibold md:text-5xl">
          Tres sistemas, <em className="font-serif-accent">no más.</em>
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground md:text-base md:pt-2">
          Tres sistemas, no más — si algo no cabe en uno de los tres, no lo vendemos.
        </p>
      </div>

      <div className="mt-14">
        <SystemCards systems={SISTEMAS_CARDS} />
      </div>

      <div
        className="band-orange-sistema relative mt-10 overflow-hidden rounded-3xl px-8 py-10 md:px-12"
        style={{
          background: "linear-gradient(110deg, #fc5c1f 0%, #e04a12 100%)",
        }}
      >
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
            background:
              "radial-gradient(ellipse 700px 500px at 100% 0%, rgba(255,235,210,0.35) 0%, rgba(255,220,180,0.18) 40%, rgba(255,220,180,0) 75%)",
          }}
        />
        <h3 className="relative font-display text-2xl leading-tight font-semibold text-white md:text-3xl">
          Luego, el <span className="font-display text-3xl md:text-[2.6rem]">sistema completo.</span>
        </h3>
        <p className="relative mt-3 max-w-2xl text-sm leading-relaxed text-white/90 md:text-base">
          Demand + Sales Flow, combinados, son Revenue Engine — nuestro producto principal.
        </p>
        <Link
          to="/sistemas/revenue-engine"
          className="band-revenue-btn group relative mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#fc5c1f] transition-transform duration-200 hover:-translate-y-px"
        >
          Ver Revenue Engine
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1">
            <path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
      </div>
    </section>
  );
}

// ─── Prueba / pieza editorial ─────────────────────────────────────────────────

function Prueba() {
  return (
    <section
      id="prueba"
      className="relative isolate overflow-clip scroll-mt-28 py-20 md:py-28"
      style={{
        background: "linear-gradient(180deg, var(--surface-alt) 0%, var(--kraft) 100%)",
      }}
    >
      {/* Blob grande esquina superior izquierda */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-120px",
          left: "-100px",
          width: "380px",
          height: "380px",
          background: "rgba(252, 92, 31, 0.12)",
          borderRadius: "42% 58% 63% 37% / 45% 40% 60% 55%",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      {/* Blob pequeño esquina inferior derecha */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "-80px",
          right: "-60px",
          width: "220px",
          height: "220px",
          background: "rgba(252, 92, 31, 0.12)",
          borderRadius: "42% 58% 63% 37% / 45% 40% 60% 55%",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      {/* Trama de puntos esquina superior derecha */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "24px",
          right: "24px",
          width: "160px",
          height: "160px",
          zIndex: 0,
          pointerEvents: "none",
          backgroundImage:
            "radial-gradient(circle, rgba(252, 92, 31,0.25) 1.5px, transparent 1.5px)",
          backgroundSize: "16px 16px",
        }}
      />

      <div
        className="relative z-10 mx-auto px-6"
        style={{ maxWidth: "760px", textAlign: "center" }}
      >
        <div className="mb-4 flex items-center justify-center gap-3">
          <span className="inline-block h-4 w-[2px] bg-orange" />
          <span className="label-orange">03. Prueba</span>
          <span className="inline-block h-4 w-[2px] bg-orange" />
        </div>

        <h2 className="font-display text-[32px] leading-tight font-semibold tracking-tight md:text-[52px]">
          Ningún resultado sin ficha.
        </h2>

        {/* Pull-quote editorial */}
        <figure className="quote-delay relative mt-12 md:mt-16">
          <blockquote
            className="relative text-[26px] leading-[1.35] md:text-[44px]"
            style={{ fontFamily: '"Newsreader", Georgia, serif', fontStyle: "italic", color: "var(--ink)" }}
          >
            +300% de leads sin decir desde dónde ni con cuánta inversión no es un caso, es un titular.
          </blockquote>
          <figcaption className="mt-6 text-[15px] leading-relaxed text-muted-foreground">
            Cada resultado que publicamos trae situación inicial, inversión, intervención y método de medición — o no
            lo publicamos.
          </figcaption>
        </figure>

        {/* Placeholder de la primera ficha */}
        <div
          className="mt-12 px-8 py-12 text-center md:mt-16"
          style={{
            background: "var(--card-surface)",
            border: "1px solid rgba(252, 92, 31,0.2)",
            borderRadius: "20px",
          }}
        >
          <span className="font-mono text-[12px] uppercase tracking-[0.18em] text-muted-foreground">
            [ primera ficha de caso — próximamente ]
          </span>
        </div>
      </div>
    </section>
  );
}


// ─── CTA final ───────────────────────────────────────────────────────────────

function CtaFinal() {
  return (
    <section id="contacto" className="relative isolate overflow-clip scroll-mt-20">
      {/* Remate superior: línea naranja → durazno → transparente */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, rgba(252, 92, 31,0.9) 0%, rgba(252, 92, 31,0.6) 45%, rgba(252, 92, 31,0) 100%)",
          zIndex: 3,
        }}
      />

      {/* Foto editorial (placeholder) entrando por la izquierda */}
      <div className="hero-photo" aria-hidden="true">
        <img src={heroPhoto} alt="" className="hero-photo-img" />
        <div className="cta-photo-fade" />
      </div>

      {/* Glow naranja-durazno */}
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
        <div className="mx-auto max-w-2xl text-center">
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
          <span>Más inteligencia. Más crecimiento.</span>
          <span>Tecnología × Personas × Resultados</span>
        </div>
      </div>
    </section>
  );
}

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
        <Problemas />
        <Sistema />
        <Prueba />
        <CtaFinal />
      </main>
      <SiteFooter />
    </div>
  );
}
