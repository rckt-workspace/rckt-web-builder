import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Toaster, toast } from "sonner";
import SiteNav from "@/components/rckt/SiteNav";
import SiteFooter from "@/components/rckt/SiteFooter";
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
  }),
  component: RevenueDiagnostic,
});

const GLOW =
  "radial-gradient(ellipse 700px 500px at 100% 0%, rgba(232,103,46,0.35) 0%, rgba(244,161,95,0.18) 40%, rgba(232,103,46,0) 75%)";

const TABLA = [
  {
    campo: "Para quién",
    detalle: "Toda cuenta nueva, sin excepción. También cuentas existentes antes de un upsell grande",
  },
  { campo: "Duración", detalle: "2–3 semanas" },
  {
    campo: "Entregable",
    detalle:
      "Documento de diagnóstico + línea base firmada + roadmap 90 días, presentados en sesión de 90 minutos",
  },
  {
    campo: "Qué mide el éxito",
    detalle: "Que el cliente decida con datos; objetivo interno: la mitad o más continúa a un sistema",
  },
];

const INCLUYE = [
  "Mapa de fugas del embudo con tus números reales (inversión → lead → contacto → calificación → reunión/cita → propuesta → venta → margen)",
  "Auditoría de oferta, campañas activas, landing, web y tracking (GTM, GA4, píxel, CAPI, UTMs, conversiones offline)",
  "Auditoría de CRM y proceso comercial, uso de WhatsApp, automatizaciones existentes",
  "Unit economics: CAC de medios y completo, tasa MQL y SQL, show rate, close rate, payback",
  "Línea base documentada y firmada",
  "Roadmap de 90 días priorizado por impacto económico",
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
        {sending ? "Enviando…" : "Solicitar Revenue Diagnostic →"}
      </button>
      <p className="mt-4 text-xs text-muted-foreground">
        Al enviar aceptas nuestra{" "}
        <a href="/privacidad" className="underline underline-offset-2">
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
      <main>
        {/* Hero */}
        <section className="relative isolate overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28" style={{ background: "var(--kraft)" }}>
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
            <SectionLabel>Revenue Diagnostic</SectionLabel>
            <h1 className="font-display text-[36px] leading-[1.05] font-semibold tracking-tight md:text-[60px]">
              Antes de tocar nada, <em className="font-serif-accent">medimos.</em>
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
              Diagnóstico de ingresos — la única puerta de entrada a RCKT.es.
            </p>

            <figure className="pull-quote relative mt-12 max-w-4xl">
              <span aria-hidden="true" className="pull-quote-mark">
                “
              </span>
              <blockquote
                className="relative text-[22px] leading-[1.4] md:text-[30px]"
                style={{ fontFamily: '"Newsreader", Georgia, serif', fontStyle: "italic", color: "var(--ink)" }}
              >
                Antes de tocar nada, medimos. En tres semanas te decimos cuánto pierdes entre la campaña y el cierre,
                en qué punto exacto, y qué haríamos en 90 días. Si sigues con nosotros, lo que pagas por el diagnóstico
                se descuenta del sistema.
              </blockquote>
            </figure>

            <div className="mt-10">
              <a
                href="#formulario"
                className="btn-orange font-display inline-flex items-center justify-center rounded-full px-8 py-4 text-[15px] font-semibold"
              >
                Solicitar Revenue Diagnostic →
              </a>
            </div>
          </div>
        </section>

        {/* Tabla de datos clave */}
        <section className="relative py-16 md:py-20" style={{ background: "var(--kraft)" }}>
          <div className="mx-auto max-w-6xl px-6">
            <dl>
              {TABLA.map((row, i) => (
                <div
                  key={row.campo}
                  className="grid grid-cols-1 gap-2 py-5 md:grid-cols-[1fr_2fr] md:gap-8"
                  style={{ borderTop: "1px solid var(--line)", borderBottom: i === TABLA.length - 1 ? "1px solid var(--line)" : "none" }}
                >
                  <dt className="font-mono text-[12px] tracking-[0.12em] uppercase text-muted-foreground">
                    {row.campo}
                  </dt>
                  <dd className="text-[15.5px] leading-relaxed">{row.detalle}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Qué incluye / Qué no incluye */}
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
            <h2 className="font-display text-[28px] leading-tight font-semibold tracking-tight md:text-[40px]">
              Qué incluye
            </h2>
            <ul className="mt-8 space-y-4">
              {INCLUYE.map((t) => (
                <li key={t} className="flex gap-3 text-[15.5px] leading-relaxed">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange" aria-hidden="true" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>

            <h2 className="font-display mt-16 text-[28px] leading-tight font-semibold tracking-tight md:text-[40px]">
              Qué no incluye
            </h2>
            <p className="mt-6 max-w-3xl text-[15.5px] leading-relaxed text-muted-foreground">
              Implementación, cambios en campañas, desarrollo, configuración de CRM, creatividades. Si el cliente pide
              «mientras tanto, arreglen esto», la respuesta es que eso es el sistema, no el diagnóstico.
            </p>
          </div>
        </section>

        {/* Qué necesitamos de ti */}
        <section className="relative py-16 md:py-24" style={{ background: "var(--kraft)" }}>
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="font-display text-[28px] leading-tight font-semibold tracking-tight md:text-[40px]">
              Qué necesitamos de ti
            </h2>
            <ul className="mt-8 space-y-4">
              {NECESITAMOS.map((t) => (
                <li key={t} className="flex gap-3 text-[15.5px] leading-relaxed">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange" aria-hidden="true" />
                  <span>{t}</span>
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
            style={{ background: "linear-gradient(110deg, #E8672E 0%, #C94F1E 100%)" }}
          >
            <div className="band-texture" aria-hidden="true" />
            <div className="relative z-10 mx-auto max-w-6xl px-6 py-16 md:py-20">
              <p className="label-orange !text-[#FFE6D5]">Regla</p>
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
          className="relative isolate overflow-hidden scroll-mt-28 py-20 md:py-28"
          style={{ background: "var(--kraft)" }}
        >
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
            <h2 className="font-display text-[30px] leading-tight font-semibold tracking-tight md:text-[46px]">
              Solicitar Revenue Diagnostic
            </h2>
            <DiagnosticForm />
          </div>
        </section>

        {/* FAQ */}
        <section className="relative py-16 md:py-24" style={{ background: "var(--kraft)" }}>
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
                Solicitar <em className="font-serif-accent">Revenue Diagnostic</em>
              </h2>
              <div className="mt-10 flex justify-end">
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
