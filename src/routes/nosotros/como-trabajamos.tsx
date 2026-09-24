import { createFileRoute } from "@tanstack/react-router";
import {
  Ban,
  Database,
  Layers,
  Lock,
  PackageOpen,
  ShieldCheck,
  UserRoundCheck,
} from "lucide-react";

import SiteFooter from "@/components/rckt/SiteFooter";
import SiteNav from "@/components/rckt/SiteNav";
import SectionHeader from "@/components/rckt/SectionHeader";
import SystemPageHero from "@/components/rckt/SystemPageHero";
import { useInView } from "@/hooks/use-in-view";
import heroPhotoImg from "@/assets/rckt-cta-final.jpg";

const heroPhoto = heroPhotoImg;
const DIAGNOSTIC_HREF = "/sistemas/revenue-diagnostic";

const GLOW =
  "radial-gradient(ellipse 700px 500px at 100% 0%, rgba(252, 92, 31,0.35) 0%, rgba(252, 92, 31,0.18) 40%, rgba(252, 92, 31,0) 75%)";

export const Route = createFileRoute("/nosotros/como-trabajamos")({
  head: () => ({
    meta: [
      { title: "Cómo trabajamos — Operar, Sprint o Partner | RCKT.es" },
      {
        name: "description",
        content:
          "Tres modalidades de trabajo sobre una misma base: seis condiciones de toda cuenta, cadencia semanal, mensual y trimestral, y cómo crece una cuenta.",
      },
      { property: "og:title", content: "Cómo trabajamos — RCKT.es" },
      {
        property: "og:description",
        content: "Operar, Sprint o Partner, siempre sobre las mismas seis condiciones.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://www.rckt.es/nosotros/como-trabajamos" }],
  }),
  component: ComoTrabajamosPage,
});

const MODALIDADES = [
  {
    nombre: "Operar",
    pill: "Por defecto",
    quees: "RCKT opera el sistema con responsabilidad sobre el resultado. Es la modalidad por defecto.",
    cuando: "Demand, Conversion, Revenue Engine y Growth OS.",
  },
  {
    nombre: "Sprint",
    pill: null,
    quees:
      "Implementación acotada de 6–8 semanas, con alcance y aceptación cerrados antes de empezar.",
    cuando: "Operations; Sales Flow suelto; web y ecommerce; migraciones de CRM.",
  },
  {
    nombre: "Partner",
    pill: null,
    quees: "Advisory, in-housing, capacitación o un growth lead fraccional.",
    cuando:
      "Empresas con equipo interno que quieren nuestro método y criterio, no nuestra ejecución.",
  },
];

const CONDICIONES: Array<{ n: string; nombre: string; desc: string; Icon: typeof Database }> = [
  { n: "01", nombre: "Una fuente de verdad", desc: "Modelo de datos único que el cliente firma", Icon: Database },
  {
    n: "02",
    nombre: "IA supervisada",
    desc: "Documento de una página y evaluación continua de los agentes",
    Icon: ShieldCheck,
  },
  { n: "03", nombre: "Un responsable con autoridad", desc: "Decide, no coordina", Icon: UserRoundCheck },
  { n: "04", nombre: "Activos reutilizables", desc: "Se documentan y se versionan", Icon: Layers },
  { n: "05", nombre: "Gobierno y seguridad", desc: "Accesos, consentimiento, cumplimiento local", Icon: Lock },
  {
    n: "06",
    nombre: "Transferencia",
    desc: "Documentación y accesos completos desde el primer día",
    Icon: PackageOpen,
  },
];

const SELLOS = ["No se venden", "No se facturan aparte", "No se negocian"];

const CADENCIA: Array<{ label: string; texto: string; dots: number; size: number }> = [
  { label: "Semanal", texto: "Rendimiento y SLAs", dots: 12, size: 8 },
  { label: "Mensual", texto: "Con decisores, para revisar fugas y prioridades", dots: 3, size: 16 },
  { label: "Trimestral", texto: "Estrategia y expansión", dots: 1, size: 26 },
];

const ESCALERA: Array<{ periodo: string; nombre: string; href?: string }> = [
  { periodo: "Semanas 0–3", nombre: "Revenue Diagnostic", href: "/sistemas/revenue-diagnostic" },
  { periodo: "Meses 1–3", nombre: "Demand System", href: "/sistemas/demand-system" },
  { periodo: "Meses 1–6", nombre: "Revenue Engine", href: "/sistemas/revenue-engine" },
  { periodo: "Meses 6–12", nombre: "+ Operations Sprint", href: "/sistemas/operations-system" },
  { periodo: "Mes 12 en adelante", nombre: "Growth OS" },
];

