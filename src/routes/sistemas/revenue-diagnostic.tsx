import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Toaster, toast } from "sonner";
import {
  Calculator,
  Check,
  Clock,
  FileSignature,
  FileText,
  Map,
  MessagesSquare,
  Route as RouteIcon,
  Search,
  Target,
  Users,
} from "lucide-react";

import SiteNav from "@/components/rckt/SiteNav";
import SiteFooter from "@/components/rckt/SiteFooter";
import SystemPageHero from "@/components/rckt/SystemPageHero";
import heroPhotoAsset from "@/assets/rckt-hero-sunset.png.asset.json";

const heroPhoto = heroPhotoAsset.url;

export const Route = createFileRoute("/sistemas/revenue-diagnostic")({
  head: () => ({
    meta: [
      { title: "Revenue Diagnostic — Antes de tocar nada, medimos | RCKT.es" },
      {
        name: "description",
        content:
          "Diagnóstico de ingresos de 2–3 semanas: mapa de fugas del embudo con tus números reales, línea base firmada y roadmap de 90 días. La única puerta de entrada a RCKT.es.",
      },
      { property: "og:title", content: "Revenue Diagnostic — Antes de tocar nada, medimos" },
      {
        property: "og:description",
        content:
          "Te decimos cuánto pierdes entre la campaña y el cierre, en qué punto exacto, y qué haríamos en 90 días.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://www.rckt.es/sistemas/revenue-diagnostic" }],
  }),
  component: RevenueDiagnostic,
});

const GLOW =
  "radial-gradient(ellipse 700px 500px at 100% 0%, rgba(252, 92, 31,0.35) 0%, rgba(252, 92, 31,0.18) 40%, rgba(252, 92, 31,0) 75%)";

const STATS = [
  {
    label: "Duración",
    valor: "2–3 semanas",
    Icono: Clock,
    detalle: "de diagnóstico",
  },
  {
    label: "Entregable",
    valor: null,
    Icono: FileText,
    detalle: "Documento + línea base firmada + roadmap 90 días",
  },
  {
    label: "Para quién",
    valor: null,
    Icono: Users,
    detalle: "Toda cuenta nueva, sin excepción",
  },
  {
    label: "Qué mide el éxito",
    valor: null,
    Icono: Target,
    detalle: "Que decidas con datos",
  },
];

const INCLUYE = [
  {
    Icono: Map,
    titulo: "Mapa de fugas",
    detalle:
      "Embudo completo con tus números reales: inversión → lead → contacto → calificación → cita → propuesta → venta → margen",
  },
  {
    Icono: Search,
    titulo: "Auditoría completa",
    detalle: "Oferta, campañas activas, landing, web y tracking (GTM, GA4, píxel, CAPI)",
  },
  {
    Icono: MessagesSquare,
    titulo: "CRM y proceso comercial",
    detalle: "Uso de WhatsApp, automatizaciones existentes",
  },
  {
    Icono: Calculator,
    titulo: "Unit economics",
    detalle: "CAC, tasa MQL/SQL, show rate, close rate, payback",
  },
  {
    Icono: FileSignature,
    titulo: "Línea base firmada",
    detalle: "Documentada y acordada contigo",
  },
  {
    Icono: RouteIcon,
    titulo: "Roadmap de 90 días",
    detalle: "Priorizado por impacto económico",
  },
];

const NECESITAMOS = [
  "Acceso de lectura a Meta, Google, GA4 y GTM",
  "CRM o exportación",
  "Datos de venta del último trimestre",
  "2–3 entrevistas (comercial, marketing, operaciones)",
  "Acceso a WhatsApp Business o muestra de conversaciones",
];

