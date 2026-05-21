import AdvisorChat from "./AdvisorChat";

const Hero = () => (
  <section className="px-8 pt-20 pb-28">
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-1.5 h-1.5 rounded-full bg-accent" />
        <span className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground font-medium">
          Growth Systems · LatAm + España
        </span>
      </div>
      <div className="grid grid-cols-12 gap-10 items-start">
        <div className="col-span-12 lg:col-span-6">
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight mb-8">
            Asesoría estratégica<br />
            en tiempo real, con la<br />
            inteligencia de <i>RCKT.es</i>.
          </h1>
          <p className="text-base lg:text-lg text-muted-foreground leading-relaxed max-w-xl mb-8">
            Describe el reto de crecimiento de tu compañía. Nuestro asesor de IA, entrenado con la metodología Growth OS de RCKT.es, devuelve hipótesis accionables conectadas a tu industria y mercado.
          </p>
          <div className="border-t border-border pt-5 grid grid-cols-2 gap-x-6 gap-y-2 max-w-md">
            <p className="text-[13px] font-medium leading-snug">01. Adquisición AI-first</p>
            <p className="text-[13px] font-medium leading-snug">02. Medición incremental</p>
            <p className="text-[13px] font-medium leading-snug">03. WhatsApp Commerce</p>
            <p className="text-[13px] font-medium leading-snug">04. GEO + SEO para IA</p>
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