const TRIGGERS: Array<{ de: string; a: string; que: string }> = [
  {
    de: "Diagnostic",
    a: "Demand o Revenue Engine",
    que: "Roadmap presentado; fuga principal identificada y cuantificada",
  },
  {
    de: "Demand",
    a: "Revenue Engine",
    que: "Fuga documentada después del lead: respuesta en más de una hora, menos del 60% de leads contactados, asesores fuera del CRM",
  },
  {
    de: "Revenue Engine",
    a: "+ Operations",
    que: "Un proceso manual detectado en la revisión mensual, con 50 casos o más por semana",
  },
  {
    de: "Cualquiera",
    a: "Growth OS",
    que: "6 meses o más de relación, línea base cumplida, dos o más sistemas activos y un decisor que patrocina",
  },
];

const GUARDRAILS: Array<{ valor: number; prefijo: string; sufijo: string; metrica: string }> = [
  { valor: 45, prefijo: "", sufijo: "% o más", metrica: "MQL rate (lead → MQL)" },
  { valor: 70, prefijo: "", sufijo: "% o más", metrica: "Show rate (reunión agendada → realizada)" },
  { valor: 60, prefijo: "", sufijo: "% o más", metrica: "Reunión → propuesta" },
  { valor: 25, prefijo: "", sufijo: "% o más", metrica: "Propuesta → venta" },
  { valor: 90, prefijo: "", sufijo: " días o menos", metrica: "Payback del coste de adquisición" },
  { valor: 100, prefijo: "", sufijo: "%", metrica: "Leads con seguimiento dentro del SLA" },
  { valor: 100, prefijo: "", sufijo: "%", metrica: "Cuentas con fuente de verdad operativa" },
];

function CondicionCard({ c, i }: { c: (typeof CONDICIONES)[number]; i: number }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);
  const Icon = c.Icon;
  return (
    <div
      ref={ref}
      className={`ct-card ct-card-in flex h-full flex-col ${inView ? "is-in" : ""}`}
      style={{ transitionDelay: `${i * 80}ms` }}
    >
      <div className="flex items-center justify-between">
        <span className="ct-ico">
          <Icon className="h-[22px] w-[22px]" strokeWidth={1.5} aria-hidden="true" />
        </span>
        <span className="font-hero text-[20px] leading-none font-semibold text-orange">{c.n}</span>
      </div>
      <h3 className="font-display mt-5 text-[19px] font-semibold tracking-tight">{c.nombre}</h3>
      <p data-align="left" className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
        {c.desc}
      </p>
    </div>
  );
}

function ModalidadCard({ m, i }: { m: (typeof MODALIDADES)[number]; i: number }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);
  return (
    <div
      ref={ref}
      className={`nos-ficha nos-rise flex h-full flex-col ${inView ? "is-in" : ""}`}
      style={{ transitionDelay: `${i * 80}ms` }}
    >
      <div className="flex flex-wrap items-center gap-3">
        <h3 className="font-display text-[32px] leading-none font-semibold tracking-tight">{m.nombre}</h3>
        {m.pill ? (
          <span className="btn-orange font-mono inline-flex items-center rounded-full px-3 py-1 text-[10px] tracking-[0.16em] uppercase">
            {m.pill}
          </span>
        ) : null}
      </div>
      <p className="label-orange mt-6">Qué es</p>
      <p data-align="left" className="mt-2 text-[16px] leading-relaxed text-muted-foreground">
        {m.quees}
      </p>
      <div className="my-6 h-px w-full" style={{ background: "rgba(252, 92, 31,0.18)" }} />
      <p className="label-orange">Cuándo aplica</p>
      <p data-align="left" className="mt-2 text-[16px] leading-relaxed text-muted-foreground">
        {m.cuando}
      </p>
    </div>
  );
}

function CadenciaCol({ c, i }: { c: (typeof CADENCIA)[number]; i: number }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);
  return (
    <div ref={ref}>
      <div className="flex min-h-[32px] flex-wrap items-center gap-[6px]" aria-hidden="true">
        {Array.from({ length: c.dots }).map((_, d) => (
          <span
            key={d}
            className={`nos-word ${inView ? "is-in" : ""}`}
            style={{
              display: "inline-block",
              width: `${c.size}px`,
              height: `${c.size}px`,
              borderRadius: "999px",
              background: "#fc5c1f",
              transitionDelay: `${i * 120 + d * 60}ms`,
            }}
          />
        ))}
      </div>
      <p className="label-orange mt-6">{c.label}</p>
      <p data-align="left" className="mt-2 text-[18px] leading-relaxed">
        {c.texto}
      </p>
    </div>
  );
}

