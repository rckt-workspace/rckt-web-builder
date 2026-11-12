import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import SiteNav from "@/components/rckt/SiteNav";
import SiteFooter from "@/components/rckt/SiteFooter";
import { SectionHeader } from "@/components/rckt/SectionHeader";
import heroLatamImg from "@/assets/rckt-hero-latam.jpg";
import ctaPhotoImg from "@/assets/rckt-cta-final.jpg";

const heroPhoto = heroLatamImg;
const ctaPhoto = ctaPhotoImg;

const TITLE = "RCKT — Ingeniería de crecimiento";
const DESC = "Estrategia, marketing y medición para crecer con margen. Un solo equipo decide contigo la estrategia, diseña la oferta, la comunica y mide cada semana qué parte de tus ventas viene de la inversión.";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://rckt.es/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://rckt.es/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "RCKT",
          description: DESC,
          url: "https://rckt.es/",
          email: "hola@rckt.es",
          areaServed: "ES",
        }),
      },
    ],
  }),
});

// ─── 1 · Hero ───────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="section-light relative overflow-clip" id="top">
      <div className="hero-photo" aria-hidden="true">
        <img src={heroPhoto} alt="" className="hero-photo-img" />
        <div className="hero-photo-fade" />
      </div>
      <div className="hero-content relative z-10 mx-auto max-w-6xl px-5 md:px-6 pt-32 pb-24 md:pt-40 md:pb-32">
        <p className="label-orange rckt-reveal">Ingeniería de crecimiento</p>
        <h1 className="rckt-reveal mt-6 max-w-4xl font-display text-[34px] leading-[1.05] font-semibold tracking-tight text-paper md:text-[58px]">
          Estrategia, marketing y medición para crecer con <span className="hero-hand">margen.</span>
        </h1>
        <p className="rckt-reveal mt-6 max-w-xl text-base leading-relaxed text-paper/60 md:text-lg" style={{ animationDelay: "160ms" }}>
          Un solo equipo decide contigo la estrategia, diseña la oferta, la comunica y mide cada semana qué parte de tus ventas viene de la inversión.
        </p>
        <div className="rckt-reveal mt-6 flex flex-wrap items-center gap-4" style={{ animationDelay: "240ms" }}>
          <a href="/contacto" className="btn-orange inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-medium">
            Solicitar diagnóstico
          </a>
          <a href="/metodo" className="btn-outline-lt inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-medium">
            Ver el método
          </a>
        </div>
        <p className="rckt-reveal mt-4 max-w-xl text-[13px] text-paper/55" style={{ animationDelay: "300ms" }}>
          Diagnóstico de pago, con entregables y fecha de entrega definidos desde el primer día.
        </p>
      </div>
    </section>
  );
}

// ─── 2 · Prueba ─────────────────────────────────────────────────────────────

/** Logos de clientes: se mostrará la franja cuando haya logos cargados. */
const CLIENT_LOGOS: { src: string; alt: string }[] = [];

const CASOS = [
  {
    name: "La Cuisine",
    text: "Marcas premium de electrodomésticos y cocina. Producción creativa con IA, venta por WhatsApp y conciliación de la inversión contra las ventas de la tienda.",
    href: "/casos/la-cuisine",
    metric: null as string | null,
  },
  {
    name: "NewBody",
    text: "Clínicas de medicina estética en tres ciudades. Operación de pauta con venta por WhatsApp y seguimiento diario por ciudad.",
    href: "/casos/newbody",
    metric: null as string | null,
  },
];

function Prueba() {
  return (
    <section id="prueba" className="relative isolate overflow-clip scroll-mt-28 py-20 md:py-28">
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {CLIENT_LOGOS.length > 0 && (
          <div className="mb-14">
            <p className="label-orange">Empresas que crecen con RCKT</p>
            <div className="mt-6 flex flex-wrap items-center gap-10">
              {CLIENT_LOGOS.map((l) => (
                <img key={l.alt} src={l.src} alt={l.alt} className="h-8 w-auto opacity-70" />
              ))}
            </div>
          </div>
        )}
        <div className="grid gap-6 md:grid-cols-2">
          {CASOS.map((c) => (
            <article key={c.name} className="card-kraft flex flex-col p-7 md:p-8">
              {c.metric && <p className="font-display text-4xl font-semibold text-orange">{c.metric}</p>}
              <h3 className="font-display text-xl font-semibold">{c.name}</h3>
              <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted-foreground">{c.text}</p>
              <a href={c.href} className="mt-5 text-sm font-semibold text-orange hover:underline">Ver caso →</a>
            </article>
          ))}
        </div>
        <p className="mt-8 text-sm text-muted-foreground">
          Cada caso publica situación inicial, qué hicimos, resultado y cómo se midió.
        </p>
      </div>
    </section>
  );
}

