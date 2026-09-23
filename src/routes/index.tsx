import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { ArrowUpRight } from "lucide-react";
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
          className="rckt-reveal mt-5 flex flex-wrap items-center gap-4"
          style={{ animationDelay: "240ms" }}
        >
          <a
            href="/sistemas/revenue-diagnostic#formulario"
            className="btn-orange inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-medium"
          >
            Pedir diagnóstico
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
            background: "rgba(255,255,255,0.55)",
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
    title: "Invierto en pauta y no crece con margen",
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
      className="relative isolate overflow-hidden scroll-mt-28 py-20 md:py-32"
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

const SISTEMAS_CORE = [
  {
    badge: "S1",
    title: "Demand System",
    desc: "Manejamos tus campañas, pero no las optimizamos por leads baratos: las optimizamos por las oportunidades que tu equipo comercial acepta y por las que terminan en venta. Cada semana ves el embudo completo, no solo los clics.",
    cta: "Ver Demand System",
    href: "/soluciones/ecommerce-rentable",
    sistemaHref: "/sistemas/demand-system",
  },
  {
    badge: "S2",
    title: "Sales Flow (núcleo de Conversion System)",
    desc: "Hoy pagas por un lead, te escribe, y ahí empieza a perderse: respuesta tarde, sin seguimiento, fuera del CRM. Sales Flow conecta tus campañas, WhatsApp y CRM para que cada lead tenga respuesta, seguimiento y dueño, y para que sepas cuáles compran.",
    cta: "Ver Sales Flow",
    href: "/soluciones/captacion-y-cierre",
    sistemaHref: "/sistemas/sales-flow",
  },
  {
    badge: "S3",
    title: "Operations System",
    desc: "No te vendemos IA. Elegimos un proceso que tu equipo repite cien veces por semana, medimos cuánto te cuesta hoy, y en ocho semanas lo dejamos funcionando solo, con una persona aprobando lo que importa.",
    cta: "Ver Operations System",
    href: "/soluciones/operacion",
    sistemaHref: "/sistemas/operations-system",
  },
];

function Sistema() {
  return (
    <section
      id="sistema"
      className="relative isolate overflow-hidden scroll-mt-28 py-14 md:py-20"
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
            "radial-gradient(ellipse 700px 500px at 100% 0%, rgba(232,103,46,0.35) 0%, rgba(244,161,95,0.18) 40%, rgba(232,103,46,0) 75%)",
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

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {SISTEMAS_CORE.map((s) => (
          <Link
            key={s.badge}
            to={s.sistemaHref}
            className="card-kraft group flex flex-col overflow-hidden p-0"
          >
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

      <div
        className="band-orange-sistema relative mt-10 overflow-hidden rounded-3xl px-8 py-10 md:px-12"
        style={{
          background: "linear-gradient(110deg, #E8672E 0%, #C94F1E 100%)",
        }}
      >
        <span className="band-texture" aria-hidden="true" />
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
          Luego, el <span className="font-script text-3xl md:text-[2.6rem]">sistema completo.</span>
        </h3>
        <p className="relative mt-3 max-w-2xl text-sm leading-relaxed text-white/90 md:text-base">
          Demand + Sales Flow, combinados, son Revenue Engine — nuestro producto principal.
        </p>
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
      className="relative isolate overflow-hidden scroll-mt-28 py-20 md:py-28"
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
            "radial-gradient(ellipse 700px 500px at 100% 0%, rgba(232,103,46,0.35) 0%, rgba(244,161,95,0.18) 40%, rgba(232,103,46,0) 75%)",
        }}
      />
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="mb-4 flex items-center gap-3">
          <span className="inline-block h-4 w-[2px] bg-orange" />
          <span className="label-orange">03. Prueba</span>
        </div>

        {/* Titular con línea fina de revista, interrumpida por el titular */}
        <div className="flex items-center gap-6">
          <h2 className="font-display shrink-0 text-[32px] leading-tight font-semibold tracking-tight md:text-[52px]">
            Ningún resultado sin ficha.
          </h2>
          <span aria-hidden="true" className="rule hidden md:block" />
        </div>

        {/* Pull-quote editorial */}
        <figure className="pull-quote quote-delay relative mt-12 md:mt-16">
          <blockquote
            className="relative max-w-4xl text-[26px] leading-[1.35] md:text-[44px]"
            style={{ fontFamily: '"Newsreader", Georgia, serif', fontStyle: "italic", color: "var(--ink)" }}
          >
            +300% de leads sin decir desde dónde ni con cuánta inversión no es un caso, es un titular.
          </blockquote>
          <figcaption className="mt-6 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
            Cada resultado que publicamos trae situación inicial, inversión, intervención y método de medición — o no lo
            publicamos.
          </figcaption>
        </figure>

        {/* Placeholder de la primera ficha */}
        <div className="dotted-slot mt-12 px-6 py-10 text-center md:mt-16">
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
    <section id="contacto" className="relative isolate overflow-hidden scroll-mt-20">
      {/* Remate superior: línea naranja → durazno → transparente */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, rgba(232,103,46,0.9) 0%, rgba(244,161,95,0.6) 45%, rgba(232,103,46,0) 100%)",
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
            El siguiente paso empieza con <em className="font-serif-accent">claridad.</em>
          </h2>
          <div className="mt-10 flex justify-end">
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