function CountUp({ g }: { g: (typeof GUARDRAILS)[number] }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);
  const [n, setN] = useState(0);
  const done = useRef(false);

  useEffect(() => {
    if (!inView || done.current) return;
    done.current = true;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setN(g.valor);
      return;
    }
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - start) / 1000, 1);
      setN(Math.round(g.valor * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, g.valor]);

  return (
    <div ref={ref} className="nos-ficha flex h-full flex-col">
      <span className="font-hero text-[44px] leading-none font-semibold text-orange">
        {g.prefijo}
        {n}
        {g.sufijo}
      </span>
      <p data-align="left" className="mt-3 text-[16px] leading-relaxed text-muted-foreground">
        {g.metrica}
      </p>
    </div>
  );
}

function EscalonCard({ e, i }: { e: (typeof ESCALERA)[number]; i: number }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);
  const inner = (
    <>
      <span className="label-orange block">{e.periodo}</span>
      <span className="font-display mt-2 block text-[18px] font-semibold tracking-tight">{e.nombre}</span>
    </>
  );
  return (
    <div
      ref={ref}
      className={`nos-rise ${inView ? "is-in" : ""} md:self-end`}
      style={{ transitionDelay: `${i * 90}ms`, marginBottom: `${i * 34}px` }}
    >
      {e.href ? (
        <a href={e.href} className="nos-ficha block h-full transition-colors">
          {inner}
        </a>
      ) : (
        <div className="nos-ficha h-full">{inner}</div>
      )}
    </div>
  );
}

