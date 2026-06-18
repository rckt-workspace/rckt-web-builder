import AdvisorChat from "./AdvisorChat";

const Hero = () => (
  <section className="px-6 pt-20 pb-32 md:pt-28 md:pb-40">
    <div className="max-w-6xl mx-auto">
      <div className="inline-flex items-center gap-2 mb-10 rounded-full border border-border/70 bg-background/60 backdrop-blur px-3 py-1.5">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-60 animate-ping" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
        </span>
        <span className="text-[12px] text-foreground/70">
          Growth Systems · LatAm + España
        </span>
      </div>
      <div className="grid grid-cols-12 gap-10 items-start">
        <div className="col-span-12 lg:col-span-7">
          <h1 className="text-[44px] md:text-[60px] lg:text-[72px] leading-[1.02] tracking-[-0.035em] font-medium mb-7 text-foreground">
            El sistema operativo<br />
            de crecimiento, <span className="font-serif italic text-primary">finalmente</span><br />
            con la claridad que esperabas.
          </h1>
          <p className="text-[17px] lg:text-[19px] text-foreground/70 leading-relaxed max-w-xl mb-9">
            Conectamos datos, IA, medios y experiencia en un único Growth OS. Estrategia, ejecución y medición real en el mismo equipo — para compañías que ya no quieren depender de una agencia ni de un deck.
          </p>
          <div className="flex flex-wrap items-center gap-3 mb-12">
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-3.5 text-[14px] font-medium hover:bg-foreground/85 transition-colors"
            >
              Iniciar conversación <span aria-hidden>→</span>
            </a>
            <a
              href="#sistema"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 backdrop-blur text-foreground px-6 py-3.5 text-[14px] font-medium hover:bg-background transition-colors"
            >
              Ver Growth OS
            </a>
          </div>
          <div className="grid grid-cols-2 gap-y-3 gap-x-6 max-w-md text-[13.5px] text-foreground/65">
            <p className="flex items-center gap-2"><Dot /> Adquisición AI-first</p>
            <p className="flex items-center gap-2"><Dot /> Medición incremental</p>
            <p className="flex items-center gap-2"><Dot /> WhatsApp Commerce</p>
            <p className="flex items-center gap-2"><Dot /> GEO + SEO para IA</p>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-5">
          <AdvisorChat />
        </div>
      </div>
    </div>
  </section>
);

const Dot = () => <span className="h-1 w-1 rounded-full bg-primary/70" aria-hidden />;

export default Hero;