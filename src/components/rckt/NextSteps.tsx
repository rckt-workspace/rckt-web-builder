const steps = [
  { n: "01", title: "Conversación", body: "Una primera lectura conjunta del momento del negocio, las prioridades comerciales y el estado de la operación digital." },
  { n: "02", title: "Plan", body: "Recomendación operativa a noventa días, priorizada por impacto en el negocio y velocidad de ejecución." },
  { n: "03", title: "Sistema", body: "Growth System completo o servicios específicos, calibrados según la madurez interna y la ambición comercial." },
];

const NextSteps = () => (
  <section id="contacto" className="px-8 py-32 border-t border-border">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-12 gap-8 mb-20">
        <div className="col-span-12 lg:col-span-4 space-y-2">
          <span className="text-[11px] uppercase tracking-widest text-muted-foreground">Próximos pasos</span>
          <p className="text-[11px] font-mono text-muted-foreground">RC-INTAKE / 026</p>
        </div>
        <div className="col-span-12 lg:col-span-8 space-y-8">
          <h2 className="font-serif text-5xl md:text-6xl leading-[0.95]">
            Tres pasos para empezar a operar como sistema.
          </h2>
          <p className="text-muted-foreground max-w-xl leading-relaxed">
            Trabajamos con un número acotado de compañías por año. Escríbenos a <a href="mailto:contacto@rckt.es" className="text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground">contacto@rckt.es</a> para iniciar la conversación.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 border-t border-border">
        {steps.map((s, i) => (
          <div
            key={s.n}
            className={`py-10 md:py-12 md:px-10 space-y-4 ${i < steps.length - 1 ? "md:border-r border-border" : ""}`}
          >
            <div className="flex items-baseline justify-between">
              <span className="text-[11px] font-mono text-muted-foreground tracking-widest">{s.n}</span>
              <div className="w-1 h-1 bg-accent rounded-full" />
            </div>
            <h3 className="font-serif text-3xl">{s.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{s.body}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default NextSteps;