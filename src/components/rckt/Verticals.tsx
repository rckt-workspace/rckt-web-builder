const verticals = [
  { n: "V1", name: "Ecommerce Premium / DTC", desc: "Electrodomésticos, hogar, belleza, moda y food premium.", focus: "Crecimiento sostenido en adquisición y recompra.", solution: "Feed optimization, pauta omnicanal, lifecycle de recompra y profitability por canal." },
  { n: "V2", name: "Clínicas & Salud Privada", desc: "Estética médica, cirugía, odontología, especialidades.", focus: "Captación local cualificada y experiencia de paciente.", solution: "GEO/SEO médico local, WhatsApp con scoring, CRM de ciclo largo y gestión reputacional." },
  { n: "V3", name: "B2B SaaS & Tech", desc: "Software empresarial, plataformas y servicios tech.", focus: "Generación de demanda y aceleración de pipeline.", solution: "ABM, LinkedIn estratégico, demand gen y medición incremental real sobre pipeline." },
  { n: "V4", name: "Servicios Profesionales", desc: "Legal, consultoría, asesoría financiera y arquitectura.", focus: "Autoridad digital y previsibilidad comercial.", solution: "Executive content, GEO/SEO por especialidad, WhatsApp y CRM de ciclo largo." },
  { n: "V5", name: "Retail Media", desc: "Mercado Ads, Amazon Ads, Carrefour, Walmart.", focus: "La tercera ola publicitaria, operada con disciplina.", solution: "Retail media ops, catálogos optimizados, co-op management y medición cerrada." },
];

const Verticals = () => (
  <section id="verticales" className="px-8 py-32 border-t border-border">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-12 gap-8 mb-20">
        <div className="col-span-12 lg:col-span-4">
          <span className="text-[11px] uppercase tracking-widest text-muted-foreground">Verticales</span>
        </div>
        <h2 className="col-span-12 lg:col-span-8 font-serif text-4xl md:text-5xl leading-tight">
          Cinco mercados. Profundidad antes que escala.
        </h2>
      </div>
      <div className="border-t border-border">
        {verticals.map((v) => (
          <article key={v.n} className="grid grid-cols-12 gap-8 py-10 border-b border-border">
            <div className="col-span-12 md:col-span-2 space-y-2">
              <span className="text-[11px] font-mono text-muted-foreground tracking-widest">{v.n}</span>
              <h3 className="font-serif text-2xl leading-tight">{v.name}</h3>
            </div>
            <div className="col-span-12 md:col-span-3 text-sm text-muted-foreground leading-relaxed">{v.desc}</div>
            <div className="col-span-12 md:col-span-3 space-y-2">
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Foco</span>
              <p className="text-sm leading-relaxed">{v.focus}</p>
            </div>
            <div className="col-span-12 md:col-span-4 space-y-2">
              <span className="text-[10px] uppercase tracking-widest text-accent">Sistema RCKT</span>
              <p className="text-sm leading-relaxed">{v.solution}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Verticals;