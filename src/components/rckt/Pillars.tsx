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
    title: "Vigilancia total",
    body: "Comando centralizado para mercados fragmentados. Visión ejecutiva con control granular sobre ecosistemas multi-canal, sin perder integridad de marca a ningún volumen.",
  },
];

const Pillars = () => (
  <section id="sistema" className="px-6 py-28 md:py-36">
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-12 gap-8 mb-16">
        <div className="col-span-12 lg:col-span-4">
          <span className="text-[12px] text-primary">— Posicionamiento</span>
        </div>
        <h2 className="col-span-12 lg:col-span-8 text-[34px] md:text-[44px] leading-[1.05] tracking-[-0.03em] font-medium">
          Construimos lo que las agencias subcontratan y las consultoras{" "}
          <span className="font-serif italic text-primary">solo recomiendan</span>.
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {pillars.map((p) => (
          <div
            key={p.label}
            className="glass rounded-3xl p-8 space-y-4"
          >
            <div className="text-[12px] text-primary tracking-wider">— {p.label}</div>
            <h3 className="text-[24px] leading-tight tracking-[-0.02em] font-medium">{p.title}</h3>
            <p className="text-muted-foreground text-[14.5px] leading-relaxed">{p.body}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Pillars;