// ─── 3 · Por qué RCKT ───────────────────────────────────────────────────────

const RAZONES = [
  ["01", "Una persona responde por todo el ciclo", "La estrategia, la oferta, los medios y la medición dependen de un solo responsable de RCKT, que firma contigo las decisiones. No pasas de un departamento a otro ni de un proveedor a otro."],
  ["02", "Decisiones en semanas, no en trimestres", "El diagnóstico dura tres semanas, o una si tu sector ya está estudiado. Después, cada semana se mide y se decide con los datos de esa semana."],
  ["03", "Medido contra tus ventas y cobrado por valor", "Medimos contra tu tienda, tu ERP o tu CRM, no contra lo que se atribuye cada plataforma. Cobramos por el valor que fija la meta, no por horas."],
] as const;

function PorQue() {
  return (
    <section id="por-que" className="relative isolate overflow-clip scroll-mt-28 py-20 md:py-28">
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <SectionHeader title="Por qué RCKT." phrase="Tres diferencias que se notan desde la primera semana." />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {RAZONES.map(([n, t, d]) => (
            <article key={n} className="card-kraft p-7">
              <span className="num-orange">{n}</span>
              <h3 className="font-display mt-3 text-lg font-semibold leading-snug">{t}</h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-muted-foreground">{d}</p>
            </article>
          ))}
        </div>
        <p className="mt-10 font-display text-lg font-medium">
          Cinco productos, no un catálogo de servicios: sabes qué compras, qué recibes y cuándo.
        </p>
      </div>
    </section>
  );
}

// ─── 4 · Por dónde empezar ──────────────────────────────────────────────────

const ENTRADAS = [
  { t: "Necesito claridad", q: ["«No sabemos qué frena el crecimiento.»", "«Hay que ordenar antes de escalar.»"], d: "En tres semanas, un diagnóstico del mercado y del negocio, una meta con número y un plan de 90 días.", l: "Ver Ignition →", href: "/productos/ignition" },
  { t: "Quiero aparecer donde buscan con IA", q: ["«Nos buscan en ChatGPT y no aparecemos.»", "«La IA recomienda a la competencia.»"], d: "Medimos si te citan los asistentes de IA y qué dicen de ti, y trabajamos para que te encuentren y te compren.", l: "Ver Visibility →", href: "/productos/visibility" },
  { t: "Ya invierto y no sé qué funciona", q: ["«Gastamos en pauta y el ROAS no cuadra con las ventas.»"], d: "Cruzamos lo que facturan las plataformas con tus ventas reales y medimos qué inversión crea demanda y cuál solo la registra.", l: "Ver Signal →", href: "/productos/signal" },
];

