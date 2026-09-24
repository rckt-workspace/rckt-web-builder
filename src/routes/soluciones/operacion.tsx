import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertCircle, Copy, FileClock, FileCheck2, MessageSquareQuote, RefreshCw, Table2, Inbox, LifeBuoy } from "lucide-react";

import SiteFooter from "@/components/rckt/SiteFooter";
import SiteNav from "@/components/rckt/SiteNav";
import MethodCard, { FICHA_OPERACION } from "@/components/rckt/MethodCard";
import SystemPageHero from "@/components/rckt/SystemPageHero";
import MilestoneCards from "@/components/rckt/MilestoneCards";
import SignalCards from "@/components/rckt/SignalCards";
import heroPhotoImg from "@/assets/rckt-cta-final.jpg";

const heroPhoto = heroPhotoImg;
const DIAGNOSTIC_HREF = "/sistemas/revenue-diagnostic";

const GLOW =
  "radial-gradient(ellipse 700px 500px at 100% 0%, rgba(252, 92, 31,0.35) 0%, rgba(252, 92, 31,0.18) 40%, rgba(252, 92, 31,0) 75%)";

export const Route = createFileRoute("/soluciones/operacion")({
  head: () => ({
    meta: [
      { title: "Operación — Tu equipo hace lo mismo cien veces por semana | RCKT.es" },
      {
        name: "description",
        content:
          "Un proceso a la vez, en un Sprint de 6–8 semanas, con aprobación humana en lo que importa.",
      },
      { property: "og:title", content: "Operación — Procesos que se ejecutan solos" },
      {
        property: "og:description",
        content:
          "Cotizaciones a mano, documentos que se copian entre sistemas, Excel donde debería haber un proceso.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://www.rckt.es/soluciones/operacion" }],
  }),
  component: OperacionPage,
});

const SENALES = [
  { titulo: "Presupuestos lentos", frase: "Presupuestos que tardan horas y dependen de una persona", Icono: FileClock },
  { titulo: "Datos duplicados", frase: "Datos duplicados entre CRM, ERP y hojas de cálculo", Icono: Copy },
  { titulo: "Reporting manual", frase: "Reporting manual cada semana", Icono: Table2 },
  { titulo: "Errores que se repiten", frase: "Errores que se repiten porque nadie los documenta", Icono: AlertCircle },
];

const PROCESOS = [
  {
    nombre: "Cotizaciones desde WhatsApp o correo",
    detalle: "El humano aprueba el envío y las condiciones especiales",
    Icono: MessageSquareQuote,
  },
  {
    nombre: "Clasificación y respuesta de solicitudes",
    detalle: "El humano aprueba los casos fuera de patrón",
    Icono: Inbox,
  },
  {
    nombre: "Generación y verificación de documentos",
    detalle: "El humano aprueba la firma y las excepciones",
    Icono: FileCheck2,
  },
  {
    nombre: "Sincronización CRM ↔ ERP u hojas",
    detalle: "El humano resuelve los conflictos de datos",
    Icono: RefreshCw,
  },
  { nombre: "Reporting comercial", detalle: "El humano interpreta y decide", Icono: Table2 },
  {
    nombre: "Atención post-venta de primer nivel",
    detalle: "El humano gestiona reclamaciones y devoluciones",
    Icono: LifeBuoy,
  },
];

const SPRINT = [
  { dia: "01", kicker: "Semanas 1–2", texto: "Mapa del proceso: volumen, tiempo, errores, coste" },
  { dia: "02", kicker: "Semanas 3–6", texto: "Construcción e integración, con pruebas reales" },
  { dia: "03", kicker: "Semanas 7–8", texto: "Piloto controlado: medición contra línea base y transferencia" },
  { dia: "04", kicker: "Después", texto: "Soporte mensual: monitoreo, excepciones, mejora" },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="inline-block h-4 w-[2px] bg-orange" />
      <span className="label-orange">{children}</span>
    </div>
  );
}

