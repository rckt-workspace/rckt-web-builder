import type { ComponentType, ReactNode } from "react";
import { BarChart3, Bot, ClipboardCheck, Gauge, GitBranch, Megaphone, MessageSquareText, RefreshCw, Target, UsersRound } from "lucide-react";

import SiteFooter from "@/components/rckt/SiteFooter";
import SiteNav from "@/components/rckt/SiteNav";
import SystemPageHero from "@/components/rckt/SystemPageHero";
import SectorJourney from "@/components/rckt/SectorJourney";
import SectorPains, { type SectorPain } from "@/components/rckt/SectorPains";
import SectionHeader from "@/components/rckt/SectionHeader";
import MethodCard, { type MethodField } from "@/components/rckt/MethodCard";
import { AcceptanceSteps, type AcceptanceStep } from "@/components/rckt/SystemBlocks";
import FaqSection, { type FaqItem } from "@/components/rckt/FaqSection";
import heroPhotoImg from "@/assets/rckt-cta-final.jpg";

const heroPhoto = heroPhotoImg;
export const DIAGNOSTIC_HREF = "/sistemas/revenue-diagnostic";

const GLOW =
  "radial-gradient(ellipse 700px 500px at 100% 0%, rgba(252, 92, 31,0.35) 0%, rgba(252, 92, 31,0.18) 40%, rgba(252, 92, 31,0) 75%)";

export type SectorPageData = {
  label: string;
  title: ReactNode;
  descriptor?: string;
  context: string;
  ctaLabel: string;
  funnelStages: string[];
  funnelLeaks: { afterStage: number; label: string }[];
  sectorImage: string;
  sectorImageAlt: string;
  doloresDetalle: SectorPain[];
  sistemaTitle: ReactNode;
  sistemaTexto: string;
  sistemaFilas: { nombre: string; detalle: string }[];
  sectorFacts: { label: string; value: string }[];
  acceptanceSteps: AcceptanceStep[];
  acceptanceNote?: string;
  primaryLink: { label: string; href: string };
  secondaryLink?: { label: string; href: string };
  /** "full" (por defecto) muestra filas, sticky y casos; "short" los oculta. */
  variant?: "full" | "short";
  /** Texto del botón del CTA final (por defecto "Solicitar diagnóstico de captación →"). */
  ctaFinalLabel?: string;
  methodFields?: MethodField[];
  faqItems?: FaqItem[];
};

