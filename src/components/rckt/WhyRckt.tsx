const reasons = [
  { label: "Especialización", body: "Profundidad en cinco verticales. No generalismo de red global." },
  { label: "AI-first", body: "Sistema rediseñado alrededor de IA desde el día uno, no como add-on." },
  { label: "Velocidad", body: "Operación ágil sin estructura matricial ni comités de aprobación." },
  { label: "Medición real", body: "Ventas, margen, CAC y LTV. Cero dependencia de ROAS de plataforma." },
  { label: "Transparencia", body: "Growth OS documentado, auditable y enseñable. Sin caja negra." },
  { label: "Contacto único", body: "Un Growth Strategist senior. Sin rotación, sin handoffs internos." },
  { label: "Bilingüismo operativo", body: "LatAm + España como un solo equipo, no dos oficinas." },
  { label: "Ejecución integrada", body: "Construimos y operamos. No entregamos el deck y nos vamos." },
];

const WhyRckt = () => (
  <section className="px-8 py-32 border-t border-border bg-card">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-12 gap-8 mb-20">
        <div className="col-span-12 lg:col-span-4">
          <span className="text-[11px] uppercase tracking-widest text-muted-foreground">Diferenciación</span>
        </div>
        <h2 className="col-span-12 lg:col-span-8 font-serif text-4xl md:text-5xl leading-tight">
          Por qué RCKT, y no la red global ni la consultora estratégica.
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
        {reasons.map((r, i) => (
          <div key={r.label} className="bg-card p-8 space-y-3">
            <span className="text-[11px] font-mono text-muted-foreground tracking-widest">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="font-serif text-xl">{r.label}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{r.body}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyRckt;