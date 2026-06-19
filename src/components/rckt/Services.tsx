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
  <section id="servicios" className="px-6 py-28 md:py-36">
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-12 gap-8 mb-16">
        <div className="col-span-12 lg:col-span-4">
          <span className="text-[12px] text-primary">— Catálogo operativo</span>
        </div>
        <h2 className="col-span-12 lg:col-span-8 text-[34px] md:text-[44px] leading-[1.05] tracking-[-0.03em] font-medium">
          Cuatro niveles de profundidad. Una sola{" "}
          <span className="font-serif italic text-primary">lógica de sistema</span>.
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {tiers.map((t) => (
          <article
            key={t.n}
            className={`rounded-3xl p-8 md:p-10 space-y-5 transition-all hover:-translate-y-0.5 ${
              t.featured
                ? "bg-primary text-primary-foreground border border-primary shadow-elegant"
                : "glass text-foreground"
            }`}
          >
            <div className="flex items-baseline justify-between">
              <span className={`text-[12px] font-mono tracking-wider ${t.featured ? "text-primary-foreground/75" : "text-primary"}`}>
                {t.n} · {t.label}
              </span>
              {t.featured && (
                <span className="text-[10px] uppercase tracking-[0.18em] rounded-full border border-primary-foreground/30 px-2.5 py-0.5">
                  Sistema completo
                </span>
              )}
            </div>
            <h3 className="text-[26px] leading-tight tracking-[-0.02em] font-medium">{t.title}</h3>
            <p className={`text-[14.5px] leading-relaxed ${t.featured ? "text-primary-foreground/85" : "text-muted-foreground"}`}>{t.body}</p>
            <ul className={`text-[14px] space-y-2 pt-4 border-t ${t.featured ? "border-primary-foreground/20" : "border-border/70"}`}>
              {t.items.map((i) => (
                <li key={i} className="flex gap-3">
                  <span className={`${t.featured ? "text-primary-foreground/55" : "text-primary/70"} font-mono text-[11px] pt-1`}>—</span>
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