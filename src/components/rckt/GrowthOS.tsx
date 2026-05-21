const layers = [
  { n: "01", label: "Datos", body: "CDP, CRM, server-side tracking y modelado de eventos. La base sobre la que cualquier IA puede tomar decisiones confiables." },
  { n: "02", label: "Inteligencia", body: "Modelos que deciden y optimizan en tiempo real. No dashboards: motores de asignación de presupuesto y priorización de audiencia." },
  { n: "03", label: "Creatividad", body: "Assets generados, testeados y rotados con disciplina industrial. 30 a 100 variantes por mes orquestadas con IA y dirección editorial." },
  { n: "04", label: "Activación", body: "Media multi-canal coordinado: Meta, Google, TikTok, Mercado Ads, Amazon, retail media. Un solo plan, una sola lectura." },
  { n: "05", label: "Experiencia", body: "Lifecycle integrado en email, WhatsApp y SMS. Recompra, retención y win-back orquestados sobre el comportamiento real del cliente." },
  { n: "06", label: "Gobernanza", body: "Políticas de IA, compliance, privacidad y medición incremental. Lo que las empresas serias necesitan para escalar sin riesgo reputacional." },
];

const GrowthOS = () => (
  <section className="px-8 py-32 border-t border-border">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-12 gap-8 mb-20">
        <div className="col-span-12 lg:col-span-4 space-y-2">
          <span className="text-[11px] uppercase tracking-widest text-muted-foreground">Metodología</span>
          <p className="text-[11px] font-mono text-muted-foreground">RCKT-OS / v3.2</p>
        </div>
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <h2 className="font-serif text-4xl md:text-5xl leading-tight">
            RCKT Growth OS. Seis capas que convierten al marketing en infraestructura.
          </h2>
          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            Un sistema documentado, auditable y enseñable. No una caja negra de agencia: un manual operativo que el cliente entiende, gobierna y, eventualmente, puede internalizar.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 border-t border-border">
        {layers.map((l, idx) => (
          <div
            key={l.n}
            className={`p-10 space-y-4 border-border ${idx % 3 !== 2 ? "md:border-r" : ""} ${idx < 3 ? "md:border-b" : ""} border-b md:border-b-0 ${idx === layers.length - 1 ? "border-b-0" : ""}`}
          >
            <div className="flex items-baseline justify-between">
              <span className="text-[11px] font-mono text-muted-foreground tracking-widest">{l.n}</span>
              <div className="w-1 h-1 bg-accent rounded-full" />
            </div>
            <h3 className="font-serif text-2xl">{l.label}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{l.body}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default GrowthOS;