function OperacionPage() {
  return (
    <div className="bg-background text-foreground antialiased">
      <SiteNav />
      <main>
        <SystemPageHero
          label="Operación"
          descriptor="Cotizaciones a mano, documentos que se copian entre sistemas, Excel donde debería haber un proceso."
          title={
            <>
              Tu equipo hace lo mismo <span style={{ color: "#fc5c1f" }}>cien veces por semana.</span>
            </>
          }
          context="Tu equipo repite procesos manuales todas las semanas. Elegimos uno, medimos cuánto cuesta hoy y lo dejamos funcionando con supervisión humana en un Sprint de 6 a 8 semanas."
          ctaLabel="Solicitar diagnóstico de captación →"
          ctaHref={DIAGNOSTIC_HREF}
        />

        {/* Te pasa esto */}
        <section
          className="relative isolate py-16 md:py-24"
          style={{ background: "var(--surface-alt)", overflow: "clip" }}
        >
          <div className="relative z-10 mx-auto max-w-6xl px-6">
            <SectionLabel>Señales</SectionLabel>
            <h2 className="font-display text-[28px] leading-tight font-semibold tracking-tight md:text-[40px]">
              Te pasa esto.
            </h2>
            <SignalCards items={SENALES} />
          </div>
        </section>

        {/* Lo que hacemos */}
        <section className="relative isolate py-16 md:py-24" style={{ background: "var(--kraft)" }}>
          <div className="relative z-10 mx-auto max-w-6xl px-6">
            <div className="grid items-start gap-10 md:grid-cols-5 md:gap-14">
              <div className="md:col-span-3">
                <SectionLabel>Lo que hacemos</SectionLabel>
                <h2 className="font-display text-[28px] leading-tight font-semibold tracking-tight md:text-[40px]">
                  Lo que hacemos: <span style={{ color: "#fc5c1f" }}>Operations System.</span>
                </h2>
                <p className="mt-6 max-w-lg text-[16px] leading-relaxed text-muted-foreground">
                  Un proceso a la vez, en un Sprint de 6–8 semanas, con aprobación humana en lo que importa.
                </p>

                <p className="label-orange mt-10 block">Procesos que automatizamos</p>
                <ul className="mt-5">
                  {PROCESOS.map((i, idx) => (
                    <li
                      key={i.nombre}
                      className="flex items-start gap-4 py-[14px]"
                      style={idx === 0 ? undefined : { borderTop: "1px solid var(--line)" }}
                    >
                      <span
                        className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
                        style={{ background: "rgba(252, 92, 31, 0.10)" }}
                      >
                        <i.Icono className="h-5 w-5 text-orange" strokeWidth={1.6} aria-hidden="true" />
                      </span>
                      <span>
                        <span className="font-display block text-[16px] font-semibold tracking-tight">{i.nombre}</span>
                        <span className="mt-1 block text-[14.5px] leading-relaxed text-muted-foreground">
                          {i.detalle}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="md:col-span-2 md:self-stretch">
                <div className="card-kraft sticky-col rounded-2xl p-7 md:p-8">
                  <span className="label-orange">El sistema</span>
                  <p className="font-serif-accent mt-3 text-[38px] leading-none">Operations System</p>
                  <div className="my-6 h-px w-full" style={{ background: "var(--line)" }} />
                  <span className="label-orange">La regla</span>
                  <p className="font-display mt-3 text-[20px] leading-tight font-semibold tracking-tight">
                    Un proceso por sprint. El segundo reutiliza la infraestructura del primero.
                  </p>
                  <Link
                    to="/sistemas/operations-system"
                    className="btn-orange font-display mt-7 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[14px] font-semibold"
                  >
                    Ver Operations System →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* El Sprint */}
        <section
          className="relative py-16 md:py-24"
          style={{ background: "linear-gradient(90deg, var(--surface-alt) 0%, rgba(252, 92, 31, 0.10) 100%)" }}
        >
          <div className="mx-auto max-w-6xl px-6">
            <SectionLabel>El sprint</SectionLabel>
            <h2 className="font-display text-[28px] leading-tight font-semibold tracking-tight md:text-[40px]">
              Cómo funciona el Sprint.
            </h2>
            <MilestoneCards items={SPRINT} />
          </div>
        </section>


        {/* El método */}
        <section className="relative py-16 md:py-24" style={{ background: "var(--kraft)" }}>
          <div className="mx-auto max-w-6xl px-6">
            <SectionLabel>Prueba</SectionLabel>
            <h2 className="font-display text-[28px] leading-tight font-semibold tracking-tight md:text-[40px]">
              El método.
            </h2>
            <MethodCard fields={FICHA_OPERACION} className="mt-10" />
          </div>
        </section>

        {/* Para quién no es */}
        <section className="relative isolate overflow-hidden py-14 md:py-20" style={{ background: "var(--deep)" }}>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute"
            style={{ top: "-160px", right: "-140px", width: "760px", height: "560px", zIndex: 0, background: GLOW }}
          />
          <div className="relative z-10 mx-auto max-w-6xl px-6">
            <div className="max-w-3xl border-l-2 pl-7" style={{ borderColor: "var(--orange)" }}>
              <span className="label-orange">Honestidad primero</span>
              <h2
                className="font-display mt-4 text-[28px] leading-tight font-semibold tracking-tight md:text-[40px]"
                style={{ color: "#FFFFFF" }}
              >
                Para quién no es.
              </h2>
              <p className="mt-5 text-[16px] leading-relaxed" style={{ color: "rgba(255,255,255,0.72)" }}>
                Procesos sin volumen suficiente para medir · organizaciones sin un responsable que apruebe
                excepciones · equipos que no pueden documentar cómo trabajan hoy.
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
                style={{ color: "#FFFFFF" }}
              >
                El siguiente paso empieza con <span style={{ color: "#fc5c1f" }}>claridad.</span>
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
      </main>
      <SiteFooter />
    </div>
  );
}
