const layers = [
  { n: "01", label: "Datos", body: "CDP, CRM, server-side tracking y modelado de eventos. La base sobre la que cualquier IA puede tomar decisiones confiables." },
  { n: "02", label: "Inteligencia", body: "Modelos que deciden y optimizan en tiempo real. No dashboards: motores de asignación de presupuesto y priorización de audiencia." },
  { n: "03", label: "Creatividad", body: "Assets generados, testeados y rotados con disciplina industrial. 30 a 100 variantes por mes orquestadas con IA y dirección editorial." },
  { n: "04", label: "Activación", body: "Media multi-canal coordinado: Meta, Google, TikTok, Mercado Ads, Amazon, retail media. Un solo plan, una sola lectura." },
  { n: "05", label: "Experiencia", body: "Lifecycle integrado en email, WhatsApp y SMS. Recompra, retención y win-back orquestados sobre el comportamiento real del cliente." },
  { n: "06", label: "Gobernanza", body: "Políticas de IA, compliance, privacidad y medición incremental. Lo necesario para escalar sin riesgo reputacional." },
];

const GrowthOS = () => (
  <section className="px-6 py-28 md:py-36">
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-12 gap-8 mb-16">
        <div className="col-span-12 lg:col-span-4 space-y-2">
          <span className="text-[12px] text-primary">— Metodología</span>
          <p className="text-[12px] font-mono text-muted-foreground">RCKT.es-OS / v3.2</p>
        </div>
        <div className="col-span-12 lg:col-span-8 space-y-5">
          <h2 className="text-[34px] md:text-[44px] leading-[1.05] tracking-[-0.03em] font-medium">
            Growth OS. Seis capas que convierten el marketing en{" "}
            <span className="font-serif italic text-primary">infraestructura</span>.
          </h2>
          <p className="text-muted-foreground max-w-2xl text-[15.5px] leading-relaxed">
            Un sistema documentado, auditable y enseñable. No una caja negra de agencia: un manual operativo que el cliente entiende, gobierna y, eventualmente, puede internalizar.
          </p>
        </div>
      </div>
      <div className="glass rounded-3xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {layers.map((l, idx) => (
            <div
              key={l.n}
              className={`p-8 md:p-10 space-y-3 border-border/70 ${idx % 3 !== 2 ? "md:border-r" : ""} ${idx < 3 ? "md:border-b" : ""} border-b md:border-b-0 ${idx === layers.length - 1 ? "border-b-0" : ""}`}
            >
              <div className="flex items-baseline justify-between">
                <span className="text-[12px] font-mono text-primary tracking-wider">{l.n}</span>
                <div className="w-1 h-1 bg-primary rounded-full" />
              </div>
              <h3 className="text-[22px] tracking-[-0.02em] font-medium">{l.label}</h3>
              <p className="text-muted-foreground text-[14.5px] leading-relaxed">{l.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default GrowthOS;