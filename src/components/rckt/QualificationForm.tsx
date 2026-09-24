import { Check } from "lucide-react";
import { useMemo, useState } from "react";

/* ── Opciones ─────────────────────────────────────────────────────── */

const CARGOS = [
  "Director general / CEO",
  "Gerente general",
  "Director comercial",
  "Director de marketing",
  "Socio o fundador",
  "Otro",
];
const PAISES = ["España", "Otro país de Europa", "Latinoamérica", "Otro"];
const EMPLEADOS = ["1–4", "5–19", "20–100", "101–249", "250 o más"];
const SECTORES = [
  "Salud, estética y odontología",
  "Servicios B2B",
  "Construcción e inmobiliario",
  "Educación privada",
  "Ecommerce",
  "Industria y distribución",
  "Otro",
];
const PROBLEMAS = [
  "Pago por leads y no sé cuáles compran",
  "Invierto en campañas y no crece con margen",
  "Mi equipo hace lo mismo cien veces por semana",
];
// PENDIENTE: validar rangos de inversión y leads con comercial.
const INVERSION = ["Menos de 1.000 €", "1.000–3.000 €", "3.000–10.000 €", "10.000–30.000 €", "Más de 30.000 €"];
const LEADS = ["Menos de 50", "50–200", "200–500", "Más de 500"];
const CRMS = ["HubSpot", "Salesforce", "Pipedrive", "Zoho", "Otro", "No tenemos CRM"];
const WHATSAPP_USO = ["Es nuestro canal principal", "Lo usamos, pero fuera del CRM", "No lo usamos"];
const INICIO = ["En menos de 30 días", "De 1 a 3 meses", "Más adelante"];

export type QualificationValues = {
  nombre: string;
  email: string;
  telefono: string;
  cargo: string;
  empresa: string;
  web: string;
  pais: string;
  ciudad: string;
  empleados: string;
  sector: string;
  problema: string;
  inversion: string;
  leads: string;
  crm: string;
  whatsapp: string;
  inicio: string;
  privacidad: boolean;
};

const VACIO: QualificationValues = {
  nombre: "",
  email: "",
  telefono: "",
  cargo: "",
  empresa: "",
  web: "",
  pais: "España",
  ciudad: "",
  empleados: "",
  sector: "",
  problema: "",
  inversion: "",
  leads: "",
  crm: "",
  whatsapp: "",
  inicio: "",
  privacidad: false,
};

const OBLIGATORIOS: (keyof QualificationValues)[] = [
  "nombre",
  "email",
  "cargo",
  "empresa",
  "empleados",
  "problema",
  "privacidad",
];

type Errors = Partial<Record<keyof QualificationValues, string>>;

type Props = {
  /** Envío real. Si no se pasa, el formulario muestra la confirmación de diseño. */
  onSubmit?: (values: QualificationValues) => Promise<void>;
};

