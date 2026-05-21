import logistics from "@/assets/case-logistics.jpg";

const metrics = [
  { label: "CAC", before: "USD 120", after: "USD 45", delta: "−62%" },
  { label: "LTV", before: "USD 420", after: "USD 680", delta: "+62%" },
  { label: "ROAS", before: "1.2×", after: "3.1×", delta: "+158%" },
  { label: "Revenue incremental", before: "—", after: "USD 450K", delta: "anual" },
];

const CaseStudies = () => (
  <section id="casos" className="px-8 py-32 border-t border-border">
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-16">
        <div className="space-y-3">
          <span className="text-[11px] uppercase tracking-widest text-muted-foreground">Caso seleccionado</span>
          <h2 className="font-serif text-5xl">La Cuisine Appliances · Perú</h2>
        </div>
        <span className="hidden md:inline-block text-[11px] font-mono text-muted-foreground tracking-widest">RC-CASE / 018</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-border border border-border">
        <div className="bg-background p-2">
          <img
            src={logistics}
            alt="Dashboard operativo de adquisición y margen para ecommerce premium"
            width={1024}
            height={768}
            loading="lazy"
            className="w-full h-full object-cover aspect-[4/3]"
          />
        </div>
        <div className="bg-background p-10 lg:p-12 space-y-8">
          <div className="space-y-3">
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Ecommerce premium · Electrodomésticos</span>
            <h3 className="font-serif text-3xl leading-tight">De campañas dispersas a una operación gobernada por evidencia.</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Seis meses de Growth System integrado: data layer server-side, creative lab con IA, lifecycle y medición incremental sobre venta real.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-px bg-border border border-border">
            {metrics.map((m) => (
              <div key={m.label} className="bg-background p-5 space-y-2">
                <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{m.label}</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-xs text-muted-foreground line-through">{m.before}</span>
                  <span className="font-serif text-2xl">{m.after}</span>
                </div>
                <span className="text-[11px] font-mono text-accent">{m.delta}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default CaseStudies;