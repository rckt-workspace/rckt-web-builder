import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/")({
  head: () => ({
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              name: "RCKT",
              url: "https://rckt.es",
              email: "hola@rckt.es",
              description:
                "Sistemas de crecimiento con IA para negocios de habla hispana. Diseñamos, operamos y escalamos sistemas de marketing con un modelo de precio ligado a resultados, no a horas.",
            },
            {
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "¿Cuánto cuesta?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Depende del alcance, y sería poco serio darte una cifra sin diagnóstico. Lo que sí es fijo es el modelo: una base que cubre la operación más una parte variable ligada a resultados medibles. El diagnóstico define ambas.",
                  },
                },
                {
                  "@type": "Question",
                  name: "¿Cuándo veo resultados?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Los diagnósticos entregan en 2–3 semanas. Los sistemas muestran señal en las primeras semanas y se calibran en ciclos de 90 días. Desconfía de quien te prometa fechas exactas sin conocer tu negocio.",
                  },
                },
                {
                  "@type": "Question",
                  name: "¿Sirve para mi industria?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Los sistemas son universales; la calibración es por negocio. Si tu cliente busca, pregunta o conversa antes de comprar, aplica.",
                  },
                },
                {
                  "@type": "Question",
                  name: "¿Reemplazan a mi equipo?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Al contrario. Podemos operar por ti, o montar la capacidad dentro de tu empresa y entrenar a tu gente. Tú eliges cuánto control quieres.",
                  },
                },
                {
                  "@type": "Question",
                  name: "¿Qué pasa con mis datos?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Operamos con los estándares del mercado más exigente — normativa europea de IA y protección de datos — en todos los países donde trabajamos.",
                  },
                },
              ],
            },
            {
              "@type": "Service",
              name: "AI Growth Audit",
              provider: { "@type": "Organization", name: "RCKT" },
              description:
                "Diagnóstico integral en 2–3 semanas que cuantifica pérdidas y prioriza soluciones.",
            },
            {
              "@type": "Service",
              name: "AI Visibility Snapshot",
              provider: { "@type": "Organization", name: "RCKT" },
              description:
                "Informe de si una marca aparece en las respuestas de ChatGPT, Gemini y Perplexity.",
            },
            {
              "@type": "Service",
              name: "Performance Media System",
              provider: { "@type": "Organization", name: "RCKT" },
              description:
                "Operación continua y supervisada de la inversión publicitaria.",
            },
            {
              "@type": "Service",
              name: "Creative Performance System",
              provider: { "@type": "Organization", name: "RCKT" },
              description:
                "Producción de anuncios a volumen con IA y testing con audiencia real.",
            },
            {
              "@type": "Service",
              name: "AI Visibility System",
              provider: { "@type": "Organization", name: "RCKT" },
              description:
                "Trabajo mensual para que los asistentes de IA citen y recomienden la marca.",
            },
            {
              "@type": "Service",
              name: "Conversational Revenue System",
              provider: { "@type": "Organization", name: "RCKT" },
              description:
                "Asistentes de lenguaje natural que atienden, agendan y venden por chat.",
            },
          ],
        }),
      },
    ],
  }),
  component: Index,
});

const TERMINAL_LINE =
  "> iniciando sistema de crecimiento… señal ✓ creativo ✓ visibilidad ✓ conversación ✓";

function TerminalLine() {
  const [text, setText] = useState("");
  useEffect(() => {
    let i = 0;
    let mounted = true;
    let hold = 0;
    const tick = () => {
      if (!mounted) return;
      if (hold > 0) {
        hold -= 1;
      } else if (i <= TERMINAL_LINE.length) {
        setText(TERMINAL_LINE.slice(0, i));
        i += 1;
        if (i > TERMINAL_LINE.length) hold = 30;
      } else {
        i = 0;
        setText("");
        hold = 6;
      }
    };
    const id = window.setInterval(tick, 55);
    return () => {
      mounted = false;
      window.clearInterval(id);
    };
  }, []);
  return (
    <div className="mt-10 font-mono text-[13px] md:text-[14px] text-muted-foreground border border-border rounded-sm px-4 py-3 bg-card overflow-hidden whitespace-nowrap">
      <span className="text-accent">{text}</span>
      <span className="rckt-caret">&nbsp;</span>
    </div>
  );
}