export default function QualificationForm({ onSubmit }: Props) {
  const [values, setValues] = useState<QualificationValues>(VACIO);
  const [errors, setErrors] = useState<Errors>({});
  const [enviado, setEnviado] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  const completos = useMemo(
    () =>
      OBLIGATORIOS.filter((k) =>
        typeof values[k] === "boolean" ? values[k] === true : String(values[k]).trim() !== "",
      ).length,
    [values],
  );

  const set =
    <K extends keyof QualificationValues>(k: K) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const v = e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value;
      setValues((s) => ({ ...s, [k]: v as QualificationValues[K] }));
      setErrors((s) => ({ ...s, [k]: undefined }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSendError(null);
    const err: Errors = {};
    OBLIGATORIOS.forEach((k) => {
      if (k === "privacidad") return;
      if (String(values[k]).trim() === "") err[k] = "Este campo es obligatorio.";
    });
    if (values.email.trim() !== "" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
      err.email = "Escribe un email válido.";
    if (!values.privacidad) err.privacidad = "Debes aceptar la política de privacidad.";
    setErrors(err);
    if (Object.keys(err).length > 0) {
      requestAnimationFrame(() => {
        document
          .querySelector<HTMLElement>("[data-invalid='true']")
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
      });
      return;
    }
    if (!onSubmit) {
      setEnviado(true);
      return;
    }
    setSending(true);
    try {
      await onSubmit(values);
      setEnviado(true);
      setValues(VACIO);
    } catch {
      setSendError("No se pudo enviar. Inténtalo de nuevo o escríbenos a hola@rckt.es.");
    } finally {
      setSending(false);
    }
  };

  const Campo = ({
    k,
    label,
    type = "text",
    placeholder,
    options,
    required,
    placeholderOption = true,
  }: {
    k: keyof QualificationValues;
    label: string;
    type?: string;
    placeholder?: string;
    options?: string[];
    required?: boolean;
    placeholderOption?: boolean;
  }) => (
    <div data-invalid={errors[k] ? "true" : undefined}>
      <label className="ct-label" htmlFor={`qf-${k}`}>
        {label}
        {required ? <span className="text-orange"> *</span> : null}
      </label>
      {options ? (
        <select
          id={`qf-${k}`}
          className="ct-select mt-2"
          value={String(values[k])}
          onChange={set(k)}
          aria-invalid={!!errors[k]}
        >
          {placeholderOption ? <option value="">Selecciona una opción</option> : null}
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={`qf-${k}`}
          type={type}
          className="ct-input mt-2"
          value={String(values[k])}
          onChange={set(k)}
          placeholder={placeholder}
          aria-invalid={!!errors[k]}
          maxLength={200}
        />
      )}
      {errors[k] ? <p className="ct-error mt-1.5 text-[12.5px]">{errors[k]}</p> : null}
    </div>
  );

  if (enviado) {
    return (
      <div className="ct-card p-6 md:p-10">
        <div className="py-6 text-center">
          <span className="ct-done-icon" aria-hidden="true">
            <Check className="h-7 w-7" />
          </span>
          <h2 className="font-display mt-6 text-[26px] leading-[1.15] font-semibold tracking-tight">
            {onSubmit ? "Solicitud enviada" : "Solicitud recibida (vista de diseño)"}
          </h2>
          <p className="mx-auto mt-3 max-w-[46ch] text-[15px] leading-[1.6] text-muted-foreground">
            {onSubmit
              ? "Gracias. Revisamos tus datos y te respondemos en menos de 48 horas."
              : "Cuando el formulario esté conectado, aquí confirmaremos el envío y te propondremos una fecha."}
          </p>
          <button
            type="button"
            onClick={() => setEnviado(false)}
            className="mt-8 text-[14px] font-semibold text-orange hover:underline"
          >
            Volver al formulario
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="ct-card p-6 md:p-10">
      <form onSubmit={handleSubmit} noValidate>
        <div className="flex items-center justify-between gap-4">
          <span className="label-orange">Solicitud de diagnóstico</span>
          <span className="font-mono text-[11px] tracking-[0.14em] text-muted-foreground">
            {completos} de {OBLIGATORIOS.length}
          </span>
        </div>
        <div className="ct-progress mt-3" aria-hidden="true">
          <div className="ct-progress__bar" style={{ width: `${(completos / OBLIGATORIOS.length) * 100}%` }} />
        </div>

        <p className="label-orange mt-9">Tú</p>
        <div className="mt-4 grid gap-5 md:grid-cols-2">
          {Campo({ k: "nombre", label: "Nombre y apellidos", placeholder: "Nombre y apellidos", required: true })}
          {Campo({ k: "email", label: "Email de trabajo", type: "email", placeholder: "nombre@empresa.com", required: true })}
          {Campo({ k: "telefono", label: "Teléfono", type: "tel", placeholder: "+34 600 000 000" })}
          {Campo({ k: "cargo", label: "Cargo", options: CARGOS, required: true })}
        </div>

        <p className="label-orange mt-10">Tu empresa</p>
        <div className="mt-4 grid gap-5 md:grid-cols-2">
          {Campo({ k: "empresa", label: "Empresa", placeholder: "Nombre de la empresa", required: true })}
          {Campo({ k: "web", label: "Web", placeholder: "empresa.com" })}
          {Campo({ k: "pais", label: "País", options: PAISES, placeholderOption: false })}
          {Campo({ k: "ciudad", label: "Ciudad", placeholder: "Madrid" })}
          {Campo({ k: "empleados", label: "Empleados", options: EMPLEADOS, required: true })}
          {Campo({ k: "sector", label: "Sector", options: SECTORES })}
        </div>

        <p className="label-orange mt-10">Tu situación</p>
        <div className="mt-4" data-invalid={errors.problema ? "true" : undefined}>
          <span className="ct-label">
            Problema principal<span className="text-orange"> *</span>
          </span>
          <div className="mt-2 grid gap-3">
            {PROBLEMAS.map((p) => (
              <button
                key={p}
                type="button"
                className="ct-radio"
                data-active={values.problema === p}
                aria-pressed={values.problema === p}
                onClick={() => {
                  setValues((s) => ({ ...s, problema: p }));
                  setErrors((s) => ({ ...s, problema: undefined }));
                }}
              >
                {p}
              </button>
            ))}
          </div>
          {errors.problema ? <p className="ct-error mt-1.5 text-[12.5px]">{errors.problema}</p> : null}
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {Campo({ k: "inversion", label: "Inversión mensual en marketing", options: INVERSION })}
          {Campo({ k: "leads", label: "Volumen de leads al mes", options: LEADS })}
          {Campo({ k: "crm", label: "CRM actual", options: CRMS })}
          {Campo({ k: "whatsapp", label: "Uso de WhatsApp en ventas", options: WHATSAPP_USO })}
          <div className="md:col-span-2">
            {Campo({ k: "inicio", label: "Fecha prevista de inicio", options: INICIO })}
          </div>
        </div>

        <div className="mt-8" data-invalid={errors.privacidad ? "true" : undefined}>
          <label className="flex items-start gap-3 text-[13.5px] leading-[1.5] text-muted-foreground">
            <input
              type="checkbox"
              className="ct-check mt-0.5"
              checked={values.privacidad}
              onChange={set("privacidad")}
              aria-invalid={!!errors.privacidad}
            />
            <span>
              Acepto la{" "}
              <a href="/legal/privacidad" className="font-semibold text-orange underline underline-offset-2">
                política de privacidad
              </a>{" "}
              y el tratamiento de mis datos para gestionar esta solicitud.
            </span>
          </label>
          {errors.privacidad ? <p className="ct-error mt-1.5 text-[12.5px]">{errors.privacidad}</p> : null}
        </div>

        {sendError ? <p className="ct-error mt-6 text-[13.5px]">{sendError}</p> : null}

        <button
          type="submit"
          disabled={sending}
          className="btn-orange font-display mt-8 w-full rounded-full px-8 py-4 text-[15px] font-semibold disabled:opacity-60"
        >
          {sending ? "Enviando…" : "Solicitar diagnóstico de captación →"}
        </button>
      </form>
    </div>
  );
}
