const items = [
  { n: "01", title: "Canales integrados en un solo sistema", body: "Conectamos Shopify, Meta, Google, CRM y data interna en una capa común. Las decisiones se toman sobre una única fuente de verdad." },
  { n: "02", title: "Estrategia y ejecución en el mismo equipo", body: "Diseñamos el plan y lo operamos. El cliente recibe sistema y resultados, no solo recomendaciones." },
  { n: "03", title: "IA gobernada y productiva", body: "Modelos integrados con datos limpios, políticas claras y medición real. La IA acelera decisiones en lugar de añadir ruido." },
  { n: "04", title: "Medición sobre venta real", body: "Incrementalidad, CAC y LTV sobre el negocio, no sobre métricas de plataforma. Crecimiento demostrado con evidencia." },
];

const Problem = () => (
  <section className="px-6 py-28 md:py-36">
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-12 gap-8 mb-16">
        <div className="col-span-12 lg:col-span-4">
          <span className="text-[12px] text-primary">— Diagnóstico</span>
        </div>
        <h2 className="col-span-12 lg:col-span-8 text-[34px] md:text-[44px] leading-[1.05] tracking-[-0.03em] font-medium">
          Cuatro principios que convierten al marketing en{" "}
          <span className="font-serif italic text-primary">sistema</span>.
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((i) => (
          <article
            key={i.n}
            className="glass rounded-3xl p-8 md:p-10 space-y-3 transition-all hover:-translate-y-0.5"
          >
            <span className="text-[12px] font-mono text-primary tracking-wider">{i.n}</span>
            <h3 className="text-[22px] leading-snug tracking-[-0.02em] font-medium">{i.title}</h3>
            <p className="text-muted-foreground text-[14.5px] leading-relaxed">{i.body}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Problem;