const NAV_LINKS = [
  { href: "#sistema", label: "Sistema" },
  { href: "#servicios", label: "Servicios" },
  { href: "#metodo", label: "Método" },
  { href: "#faq", label: "FAQ" },
];

function Nav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="text-[18px] font-bold tracking-tight">
          RCKT
        </a>
        <div className="hidden md:flex items-center gap-8 text-[14px] text-muted-foreground">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-foreground transition-colors">
              {l.label}
            </a>
          ))}
        </div>
        <a
          href="#contacto"
          className="inline-flex items-center gap-2 rounded-sm bg-accent text-accent-foreground px-4 py-2 text-[13px] font-semibold hover:opacity-90 transition-opacity"
        >
          Pedir diagnóstico
        </a>
      </div>
    </nav>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-[12px] tracking-[0.14em] text-accent uppercase">
      {children}
    </div>
  );
}

function SectionDivider() {
  return <div className="border-t border-border" aria-hidden />;
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0 rckt-grid-bg pointer-events-none" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-6 pt-20 pb-28 md:pt-32 md:pb-40">
        <div className="rckt-reveal">
          <Eyebrow>AI-FIRST GROWTH SYSTEMS</Eyebrow>
          <h1 className="mt-6 text-[40px] leading-[1.02] tracking-[-0.035em] md:text-[68px] md:leading-[1.02] max-w-4xl font-medium">
            Tu marketing no necesita más manos.{" "}
            <span className="text-accent">Necesita un sistema.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-[17px] md:text-[19px] text-muted-foreground leading-relaxed">
            Diseñamos y operamos sistemas de crecimiento con IA que trabajan 24/7 — ligados
            a los resultados que producen, no a las horas que consumen.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 rounded-sm bg-accent text-accent-foreground px-5 py-3 text-[14px] font-semibold hover:opacity-90 transition-opacity"
            >
              Pedir mi diagnóstico <span aria-hidden>→</span>
            </a>
            <a
              href="#contacto"
              data-concern="La IA no me recomienda"
              className="inline-flex items-center gap-2 rounded-sm border border-border px-5 py-3 text-[14px] font-medium text-foreground hover:border-accent hover:text-accent transition-colors"
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.sessionStorage.setItem("rckt_concern", "La IA no me recomienda");
                }
              }}
            >
              ¿Te recomienda la IA? Descúbrelo →
            </a>
          </div>
          <TerminalLine />
        </div>
      </div>
    </section>
  );
}

