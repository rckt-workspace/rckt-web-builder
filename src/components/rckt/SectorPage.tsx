import type { ReactNode } from "react";

import SiteFooter from "@/components/rckt/SiteFooter";
import SiteNav from "@/components/rckt/SiteNav";
import SystemPageHero from "@/components/rckt/SystemPageHero";
import SectorJourney from "@/components/rckt/SectorJourney";
import heroPhotoAsset from "@/assets/rckt-hero-sunset.png.asset.json";

const heroPhoto = heroPhotoAsset.url;
export const DIAGNOSTIC_HREF = "/sistemas/revenue-diagnostic";

const GLOW =
  "radial-gradient(ellipse 700px 500px at 100% 0%, rgba(232,103,46,0.35) 0%, rgba(244,161,95,0.18) 40%, rgba(232,103,46,0) 75%)";

export type SectorPageData = {
  label: string;
  title: ReactNode;
  descriptor?: string;
  ctaLabel: string;
  funnelStages: string[];
  funnelLeaks: { afterStage: number; label: string }[];
  dolores: string[];
  sistemaTitle: ReactNode;
  sistemaTexto: string;
  /** Filas numeradas de lo que hacemos (opcional). */
  sistemaFilas?: { nombre: string; detalle: string }[];
  indicadoresLabel: string;
  indicadores: string[];
  primaryLink: { label: string; href: string };
  secondaryLink?: { label: string; href: string };
};

function PillLabel({ children }: { children: ReactNode }) {
  return (
    <div className="mb-5">
      <span className="sector-pill">{children}</span>
    </div>
  );
}

