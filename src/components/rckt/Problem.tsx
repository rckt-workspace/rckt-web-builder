const items = [
  { n: "01", title: "Canales integrados en un solo sistema", body: "Conectamos Shopify, Meta, Google, CRM y data interna en una capa común. Las decisiones se toman sobre una única fuente de verdad." },
  { n: "02", title: "Estrategia y ejecución en el mismo equipo", body: "Diseñamos el plan y lo operamos. El cliente recibe sistema y resultados, no solo recomendaciones." },
  { n: "03", title: "IA gobernada y productiva", body: "Modelos integrados con datos limpios, políticas claras y medición real. La IA acelera decisiones en lugar de añadir ruido." },
  { n: "04", title: "Medición sobre venta real", body: "Incrementalidad, CAC y LTV sobre el negocio, no sobre métricas de plataforma. Crecimiento demostrado con evidencia." },
];

const Problem = () => (
  <section className="px-8 py-32 border-t border-border">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-12 gap-8 mb-20">
        <div className="col-span-12 lg:col-span-4">
          <span className="text-[11px] uppercase tracking-widest text-muted-foreground">Diagnóstico</span>
        </div>
        <h2 className="col-span-12 lg:col-span-8 font-serif text-4xl md:text-5xl leading-tight">
          Cuatro principios que convierten al marketing en <i>sistema</i>.
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
        {items.map((i) => (
          <article key={i.n} className="bg-background p-10 space-y-4">
            <span className="text-[11px] font-mono text-muted-foreground tracking-widest">{i.n}</span>
            <h3 className="font-serif text-2xl leading-snug">{i.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{i.body}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Problem;