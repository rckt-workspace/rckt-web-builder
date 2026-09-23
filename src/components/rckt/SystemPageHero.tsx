import type { ReactNode } from "react";

import heroPhotoAsset from "@/assets/rckt-hero-sunset.png.asset.json";

const heroPhoto = heroPhotoAsset.url;

type SystemPageHeroProps = {
  label: string;
  title: ReactNode;
  descriptor?: string;
  quoteLabel?: string;
  quote?: string;
  ctaLabel: string;
  ctaHref: string;
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
  labelVariant = "bar",
}: SystemPageHeroProps) {
  return (
    <section
      className="section-light relative isolate overflow-hidden pt-[110px] md:pt-[120px] lg:pt-[140px]"
      style={{
        paddingBottom: "80px",
        minHeight: "auto",
      }}
    >
      <div className="glow-hero-blue pointer-events-none absolute -top-[200px] -left-[10%] h-[600px] w-[600px]" aria-hidden="true" />
      <div className="glow-hero-orange pointer-events-none absolute -right-[5%] -bottom-[250px] h-[700px] w-[700px]" aria-hidden="true" />
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
        {descriptor ? <p className="mt-4 max-w-2xl text-[16px] text-paper/70">{descriptor}</p> : null}

        {quoteLabel && quote ? (
          <figure
            className="relative border-t border-paper/20"
            style={{ margin: "28px 0 20px", paddingTop: "20px", maxWidth: "640px" }}
          >
            <figcaption className="label-orange" style={{ marginBottom: "10px" }}>
              {quoteLabel}
            </figcaption>
            <blockquote
              className="text-paper italic"
              style={{ fontSize: "clamp(1.0625rem, 1.5vw, 1.3125rem)", lineHeight: 1.5 }}
            >
              {quote}
            </blockquote>
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