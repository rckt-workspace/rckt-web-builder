import AdvisorChat from "./AdvisorChat";

const Hero = () => (
  <section className="px-8 pt-20 pb-40">
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-1.5 h-1.5 rounded-full bg-foreground" />
        <span className="text-[11px] uppercase tracking-[0.25em] text-foreground/70 font-semibold">
          Growth Systems · LatAm + España
        </span>
      </div>
      <div className="grid grid-cols-12 gap-10 items-start">
        <div className="col-span-12 lg:col-span-6">
          <h1 className="text-5xl md:text-6xl lg:text-7xl leading-[1.02] tracking-[-0.04em] font-extrabold mb-8 text-foreground">
            Asesoría estratégica<br />
            en tiempo real, con la<br />
            inteligencia de <span className="bg-stripe-gradient bg-clip-text text-transparent">RCKT.es</span>.
          </h1>
          <p className="text-base lg:text-lg text-foreground/75 leading-relaxed max-w-xl mb-8">
            Describe el reto de crecimiento de tu compañía. Nuestro asesor de IA, entrenado con la metodología Growth OS de RCKT.es, devuelve hipótesis accionables conectadas a tu industria y mercado.
          </p>
          <div className="flex items-center gap-3 mb-8">
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-3 text-sm font-semibold hover:bg-foreground/90 transition-colors shadow-soft"
            >
              Iniciar conversación <span aria-hidden>→</span>
            </a>
            <a
              href="#sistema"
              className="inline-flex items-center gap-2 rounded-full bg-background/70 backdrop-blur text-foreground px-6 py-3 text-sm font-semibold hover:bg-background transition-colors"
            >
              Ver Growth OS
            </a>
          </div>
          <div className="border-t border-foreground/15 pt-5 grid grid-cols-2 gap-x-6 gap-y-2 max-w-md">
            <p className="text-[13px] font-medium leading-snug text-foreground/80">01. Adquisición AI-first</p>
            <p className="text-[13px] font-medium leading-snug text-foreground/80">02. Medición incremental</p>
            <p className="text-[13px] font-medium leading-snug text-foreground/80">03. WhatsApp Commerce</p>
            <p className="text-[13px] font-medium leading-snug text-foreground/80">04. GEO + SEO para IA</p>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-6">
          <AdvisorChat />
        </div>
      </div>
    </div>
  </section>
);

export default Hero;