const reasons = [
  { label: "Especialización", body: "Profundidad en cinco verticales. No generalismo de red global." },
  { label: "AI-first", body: "Sistema rediseñado alrededor de IA desde el día uno, no como add-on." },
  { label: "Velocidad", body: "Operación ágil sin estructura matricial ni comités de aprobación." },
  { label: "Medición real", body: "Ventas, margen, CAC y LTV. Cero dependencia de ROAS de plataforma." },
  { label: "Transparencia", body: "Growth OS documentado, auditable y enseñable. Sin caja negra." },
  { label: "Contacto único", body: "Un Growth Strategist senior. Sin rotación, sin handoffs internos." },
  { label: "Un solo equipo", body: "Operamos como una única célula multidisciplinar, sin oficinas paralelas ni handoffs entre mercados." },
  { label: "Ejecución integrada", body: "Construimos y operamos. No entregamos el deck y nos vamos." },
];

const WhyRckt = () => (
  <section className="px-6 py-28 md:py-36">
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-12 gap-8 mb-16">
        <div className="col-span-12 lg:col-span-4">
          <span className="text-[12px] text-primary">— Diferenciación</span>
        </div>
        <h2 className="col-span-12 lg:col-span-8 text-[34px] md:text-[44px] leading-[1.05] tracking-[-0.03em] font-medium">
          Por qué RCKT.es, y no la red global ni la{" "}
          <span className="font-serif italic text-primary">consultora estratégica</span>.
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {reasons.map((r, i) => (
          <div
            key={r.label}
            className="glass rounded-2xl p-6 space-y-3 transition-all hover:-translate-y-0.5"
          >
            <span className="text-[12px] font-mono text-primary tracking-wider">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="text-[17px] tracking-[-0.015em] font-medium">{r.label}</h3>
            <p className="text-muted-foreground text-[13.5px] leading-relaxed">{r.body}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyRckt;