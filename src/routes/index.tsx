import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Toaster } from "sonner";
import SiteNav from "@/components/rckt/SiteNav";
import SiteFooter from "@/components/rckt/SiteFooter";
import { SystemCards, SISTEMAS_CARDS } from "@/components/rckt/SystemCards";
import { SectionHeader } from "@/components/rckt/SectionHeader";
import heroLatamImg from "@/assets/rckt-hero-latam.jpg";
import ctaPhotoImg from "@/assets/rckt-cta-final.jpg";

const heroPhoto = heroLatamImg;
const ctaPhoto = ctaPhotoImg;

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
      {/* Foto de fondo con degradado claro de legibilidad */}
      <div className="hero-photo" aria-hidden="true">
        <img src={heroPhoto} alt="" className="hero-photo-img" />
        <div className="hero-photo-fade" />
      </div>

      <p className="hero-tagline font-display absolute right-5 bottom-6 z-10 text-right text-[10px] tracking-[0.22em] uppercase md:right-10 md:bottom-10 md:text-xs">
        Less noise.
        <br />
        More growth.
      </p>


      <div className="relative z-10 mx-auto max-w-6xl px-5 md:px-6 pt-32 pb-24 md:pt-40 md:pb-32">
        <p className="label-orange rckt-reveal">
          Technology with a human pulse.
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
          Convierte búsquedas y tráfico en oportunidades comerciales medibles.
        </p>
        <div
          className="rckt-reveal mt-5 flex flex-wrap items-center gap-4"
          style={{ animationDelay: "240ms" }}
        >
          <a
            href="/sistemas/revenue-diagnostic#formulario"
            className="btn-orange inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-medium"
          >
            Solicitar diagnóstico de captación
          </a>
          <Link
            to="/nosotros/como-trabajamos"
            className="btn-outline-lt inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-medium"
          >
            Ver cómo trabajamos
          </Link>
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
      "Meta o Google reportan un número de conversiones, mientras que Ventas registra otro",
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
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <SectionHeader
          num="01."
          label="Tres problemas"
          title={<>Entras por tu problema, no por el nombre de un <em className="font-serif-accent">sistema</em>.</>}
          phrase="Tres puertas de entrada. Elige la que se parece a lo que te pasa hoy."
        />
        <div className="mt-14">
          <div className="grid gap-10 md:grid-cols-3 md:gap-8">
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
                      Solicitar diagnóstico de captación
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
      <SectionHeader
        num="02."
        label="Un sistema operativo de crecimiento"
        title={<>Tres <em className="font-serif-accent">sistemas</em>.</>}
        phrase="Los tres sistemas siguen la cadena de ingresos de cualquier negocio: conseguir clientes, cerrarlos y atenderlos sin fricción."
      />

      <div className="mt-14">
        <SystemCards systems={SISTEMAS_CARDS} />
      </div>

      <div
        className="band-orange-sistema relative mt-10 overflow-hidden rounded-3xl px-8 py-10 md:px-12"
        style={{
          background: "linear-gradient(135deg, var(--orange) 0%, var(--orange-deep) 100%)",
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
              "radial-gradient(circle closest-side, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 75%)",
          }}
        />
        <h3 className="relative font-display text-2xl leading-tight font-semibold text-white md:text-3xl">
          Luego, el <span className="font-display text-xl md:text-2xl text-white/60">sistema completo.</span>
        </h3>
        <p className="relative mt-3 max-w-2xl text-sm leading-relaxed text-white/90 md:text-base">
          Demand + Sales Flow, combinados, son Revenue Engine — nuestro producto principal.
        </p>
        <Link
          to="/sistemas/revenue-engine"
          className="band-revenue-btn group relative mt-6 inline-flex items-center gap-2 rounded-full bg-primary-foreground px-6 py-3 text-sm font-semibold text-primary transition-transform duration-200 hover:-translate-y-px"
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

const FICHA = [
  { k: "Situación inicial", v: "Meta o Google reportan un número de conversiones, mientras que Ventas registra otro; los comerciales atienden WhatsApp fuera del CRM y tardan más de una hora en responder." },
  { k: "Periodo", v: "Revenue Diagnostic de 2 a 3 semanas; sistema operativo con fuente de verdad el día 30; revisión de línea base frente a resultado el día 90." },
  { k: "Alcance", v: "Revenue Engine: Demand System y Sales Flow bajo un solo responsable, medido del clic al cierre." },
  { k: "Inversión", v: "La inversión en medios la pagas tú, en tus propias cuentas. Lo que pagas por el Diagnostic se descuenta del sistema si sigues con nosotros." },
  { k: "Intervención", v: "Mapa de fugas con tus números reales, tracking completo y campañas, WhatsApp y CRM conectados, para que cada lead tenga respuesta, seguimiento y dueño." },
  { k: "Resultado", v: "Se mide frente a la línea base firmada: coste por cliente adquirido y cuánto vale ese cliente frente a lo que costó traerlo." },
  { k: "Método de medición", v: "Una sola fuente de verdad: inversión → lead → MQL → SQL → reunión → oportunidad → venta → margen, con definiciones que firmas tú." },
  { k: "Limitaciones", v: "No garantizamos ventas, porque no controlamos tu cierre, tu stock ni tus precios. Garantizamos que en 30 días verás tu embudo completo con datos reales." },
];

function Prueba() {
  return (
    <section
      id="prueba"
      className="relative isolate overflow-clip scroll-mt-28 py-20 md:py-28"
      style={{
        background: "linear-gradient(180deg, var(--surface-alt) 0%, var(--kraft) 100%)",
      }}
    >
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <SectionHeader
          num="03."
          label="Prueba"
          title="Ningún resultado sin ficha."
          phrase="Una cifra con contexto vale más que un porcentaje sin denominador."
        />

        <figure className="quote-delay relative mt-12 max-w-3xl text-left md:mt-16">
          <blockquote
            className="relative text-[26px] leading-[1.35] md:text-[40px]"
            style={{ fontFamily: '"Newsreader", Georgia, serif', fontStyle: "italic", color: "var(--ink)" }}
          >
            +300% de leads sin decir desde dónde ni con cuánta inversión no es un caso, es un titular.
          </blockquote>
          <figcaption className="mt-6 text-[15px] leading-relaxed text-muted-foreground">
            Cada resultado que publicamos trae situación inicial, inversión, intervención y método de medición — o no
            lo publicamos.
          </figcaption>
        </figure>

        <div className="ficha-metodo mt-12 md:mt-16">
          <span className="label-orange">Ficha del método · RCKT.es</span>
          <dl className="mt-6 grid md:grid-cols-2 md:gap-x-12">
            {FICHA.map((f) => (
              <div key={f.k} className="ficha-metodo__row">
                <dt className="ficha-metodo__k">{f.k}</dt>
                <dd className="ficha-metodo__v">{f.v}</dd>
              </div>
            ))}
          </dl>
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
        <img src={ctaPhoto} alt="" className="hero-photo-img cta-photo-img" />
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
          <div className="mb-4"><span className="label-orange">¿Empezamos?</span></div>
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
          <span className="ml-auto">IA supervisada y documentada</span>
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
