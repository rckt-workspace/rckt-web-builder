import { createFileRoute } from "@tanstack/react-router";
import { Check, Database, Layers, Lock, PackageOpen, ShieldCheck, UserRoundCheck, X } from "lucide-react";

import GeneralCta from "@/components/rckt/GeneralCta";
import SectionHeader from "@/components/rckt/SectionHeader";
import SiteFooter from "@/components/rckt/SiteFooter";
import SiteNav from "@/components/rckt/SiteNav";
import SystemPageHero from "@/components/rckt/SystemPageHero";

const DIAGNOSTIC_HREF = "/sistemas/revenue-diagnostic";

export const Route = createFileRoute("/nosotros/")({
  head: () => ({
    meta: [
      { title: "Nosotros — Sistemas que convierten demanda en ventas | RCKT.es" },
      { name: "description", content: "RCKT diseña y opera sistemas que convierten demanda en ventas: campañas, conversaciones, CRM e IA supervisada, medidos hasta el ingreso. Operamos en España desde Madrid." },
      { property: "og:title", content: "Nosotros — RCKT.es" },
      { property: "og:description", content: "RCKT diseña y opera sistemas que convierten demanda en ventas: campañas, conversaciones, CRM e IA supervisada, medidos hasta el ingreso. Operamos en España desde Madrid." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.rckt.es/nosotros" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://www.rckt.es/nosotros" }],
  }),
  component: NosotrosPage,
});

const SOMOS = [
  "Una firma que se hace responsable del resultado comercial, no de una tarea.",
  "Un equipo que conecta lo que el cliente hoy tiene separado: campañas, WhatsApp, web, CRM, ventas y operación.",
  "Una forma de trabajar donde todo se mide hasta la venta, con una sola fuente de verdad que el cliente firma.",
  "IA en cada sistema, siempre con supervisión humana y con un documento que dice qué hace sola y qué no.",
];

const NO_SOMOS = [
  "No somos una agencia de medios que optimiza por coste por lead.",
  "No hacemos webs sueltas, community management ni diseño gráfico por encargo.",
  "No vendemos chatbots ni «IA» como producto. Vendemos un proceso que mejora y se puede medir.",
  "No prometemos lo que no controlamos: stock, precios, cierre o calidad de atención del cliente.",
];

const PILARES = [
  ["01", "SELL BETTER", "Haz que cada oportunidad cuente."],
  ["02", "THINK BETTER", "Mejores decisiones, mejores resultados."],
  ["03", "WORK SMARTER", "La tecnología trabaja. El criterio dirige."],
  ["04", "MOVE FIRST", "Detecta antes. Actúa antes."],
  ["05", "PROOF > PROMISES", "Resultados que hablan por sí solos."],
] as const;

const PRINCIPIOS = [
  ["01", Database, "Una fuente de verdad", "Un solo modelo de datos: inversión → lead → MQL → SQL → reunión → oportunidad → venta → margen, con definiciones que el cliente firma."],
  ["02", ShieldCheck, "IA supervisada", "Cada cuenta documenta qué se automatiza, qué requiere aprobación humana, cómo se detectan fallos y quién interviene."],
  ["03", UserRoundCheck, "Un responsable con autoridad", "Decide prioridades entre medios, creatividad, conversión y operación. No coordina: responde por el resultado."],
  ["04", Layers, "Activos reutilizables", "Conectores, tracking, evaluaciones, playbooks y biblioteca creativa. Lo que se repite se documenta y se versiona."],
  ["05", Lock, "Gobierno y seguridad", "Accesos, datos personales, consentimiento y cumplimiento local, con apoyo jurídico cuando haga falta."],
  ["06", PackageOpen, "Transferencia", "Documentación y accesos completos desde el primer día. El cliente puede irse con su sistema."],
] as const;