function ComoTrabajamosPage() {
  return (
    <div className="nos-page bg-background text-foreground antialiased">
      <SiteNav />
      <main>
        <SystemPageHero
          label="Cómo trabajamos"
          title={<>Tres modalidades, <span className="text-orange">una misma base.</span></>}
          context="Hay tres formas de contratar el mismo conocimiento: Operar, cuando RCKT opera el sistema y responde por el resultado; Sprint, una implementación acotada de 6 a 8 semanas con alcance y aceptación cerrados antes de empezar; y Partner, cuando tu equipo interno quiere nuestro método y criterio, no nuestra ejecución. Las tres se apoyan en las mismas seis condiciones, que se cumplen en toda cuenta."
          ctaLabel="Solicitar diagnóstico de captación →"
          ctaHref={DIAGNOSTIC_HREF}
        />

        {/* 2. Modalidades */}
        <section className="nos-sec nos-glow--tr">
          <div className="relative mx-auto max-w-6xl px-6">
            <SectionHeader num="01." label="Modalidades" title="Tres formas de contratar el mismo conocimiento." />
            <div className="mt-10 grid items-stretch gap-6 md:grid-cols-3">
              {MODALIDADES.map((m, i) => (
                <ModalidadCard key={m.nombre} m={m} i={i} />
              ))}
            </div>
            <p
              data-center
              className="font-display mx-auto mt-12 max-w-[760px] text-center text-[24px] leading-snug font-semibold"
            >
              Partner no es un servicio distinto: es{" "}
              <span className="font-display text-orange not-italic">la misma cabeza</span> trabajando con el
              equipo del cliente en lugar de por él.
            </p>
          </div>
        </section>

        {/* 3. Las seis condiciones */}
        <section className="ct-base">
          <div className="relative z-10 mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[38%_1fr]">
            <div className="lg:sticky lg:top-[120px] lg:self-start">
              <SectionHeader num="02." label="La base" title={<>Las seis condiciones de <span className="text-orange">toda cuenta</span>.</>} />
              <div className="mt-8 flex flex-wrap gap-3 sm:flex-col sm:items-start">
                {SELLOS.map((s) => (
                  <span key={s} className="ct-chip font-display">
                    <Ban className="h-4 w-4 shrink-0 text-orange" strokeWidth={1.8} aria-hidden="true" />
                    {s}
                  </span>
                ))}
              </div>
              <a
                href="/nosotros"
                className="font-display mt-8 inline-flex items-center gap-2 text-[15px] font-semibold text-orange"
              >
                Ver los principios completos <span className="nos-arrow">→</span>
              </a>
            </div>
            <div className="grid items-stretch gap-4 sm:grid-cols-2">
              {CONDICIONES.map((c, i) => (
                <CondicionCard key={c.n} c={c} i={i} />
              ))}
            </div>
          </div>
        </section>

        {/* 4. Cadencia */}
        <section className="nos-sec nos-sec--warm nos-glow--bl">
          <div className="relative mx-auto max-w-6xl px-6">
            <SectionHeader num="03." label="Cadencia" title={<>El <span className="text-orange">ritmo</span> de trabajo con cada cliente.</>} />
            <div className="mt-12 grid gap-10 md:grid-cols-3">
              {CADENCIA.map((c, i) => (
                <CadenciaCol key={c.label} c={c} i={i} />
              ))}
            </div>
          </div>
        </section>

        {/* 5 + 6. La escalera y triggers */}
        <section className="nos-sec nos-glow--tr">
          <div className="relative mx-auto max-w-6xl px-6">
            <SectionHeader num="04." label="La escalera" title={<>Cómo crece una <span className="text-orange">cuenta</span>.</>} />

            {/* desktop: peldaños ascendentes */}
            <div className="relative mt-16 hidden md:block">
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-[40px] h-px origin-left"
                style={{
                  background: "linear-gradient(90deg, rgba(252, 92, 31,0.15), rgba(252, 92, 31,0.9))",
                  transform: "rotate(-7deg)",
                }}
              />
              <div className="relative grid grid-cols-5 items-end gap-4">
                {ESCALERA.map((e, i) => (
                  <EscalonCard key={e.nombre} e={e} i={i} />
                ))}
              </div>
            </div>

            {/* móvil: lista vertical con línea a la izquierda */}
            <div
              className="mt-10 space-y-5 pl-6 md:hidden"
              style={{ borderLeft: "2px solid rgba(252, 92, 31,0.35)" }}
            >
              {ESCALERA.map((e) => (
                <div key={e.nombre}>
                  <span className="label-orange block">{e.periodo}</span>
                  {e.href ? (
                    <a href={e.href} className="font-display mt-1 block text-[18px] font-semibold tracking-tight">
                      {e.nombre}
                    </a>
                  ) : (
                    <span className="font-display mt-1 block text-[18px] font-semibold tracking-tight">
                      {e.nombre}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* 6. Triggers */}
            <div className="mt-24">
              <SectionHeader num="05." label="Triggers de expansión" title="Cuándo ampliar el sistema." />
              <p data-align="left" className="max-w-[720px] text-[16px] leading-relaxed text-muted-foreground">
                Se documentan en la revisión mensual. Nunca es venta cruzada automática.
              </p>
              <div className="mt-10">
                {TRIGGERS.map((t) => (
                  <div
                    key={t.de + t.a}
                    className="flex flex-col gap-4 border-t py-6 md:flex-row md:items-center md:gap-10"
                    style={{ borderColor: "rgba(252, 92, 31,0.18)" }}
                  >
                    <div className="flex flex-wrap items-center gap-3 md:w-[420px] md:shrink-0">
                      <span
                        className="font-display inline-flex items-center rounded-full px-4 py-2 text-[14px] font-semibold"
                        style={{ border: "1px solid rgba(252, 92, 31,0.4)" }}
                      >
                        {t.de}
                      </span>
                      <span className="text-orange" aria-hidden="true">
                        →
                      </span>
                      <span className="btn-orange font-display inline-flex items-center rounded-full px-4 py-2 text-[14px] font-semibold">
                        {t.a}
                      </span>
                    </div>
                    <p data-align="left" className="text-[16px] leading-relaxed text-muted-foreground">
                      {t.que}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 7. Cómo medimos */}
        <section className="nos-sec nos-quote nos-glow--br">
          <div className="relative mx-auto max-w-6xl px-6">
            <SectionHeader num="06." label="Cómo medimos" title={<>Guardrails por <span className="text-orange">cuenta</span>.</>} />
            <p data-align="left" className="mt-3 max-w-[720px] text-[16px] leading-relaxed text-muted-foreground">
              Objetivos de planificación que se recalibran con datos propios.
            </p>
            <div className="mt-12 grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {GUARDRAILS.slice(0, 4).map((g) => (
                <CountUp key={g.metrica} g={g} />
              ))}
            </div>
            <div className="mt-6 grid items-stretch gap-6 sm:grid-cols-2 lg:mx-auto lg:max-w-[75%] lg:grid-cols-3">
              {GUARDRAILS.slice(4).map((g) => (
                <CountUp key={g.metrica} g={g} />
              ))}
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
            <div className="mx-auto max-w-[720px] text-center">
              <div className="mb-4"><span className="label-orange">¿Empezamos?</span></div>
              <h2
                className="font-display text-[34px] leading-[1.08] font-semibold tracking-tight md:text-[56px]"
                style={{ color: "#FFFFFF" }}
              >
                El siguiente paso empieza con <span className="text-orange">claridad.</span>
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
