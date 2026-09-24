import type { ReactNode } from "react";

import heroLatamImg from "@/assets/rckt-hero-latam.jpg";

const heroPhoto = heroLatamImg;

type SystemPageHeroProps = {
  label: string;
  title: ReactNode;
  descriptor?: string;
  quoteLabel?: string;
  quote?: string;
  ctaLabel: string;
  ctaHref: string;
  /** Contenido opcional bajo el subtítulo. */
  extra?: ReactNode;
  /** "pill" usa el label en cápsula con borde naranja (familia Sectores). */
  labelVariant?: "bar" | "pill";
};

export default function SystemPageHero({
  label,
  title,
  descriptor,
  quoteLabel,
  quote,
  ctaLabel,
  ctaHref,
  extra,
  labelVariant = "bar",
}: SystemPageHeroProps) {
  return (
    <section
      className="system-page-hero section-light relative isolate overflow-clip pt-[110px] md:pt-[120px] lg:pt-[140px]"
      style={{
        paddingBottom: "80px",
        minHeight: "auto",
      }}
    >
      <div className="hero-photo" aria-hidden="true">
        <img src={heroPhoto} alt="" className="hero-photo-img" />
        <div className="hero-photo-fade" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {labelVariant === "pill" ? (
          <div className="mb-4">
            <span className="sector-pill">{label}</span>
          </div>
        ) : (
          <div className="mb-4 flex items-center gap-3">
            <span className="inline-block h-4 w-[2px] bg-orange" />
            <span className="label-orange">{label}</span>
          </div>
        )}

        <h1
          className="font-display font-semibold tracking-tight text-paper"
          style={{ fontSize: "clamp(2rem, 3.6vw, 3.25rem)", lineHeight: 1.1, maxWidth: "18ch" }}
        >
          {title}
        </h1>
        {descriptor ? <p className="mt-4 max-w-[640px] text-[16px] text-paper/70">{descriptor}</p> : null}
        {extra}

        {quote ? (
          <figure
            className="relative border-t border-paper/20"
            style={{ margin: "28px 0 20px", paddingTop: "20px", maxWidth: "680px" }}
          >
            {quoteLabel ? (
              <figcaption className="label-orange" style={{ marginBottom: "10px" }}>
                {quoteLabel}
              </figcaption>
            ) : null}
            <p className="hero-context-para">{quote}</p>
          </figure>
        ) : null}

        <div style={{ marginTop: "28px" }}>
          <a
            href={ctaHref}
            className="btn-orange font-display inline-flex items-center justify-center rounded-full px-8 py-4 text-[15px] font-semibold"
          >
            {ctaLabel}
          </a>
        </div>
      </div>
    </section>
  );
}