function Divisoria() {
  const data = [
    { k: "+8.6%", v: "crece la inversión publicitaria mundial" },
    { k: "–1.2%", v: "caen los ingresos de quienes venden ejecución" },
    { k: "73%", v: "de los negocios son invisibles cuando alguien le pregunta a una IA" },
  ];
  return (
    <section aria-label="El mercado cambió de lado" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <h2 className="text-[32px] md:text-[46px] leading-[1.05] tracking-[-0.03em] max-w-3xl font-medium">
        El mercado cambió de lado
      </h2>
      <p className="mt-6 max-w-3xl text-[17px] text-muted-foreground leading-relaxed">
        La IA absorbió las tareas del marketing: configurar campañas, producir piezas,
        armar reportes. Lo que quedó al descubierto es la única pregunta que importa:{" "}
        <span className="text-foreground font-medium">¿quién responde por el resultado?</span>{" "}
        Nosotros. Ese es el modelo.
      </p>
      <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">
        {data.map((d, i) => (
          <div
            key={d.k}
            className={`px-2 md:px-8 py-2 md:border-l md:border-border ${i === 0 ? "md:border-l-0 md:pl-0" : ""}`}
          >
            <div className="font-mono text-[38px] md:text-[52px] leading-none tracking-tight text-accent">
              {d.k}
            </div>
            <div className="mt-3 text-[14px] text-muted-foreground max-w-[26ch]">{d.v}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Sistema() {
  const cards = [
    {
      n: "01",
      k: "DIAGNOSTICAR",
      body: "Una radiografía en 2–3 semanas: dónde estás perdiendo dinero, qué oportunidades hay y qué arreglar primero, en qué orden.",
    },
    {
      n: "02",
      k: "OPERAR",
      body: "Nos quedamos manejando los sistemas que hacen crecer el negocio: medios, creativo, visibilidad en IA y ventas por conversación.",
    },
    {
      n: "03",
      k: "PRODUCTO",
      body: "Lo que funciona una y otra vez se convierte en producto: se instala en tu negocio y pagas una suscripción. Construido una vez, probado muchas.",
    },
  ];
  return (
    <section id="sistema" aria-label="Cómo funciona" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <h2 className="text-[32px] md:text-[46px] leading-[1.05] tracking-[-0.03em] max-w-3xl font-medium">
        Un sistema operativo de crecimiento.{" "}
        <span className="text-muted-foreground">Tres formas de entrar.</span>
      </h2>
      <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((c) => (
          <article
            key={c.n}
            className="border border-border rounded-sm p-7 bg-card hover:border-accent transition-colors"
          >
            <div className="font-mono text-[12px] text-accent tracking-[0.12em]">
              {c.n} · {c.k}
            </div>
            <p className="mt-6 text-[15px] leading-relaxed text-foreground">{c.body}</p>
          </article>
        ))}
      </div>
      <div className="mt-8 border border-border rounded-sm p-7 bg-secondary">
        <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-6">
          <div className="font-mono text-[12px] text-accent tracking-[0.14em] uppercase">
            Juicio
          </div>
          <p className="text-[15px] leading-relaxed text-foreground">
            Atravesándolo todo, el criterio: qué automatizar, qué no, y en qué orden.{" "}
            <span className="font-medium">
              La IA no reemplaza el juicio. Lo multiplica.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  tag,
  title,
  subtitle,
  body,
  includes,
  measure,
  cta,
  concern,
}: {
  tag: string;
  title: string;
  subtitle: string;
  body: string;
  includes?: string;
  measure?: string;
  cta?: string;
  concern?: string;
}) {
  return (
    <article className="border border-border rounded-sm p-7 bg-card hover:border-accent transition-colors flex flex-col">
      <div className="font-mono text-[12px] text-accent tracking-[0.12em]">{tag}</div>
      <h3 className="mt-4 text-[22px] md:text-[24px] tracking-[-0.02em] font-medium">
        {title}
      </h3>
      <div className="text-[14px] text-muted-foreground mt-1">{subtitle}</div>
      <p className="mt-5 text-[15px] leading-relaxed text-foreground">{body}</p>
      {includes && (
        <p className="mt-4 text-[13.5px] leading-relaxed text-muted-foreground">
          <span className="text-foreground font-medium">Incluye:</span> {includes}
        </p>
      )}
      {measure && (
        <p className="mt-4 font-mono text-[12.5px] text-muted-foreground">{measure}</p>
      )}
      {cta && (
        <a
          href="#contacto"
          onClick={() => {
            if (concern && typeof window !== "undefined") {
              window.sessionStorage.setItem("rckt_concern", concern);
            }
          }}
          className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-semibold text-accent hover:opacity-80 transition-opacity"
        >
          {cta} <span aria-hidden>→</span>
        </a>
      )}
    </article>
  );
}

function Servicios() {
  return (
    <section id="servicios" aria-label="Servicios" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <div className="mb-14">
        <Eyebrow>SERVICIOS</Eyebrow>
        <h2 className="mt-4 text-[32px] md:text-[46px] leading-[1.05] tracking-[-0.03em] max-w-3xl font-medium">
          Empieza por aquí
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ServiceCard
          tag="D1"
          title="AI Growth Audit"
          subtitle="La revisión completa"
          body="Auditamos tus anuncios, tus datos, tu web y tu contenido. En 2–3 semanas recibes un informe que cuantifica cuánto dinero estás dejando en la mesa — y un plan priorizado para recuperarlo."
          cta="Empezar por aquí"
        />
        <ServiceCard
          tag="D2"
          title="AI Visibility Snapshot"
          subtitle="¿La IA te recomienda?"
          body="Le preguntamos a ChatGPT, Gemini y Perplexity lo mismo que pregunta tu cliente. Te mostramos, con capturas, si tu marca aparece en las respuestas — y qué hacer si no."
          cta="Quiero mi snapshot"
          concern="La IA no me recomienda"
          includes=""
          measure=""
        />
      </div>

      <div className="mt-20 mb-8">
        <h3 className="text-[24px] md:text-[30px] tracking-[-0.02em] font-medium">
          Los cuatro sistemas
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ServiceCard
          tag="S1"
          title="Performance Media System"
          subtitle="Anuncios en piloto automático supervisado"
          body="Un sistema vigila y ajusta tu inversión publicitaria 24/7: sube lo que vende, apaga lo que no. Un experto supervisa cada decisión de peso. Y tú lo ves todo en un solo panel: cuánto entra, cuánto sale."
          includes="arquitectura de datos y señales · operación continua multiplataforma · experimentación estructurada · panel único de resultados."
          measure="Se mide en: retorno por cada euro invertido."
        />
        <ServiceCard
          tag="S2"
          title="Creative Performance System"
          subtitle="La fábrica de anuncios"
          body="Decenas de versiones de cada anuncio por semana — distintos mensajes, protagonistas y formatos — con tu marca siempre intacta. Las probamos con público real y escalamos solo las que venden."
          includes="producción con IA (video, imagen, avatares) · sistema de marca · control de calidad humano · testing conectado a la inversión."
          measure="Se mide en: costo por resultado de las piezas ganadoras."
        />
        <ServiceCard
          tag="S3"
          title="AI Visibility System"
          subtitle="Que la IA hable bien de ti"
          body="El nuevo posicionamiento: cuando alguien le pregunta a una IA por tu categoría, tu marca aparece en la respuesta. Trabajamos tu contenido, tu autoridad y tu presencia técnica — y lo mantenemos mes a mes, porque las respuestas de las IAs cambian constantemente."
          includes="contenido que las IAs citan · autoridad ganada en medios · base técnica citable · monitoreo mensual de menciones."
          measure="Se mide en: share of model — cuántas veces te nombra la IA."
        />
        <ServiceCard
          tag="S4"
          title="Conversational Revenue System"
          subtitle="El vendedor que nunca duerme"
          body="Un asistente con lenguaje natural que atiende en tu WhatsApp o tu web como tu mejor vendedor, pero sin horarios: responde al instante, resuelve dudas, agenda, cobra. Y persigue cada compra abandonada con buenos modales hasta recuperarla."
          includes="agente en tu canal (WhatsApp, web, voz) · integración con tu CRM y tus pagos · recuperación de ventas · preparación para el comercio vía asistentes de IA."
          measure="Se mide en: conversaciones convertidas en ventas o citas."
        />
      </div>

      {/* Bloque C — Producto */}
      <div className="mt-16 border border-border rounded-sm p-7 bg-secondary flex flex-col md:flex-row md:items-baseline gap-4 md:gap-6">
        <div className="font-mono text-[12px] text-accent tracking-[0.14em]">P</div>
        <p className="text-[15px] leading-relaxed text-foreground">
          <span className="font-medium">
            Cuando un sistema funciona una y otra vez, lo enlatamos.
          </span>{" "}
          Se convierte en un producto que se instala en tu negocio por una suscripción
          mensual. Sin proyectos eternos: software que ya demostró que funciona.
        </p>
      </div>

      {/* Bloque D — Juicio */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            t: "T1",
            title: "Advisory",
            body: "Tu director de IA, a tiempo parcial. Decisiones con criterio: qué automatizar, qué comprar, por dónde empezar.",
          },
          {
            t: "T2",
            title: "In-housing",
            body: "Te enseñamos a pescar: montamos la capacidad dentro de tu empresa y entrenamos a tu equipo para operarla.",
          },
          {
            t: "T3",
            title: "Compliance",
            body: "El cinturón de seguridad: todo lo que automatices cumple la ley, en cada país donde operes.",
          },
        ].map((x) => (
          <div key={x.t} className="border border-border rounded-sm p-6 bg-card">
            <div className="font-mono text-[12px] text-accent tracking-[0.12em]">
              {x.t}
            </div>
            <div className="mt-3 text-[16px] font-medium">{x.title}</div>
            <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
              {x.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function NoVendemos() {
  return (
    <section aria-label="Lo que no vendemos" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <h2 className="text-[32px] md:text-[46px] leading-[1.05] tracking-[-0.03em] max-w-3xl font-medium">
        Lo que no vendemos
      </h2>
      <p className="mt-6 max-w-3xl text-[17px] text-muted-foreground leading-relaxed">
        No vendemos gestión de redes, contenido por pieza, SEO de palabras clave ni
        informes mensuales. No porque no sepamos — porque las máquinas ya lo hacen, y
        cobrártelo por separado sería cobrarte por algo que hoy es casi gratis. Todo eso
        vive automatizado <em className="italic">dentro</em> de los sistemas.{" "}
        <span className="text-foreground font-medium">
          Lo que tú compras es el resultado.
        </span>
      </p>
    </section>
  );
}

function Metodo() {
  const steps = [
    {
      n: "01",
      title: "Diagnóstico",
      body: "Snapshot o Audit. 2–3 semanas. Sales sabiendo dónde estás y qué conviene primero.",
    },
    {
      n: "02",
      title: "Primer sistema",
      body: "Implementamos el que el diagnóstico priorice. Calibración en ciclos de 90 días.",
    },
    {
      n: "03",
      title: "Expansión",
      body: "Cuando el primero rinde, entra el siguiente. Cada etapa se paga con los resultados de la anterior.",
    },
    {
      n: "04",
      title: "Producto",
      body: "Lo probado se vuelve suscripción. Menos dependencia, más sistema.",
    },
  ];
  return (
    <section id="metodo" aria-label="Método" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <Eyebrow>MÉTODO</Eyebrow>
      <h2 className="mt-4 text-[32px] md:text-[46px] leading-[1.05] tracking-[-0.03em] font-medium">
        Así empezamos
      </h2>
      <ol className="mt-14 grid grid-cols-1 md:grid-cols-4 gap-6">
        {steps.map((s) => (
          <li key={s.n} className="border-t border-border md:border-t-0 md:border-l md:pl-6 pt-6 md:pt-0 first:md:border-l-0 first:md:pl-0">
            <div className="font-mono text-[12px] text-accent tracking-[0.12em]">
              {s.n}
            </div>
            <div className="mt-3 text-[17px] font-medium">{s.title}</div>
            <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
              {s.body}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Principios() {
  const cols = [
    {
      t: "Resultados, no horas.",
      b: "La base cubre la operación; el resto se gana con resultados medibles. Si tú creces, crecemos.",
    },
    {
      t: "La IA multiplica el criterio, no lo abarata.",
      b: "Usamos IA en todo — no para cobrarte menos, sino para que el criterio experto llegue donde antes no alcanzaba.",
    },
    {
      t: "Mostramos, no prometemos.",
      b: "Números antes que adjetivos. Si no hay dato, hay demo.",
    },
  ];
  return (
    <section aria-label="Cómo trabajamos" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <h2 className="text-[32px] md:text-[46px] leading-[1.05] tracking-[-0.03em] font-medium">
        Cómo trabajamos
      </h2>
      <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        {cols.map((c) => (
          <div key={c.t}>
            <div className="text-[18px] font-medium">{c.t}</div>
            <p className="mt-3 text-[14.5px] leading-relaxed text-muted-foreground">
              {c.b}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function FAQ() {
  const items = [
    {
      q: "¿Cuánto cuesta?",
      a: "Depende del alcance, y sería poco serio darte una cifra sin diagnóstico. Lo que sí es fijo es el modelo: una base que cubre la operación más una parte variable ligada a resultados medibles. El diagnóstico define ambas.",
    },
    {
      q: "¿Cuándo veo resultados?",
      a: "Los diagnósticos entregan en 2–3 semanas. Los sistemas muestran señal en las primeras semanas y se calibran en ciclos de 90 días. Desconfía de quien te prometa fechas exactas sin conocer tu negocio.",
    },
    {
      q: "¿Sirve para mi industria?",
      a: "Los sistemas son universales; la calibración es por negocio. Si tu cliente busca, pregunta o conversa antes de comprar, aplica.",
    },
    {
      q: "¿Reemplazan a mi equipo?",
      a: "Al contrario. Podemos operar por ti, o montar la capacidad dentro de tu empresa y entrenar a tu gente. Tú eliges cuánto control quieres.",
    },
    {
      q: "¿Qué pasa con mis datos?",
      a: "Operamos con los estándares del mercado más exigente — normativa europea de IA y protección de datos — en todos los países donde trabajamos.",
    },
  ];
  return (
    <section id="faq" aria-label="FAQ" className="mx-auto max-w-4xl px-6 py-24 md:py-32">
      <Eyebrow>FAQ</Eyebrow>
      <h2 className="mt-4 text-[32px] md:text-[46px] leading-[1.05] tracking-[-0.03em] font-medium">
        Preguntas frecuentes
      </h2>
      <Accordion type="single" collapsible className="mt-10 border-t border-border">
        {items.map((it, i) => (
          <AccordionItem key={i} value={`i-${i}`} className="border-b border-border">
            <AccordionTrigger className="text-left text-[17px] font-medium hover:no-underline py-6">
              {it.q}
            </AccordionTrigger>
            <AccordionContent className="text-[15px] leading-relaxed text-muted-foreground pb-6">
              {it.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

const CONCERNS = [
  "Mis anuncios cuestan cada vez más",
  "La IA no me recomienda",
  "Pierdo ventas por no responder a tiempo",
  "No sé dónde estoy perdiendo dinero",
  "Otro",
];

function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);
  const [concern, setConcern] = useState<string>(CONCERNS[0]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const preset = window.sessionStorage.getItem("rckt_concern");
    if (preset && CONCERNS.includes(preset)) {
      setConcern(preset);
      window.sessionStorage.removeItem("rckt_concern");
    }
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      name: String(fd.get("name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      company: String(fd.get("company") ?? "").trim(),
      website: String(fd.get("website") ?? "").trim(),
      concern: String(fd.get("concern") ?? "").trim(),
      source: "landing",
    };
    const nextErrors: Record<string, string> = {};
    if (!data.name) nextErrors.name = "Escribe tu nombre.";
    if (!data.email) nextErrors.email = "Escribe tu email de trabajo.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      nextErrors.email = "Ese email no parece válido.";
    if (!data.company) nextErrors.company = "Escribe el nombre de tu empresa.";
    if (data.website && !/^https?:\/\/|^www\.|\.[a-z]{2,}/i.test(data.website))
      nextErrors.website = "Ese sitio no parece válido.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
      formRef.current?.reset();
      setConcern(CONCERNS[0]);
    } catch (err) {
      console.error(err);
      setStatus("error");
      toast.error("No pudimos enviar tu solicitud. Prueba de nuevo en un momento.");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-border rounded-sm p-8 bg-card">
        <div className="font-mono text-[12px] text-accent tracking-[0.12em]">
          ✓ ENVIADO
        </div>
        <p className="mt-4 text-[18px] font-medium">
          Recibido. Te escribimos en 24–48h.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-[14px] text-muted-foreground hover:text-foreground transition-colors"
        >
          Enviar otro →
        </button>
      </div>
    );
  }

  const fieldCls =
    "w-full bg-input border border-border rounded-sm px-3 py-3 text-[15px] text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-accent transition-colors";

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-4">
      <label className="grid gap-1.5">
        <span className="font-mono text-[11px] text-muted-foreground tracking-[0.12em] uppercase">
          Nombre
        </span>
        <input name="name" className={fieldCls} placeholder="Tu nombre" autoComplete="name" />
        {errors.name && <span className="text-[12.5px] text-destructive">{errors.name}</span>}
      </label>
      <label className="grid gap-1.5">
        <span className="font-mono text-[11px] text-muted-foreground tracking-[0.12em] uppercase">
          Email de trabajo
        </span>
        <input name="email" type="email" className={fieldCls} placeholder="nombre@empresa.com" autoComplete="email" />
        {errors.email && <span className="text-[12.5px] text-destructive">{errors.email}</span>}
      </label>
      <label className="grid gap-1.5">
        <span className="font-mono text-[11px] text-muted-foreground tracking-[0.12em] uppercase">
          Empresa
        </span>
        <input name="company" className={fieldCls} placeholder="Nombre de tu empresa" autoComplete="organization" />
        {errors.company && <span className="text-[12.5px] text-destructive">{errors.company}</span>}
      </label>
      <label className="grid gap-1.5">
        <span className="font-mono text-[11px] text-muted-foreground tracking-[0.12em] uppercase">
          Sitio web <span className="text-muted-foreground/70">(opcional)</span>
        </span>
        <input name="website" className={fieldCls} placeholder="empresa.com" autoComplete="url" />
        {errors.website && <span className="text-[12.5px] text-destructive">{errors.website}</span>}
      </label>
      <label className="grid gap-1.5">
        <span className="font-mono text-[11px] text-muted-foreground tracking-[0.12em] uppercase">
          ¿Qué te preocupa hoy?
        </span>
        <select
          name="concern"
          className={fieldCls + " appearance-none"}
          value={concern}
          onChange={(e) => setConcern(e.target.value)}
        >
          {CONCERNS.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>
      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-2 inline-flex items-center justify-center gap-2 rounded-sm bg-accent text-accent-foreground px-5 py-3.5 text-[15px] font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
      >
        {status === "loading" ? "Enviando…" : "Pedir diagnóstico"}
      </button>
      <p className="text-center font-mono text-[11.5px] text-muted-foreground tracking-[0.06em]">
        Sin compromiso. Sin spam. Respuesta humana.
      </p>
    </form>
  );
}

function Contacto() {
  return (
    <section id="contacto" aria-label="Contacto" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">
        <div>
          <Eyebrow>DIAGNÓSTICO</Eyebrow>
          <h2 className="mt-4 text-[32px] md:text-[46px] leading-[1.05] tracking-[-0.03em] font-medium">
            Empieza por saber dónde estás
          </h2>
          <p className="mt-6 text-[17px] text-muted-foreground leading-relaxed max-w-md">
            Pide el diagnóstico. En 24–48 horas te respondemos con los próximos pasos.
          </p>
          <div className="mt-10 font-mono text-[12.5px] text-muted-foreground">
            <div>hola@rckt.es</div>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <div className="text-[18px] font-bold">RCKT</div>
          <p className="mt-2 text-[13.5px] text-muted-foreground">
            Sistemas de crecimiento con IA.
          </p>
          <p className="mt-6 font-mono text-[12.5px] text-muted-foreground">
            hola@rckt.es
          </p>
        </div>
        <div>
          <div className="font-mono text-[11px] text-muted-foreground tracking-[0.12em] uppercase">
            Navegar
          </div>
          <ul className="mt-4 space-y-2 text-[14px]">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-muted-foreground hover:text-foreground transition-colors">
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#contacto" className="text-muted-foreground hover:text-foreground transition-colors">
                Contacto
              </a>
            </li>
          </ul>
        </div>
        <div>
          <div className="font-mono text-[11px] text-muted-foreground tracking-[0.12em] uppercase">
            Legal
          </div>
          <ul className="mt-4 space-y-2 text-[14px]">
            <li>
              <a href="/aviso-legal" className="text-muted-foreground hover:text-foreground transition-colors">
                Aviso legal
              </a>
            </li>
            <li>
              <a href="/privacidad" className="text-muted-foreground hover:text-foreground transition-colors">
                Privacidad
              </a>
            </li>
            <li>
              <a href="/cookies" className="text-muted-foreground hover:text-foreground transition-colors">
                Cookies
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-5 font-mono text-[12px] text-muted-foreground">
          &gt; sistema activo · 2026
        </div>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-accent selection:text-accent-foreground">
      <Nav />
      <Hero />
      <SectionDivider />
      <Divisoria />
      <SectionDivider />
      <Sistema />
      <SectionDivider />
      <Servicios />
      <SectionDivider />
      <NoVendemos />
      <SectionDivider />
      <Metodo />
      <SectionDivider />
      <Principios />
      <SectionDivider />
      <FAQ />
      <SectionDivider />
      <Contacto />
      <Footer />
      <Toaster theme="dark" />
    </div>
  );
}