export default function SectorPage(data: SectorPageData) {
  const isShort = data.variant === "short";
  const rowIcons: ComponentType<{ className?: string; strokeWidth?: number; "aria-hidden"?: boolean | "true" }>[] = [
    Target,
    UsersRound,
    GitBranch,
    Bot,
    BarChart3,
    MessageSquareText,
    Gauge,
    RefreshCw,
    Megaphone,
    ClipboardCheck,
  ];

  return (
    <div className="bg-background text-foreground antialiased">
      <SiteNav />
      <main>
        <SystemPageHero
          label={data.label}
          title={data.title}
          descriptor={data.descriptor}
          context={data.context}
          ctaLabel={data.ctaLabel}
          ctaHref={DIAGNOSTIC_HREF}
        />

        {/* 01 · Cómo vende hoy este sector */}
        <section className="sector-section sector-journey-section relative isolate py-16 md:py-24" style={{ background: "var(--kraft)" }}>
          <div className="relative z-10 mx-auto max-w-6xl px-6">
            <div className="sector-journey-layout">
               <div className="sector-journey-photo-wrap">
                 <img className="sector-journey-photo" src={data.sectorImage} alt={data.sectorImageAlt} />
               </div>
              <div>
                <SectionHeader num="01." label="Cómo vende hoy" title="Cómo vende hoy este sector." />
                <SectorJourney stages={data.funnelStages} leaks={data.funnelLeaks} />
              </div>
            </div>
          </div>
        </section>

        {/* 02 · Qué le duele */}
        <section className="sector-section sector-pains-section relative isolate py-16 md:py-24" style={{ background: "var(--sand)" }}>
          <div className="relative z-10 mx-auto max-w-6xl px-6">
            <div className="sector-pains-layout">
              <SectionHeader
                num="02."
                label="Qué le duele"
                title={<>Donde se escapa <span className="text-orange">el dinero</span> en tu sector.</>}
                phrase="Las fugas más habituales que encontramos al medir este sector."
              />
              <SectorPains items={data.doloresDetalle} />
            </div>
          </div>
        </section>

        {/* 03 · Lo que hacemos por este sector */}
        <section className="sector-section sector-work-section relative isolate py-16 md:py-24" style={{ background: "var(--kraft)" }}>
          <div className="relative z-10 mx-auto max-w-6xl px-6">
            <div className="sector-work-grid">
              <div>
                <SectionHeader num="03." label="Lo que hacemos" title={data.sistemaTitle} />
                <p className="sector-work-intro">{data.sistemaTexto}</p>
                <ul className="sector-service-list">
                    {data.sistemaFilas.map((f, idx) => {
                      const RowIcon = rowIcons[idx % rowIcons.length];
                      return (
                      <li
                        key={f.nombre}
                        className="sector-service-row"
                      >
                        <RowIcon className="sector-service-icon" strokeWidth={1.7} aria-hidden="true" />
                        <div><h3>{f.nombre}</h3><p>{f.detalle}</p></div>
                      </li>
                    )})}
                </ul>
              </div>
              <aside className="sector-fact-wrap">
                <div className="sector-fact-card">
                  <p className="label-orange">Ficha del sector</p>
                  <dl className="sector-facts">
                    {data.sectorFacts.map((fact) => (
                      <div key={fact.label} className="sector-fact-row">
                        <dt>{fact.label}</dt><dd>{fact.value}</dd>
                      </div>
                    ))}
                  </dl>
                  <a
                    href={data.primaryLink.href}
                    className="btn-orange sector-fact-primary font-display inline-flex items-center gap-2 rounded-full px-6 py-3 text-[14px] font-semibold"
                  >
                    {data.primaryLink.label}
                  </a>
                  {data.secondaryLink ? (
                    <div className="mt-4">
                      <a
                        href={data.secondaryLink.href}
                        className="sector-fact-secondary font-display text-[13.5px] font-semibold underline-offset-4 hover:underline"
                      >
                        {data.secondaryLink.label}
                      </a>
                    </div>
                  ) : null}
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* 04 · Cómo empezamos */}
        <section className="sector-section relative isolate py-16 md:py-24" style={{ background: "var(--sand)" }}>
          <div className="relative z-10 mx-auto max-w-6xl px-6">
            <SectionHeader num="04." label="Cómo empezamos" title="Cómo empezamos." />
            <AcceptanceSteps items={data.acceptanceSteps} />
            {data.acceptanceNote ? <p className="sector-acceptance-note">{data.acceptanceNote}</p> : null}
          </div>
        </section>

        {/* 05 · El método */}
        {!isShort ? (
        <section className="sector-section relative isolate py-16 md:py-24" style={{ background: "var(--kraft)" }}>
          <div className="relative z-10 mx-auto max-w-6xl px-6">
            <SectionHeader num="05." label="Prueba" title="El método." />
            {data.methodFields ? <MethodCard fields={data.methodFields} className="mt-10" /> : null}
          </div>
        </section>
        ) : null}

        {data.faqItems ? <FaqSection items={data.faqItems} /> : null}

        {/* CTA final */}
        <section className="relative isolate overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, rgba(252, 92, 31,0.9) 0%, rgba(252, 92, 31,0.6) 45%, rgba(252, 92, 31,0) 100%)",
              zIndex: 3,
            }}
          />
          <div className="hero-photo" aria-hidden="true">
            <img src={heroPhoto} alt="" className="hero-photo-img cta-photo-img" />
            <div className="cta-photo-fade" />
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute"
            style={{ top: "-80px", right: "-120px", width: "900px", height: "650px", zIndex: 1, background: GLOW }}
          />
          <div className="relative z-10 mx-auto max-w-6xl px-5 py-24 md:px-6 md:py-32">
            <div className="mx-auto max-w-[720px] text-center">
              <div className="mb-4"><span className="label-orange">¿Empezamos?</span></div>
              <h2
                className="font-display text-[34px] leading-[1.08] font-semibold tracking-tight md:text-[56px]"
                style={{ color: "#f5f2ed" }}
              >
                El siguiente paso empieza con <em className="font-serif-accent">claridad.</em>
              </h2>
              <div className="mt-10 flex justify-center">
                <a
                  href={DIAGNOSTIC_HREF}
                  className="btn-orange font-display inline-flex items-center gap-2 rounded-full px-8 py-4 text-[15px] font-semibold"
                >
                  {data.ctaFinalLabel ?? "Solicitar diagnóstico de captación →"}
                </a>
              </div>
            </div>
            <div
              className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t pt-6 font-mono text-[11px] tracking-[0.18em] uppercase"
              style={{ borderColor: "rgba(245,242,237,0.22)", color: "rgba(245,242,237,0.7)" }}
            >
              <span className="ml-auto">IA supervisada y documentada</span>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
