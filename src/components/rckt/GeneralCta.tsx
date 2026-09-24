import heroPhoto from "@/assets/rckt-cta-final.jpg";

const DIAGNOSTIC_HREF = "/sistemas/revenue-diagnostic";

export default function GeneralCta() {
  return (
    <section className="general-cta relative isolate overflow-hidden">
      <div className="hero-photo" aria-hidden="true">
        <img src={heroPhoto} alt="" className="hero-photo-img cta-photo-img" />
        <div className="cta-photo-fade" />
      </div>
      <div className="relative z-10 mx-auto max-w-6xl px-5 py-24 md:px-6 md:py-32">
        <div className="mx-auto max-w-[720px] text-center">
          <p className="label-orange">¿Empezamos?</p>
          <h2 className="font-display mt-4 text-[34px] leading-[1.08] font-semibold text-paper md:text-[56px]">
            El siguiente paso empieza con <span className="text-orange">claridad.</span>
          </h2>
          <a
            href={DIAGNOSTIC_HREF}
            className="btn-orange font-display mt-10 inline-flex items-center justify-center rounded-full px-8 py-4 text-[15px] font-semibold"
          >
            Solicitar diagnóstico de captación →
          </a>
        </div>
        <div className="mt-16 flex justify-end border-t border-paper/20 pt-6 font-mono text-[11px] uppercase text-paper/70">
          IA supervisada y documentada
        </div>
      </div>
    </section>
  );
}