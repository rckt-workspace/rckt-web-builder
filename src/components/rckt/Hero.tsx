import AdvisorChat from "./AdvisorChat";

const Hero = () => (
  <section className="relative z-10 px-6 pt-16 pb-32 md:pt-20 md:pb-44">
    <div className="max-w-7xl mx-auto">
      <div className="inline-flex items-center gap-2 mb-8 rounded-full glass-dark px-3 py-1">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-60 animate-ping" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
        </span>
        <span className="text-[12px] font-medium text-white/90 uppercase tracking-wider">
          Growth Systems
        </span>
      </div>
      <div className="grid grid-cols-12 gap-10 items-start">
        <div className="col-span-12 lg:col-span-7">
          <h1 className="text-[48px] md:text-[64px] lg:text-[88px] leading-[0.98] tracking-[-0.04em] font-bold mb-8 text-white">
            Infraestructura<br />
            de crecimiento<br />
            <span className="bg-gradient-to-r from-white via-[#a5f3fc] to-[#ffb24c] bg-clip-text text-transparent">
              para empresas que escalan.
            </span>
          </h1>
          <p className="text-[18px] lg:text-[20px] text-white/80 leading-relaxed max-w-xl mb-10">
            Conectamos datos, IA, medios y experiencia en un único Growth OS. Estrategia, ejecución y medición real en el mismo equipo — para compañías que ya no quieren depender de una agencia ni de un deck.
          </p>
          <div className="flex flex-wrap items-center gap-3 mb-14">
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 rounded-full bg-white text-[#0a2540] px-6 py-3 text-[15px] font-semibold hover:bg-white/90 transition-colors"
            >
              Iniciar conversación <span aria-hidden>→</span>
            </a>
            <a
              href="#sistema"
              className="inline-flex items-center gap-2 text-white px-2 py-3 text-[15px] font-semibold hover:text-white/80 transition-colors"
            >
              Ver Growth OS <span aria-hidden>›</span>
            </a>
          </div>
          <div className="grid grid-cols-2 gap-y-3 gap-x-6 max-w-md text-[14px] text-white/75">
            <p className="flex items-center gap-2"><Check /> Adquisición AI-first</p>
            <p className="flex items-center gap-2"><Check /> Medición incremental</p>
            <p className="flex items-center gap-2"><Check /> WhatsApp Commerce</p>
            <p className="flex items-center gap-2"><Check /> GEO + SEO para IA</p>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-5 text-foreground">
          <AdvisorChat />
        </div>
      </div>
    </div>
  </section>
);

const Check = () => (
  <svg className="h-3.5 w-3.5 text-[#a5f3fc]" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
    <path fillRule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-7 7a1 1 0 01-1.4 0l-4-4a1 1 0 011.4-1.4L9 11.6l6.3-6.3a1 1 0 011.4 0z" clipRule="evenodd" />
  </svg>
);

export default Hero;