import { Check } from "lucide-react";
import { useState } from "react";

/* Formulario de /contacto. Envía al mismo endpoint de leads de siempre;
   los campos sin columna propia viajan en `details` con su etiqueta. */

export const SITUACIONES = [
  "Necesito claridad sobre qué frena el crecimiento",
  "Quiero aparecer donde buscan con IA",
  "Ya invierto y no sé qué funciona",
  "Otra",
];
export const INVERSIONES = ["Menos de 5.000 €", "De 5.000 a 15.000 €", "De 15.000 a 50.000 €", "Más de 50.000 €"];

type V = { nombre: string; empresa: string; web: string; cargo: string; email: string; telefono: string; situacion: string; inversion: string; mensaje: string };
const VACIO: V = { nombre: "", empresa: "", web: "", cargo: "", email: "", telefono: "", situacion: "", inversion: "", mensaje: "" };
const OBLIGATORIOS: (keyof V)[] = ["nombre", "empresa", "email", "situacion"];

export function buildLeadPayload(v: V) {
  const t = (s: string) => s.trim();
  return {
    name: t(v.nombre),
    email: t(v.email),
    company: t(v.empresa),
    website: t(v.web),
    concern: v.situacion,
    source: "contacto",
    details: {
      Cargo: t(v.cargo),
      Teléfono: t(v.telefono),
      "Inversión mensual en marketing": v.inversion,
      "Cuéntanos más": t(v.mensaje).slice(0, 2000),
    },
  };
}

export default function ContactForm() {
  const [v, setV] = useState<V>(VACIO);
  const [err, setErr] = useState<Partial<Record<keyof V, string>>>({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  const set = (k: keyof V) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const val = e.target.value;
    setV((s) => ({ ...s, [k]: val }));
    setErr((s) => ({ ...s, [k]: undefined }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSendError(null);
    const er: typeof err = {};
    OBLIGATORIOS.forEach((k) => { if (!v[k].trim()) er[k] = "Este campo es obligatorio."; });
    if (v.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) er.email = "Escribe un correo válido.";
    setErr(er);
    if (Object.keys(er).length) return;
    setSending(true);
    try {
      const r = await fetch("/api/leads", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(buildLeadPayload(v)) });
      if (!r.ok) throw new Error();
      setDone(true);
      setV(VACIO);
    } catch {
      setSendError("No se pudo enviar. Inténtalo de nuevo o escríbenos a hola@rckt.es.");
    } finally {
      setSending(false);
    }
  };

  if (done) {
    return (
      <div className="ct-card p-6 text-center md:p-10">
        <span className="ct-done-icon" aria-hidden="true"><Check className="h-7 w-7" /></span>
        <p className="font-display mx-auto mt-6 max-w-[40ch] text-[22px] leading-[1.25] font-semibold">Recibido. Revisamos tu solicitud y te escribimos con la propuesta de diagnóstico.</p>
      </div>
    );
  }

  const Input = (k: keyof V, label: string, type = "text", required = false) => (
    <div>
      <label className="ct-label" htmlFor={`cf-${k}`}>{label}{required ? <span className="text-orange"> *</span> : null}</label>
      <input id={`cf-${k}`} type={type} className="ct-input mt-2" value={v[k]} onChange={set(k)} maxLength={200} aria-invalid={!!err[k]} />
      {err[k] ? <p className="ct-error mt-1.5 text-[12.5px]">{err[k]}</p> : null}
    </div>
  );
  const Select = (k: keyof V, label: string, opts: string[], required = false) => (
    <div>
      <label className="ct-label" htmlFor={`cf-${k}`}>{label}{required ? <span className="text-orange"> *</span> : null}</label>
      <select id={`cf-${k}`} className="ct-select mt-2" value={v[k]} onChange={set(k)} aria-invalid={!!err[k]}>
        <option value="">Selecciona una opción</option>
        {opts.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      {err[k] ? <p className="ct-error mt-1.5 text-[12.5px]">{err[k]}</p> : null}
    </div>
  );

  return (
    <form onSubmit={submit} noValidate className="ct-card p-6 md:p-10">
      <div className="grid gap-5 md:grid-cols-2">
        {Input("nombre", "Nombre", "text", true)}
        {Input("empresa", "Empresa", "text", true)}
        {Input("web", "Web")}
        {Input("cargo", "Cargo")}
        {Input("email", "Correo de trabajo", "email", true)}
        {Input("telefono", "Teléfono", "tel")}
        <div className="md:col-span-2">{Select("situacion", "¿Qué se parece más a tu situación?", SITUACIONES, true)}</div>
        <div className="md:col-span-2">{Select("inversion", "Inversión mensual en marketing", INVERSIONES)}</div>
        <div className="md:col-span-2">
          <label className="ct-label" htmlFor="cf-mensaje">Cuéntanos más <span className="text-muted-foreground">(opcional)</span></label>
          <textarea id="cf-mensaje" rows={5} className="ct-input mt-2" value={v.mensaje} onChange={set("mensaje")} maxLength={2000} />
        </div>
      </div>
      {sendError ? <p className="ct-error mt-6 text-[13.5px]">{sendError}</p> : null}
      <button type="submit" disabled={sending} className="btn-orange font-display mt-8 w-full rounded-full px-8 py-4 text-[15px] font-semibold disabled:opacity-60">
        {sending ? "Enviando…" : "Enviar solicitud"}
      </button>
      <p className="mt-4 text-[13px] leading-relaxed text-muted-foreground">
        Usamos tus datos solo para responder a tu solicitud. Más información en la <a href="/legal/privacidad" className="font-semibold text-orange underline underline-offset-2">Política de privacidad</a>.
      </p>
    </form>
  );
}
