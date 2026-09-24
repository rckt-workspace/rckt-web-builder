import { createFileRoute } from "@tanstack/react-router";

import SiteFooter from "@/components/rckt/SiteFooter";
import SiteNav from "@/components/rckt/SiteNav";
import SystemPageHero from "@/components/rckt/SystemPageHero";
import ctaPhotoImg from "@/assets/rckt-cta-final.jpg";
import sectorSaludImg from "@/assets/sector-salud.jpg";
import sectorB2bImg from "@/assets/sector-b2b.jpg";
import sectorConstruccionImg from "@/assets/sector-construccion.jpg";
import sectorEducacionImg from "@/assets/sector-educacion.jpg";
import sectorEcommerceImg from "@/assets/sector-ecommerce.jpg";
import sectorIndustriaImg from "@/assets/sector-industria.jpg";

const ctaPhoto = ctaPhotoImg;
const DIAGNOSTIC_HREF = "/sistemas/revenue-diagnostic";

const GLOW =
  "radial-gradient(ellipse 700px 500px at 100% 0%, rgba(252, 92, 31,0.35) 0%, rgba(252, 92, 31,0.18) 40%, rgba(252, 92, 31,0) 75%)";

export const Route = createFileRoute("/sectores/")({
  head: () => ({
    meta: [
      { title: "Sectores — Revenue Systems para tu sector | RCKT.es" },
      {
        name: "description",
        content:
          "Seis sectores con su forma real de vender: salud y estética, servicios B2B, construcción e inmobiliario, educación privada, ecommerce consolidado e industria y distribución.",
      },
      { property: "og:title", content: "Sectores — Revenue Systems para tu sector" },
      {
        property: "og:description",
        content: "Cómo vende hoy cada sector y qué sistema le corresponde.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://www.rckt.es/sectores" }],
  }),
  component: SectoresIndexPage,
});

const SECTORES = [
  {
    n: "01",
    nombre: "Salud, estética y odontología",
    pasos: ["Meta/Google", "WhatsApp", "asesor", "cita", "venta"],
    label: "Revenue Engine",
    href: "/sectores/salud-estetica-odontologia",
    image: sectorSaludImg,
    imagePosition: "30% center",
  },
  {
    n: "02",
    nombre: "Servicios B2B",
    pasos: ["Google/LinkedIn", "lead", "reunión", "propuesta", "cierre"],
    label: "Revenue Engine",
    href: "/sectores/servicios-b2b",
    image: sectorB2bImg,
    imagePosition: "30% center",
  },
  {
    n: "03",
    nombre: "Construcción e inmobiliario",
    pasos: ["Anuncios", "landing", "asesor", "visita", "presupuesto", "cierre"],
    label: "Revenue Engine + Operations",
    href: "/sectores/construccion-inmobiliario",
    image: sectorConstruccionImg,
  },
  {
    n: "04",
    nombre: "Educación privada",
    pasos: ["Google/Meta", "lead", "WhatsApp o llamada", "asesor", "matrícula"],
    label: "Revenue Engine",
    href: "/sectores/educacion",
    image: sectorEducacionImg,
  },
  {
    n: "05",
    nombre: "Ecommerce consolidado",
    pasos: ["Anuncios", "tienda (a veces WhatsApp)", "compra", "recompra"],
    label: "Demand System",
    href: "/sectores/ecommerce",
    image: sectorEcommerceImg,
  },
  {
    n: "06",
    nombre: "Industria y distribución",
    pasos: ["Cotización", "pedido", "documento", "entrega", "soporte"],
    label: "Operations System",
    href: "/sectores/industria-distribucion",
    image: sectorIndustriaImg,
  },
];

function Cards() {
  return (
    <section className="relative isolate overflow-hidden py-16 md:py-24" style={{ background: "var(--kraft)" }}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          bottom: "-140px",
          left: "-160px",
          width: "820px",
          height: "620px",
          zIndex: 0,
          background:
            "radial-gradient(ellipse 620px 460px at 0% 100%, rgba(252, 92, 31,0.24) 0%, rgba(252, 92, 31,0.12) 42%, rgba(252, 92, 31,0) 72%)",
        }}
      />
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="grid items-stretch gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SECTORES.map((s) => (
            <article key={s.n} className="card-kraft flex flex-col overflow-hidden p-0">
              <div className="relative h-36 w-full overflow-hidden">
                <img
                  src={s.image}
                  alt=""
                  className="h-full w-full object-cover"
                  style={{ objectPosition: s.imagePosition ?? "center" }}
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(to top, rgba(33,33,33,0.45), transparent 72%)",
                  }}
                />
              </div>

              <div className="flex flex-1 flex-col p-7">
                <span className="font-mono text-[11px] tracking-wider text-orange">{s.n}</span>
                <h2 className="font-display mt-2 text-[20px] leading-snug font-semibold tracking-tight">{s.nombre}</h2>

                <div className="mt-4">
                  <p className="font-mono text-[10.5px] tracking-[0.16em] uppercase text-muted-foreground">
                    Cómo vende hoy
                  </p>
                  <p className="mt-2 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[13px] leading-relaxed">
                    {s.pasos.map((p, i) => (
                      <span key={p} className="inline-flex items-center gap-1.5">
                        {i > 0 ? <span className="text-orange/60">→</span> : null}
                        <span>{p}</span>
                      </span>
                    ))}
                  </p>
                </div>

                <p className="label-orange mt-6">Sistema recomendado · {s.label}</p>

                <div className="mt-auto pt-7">
                  <a
                    href={s.href}
                    className="btn-orange font-display inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[14px] font-semibold"
                  >
                    Ver sector →
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaFinal() {
  return (
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
        <img src={ctaPhoto} alt="" className="hero-photo-img cta-photo-img" />
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
            style={{ color: "#FFFFFF" }}
          >
            El siguiente paso empieza con <em className="font-serif-accent">claridad.</em>
          </h2>
          <div className="mt-10 flex justify-center">
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
          <span className="ml-auto">IA supervisada y documentada</span>
        </div>
      </div>
    </section>
  );
}

function SectoresIndexPage() {
  return (
    <div className="bg-background text-foreground antialiased">
      <SiteNav />
      <main>
        <SystemPageHero
          label="Sectores"
          title={
            <>
              Revenue Systems para <em className="font-serif-accent">tu sector.</em>
            </>
          }
          ctaLabel="Solicitar diagnóstico de captación →"
          ctaHref={DIAGNOSTIC_HREF}
        />
        <Cards />
        <CtaFinal />
      </main>
      <SiteFooter />
    </div>
  );
}
