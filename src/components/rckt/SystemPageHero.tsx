import type { ReactNode } from "react";

import heroPhotoAsset from "@/assets/rckt-hero-sunset.png.asset.json";

const heroPhoto = heroPhotoAsset.url;

type SystemPageHeroProps = {
  label: string;
  title: ReactNode;
  descriptor: string;
  quoteLabel: string;
  quote: string;
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
    <section className="system-page-hero relative isolate overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28">
      <div className="hero-photo" aria-hidden="true">
        <img src={heroPhoto} alt="" className="hero-photo-img" />
        <div className="system-page-hero-fade" />
      </div>

      <div className="system-page-hero-glow" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="mb-4 flex items-center gap-3">
          <span className="inline-block h-4 w-[2px] bg-orange" />
          <span className="label-orange">{label}</span>
        </div>

        <h1 className="max-w-4xl font-display text-[36px] leading-[1.05] font-semibold tracking-tight text-paper md:text-[60px]">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-paper/70">{descriptor}</p>

        <figure className="relative mt-12 max-w-4xl border-t border-paper/20 pt-8">
          <figcaption className="label-orange mb-5">{quoteLabel}</figcaption>
          <span aria-hidden="true" className="system-page-quote-mark">
            “
          </span>
          <blockquote className="relative z-10 text-[22px] leading-[1.4] text-paper italic md:text-[30px]">
            {quote}
          </blockquote>
        </figure>

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