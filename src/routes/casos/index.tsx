import { createFileRoute } from "@tanstack/react-router";

import { PageSection, PageShell, productHead } from "@/components/rckt/ProductPage";

// Mismas tarjetas que la home. La cifra se muestra solo cuando haya dato real.
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

export const Route = createFileRoute("/casos/")({
  head: () => productHead("/casos", "Casos de crecimiento con resultados medidos | RCKT", "Casos de empresas con producto probado que crecen con RCKT: qué hicimos y qué productos usamos."),
  component: () => (
    <PageShell
      label="Casos"
      title={<span className="hero-hand">Casos.</span>}
      subtitle="Empresas con las que trabajamos hoy."
    >
      <PageSection num="01." label="Casos" title="Clientes.">
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {CASOS.map((c) => (
            <article key={c.name} className="card-kraft flex flex-col p-7 md:p-8">
              {c.metric && <p className="font-display text-4xl font-semibold text-orange">{c.metric}</p>}
              <h3 className="font-display text-xl font-semibold">{c.name}</h3>
              <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted-foreground">{c.text}</p>
              <a href={c.href} className="mt-5 text-sm font-semibold text-orange hover:underline">Ver caso →</a>
            </article>
          ))}
        </div>
      </PageSection>
    </PageShell>
  ),
});
