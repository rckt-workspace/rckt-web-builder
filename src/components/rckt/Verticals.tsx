const verticals = [
  { n: "V1", name: "Ecommerce Premium / DTC", desc: "Electrodomésticos, hogar, belleza, moda y food premium.", focus: "Crecimiento sostenido en adquisición y recompra.", solution: "Feed optimization, pauta omnicanal, lifecycle de recompra y profitability por canal." },
  { n: "V2", name: "Clínicas & Salud Privada", desc: "Estética médica, cirugía, odontología, especialidades.", focus: "Captación local cualificada y experiencia de paciente.", solution: "GEO/SEO médico local, WhatsApp con scoring, CRM de ciclo largo y gestión reputacional." },
  { n: "V3", name: "B2B SaaS & Tech", desc: "Software empresarial, plataformas y servicios tech.", focus: "Generación de demanda y aceleración de pipeline.", solution: "ABM, LinkedIn estratégico, demand gen y medición incremental real sobre pipeline." },
  { n: "V4", name: "Servicios Profesionales", desc: "Legal, consultoría, asesoría financiera y arquitectura.", focus: "Autoridad digital y previsibilidad comercial.", solution: "Executive content, GEO/SEO por especialidad, WhatsApp y CRM de ciclo largo." },
  { n: "V5", name: "Retail Media", desc: "Mercado Ads, Amazon Ads, Carrefour, Walmart.", focus: "La tercera ola publicitaria, operada con disciplina.", solution: "Retail media ops, catálogos optimizados, co-op management y medición cerrada." },
];

const Verticals = () => (
  <section id="verticales" className="px-6 py-28 md:py-36">
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-12 gap-8 mb-16">
        <div className="col-span-12 lg:col-span-4">
          <span className="text-[12px] text-primary">— Verticales</span>
        </div>
        <h2 className="col-span-12 lg:col-span-8 text-[34px] md:text-[44px] leading-[1.05] tracking-[-0.03em] font-medium">
          Cinco mercados. <span className="font-serif italic text-primary">Profundidad</span> antes que escala.
        </h2>
      </div>
      <div className="glass rounded-3xl overflow-hidden divide-y divide-white/40">
        {verticals.map((v) => (
          <article key={v.n} className="grid grid-cols-12 gap-6 p-8 md:p-10 hover:bg-white/30 transition-colors">
            <div className="col-span-12 md:col-span-3 space-y-2">
              <span className="text-[12px] font-mono text-primary tracking-wider">{v.n}</span>
              <h3 className="text-[22px] leading-tight tracking-[-0.02em] font-medium">{v.name}</h3>
            </div>
            <div className="col-span-12 md:col-span-3 text-[14px] text-muted-foreground leading-relaxed">{v.desc}</div>
            <div className="col-span-12 md:col-span-3 space-y-1.5">
              <span className="text-[11px] uppercase tracking-wider text-muted-foreground">Foco</span>
              <p className="text-[14px] leading-relaxed">{v.focus}</p>
            </div>
            <div className="col-span-12 md:col-span-3 space-y-1.5">
              <span className="text-[11px] uppercase tracking-wider text-primary">Sistema RCKT.es</span>
              <p className="text-[14px] leading-relaxed">{v.solution}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Verticals;