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
};

export default function SystemPageHero({
  label,
  title,
  descriptor,
  quoteLabel,
  quote,
  ctaLabel,
  ctaHref,
}: SystemPageHeroProps) {
  return (
    <section className="section-light relative isolate overflow-hidden pt-24 pb-14 md:pt-32 md:pb-20">
      <div className="glow-hero-blue pointer-events-none absolute -top-[200px] -left-[10%] h-[600px] w-[600px]" aria-hidden="true" />
      <div className="glow-hero-orange pointer-events-none absolute -right-[5%] -bottom-[250px] h-[700px] w-[700px]" aria-hidden="true" />
      <div className="hero-photo" aria-hidden="true">
        <img src={heroPhoto} alt="" className="hero-photo-img" />
        <div className="hero-photo-fade" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="mb-4 flex items-center gap-3">
          <span className="inline-block h-4 w-[2px] bg-orange" />
          <span className="label-orange">{label}</span>
        </div>

        <h1 className="max-w-4xl font-display text-[36px] leading-[1.05] font-semibold tracking-tight text-paper md:text-[60px]">
          {title}
        </h1>
        {descriptor ? <p className="mt-5 max-w-2xl text-lg text-paper/70">{descriptor}</p> : null}

        {quoteLabel && quote ? (
          <figure className="relative mt-12 max-w-4xl border-t border-paper/20 pt-8">
            <figcaption className="label-orange mb-5">{quoteLabel}</figcaption>
            <blockquote className="text-[22px] leading-[1.4] text-paper italic md:text-[30px]">
              {quote}
            </blockquote>
          </figure>
        ) : null}

        <div className="mt-10">
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