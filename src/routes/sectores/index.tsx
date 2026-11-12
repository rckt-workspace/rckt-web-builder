import { createFileRoute } from "@tanstack/react-router";

import { CtaButton, PageSection, PageShell, productHead } from "@/components/rckt/ProductPage";

const SECTORES: { s: string; trae: string; prueba: string; href?: string }[] = [
  { s: "Hogar y electrodomésticos premium", trae: "Mapa de mercado del sector, reglas de oferta y de medios, biblioteca creativa y referencias de MER", prueba: "Caso La Cuisine", href: "/casos/la-cuisine" },
  { s: "E-commerce y marcas DTC premium", trae: "Mapa de mercado del sector; tráfico, conversión y recompra; tienda en Shopify, presencia en asistentes de IA y catálogo legible por ellos", prueba: "Cuentas de e-commerce premium que operamos hoy" },
  { s: "B2B y SaaS", trae: "Mapa de mercado del sector; campañas para cuentas objetivo, seguimiento de pipeline, copilotos comerciales y contenido B2B", prueba: "Cuentas B2B que operamos hoy" },
  { s: "Salud privada y estética", trae: "Captación de pacientes por WhatsApp ciudad por ciudad, con las reglas publicitarias del sector; estructura de cuentas y ciclo creativo; agentes de WhatsApp y voz para clínicas", prueba: "Caso NewBody", href: "/casos/newbody" },
];

export const Route = createFileRoute("/sectores/")({
  head: () => productHead("/sectores", "Especialización en hogar premium, DTC, B2B y salud | RCKT", "Mapa de mercado propio en cuatro sectores: tu diagnóstico arranca con el mercado ya estudiado y se hace en una semana."),
  component: () => (
    <PageShell
      label="Sectores"
      title={<>Especialización por sector: empezamos con tu mercado ya <span className="hero-hand">estudiado.</span></>}
      subtitle="En cuatro sectores tenemos un mapa de mercado propio: clientes, competidores, propuesta de valor típica, referencias de MER y reglas de medios. Tu diagnóstico arranca desde ahí y pasa de tres semanas a una."
    >
      <PageSection num="01." label="Cuatro sectores" title="Lo que traemos preparado.">
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {SECTORES.map((x) => (
            <article key={x.s} className="card-kraft flex flex-col p-7 md:p-8">
              <h3 className="font-display text-xl font-semibold">{x.s}</h3>
              <p className="label-orange mt-5">Qué traemos preparado</p>
              <p className="mt-2 flex-1 text-[15px] leading-relaxed text-muted-foreground">{x.trae}</p>
              <p className="label-orange mt-5">Prueba</p>
              <p className="mt-2 text-[15px] font-medium">{x.prueba}</p>
              {x.href ? <a href={x.href} className="mt-4 text-sm font-semibold text-orange hover:underline">Ver caso →</a> : null}
            </article>
          ))}
        </div>
        <p className="mt-10 max-w-3xl text-[16px] leading-relaxed">¿Tu sector no está aquí? El diagnóstico se hace completo, en tres semanas, con el mismo método.</p>
      </PageSection>
      <PageSection id="mercados" num="02." label="Mercados" title="España y Europa.">
        <div className="mt-10 max-w-3xl space-y-5 text-[17px] leading-relaxed">
          <p>Operamos desde Madrid. Trabajamos con el RGPD y la regulación europea de publicidad y datos incorporados desde el diagnóstico, y con la dinámica de medios de cada mercado.</p>
          <p className="text-muted-foreground">También operamos en Sudamérica, donde está parte de nuestro equipo de entrega.</p>
        </div>
        <div className="mt-10"><CtaButton /></div>
      </PageSection>
    </PageShell>
  ),
});
