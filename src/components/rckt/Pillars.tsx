const pillars = [
  {
    label: "Precisión",
    title: "Claridad operativa",
    body: "Datos verificados, tracking server-side y resultados deterministas. Cada decisión es trazable hasta la venta real, con la transparencia que la dirección necesita para actuar con seguridad.",
  },
  {
    label: "Inteligencia",
    title: "Ventaja técnica",
    body: "Infraestructura propietaria que detecta ineficiencias antes que el mercado. No usamos IA como herramienta agregada: rediseñamos el sistema alrededor de ella desde el día uno.",
  },
  {
    label: "Control",
    title: "Vigilancia global",
    body: "Comando centralizado para mercados fragmentados. Visión ejecutiva con control granular sobre ecosistemas multi-canal en LatAm y España, sin perder integridad de marca a ningún volumen.",
  },
];

const Pillars = () => (
  <section id="sistema" className="px-8 py-32 border-t border-border bg-card">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-12 gap-8 mb-20">
        <div className="col-span-12 lg:col-span-4">
          <span className="text-[11px] uppercase tracking-widest text-muted-foreground">Posicionamiento</span>
        </div>
        <h2 className="col-span-12 lg:col-span-8 font-serif text-4xl md:text-5xl leading-tight">
          Construimos lo que las agencias subcontratan y las consultoras solo recomiendan.
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 border-t border-border pt-16">
        {pillars.map((p) => (
          <div key={p.label} className="space-y-6">
            <div className="text-[12px] font-semibold text-accent tracking-widest uppercase">{p.label}</div>
            <h3 className="font-serif text-3xl">{p.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{p.body}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Pillars;