function Empezar() {
  return (
    <section id="empezar" className="relative isolate overflow-clip scroll-mt-28 py-20 md:py-28">
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <SectionHeader title="Tres formas de empezar, según lo que te pasa hoy." />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {ENTRADAS.map((e) => (
            <article key={e.t} className="card-kraft flex flex-col p-7">
              <h3 className="font-display text-lg font-semibold">{e.t}</h3>
              <div className="mt-3 space-y-1">
                {e.q.map((q) => (
                  <p key={q} className="text-[15px] font-medium">{q}</p>
                ))}
              </div>
              <p className="mt-4 flex-1 text-[14.5px] leading-relaxed text-muted-foreground">{e.d}</p>
              <a href={e.href} className="mt-5 text-sm font-semibold text-orange hover:underline">{e.l}</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 5 · Sectores ───────────────────────────────────────────────────────────

const SECTORES = [
  "Hogar y electrodomésticos premium",
  "E-commerce y marcas DTC premium",
  "B2B y SaaS",
  "Salud privada y estética",
];

function Sectores() {
  return (
    <section id="sectores" className="relative isolate overflow-clip scroll-mt-28 py-20 md:py-28">
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <SectionHeader
          title="Conocemos tu sector antes de empezar."
          phrase="En cuatro sectores tenemos un mapa de mercado propio: clientes, competidores, propuesta de valor típica, referencias de MER y reglas de medios. Tu diagnóstico arranca desde ahí y se hace en una semana."
        />
        <ul className="mt-10 flex flex-wrap gap-3">
          {SECTORES.map((s) => (
            <li key={s} className="card-kraft rounded-full px-5 py-2.5 text-sm font-medium">{s}</li>
          ))}
        </ul>
        <a href="/sectores" className="mt-8 inline-block text-sm font-semibold text-orange hover:underline">Ver sectores →</a>
      </div>
    </section>
  );
}

// ─── 6 · Los cinco productos ────────────────────────────────────────────────

const PRODUCTOS = [
  { n: "Ignition", l: "Diagnóstico, estrategia escrita y plan de 90 días.", q: "¿A quién vendemos, con qué valor y qué número hay que mover?", href: "/productos/ignition" },
  { n: "Blueprint", l: "Diseño de la oferta, el precio, los incentivos y la experiencia del cliente.", q: "¿Qué vendemos, a qué precio y cómo lo vive el cliente?", href: "/productos/blueprint" },
  { n: "Engine", l: "Producción creativa con IA y operación de medios pagos en un solo sistema.", q: "¿Cómo comunicamos la oferta con el volumen que piden las plataformas?", href: "/productos/engine" },
  { n: "Visibility", l: "Presencia en asistentes de IA, buscadores, marketplaces y tienda propia.", q: "¿Nos encuentran y nos pueden comprar donde ya buscan?", href: "/productos/visibility" },
  { n: "Signal", l: "Meta con número y medición de lo que causó la inversión.", q: "¿Qué funcionó de verdad y qué hacemos la próxima semana?", href: "/productos/signal" },
];

function Productos() {
  return (
    <section id="productos" className="relative isolate overflow-clip scroll-mt-28 py-20 md:py-28">
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <SectionHeader
          title="Cinco productos, uno por cada decisión que mueve el crecimiento."
          phrase="Compras el producto que necesitas hoy. Si después quieres que operemos todo el ciclo, los cinco trabajan juntos en Growth OS."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {PRODUCTOS.map((p) => (
            <a key={p.n} href={p.href} className="card-kraft group flex flex-col p-6">
              <h3 className="font-display text-xl font-semibold">{p.n}</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">{p.l}</p>
              <p className="mt-4 flex-1 text-[14px] font-medium">{p.q}</p>
              <span className="mt-5 text-sm font-semibold text-orange group-hover:underline">Ver {p.n} →</span>
            </a>
          ))}
        </div>
        <a href="/growth-os" className="mt-10 inline-block text-sm font-semibold text-orange hover:underline">
          Ver cómo funcionan juntos en Growth OS →
        </a>
      </div>
    </section>
  );
}

// ─── 7 · El método ──────────────────────────────────────────────────────────

const PASOS = [
  ["Meta", "Signal"],
  ["Estrategia", "Ignition"],
  ["Táctica", "Blueprint, Engine, Visibility"],
  ["Implementación", "Growth OS"],
  ["Control", "Signal"],
] as const;

function Metodo() {
  return (
    <section id="metodo" className="relative isolate overflow-clip scroll-mt-28 py-20 md:py-28">
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <SectionHeader
          title="Un método fijo, operado cada semana."
          phrase="Una oferta crece de forma sostenida cuando crea valor para el cliente, para quienes la distribuyen y para la empresa. Lo aplicamos en cinco pasos y en orden: ninguna táctica se activa sin meta y estrategia escritas, y ningún periodo se cierra sin medir."
        />
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {PASOS.map(([paso, prod], i) => (
            <li key={paso} className="card-kraft p-6">
              <span className="num-orange">{String(i + 1).padStart(2, "0")}</span>
              <p className="font-display mt-2 text-lg font-semibold">{paso}</p>
              <p className="mt-1 text-[13.5px] text-muted-foreground">{prod}</p>
            </li>
          ))}
        </ol>
        <a href="/metodo" className="mt-10 inline-block text-sm font-semibold text-orange hover:underline">Ver el método completo →</a>
      </div>
    </section>
  );
}

// ─── 8 · Llamada final ──────────────────────────────────────────────────────

function CtaFinal() {
  return (
    <section id="contacto" className="relative isolate overflow-clip scroll-mt-20">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, rgba(252, 92, 31,0.9) 0%, rgba(252, 92, 31,0.6) 45%, rgba(252, 92, 31,0) 100%)", zIndex: 3 }}
      />
      <div className="hero-photo" aria-hidden="true">
        <img src={ctaPhoto} alt="" className="hero-photo-img cta-photo-img" />
        <div className="cta-photo-fade" />
      </div>
      <div className="relative z-10 mx-auto max-w-6xl px-5 py-24 md:px-6 md:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-[34px] leading-[1.08] font-semibold tracking-tight md:text-[56px]" style={{ color: "#f5f2ed" }}>
            El primer paso es un diagnóstico.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed" style={{ color: "rgba(245,242,237,0.8)" }}>
            Una persona del equipo de RCKT lee cada solicitud y te responde con la ruta de entrada que encaja con tu caso, qué vamos a entregar y en qué plazo.
          </p>
          <div className="mt-10 flex justify-center">
            <a href="/contacto" className="btn-orange font-display inline-flex items-center gap-2 rounded-full px-8 py-4 text-[15px] font-semibold">
              Solicitar diagnóstico
            </a>
          </div>
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
      <SiteNav />
      <main>
        <Hero />
        <Prueba />
        <PorQue />
        <Empezar />
        <Sectores />
        <Productos />
        <Metodo />
        <CtaFinal />
      </main>
      <SiteFooter />
    </div>
  );
}