function NosotrosPage() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <SiteNav />
      <main>
        <SystemPageHero
          label="Nosotros"
          title={<>RCKT diseña y opera sistemas que convierten <span className="text-orange">demanda en ventas.</span></>}
          context="Diseñamos y operamos sistemas que convierten demanda en ventas: campañas, conversaciones, CRM e IA supervisada, medidos hasta el ingreso. Trabajamos con empresas consolidadas que ya venden e invierten en marketing, y pierden dinero entre la campaña y el cierre. Operamos en España desde Madrid."
          extra={<p className="font-display mt-5 text-[26px] font-semibold text-orange md:text-[30px]">Del clic al cierre.</p>}
          ctaLabel="Solicitar diagnóstico de captación →"
          ctaHref={DIAGNOSTIC_HREF}
        />

        <section className="page-section">
          <div className="page-shell">
            <SectionHeader num="01." label="Manifiesto" title="Manifiesto." />
            <p className="font-display mt-10 max-w-[900px] text-[1.5rem] leading-[1.35] font-semibold md:text-[2.1rem]">
              Hacemos crecer lo que importa, aplicamos inteligencia con precisión, medimos lo que hacemos y construimos relaciones que perduran, porque el verdadero crecimiento no se persigue: se diseña, se demuestra y se sostiene.
            </p>
          </div>
        </section>

        <section className="page-section">
          <div className="page-shell">
            <SectionHeader num="02." label="En una frase" title="Respondemos por lo que pasa en el medio." phrase="No vendemos campañas sueltas, webs ni chatbots. Diseñamos y operamos el sistema entre la inversión en marketing y la venta." />
          </div>
        </section>

        <section className="page-section">
          <div className="page-shell grid items-stretch gap-6 md:grid-cols-2">
            <div className="band--orange rounded-[8px] p-8 md:p-10">
              <h2 className="font-display text-[28px] font-semibold">Lo que somos</h2>
              <ul className="mt-6 space-y-4">{SOMOS.map((text) => <li key={text} className="flex gap-3 leading-relaxed"><Check className="mt-1 h-4 w-4 shrink-0" /><span>{text}</span></li>)}</ul>
            </div>
            <div className="content-card p-8 md:p-10">
              <h2 className="font-display text-[28px] font-semibold">Lo que no somos</h2>
              <ul className="mt-6 space-y-4">{NO_SOMOS.map((text) => <li key={text} className="flex gap-3 leading-relaxed text-muted-foreground"><X className="mt-1 h-4 w-4 shrink-0 text-orange" /><span>{text}</span></li>)}</ul>
            </div>
          </div>
        </section>

        <section className="page-section">
          <div className="page-shell">
            <SectionHeader num="03." label="Los 5 pilares" title="Cinco maneras de trabajar mejor." />
            <div className="pillar-grid mt-10">{PILARES.map(([n, title, text]) => <article key={n} className="content-card pillar-card"><span className="font-hero text-[32px] font-semibold text-orange">{n}</span><h3 className="font-display mt-5 text-[17px] font-semibold">{title}</h3><p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{text}</p></article>)}</div>
            <div className="content-card mt-6 p-7 md:p-9"><span className="section-pill">En la práctica</span><p className="mt-5 max-w-[950px] leading-[1.7]">Vender mejor es decirle que no al cliente potencial que no encaja, aunque duela el mes. Pensar mejor es medir antes de tocar nada. Trabajar más inteligente es un proceso a la vez, con supervisión, no un chatbot suelto. Movernos primero es que el Diagnostic dure semanas, no trimestres. Y la prueba por encima de la promesa es que ningún resultado se menciona sin ficha de caso.</p></div>
          </div>
        </section>

        <section className="page-section">
          <div className="page-shell">
            <SectionHeader num="04." label="Principios" title={<>La base común de <span className="text-orange">toda cuenta.</span></>} />
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{PRINCIPIOS.map(([n, Icon, title, text]) => <article key={n} className="content-card p-7"><div className="flex items-center gap-3"><Icon className="h-6 w-6 text-orange" /><span className="font-hero text-[28px] font-semibold text-orange">{n}</span></div><h3 className="font-display mt-4 text-[19px] font-semibold">{title}</h3><p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{text}</p></article>)}</div>
          </div>
        </section>

        <section className="page-section">
          <div className="page-shell">
            <SectionHeader num="05." label="A quién servimos" title="Empresas consolidadas con una fuga entre campaña y cierre." />
            <p className="mt-8 max-w-[900px] text-[18px] leading-[1.7] text-muted-foreground">Trabajamos con empresas consolidadas que ya venden, ya invierten en marketing o ventas y pierden dinero entre la campaña y el cierre. El tamaño no es un filtro absoluto: una empresa pequeña con ticket alto y buen margen puede ser mejor cliente que una grande con márgenes bajos.</p>
          </div>
        </section>

        <section className="page-section">
          <div className="page-shell grid items-stretch gap-6 md:grid-cols-2">
            <LinkCard title="Cómo trabajamos" text="Operar, Sprint o Partner: las modalidades y cómo crece una cuenta." href="/nosotros/como-trabajamos" />
            <LinkCard title="Mercados" text="Dónde operamos: España, desde Madrid." href="/mercados/" />
          </div>
        </section>
        <GeneralCta />
      </main>
      <SiteFooter />
    </div>
  );
}

function LinkCard({ title, text, href }: { title: string; text: string; href: string }) {
  return <a href={href} className="content-card group flex min-h-[210px] flex-col p-8"><span className="label-orange">Siguiente</span><h2 className="font-display mt-4 text-[28px] font-semibold">{title}</h2><p className="mt-3 leading-relaxed text-muted-foreground">{text}</p><span className="mt-auto pt-7 font-semibold text-orange group-hover:underline">Ver más →</span></a>;
}