export default function SectorPage(data: SectorPageData) {
  const dolorCols = data.dolores.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4";

  return (
    <div className="bg-background text-foreground antialiased">
      <SiteNav />
      <main>
        <SystemPageHero
          label={data.label}
          title={data.title}
          descriptor={data.descriptor}
          ctaLabel={data.ctaLabel}
          ctaHref={DIAGNOSTIC_HREF}
          labelVariant="pill"
        />

        {/* 01 · Cómo vende hoy este sector */}
        <section
          className="relative isolate py-16 md:py-24"
          style={{ background: "var(--kraft)", overflow: "clip" }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute"
            style={{
              top: "-60px",
              left: "-80px",
              width: "420px",
              height: "420px",
              zIndex: 0,
              background:
                "radial-gradient(circle, rgba(232,103,46,0.22) 0%, rgba(232,103,46,0.08) 45%, rgba(232,103,46,0) 70%)",
              filter: "blur(20px)",
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute"
            style={{
              bottom: "-40px",
              right: "-60px",
              width: "320px",
              height: "320px",
              zIndex: 0,
              background:
                "radial-gradient(circle, rgba(244,161,95,0.20) 0%, rgba(244,161,95,0.06) 45%, rgba(244,161,95,0) 70%)",
              filter: "blur(16px)",
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute"
            style={{
              top: "30%",
              right: "10%",
              width: "180px",
              height: "180px",
              zIndex: 0,
              background:
                "radial-gradient(circle, rgba(232,103,46,0.12) 0%, rgba(232,103,46,0) 65%)",
              filter: "blur(12px)",
            }}
          />
          <div className="relative z-10 mx-auto max-w-6xl px-6">
            <PillLabel>01 · Cómo vende hoy</PillLabel>
            <h2 className="font-display text-[28px] leading-tight font-semibold tracking-tight md:text-[40px]">
              Cómo vende hoy este sector.
            </h2>
            <SectorJourney stages={data.funnelStages} leaks={data.funnelLeaks} />
          </div>
        </section>

        {/* 02 · Qué le duele */}
        <section className="relative isolate py-16 md:py-24" style={{ background: "var(--sand)", overflow: "clip" }}>
          <div className="sector-grid" aria-hidden="true" />
          <div className="relative z-10 mx-auto max-w-6xl px-6">
            <PillLabel>02 · Qué le duele</PillLabel>
            <h2 className="font-display text-[28px] leading-tight font-semibold tracking-tight md:text-[40px]">
              Qué le duele.
            </h2>
            <ul className={`mt-10 grid gap-5 sm:grid-cols-2 ${dolorCols}`}>
              {data.dolores.map((s, i) => (
                <li key={s} className="pain-card">
                  <span className="pain-card__num">{String(i + 1).padStart(2, "0")}</span>
                  <p className="font-display mt-4 text-[18px] leading-snug font-semibold tracking-tight">{s}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 03 · Lo que hacemos por este sector */}
        <section className="relative isolate py-16 md:py-24" style={{ background: "var(--kraft)" }}>
          <div
            className="sector-rings"
            aria-hidden="true"
            style={{ right: "-180px", top: "120px", width: "560px", height: "560px" }}
          />
          <div className="relative z-10 mx-auto max-w-6xl px-6">
            <div className="grid items-start gap-10 md:grid-cols-5 md:gap-14">
              <div className="md:col-span-3">
                <PillLabel>03 · Lo que hacemos</PillLabel>
                <h2 className="font-display text-[28px] leading-tight font-semibold tracking-tight md:text-[40px]">
                  {data.sistemaTitle}
                </h2>
                <p className="mt-6 max-w-lg text-[16px] leading-relaxed text-muted-foreground">{data.sistemaTexto}</p>

                {data.sistemaFilas?.length ? (
                  <ul className="mt-10">
                    {data.sistemaFilas.map((f, idx) => (
                      <li
                        key={f.nombre}
                        className="flex items-start gap-5 py-[16px]"
                        style={idx === 0 ? undefined : { borderTop: "1px solid rgba(30,22,18,0.12)" }}
                      >
                        <span className="font-serif-accent text-[20px] leading-none text-orange">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <span>
                          <span className="font-display block text-[16px] font-semibold tracking-tight">
                            {f.nombre}
                          </span>
                          <span className="mt-1 block text-[14.5px] leading-relaxed text-muted-foreground">
                            {f.detalle}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>

              <div className="md:col-span-2 md:self-stretch">
                <div
                  className="sticky-col rounded-2xl p-7 md:p-8"
                  style={{ border: "1px solid rgba(232,103,46,0.28)", background: "var(--card-surface)" }}
                >
                  <p className="label-orange">{data.indicadoresLabel}</p>
                  <div className="mt-5 flex flex-col">
                    {data.indicadores.map((ind, i) => (
                      <p
                        key={ind}
                        className="font-display text-[19px] leading-snug font-semibold tracking-tight"
                        style={
                          i > 0
                            ? {
                                marginTop: "18px",
                                paddingTop: "18px",
                                borderTop: "1px solid rgba(232,103,46,0.22)",
                              }
                            : undefined
                        }
                      >
                        {ind}
                      </p>
                    ))}
                  </div>
                  <a
                    href={data.primaryLink.href}
                    className="btn-orange font-display mt-8 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[14px] font-semibold"
                  >
                    {data.primaryLink.label}
                  </a>
                  {data.secondaryLink ? (
                    <div className="mt-4">
                      <a
                        href={data.secondaryLink.href}
                        className="font-display text-[13.5px] font-semibold text-orange underline-offset-4 hover:underline"
                      >
                        {data.secondaryLink.label}
                      </a>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* 04 · Casos del sector */}
        <section className="relative isolate py-16 md:py-24" style={{ background: "var(--sand)", overflow: "clip" }}>
          <div className="sector-grid" aria-hidden="true" />
          <div className="relative z-10 mx-auto max-w-6xl px-6">
            <PillLabel>04 · Prueba</PillLabel>
            <h2 className="font-display text-[28px] leading-tight font-semibold tracking-tight md:text-[40px]">
              Casos del sector.
            </h2>
            <div
              className="mt-10 rounded-2xl border border-dashed p-7 md:p-10"
              style={{ borderColor: "rgba(232,103,46,0.45)", background: "var(--card-surface)" }}
            >
              <dl className="grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  "Situación inicial",
                  "Periodo",
                  "Alcance",
                  "Inversión",
                  "Intervención",
                  "Resultado",
                  "Método de medición",
                  "Limitaciones",
                ].map((campo) => (
                  <div key={campo}>
                    <dt className="label-orange">{campo}</dt>
                    <dd
                      className="mt-2 h-4 w-4/5 rounded-full"
                      style={{ background: "rgba(16,24,43,0.08)" }}
                      aria-hidden="true"
                    />
                  </div>
                ))}
              </dl>
              <p className="mt-10 text-center font-mono text-[12px] tracking-[0.14em] text-muted-foreground uppercase">
                [ Ficha de caso en preparación — publicaremos resultados solo con línea base y método de medición. ]
              </p>
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="relative isolate overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, rgba(232,103,46,0.9) 0%, rgba(244,161,95,0.6) 45%, rgba(232,103,46,0) 100%)",
              zIndex: 3,
            }}
          />
          <div className="hero-photo" aria-hidden="true">
            <img src={heroPhoto} alt="" className="hero-photo-img" />
            <div className="cta-photo-fade" />
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute"
            style={{ top: "-80px", right: "-120px", width: "900px", height: "650px", zIndex: 1, background: GLOW }}
          />
          <div className="relative z-10 mx-auto max-w-6xl px-5 py-24 md:px-6 md:py-32">
            <div className="ml-auto max-w-2xl text-right">
              <div className="mb-4 flex items-center justify-end gap-3">
                <span className="label-orange">¿Empezamos?</span>
                <span className="inline-block h-4 w-[2px] bg-orange" />
              </div>
              <h2
                className="font-display text-[34px] leading-[1.08] font-semibold tracking-tight md:text-[56px]"
                style={{ color: "#FFFFFF" }}
              >
                El siguiente paso empieza con <em className="font-serif-accent">claridad.</em>
              </h2>
              <div className="mt-10 flex justify-end">
                <a
                  href={DIAGNOSTIC_HREF}
                  className="btn-orange font-display inline-flex items-center gap-2 rounded-full px-8 py-4 text-[15px] font-semibold"
                >
                  Solicitar diagnóstico de captación →
                </a>
              </div>
            </div>
            <div
              className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t pt-6 font-mono text-[11px] tracking-[0.18em] uppercase"
              style={{ borderColor: "rgba(255,255,255,0.22)", color: "rgba(255,255,255,0.7)" }}
            >
              <span>Más inteligencia. Más crecimiento.</span>
              <span>Tecnología × Personas × Resultados</span>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
