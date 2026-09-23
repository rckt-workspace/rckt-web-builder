import { createFileRoute } from "@tanstack/react-router";
import { CalendarCheck, Check, LayoutGrid, Target, Users } from "lucide-react";

import SiteNav from "@/components/rckt/SiteNav";
import SiteFooter from "@/components/rckt/SiteFooter";
import SystemPageHero from "@/components/rckt/SystemPageHero";
import heroPhotoAsset from "@/assets/rckt-hero-sunset.png.asset.json";

const heroPhoto = heroPhotoAsset.url;
const DIAGNOSTIC_HREF = "/sistemas/revenue-diagnostic";

const GLOW =
  "radial-gradient(ellipse 700px 500px at 100% 0%, rgba(232,103,46,0.35) 0%, rgba(244,161,95,0.18) 40%, rgba(232,103,46,0) 75%)";

export const Route = createFileRoute("/sistemas/operations-system")({
  head: () => ({
    meta: [
      { title: "Operations System — Procesos que se ejecutan solos | RCKT.es" },
      {
        name: "description",
        content:
          "Elegimos un proceso repetitivo de alto volumen, medimos su coste y en ocho semanas lo dejamos funcionando solo, con supervisión humana.",
      },
      { property: "og:title", content: "Operations System — Procesos que se ejecutan solos, con supervisión" },
      {
        property: "og:description",
        content: "Sprint de 6–8 semanas con línea base, piloto medido y criterios de aceptación firmados.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OperationsSystemPage,
});

const STATS = [
  {
    label: "Para quién",
    Icono: Users,
    detalle:
      "Empresas de 30–250 empleados con procesos manuales de alto volumen. Se habla con Operaciones, Tecnología o gerencia, no con Marketing",
  },
  {
    label: "Formato",
    Icono: LayoutGrid,
    detalle: "Operations Sprint de 6–8 semanas + soporte mensual",
  },
  {
    label: "Compromiso mínimo",
    Icono: CalendarCheck,
    detalle: "Sprint por alcance · soporte 6 meses",
  },
  {
    label: "Qué mide el éxito",
    Icono: Target,
    detalle: "Coste por ejecución correcta · tiempo de ciclo · tasa de excepciones · horas liberadas",
  },
];

const SPRINT = [
  { rango: "Semanas 1–2", titulo: "Mapa del proceso", detalle: "Volumen, tiempo, errores, coste" },
  { rango: "Semanas 3–6", titulo: "Construcción e integración", detalle: "Con pruebas de casos reales" },
  { rango: "Semanas 7–8", titulo: "Piloto controlado", detalle: "Medición contra línea base, transferencia" },
  { rango: "Después", titulo: "Soporte mensual", detalle: "Monitoreo, excepciones, mejora" },
];

const CATALOGO = [
  {
    proceso: "Cotizaciones desde WhatsApp o correo",
    agente: "Extrae la solicitud, consulta catálogo y precios, redacta la cotización",
    humano: "Envío y condiciones especiales",
  },
  {
    proceso: "Clasificación y respuesta de solicitudes",
    agente: "Clasifica, prioriza y responde lo repetitivo",
    humano: "Casos fuera de patrón",
  },
  {
    proceso: "Generación y verificación de documentos",
    agente: "Genera desde plantillas, verifica campos y coherencia",
    humano: "Firma y excepciones",
  },
  {
    proceso: "Sincronización CRM ↔ ERP u hojas",
    agente: "Mantiene datos consistentes entre sistemas",
    humano: "Conflictos de datos",
  },
  {
    proceso: "Reporting comercial",
    agente: "Consolida fuentes y publica el reporte en la cadencia acordada",
    humano: "Interpretación y decisiones",
  },
  {
    proceso: "Atención post-venta de primer nivel",
    agente: "Resuelve consultas frecuentes, escala el resto",
    humano: "Reclamaciones y devoluciones",
  },
];

const REGLAS = [
  "Un proceso por sprint: el segundo reutiliza la infraestructura del primero",
  "Podemos cambiar el proveedor de IA sin rehacer el sistema: nuestro activo es el diseño del proceso",
  "Sin línea base no hay sprint",
];

const ACEPTACION = [
  "Ejecuciones correctas sin intervención por encima del umbral acordado (típicamente 85–90% en piloto)",
  "Coste por ejecución correcta documentado frente a la línea base",
  "Toda excepción con ruta humana definida",
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="inline-block h-4 w-[2px] bg-orange" />
      <span className="label-orange">{children}</span>
    </div>
  );
}

function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="mt-10 grid gap-5 md:grid-cols-2">
      {items.map((t) => (
        <li key={t} className="flex items-start gap-4">
          <span
            className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
            style={{ background: "var(--orange-bg)" }}
          >
            <Check className="h-4 w-4 text-orange" strokeWidth={2.2} aria-hidden="true" />
          </span>
          <span className="text-[15.5px] leading-relaxed">{t}</span>
        </li>
      ))}
    </ul>
  );
}

function OperationsSystemPage() {
  return (
    <div className="bg-background text-foreground antialiased">
      <SiteNav />
      <main className="sys-page">
        <SystemPageHero
          label="Operations System"
          title={
            <>
              Procesos que se ejecutan solos, <em className="font-serif-accent">con supervisión.</em>
            </>
          }
          quoteLabel="En 30 segundos"
          quote="No te vendemos IA. Elegimos un proceso que tu equipo repite cien veces por semana, medimos cuánto te cuesta hoy, y en ocho semanas lo dejamos funcionando solo, con una persona aprobando lo que importa. Si no baja el coste por ejecución, no seguimos."
          ctaLabel="Solicitar Revenue Diagnostic →"
          ctaHref={DIAGNOSTIC_HREF}
        />

        {/* Stats */}
        <section className="relative py-16 md:py-20" style={{ background: "var(--kraft)" }}>
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {STATS.map((s) => {
                const valor = (s as { valor?: string | null }).valor ?? null;
                return (
                  <div key={s.label} className="stat-card">
                    <span className="stat-card__icon">
                      <s.Icono className="h-5 w-5 text-orange" strokeWidth={1.6} aria-hidden="true" />
                    </span>
                    <p className="font-mono mt-4 text-[11px] tracking-[0.16em] text-orange uppercase">{s.label}</p>
                    {valor ? (
                      <p className="font-display mt-2 text-[28px] leading-tight font-semibold tracking-tight">
                        {valor}
                      </p>
                    ) : null}
                    {s.detalle ? (
                      <p
                        className="mt-2 text-[16px] leading-[1.55]"
                        data-align="left"
                        style={{ textAlign: "left", color: "var(--ink)" }}
                      >
                        {s.detalle}
                      </p>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Sprint timeline */}
        <section className="relative isolate overflow-hidden py-16 md:py-24" style={{ background: "var(--kraft)" }}>
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: "-120px",
              left: "-150px",
              width: "800px",
              height: "600px",
              zIndex: 0,
              pointerEvents: "none",
              background:
                "radial-gradient(ellipse 600px 450px at 0% 100%, rgba(232,103,46,0.28) 0%, rgba(244,161,95,0.14) 42%, rgba(232,103,46,0) 72%)",
            }}
          />
          <div className="relative z-10 mx-auto max-w-6xl px-6">
            <SectionLabel>El sprint</SectionLabel>
            <h2 className="font-display text-[28px] leading-tight font-semibold tracking-tight md:text-[40px]">
              El Sprint, semana a semana.
            </h2>

            {/* Desktop: horizontal */}
            <div className="relative mt-14 hidden md:block">
              <div
                aria-hidden="true"
                className="absolute top-[5px] right-0 left-0 h-px"
                style={{ background: "rgba(232,103,46,0.35)" }}
              />
              <div className="grid grid-cols-4 gap-8">
                {SPRINT.map((s) => (
                  <div key={s.titulo} className="relative pr-4">
                    <span
                      className="absolute top-0 left-0 block h-[11px] w-[11px] rounded-full"
                      style={{ background: "var(--orange)" }}
                      aria-hidden="true"
                    />
                    <p className="label-orange mt-8">{s.rango}</p>
                    <h3 className="font-display mt-3 text-[18px] leading-snug font-semibold tracking-tight">
                      {s.titulo}
                    </h3>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground">{s.detalle}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Móvil: vertical */}
            <div className="relative mt-10 md:hidden">
              <div
                aria-hidden="true"
                className="absolute top-0 bottom-0 left-[5px] w-px"
                style={{ background: "rgba(232,103,46,0.35)" }}
              />
              <div className="flex flex-col gap-9">
                {SPRINT.map((s) => (
                  <div key={s.titulo} className="relative pl-8">
                    <span
                      className="absolute top-[6px] left-0 block h-[11px] w-[11px] rounded-full"
                      style={{ background: "var(--orange)" }}
                      aria-hidden="true"
                    />
                    <p className="label-orange">{s.rango}</p>
                    <h3 className="font-display mt-2 text-[18px] leading-snug font-semibold tracking-tight">
                      {s.titulo}
                    </h3>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground">{s.detalle}</p>
                  </div>
                ))}
              </div>
            </div>

            <p
              className="mt-12 max-w-2xl text-[17px] leading-relaxed md:text-[19px]"
              style={{ fontFamily: '"Newsreader", Georgia, serif', fontStyle: "italic" }}
            >
              Los criterios de aceptación se firman en la semana 2, antes de construir nada.
            </p>
          </div>
        </section>

        {/* Catálogo de procesos */}
        <section className="relative py-16 md:py-24" style={{ background: "var(--kraft)" }}>
          <div className="mx-auto max-w-6xl px-6">
            <SectionLabel>Catálogo</SectionLabel>
            <h2 className="font-display text-[28px] leading-tight font-semibold tracking-tight md:text-[40px]">
              Catálogo de procesos.
            </h2>
            <p className="mt-4 max-w-2xl text-[15.5px] leading-relaxed text-muted-foreground">
              Acotado a propósito: si el proceso que necesitas no está aquí, se evalúa con dirección antes de
              presupuestar.
            </p>

            {/* Desktop: tabla */}
            <div className="mt-10 hidden md:block">
              <div
                className="grid grid-cols-[1.1fr_1.3fr_1fr] gap-8 pb-4 font-mono text-[11px] tracking-[0.16em] uppercase text-orange"
                style={{ borderBottom: "1px solid var(--line)" }}
              >
                <span>Proceso</span>
                <span>Qué hace el agente</span>
                <span>Qué aprueba el humano</span>
              </div>
              {CATALOGO.map((r) => (
                <div
                  key={r.proceso}
                  className="grid grid-cols-[1.1fr_1.3fr_1fr] gap-8 py-5 text-[15px] leading-relaxed"
                  style={{ borderBottom: "1px solid var(--line)" }}
                >
                  <span className="font-semibold">{r.proceso}</span>
                  <span className="text-muted-foreground">{r.agente}</span>
                  <span className="text-muted-foreground">{r.humano}</span>
                </div>
              ))}
            </div>

            {/* Móvil: bloques */}
            <div className="mt-8 md:hidden">
              {CATALOGO.map((r) => (
                <div key={r.proceso} className="py-6" style={{ borderTop: "1px solid var(--line)" }}>
                  <h3 className="font-display text-[17px] leading-snug font-semibold tracking-tight">
                    {r.proceso}
                  </h3>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-muted-foreground">
                    <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-orange">Agente: </span>
                    {r.agente}
                  </p>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground">
                    <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-orange">Humano: </span>
                    {r.humano}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Qué no incluye */}
        <section className="relative py-10 md:py-14" style={{ background: "var(--kraft)" }}>
          <div className="mx-auto max-w-6xl px-6">
            <div
              className="band--orange rounded-[28px] px-8 py-10 md:px-12 md:py-12"
            >
              <p className="label-on-orange">Qué no incluye</p>
              <p
                className="font-display mt-5 max-w-3xl text-[22px] leading-[1.3] font-semibold tracking-tight md:text-[30px]"
                style={{ color: "#FFFFFF" }}
              >
                Transformación empresarial completa · ERP o software a medida · procesos críticos sin
                responsable del lado del cliente · procesos sin datos accesibles.
              </p>
            </div>
          </div>
        </section>

        {/* Reglas */}
        <section className="relative py-16 md:py-24" style={{ background: "var(--kraft)" }}>
          <div className="mx-auto max-w-6xl px-6">
            <SectionLabel>Reglas</SectionLabel>
            <h2 className="font-display text-[28px] leading-tight font-semibold tracking-tight md:text-[40px]">
              Cómo trabajamos aquí
            </h2>
            <Checklist items={REGLAS} />
          </div>
        </section>

        {/* Aceptación */}
        <section className="relative isolate overflow-hidden py-16 md:py-24" style={{ background: "var(--kraft)" }}>
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "-50px",
              right: "-100px",
              width: "900px",
              height: "650px",
              zIndex: 0,
              pointerEvents: "none",
              background: GLOW,
            }}
          />
          <div className="relative z-10 mx-auto max-w-6xl px-6">
            <SectionLabel>Aceptación</SectionLabel>
            <h2 className="font-display text-[28px] leading-tight font-semibold tracking-tight md:text-[40px]">
              Cuándo damos el sistema por aceptado
            </h2>
            <Checklist items={ACEPTACION} />
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
            style={{
              position: "absolute",
              top: "-80px",
              right: "-120px",
              width: "900px",
              height: "650px",
              zIndex: 1,
              pointerEvents: "none",
              background: GLOW,
            }}
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
                  Solicitar Revenue Diagnostic →
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
