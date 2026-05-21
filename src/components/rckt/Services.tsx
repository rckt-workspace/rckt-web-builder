const tiers = [
  {
    n: "T1",
    label: "Foundation",
    title: "Puertas de entrada",
    body: "Proyectos cerrados de diagnóstico y construcción base.",
    items: ["AI Growth Audit (madurez 6D)", "Diseño Web AI-Ready (Webflow / Next.js)", "Shopify Store Build con tracking server-side", "Brand Foundation Pack + prompts", "GEO / SEO Audit a 90 días", "Ecommerce Profitability Analysis"],
  },
  {
    n: "T2",
    label: "Growth Operations",
    title: "Operación recurrente",
    body: "Retainers operativos coordinados, nunca servicios sueltos.",
    items: ["Performance Media omnicanal + CAPI", "Creative Lab (30–100 variantes/mes)", "GEO + SEO Engine para IA y Google", "WhatsApp Commerce (API + agentes)", "Lifecycle & CRM predictivo", "Retail Media Ops y Executive Content"],
  },
  {
    n: "T3",
    label: "Growth System",
    title: "Sistema integrado",
    body: "Integración completa de las seis capas del Growth OS con setup en 90 días y Growth Strategist único.",
    items: ["Integración completa de las 6 capas", "Setup 90 días: data layer + campañas + reporting", "Medición incremental sobre venta real", "Gobernanza de IA y compliance", "Punto único de contacto a nivel C-level"],
    featured: true,
  },
  {
    n: "T4",
    label: "Specialty",
    title: "Engagements estratégicos",
    body: "Engagements de ciclo largo para problemas complejos de transformación.",
    items: ["AI Transformation Sprint (10–16 semanas)", "Custom AI Agents (comercial, soporte, pricing)", "Data Infrastructure (CDP + warehouse)", "Fractional CMO / Fractional Head of AI", "Ecommerce Re-platform (Shopify Plus, VTEX)"],
  },
];

const Services = () => (
  <section id="servicios" className="px-8 py-32 border-t border-border bg-card">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-12 gap-8 mb-20">
        <div className="col-span-12 lg:col-span-4">
          <span className="text-[11px] uppercase tracking-widest text-muted-foreground">Catálogo operativo</span>
        </div>
        <h2 className="col-span-12 lg:col-span-8 font-serif text-4xl md:text-5xl leading-tight">
          Cuatro niveles de profundidad. Una sola lógica de sistema.
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
        {tiers.map((t) => (
          <article
            key={t.n}
            className={`p-10 space-y-6 ${t.featured ? "bg-accent text-accent-foreground" : "bg-background"}`}
          >
            <div className="flex items-baseline justify-between">
              <span className={`text-[11px] font-mono tracking-widest ${t.featured ? "text-accent-foreground/70" : "text-muted-foreground"}`}>
                {t.n} · {t.label}
              </span>
              {t.featured && (
                <span className="text-[10px] uppercase tracking-[0.2em] border border-accent-foreground/40 px-2 py-0.5">
                  Sistema completo
                </span>
              )}
            </div>
            <h3 className="font-serif text-3xl leading-tight">{t.title}</h3>
            <p className={`text-sm leading-relaxed ${t.featured ? "text-accent-foreground/80" : "text-muted-foreground"}`}>{t.body}</p>
            <ul className={`text-sm space-y-2 pt-4 border-t ${t.featured ? "border-accent-foreground/20" : "border-border"}`}>
              {t.items.map((i) => (
                <li key={i} className="flex gap-3">
                  <span className={`${t.featured ? "text-accent-foreground/50" : "text-muted-foreground"} font-mono text-[11px] pt-1`}>—</span>
                  <span>{i}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Services;