const FAQS = [
  {
    q: "¿Es gratis?",
    a: "No. Es trabajo real de tres semanas con tus datos, y se descuenta del sistema si sigues con nosotros.",
  },
  { q: "¿Cuánto dura?", a: "2–3 semanas." },
  {
    q: "¿Qué pasa después?",
    a: "Recomendamos sistema o bundle según la fuga con mayor impacto económico.",
  },
  {
    q: "¿Cuánto cuesta?",
    a: "Depende de dónde esté tu fuga — eso es justo lo que mide el Diagnostic. No damos precio de sistema sin diagnóstico.",
  },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="inline-block h-4 w-[2px] bg-orange" />
      <span className="label-orange">{children}</span>
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border px-4 py-3 text-[15px] outline-none transition-colors focus:border-orange";
const inputStyle = {
  background: "rgba(255,255,255,0.75)",
  borderColor: "var(--line)",
  color: "var(--ink)",
} as const;

function DiagnosticForm() {
  const [sending, setSending] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const get = (k: string) => String(fd.get(k) ?? "").trim();

    setSending(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: get("nombre"),
          email: get("email"),
          company: get("empresa"),
          website: get("web"),
          concern: get("problema"),
          source: "revenue-diagnostic",
          details: {
            ciudad: get("ciudad"),
            cargo: get("cargo"),
            empleados: get("empleados"),
            sector: get("sector"),
            inversion_medios: get("inversion"),
            leads_mes: get("leads"),
            crm: get("crm"),
            whatsapp: get("whatsapp"),
            inicio: get("inicio"),
          },
        }),
      });
      if (!res.ok) throw new Error("fail");
      toast.success("Solicitud enviada. Respondemos en menos de 48 horas.");
      form.reset();
    } catch {
      toast.error("No se pudo enviar. Escríbenos a hola@rckt.es.");
    } finally {
      setSending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="form-surface mt-10 rounded-2xl p-6 md:p-8">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-muted-foreground">Nombre</span>
          <input name="nombre" required maxLength={120} className={`${inputClass} mt-2`} style={inputStyle} />
        </label>
        <label className="block">
          <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-muted-foreground">Email</span>
          <input name="email" type="email" required maxLength={200} className={`${inputClass} mt-2`} style={inputStyle} />
        </label>
        <label className="block">
          <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-muted-foreground">Empresa</span>
          <input name="empresa" required maxLength={200} className={`${inputClass} mt-2`} style={inputStyle} />
        </label>
        <label className="block">
          <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-muted-foreground">Web</span>
          <input name="web" placeholder="https://" maxLength={300} className={`${inputClass} mt-2`} style={inputStyle} />
        </label>
        <label className="block">
          <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-muted-foreground">Ciudad</span>
          <input name="ciudad" className={`${inputClass} mt-2`} style={inputStyle} />
        </label>
        <label className="block">
          <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-muted-foreground">Cargo</span>
          <input name="cargo" className={`${inputClass} mt-2`} style={inputStyle} />
        </label>
        <label className="block">
          <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-muted-foreground">Empleados</span>
          <select name="empleados" defaultValue="" className={`${inputClass} mt-2`} style={inputStyle}>
            <option value="" disabled>
              Selecciona
            </option>
            {["1–10", "11–50", "51–200", "201–500", "+500"].map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-muted-foreground">Sector</span>
          <input name="sector" className={`${inputClass} mt-2`} style={inputStyle} />
        </label>
        <label className="block md:col-span-2">
          <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-muted-foreground">
            Problema principal
          </span>
          <select name="problema" defaultValue="" required className={`${inputClass} mt-2`} style={inputStyle}>
            <option value="" disabled>
              Selecciona
            </option>
            <option value="Captación y cierre">Captación y cierre</option>
            <option value="Ecommerce rentable">Ecommerce rentable</option>
            <option value="Operación">Operación</option>
          </select>
        </label>
        <label className="block">
          <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-muted-foreground">
            Inversión mensual en medios
          </span>
          <select name="inversion" defaultValue="" className={`${inputClass} mt-2`} style={inputStyle}>
            <option value="" disabled>
              Selecciona
            </option>
            {[
              "Menos de 5.000 €",
              "5.000 – 15.000 €",
              "15.000 – 50.000 €",
              "50.000 – 150.000 €",
              "Más de 150.000 €",
            ].map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-muted-foreground">
            Leads al mes
          </span>
          <select name="leads" defaultValue="" className={`${inputClass} mt-2`} style={inputStyle}>
            <option value="" disabled>
              Selecciona
            </option>
            {["Menos de 50", "50 – 200", "200 – 1.000", "Más de 1.000"].map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-muted-foreground">CRM actual</span>
          <input name="crm" className={`${inputClass} mt-2`} style={inputStyle} />
        </label>
        <label className="block">
          <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-muted-foreground">
            WhatsApp en ventas
          </span>
          <select name="whatsapp" defaultValue="" className={`${inputClass} mt-2`} style={inputStyle}>
            <option value="" disabled>
              Selecciona
            </option>
            {["No lo usamos", "Uso manual del equipo", "WhatsApp Business API", "Automatizado"].map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </label>
        <label className="block md:col-span-2">
          <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-muted-foreground">
            Fecha prevista de inicio
          </span>
          <input name="inicio" type="month" className={`${inputClass} mt-2`} style={inputStyle} />
        </label>
      </div>

      <button
        type="submit"
        disabled={sending}
        className="btn-orange font-display mt-8 inline-flex items-center justify-center rounded-full px-8 py-4 text-[15px] font-semibold disabled:opacity-60"
      >
        {sending ? "Enviando…" : "Solicitar diagnóstico de captación →"}
      </button>
      <p className="mt-4 text-xs text-muted-foreground">
        Al enviar aceptas nuestra{" "}
        <a href="/legal/privacidad" className="underline underline-offset-2">
          política de privacidad
        </a>
        .
      </p>
    </form>
  );
}

function RevenueDiagnostic() {
  return (
    <div className="bg-background text-foreground antialiased">
      <Toaster position="bottom-right" richColors closeButton />
      <SiteNav />
      <main className="sys-page">
        <SystemPageHero
          label="Revenue Diagnostic"
          title={<>Antes de tocar nada, <em className="font-serif-accent">medimos.</em></>}
          descriptor="Diagnóstico de ingresos — la única puerta de entrada a RCKT.es."
          quoteLabel="En 30 segundos"
          quote="Antes de tocar nada, medimos. En tres semanas te decimos cuánto pierdes entre la campaña y el cierre, en qué punto exacto, y qué haríamos en 90 días. Si sigues con nosotros, lo que pagas por el diagnóstico se descuenta del sistema."
          ctaLabel="Solicitar diagnóstico de captación →"
          ctaHref="#formulario"
        />

        {/* Datos clave — fila de stats */}
        <section className="relative py-16 md:py-20 sys-sec">
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

        {/* Qué incluye — grid de cards */}
        <section className="relative isolate overflow-hidden py-16 md:py-24 sys-sec sys-sec--warm section--glow" data-corner="tr">
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
                "radial-gradient(ellipse 600px 450px at 0% 100%, rgba(252, 92, 31,0.28) 0%, rgba(252, 92, 31,0.14) 42%, rgba(252, 92, 31,0) 72%)",
            }}
          />
          <div className="relative z-10 mx-auto max-w-6xl px-6">
            <div className="md:flex md:items-end md:justify-between md:gap-10">
              <h2 className="font-display text-[28px] leading-tight font-semibold tracking-tight md:text-[40px]">
                Qué incluye
              </h2>
              <span className="text-sm font-semibold text-orange">se acredita al sistema</span>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {INCLUYE.map((c) => (
                <article
                  key={c.titulo}
                  className="rounded-2xl p-6"
                  style={{
                    background: "var(--card-surface)",
                    border: "1px solid rgba(252, 92, 31,0.18)",
                  }}
                >
                  <span
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full"
                    style={{ background: "var(--orange-bg)" }}
                  >
                    <c.Icono className="h-5 w-5 text-orange" strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <h3 className="font-display mt-5 text-[18px] leading-snug font-semibold tracking-tight">
                    {c.titulo}
                  </h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground">{c.detalle}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Qué no incluye — banda destacada */}
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
                Implementación, cambios en campañas, desarrollo, configuración de CRM, creatividades.
              </p>
              <p
                className="mt-5 max-w-2xl text-[16px] leading-relaxed md:text-[18px]"
                style={{ fontFamily: '"Newsreader", Georgia, serif', fontStyle: "italic", color: "rgba(255,255,255,0.72)" }}
              >
                Si pides «mientras tanto, arreglen esto» — eso es el sistema, no el diagnóstico.
              </p>
            </div>
          </div>
        </section>

        {/* Qué necesitamos de ti — checklist */}
        <section className="relative py-16 md:py-24 sys-sec">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="font-display text-[28px] leading-tight font-semibold tracking-tight md:text-[40px]">
              Qué necesitamos de ti
            </h2>
            <ul className="mt-10 grid gap-5 md:grid-cols-2">
              {NECESITAMOS.map((t) => (
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
            <p
              className="mt-10 max-w-2xl py-3 pl-5 text-[16px] leading-relaxed"
              style={{ borderLeft: "3px solid var(--orange)" }}
            >
              Sin accesos no arranca el reloj.
            </p>
          </div>
        </section>

        {/* Regla */}
        <section className="relative isolate overflow-hidden" >
          <div
            className="relative"
            style={{ background: "linear-gradient(110deg, #fc5c1f 0%, #e04d14 100%)" }}
          >
            <div className="relative z-10 mx-auto max-w-6xl px-6 py-16 md:py-20">
              <p className="label-orange !text-white/80">Regla</p>
              <p
                className="mt-5 max-w-4xl text-[24px] leading-[1.25] md:text-[38px]"
                style={{ fontFamily: '"Newsreader", Georgia, serif', fontStyle: "italic", color: "#FFFFFF" }}
              >
                El Diagnostic nunca es gratis ni se regala en la primera llamada — es el primer filtro.
              </p>
            </div>
          </div>
        </section>

        {/* Formulario */}
        <section
          id="formulario"
          className="relative isolate overflow-hidden scroll-mt-28 py-20 md:py-28 sys-sec sys-sec--warm section--glow" data-corner="bl">
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
          <div className="relative z-10 mx-auto max-w-4xl px-6">
            <SectionLabel>Formulario</SectionLabel>
            <div className="md:flex md:items-end md:justify-between md:gap-10">
              <h2 className="font-display text-[30px] leading-tight font-semibold tracking-tight md:text-[46px]">
                Solicitar diagnóstico de captación
              </h2>
              <span className="text-sm font-semibold text-orange">es el primer filtro</span>
            </div>
            <DiagnosticForm />
          </div>
        </section>

        {/* FAQ */}
        <section className="relative py-16 md:py-24 sys-sec">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="font-display text-[28px] leading-tight font-semibold tracking-tight md:text-[40px]">
              Preguntas frecuentes
            </h2>
            <div className="mt-8">
              {FAQS.map((f) => (
                <details key={f.q} className="group py-5" style={{ borderTop: "1px solid var(--line)" }}>
                  <summary className="font-display flex cursor-pointer list-none items-center justify-between gap-6 text-[17px] font-medium">
                    {f.q}
                    <span className="text-orange transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-[15.5px] leading-relaxed text-muted-foreground">{f.a}</p>
                </details>
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
            <div className="mx-auto max-w-[720px] text-center">
              <div className="mb-4"><span className="label-orange">¿Empezamos?</span></div>
              <h2
                className="font-display text-[34px] leading-[1.08] font-semibold tracking-tight md:text-[56px]"
                style={{ color: "#FFFFFF" }}
              >
                Solicitar <em className="font-serif-accent">Revenue Diagnostic</em>
              </h2>
              <div className="mt-10 flex justify-center">
                <a
                  href="#formulario"
                  className="btn-orange font-display inline-flex items-center gap-2 rounded-full px-8 py-4 text-[15px] font-semibold"
                >
                  Ir al formulario →
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
