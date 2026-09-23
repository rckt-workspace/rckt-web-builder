import { createFileRoute } from "@tanstack/react-router";
import { Check, FileText, MessageCircle, Phone } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import SiteFooter from "@/components/rckt/SiteFooter";
import SiteNav from "@/components/rckt/SiteNav";
import SystemPageHero from "@/components/rckt/SystemPageHero";
import { CONTACTO_ES } from "@/config/contacto-es";

/* ── Opciones ─────────────────────────────────────────────────────── */

const CARGOS = ["Director general / CEO", "Director de marketing", "Director comercial", "Socio o fundador", "Otro"];
const EMPLEADOS = ["1–9", "10–19", "20–49", "50–100", "Más de 100"];
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
const INVERSION = ["Menos de 1.000 €", "1.000–3.000 €", "3.000–10.000 €", "10.000–30.000 €", "Más de 30.000 €"];
const LEADS = ["Menos de 50", "50–200", "200–500", "Más de 500"];
const CRMS = ["HubSpot", "Salesforce", "Pipedrive", "Zoho", "Otro", "No tenemos CRM"];
const WHATSAPP_USO = ["Es nuestro canal principal", "Lo usamos, pero fuera del CRM", "No lo usamos"];
const CUANDO = ["Este mes", "En 1 a 3 meses", "Más adelante"];

type Values = {
  nombre: string;
  email: string;
  telefono: string;
  cargo: string;
  empresa: string;
  web: string;
  ciudad: string;
  empleados: string;
  sector: string;
  problema: string;
  inversion: string;
  leads: string;
  crm: string;
  whatsapp: string;
  cuando: string;
  privacidad: boolean;
};

const VACIO: Values = {
  nombre: "",
  email: "",
  telefono: "",
  cargo: "",
  empresa: "",
  web: "",
  ciudad: "",
  empleados: "",
  sector: "",
  problema: "",
  inversion: "",
  leads: "",
  crm: "",
  whatsapp: "",
  cuando: "",
  privacidad: false,
};

/** Campos obligatorios (15) para la barra de progreso. */
const OBLIGATORIOS: (keyof Values)[] = [
  "nombre",
  "email",
  "telefono",
  "cargo",
  "empresa",
  "ciudad",
  "empleados",
  "sector",
  "problema",
  "inversion",
  "leads",
  "crm",
  "whatsapp",
  "cuando",
  "privacidad",
];

type Errors = Partial<Record<keyof Values, string>>;

/* ── Animación de entrada ─────────────────────────────────────────── */

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el, i) => {
      el.style.setProperty("--d", `${(i % 5) * 90}ms`);
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return ref;
}

/* ── Página ───────────────────────────────────────────────────────── */

function ContactoPage() {
  const rootRef = useReveal<HTMLDivElement>();
  const [values, setValues] = useState<Values>(VACIO);
  const [errors, setErrors] = useState<Errors>({});
  const [enviado, setEnviado] = useState(false);

  const completos = useMemo(
    () => OBLIGATORIOS.filter((k) => (typeof values[k] === "boolean" ? values[k] === true : String(values[k]).trim() !== "")).length,
    [values],
  );

  const set =
    <K extends keyof Values>(k: K) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const v = e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value;
      setValues((s) => ({ ...s, [k]: v as Values[K] }));
      setErrors((s) => ({ ...s, [k]: undefined }));
    };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
      const primero = document.querySelector<HTMLElement>("[data-invalid='true']");
      primero?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    // TODO: conectar CRM y scoring
    setEnviado(true);
  };

  const Campo = ({
    k,
    label,
    type = "text",
    placeholder,
    options,
  }: {
    k: keyof Values;
    label: string;
    type?: string;
    placeholder?: string;
    options?: string[];
  }) => (
    <div data-invalid={errors[k] ? "true" : undefined}>
      <label className="ct-label" htmlFor={`f-${k}`}>
        {label}
      </label>
      {options ? (
        <select
          id={`f-${k}`}
          className="ct-select mt-2"
          value={String(values[k])}
          onChange={set(k)}
          aria-invalid={!!errors[k]}
        >
          <option value="">Selecciona una opción</option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={`f-${k}`}
          type={type}
          className="ct-input mt-2"
          value={String(values[k])}
          onChange={set(k)}
          placeholder={placeholder}
          aria-invalid={!!errors[k]}
        />
      )}
      {errors[k] ? <p className="ct-error mt-1.5 text-[12.5px]">{errors[k]}</p> : null}
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main>
        <SystemPageHero
          label="Contacto"
          title={
            <>
              Cuéntanos <em className="font-serif-accent">dónde se pierde el dinero.</em>
            </>
          }
          descriptor="Con estos datos preparamos la primera conversación. Te respondemos en un día laborable."
          ctaLabel="Ir al formulario →"
          ctaHref="#formulario"
        />

        <section id="formulario" className="relative isolate" style={{ background: "var(--kraft)", overflow: "clip" }}>
          <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ overflow: "clip" }}>
            <div className="ct-orb ct-orb--1" style={{ top: "-100px", right: "8%", width: "440px", height: "440px" }} />
            <div className="ct-orb ct-orb--2" style={{ bottom: "-120px", right: "24%", width: "380px", height: "380px" }} />
            <div className="ct-dots" style={{ top: 0, left: 0, width: "420px", height: "360px" }} />
          </div>

          <div ref={rootRef} className="relative z-10 mx-auto max-w-6xl px-5 py-20 md:px-6 md:py-28">
            <div className="grid gap-12 lg:grid-cols-[38%_1fr] lg:gap-14">
              {/* Formulario (primero en móvil) */}
              <div className="order-1 lg:order-2">
                <div data-reveal className="ct-rev ct-card p-6 md:p-10">
                  {enviado ? (
                    <div className="py-6 text-center">
                      <span className="ct-done-icon" aria-hidden="true">
                        <Check className="h-7 w-7" />
                      </span>
                      <h2 className="font-display mt-6 text-[26px] leading-[1.15] font-semibold tracking-tight">
                        Solicitud recibida (vista de diseño)
                      </h2>
                      <p className="mx-auto mt-3 max-w-[46ch] text-[15px] leading-[1.6] text-muted-foreground">
                        Cuando el formulario esté conectado, aquí confirmaremos el envío y te propondremos una fecha.
                      </p>
                      <button
                        type="button"
                        onClick={() => setEnviado(false)}
                        className="mt-8 text-[14px] font-semibold text-orange hover:underline"
                      >
                        Volver al formulario
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={onSubmit} noValidate>
                      <div className="flex items-center justify-between gap-4">
                        <span className="label-orange">Solicitud de diagnóstico</span>
                        <span className="font-mono text-[11px] tracking-[0.14em] text-muted-foreground">
                          {completos} de {OBLIGATORIOS.length}
                        </span>
                      </div>
                      <div className="ct-progress mt-3" aria-hidden="true">
                        <div
                          className="ct-progress__bar"
                          style={{ width: `${(completos / OBLIGATORIOS.length) * 100}%` }}
                        />
                      </div>

                      {/* A · Tú */}
                      <p className="label-orange mt-9">Tú</p>
                      <div className="mt-4 grid gap-5 md:grid-cols-2">
                        {Campo({ k: "nombre", label: "Nombre y apellidos", placeholder: "Nombre y apellidos" })}
                        {Campo({ k: "email", label: "Email de trabajo", type: "email", placeholder: "nombre@empresa.com" })}
                        {Campo({ k: "telefono", label: "Teléfono", type: "tel", placeholder: "+34 600 000 000" })}
                        {Campo({ k: "cargo", label: "Cargo", options: CARGOS })}
                      </div>

                      {/* B · Tu empresa */}
                      <p className="label-orange mt-10">Tu empresa</p>
                      <div className="mt-4 grid gap-5 md:grid-cols-2">
                        {Campo({ k: "empresa", label: "Empresa", placeholder: "Nombre de la empresa" })}
                        {Campo({ k: "web", label: "Web", placeholder: "empresa.com" })}
                        {Campo({ k: "ciudad", label: "Ciudad", placeholder: "Madrid" })}
                        {Campo({ k: "empleados", label: "Empleados", options: EMPLEADOS })}
                        <div className="md:col-span-2">{Campo({ k: "sector", label: "Sector", options: SECTORES })}</div>
                      </div>

                      {/* C · Tu situación */}
                      <p className="label-orange mt-10">Tu situación</p>
                      <div className="mt-4" data-invalid={errors.problema ? "true" : undefined}>
                        <span className="ct-label">Problema principal</span>
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
                        {Campo({ k: "inversion", label: "Inversión mensual en medios", options: INVERSION })}
                        {Campo({ k: "leads", label: "Volumen de leads al mes", options: LEADS })}
                        {Campo({ k: "crm", label: "CRM actual", options: CRMS })}
                        {Campo({ k: "whatsapp", label: "Uso de WhatsApp en ventas", options: WHATSAPP_USO })}
                        <div className="md:col-span-2">
                          {Campo({ k: "cuando", label: "¿Cuándo quieres empezar?", options: CUANDO })}
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
                        {errors.privacidad ? (
                          <p className="ct-error mt-1.5 text-[12.5px]">{errors.privacidad}</p>
                        ) : null}
                      </div>

                      <button
                        type="submit"
                        className="btn-orange font-display mt-8 w-full rounded-full px-8 py-4 text-[15px] font-semibold"
                      >
                        Solicitar diagnóstico →
                      </button>
                    </form>
                  )}
                </div>
              </div>

              {/* Canales */}
              <div className="order-2 lg:order-1">
                <div className="lg:sticky" style={{ top: "120px" }}>
                  <div data-reveal className="ct-rev">
                    <h2 className="font-display text-[26px] leading-[1.15] font-semibold tracking-tight md:text-[30px]">
                      Otras formas de hablar <em className="font-serif-accent">con nosotros.</em>
                    </h2>

                    <div className="mt-8 space-y-0">
                      <div className="flex gap-4 pb-7">
                        <span className="ct-icon" aria-hidden="true">
                          <FileText className="h-5 w-5" />
                        </span>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-display text-[17px] font-semibold">Formulario</h3>
                            <span className="ct-badge">RECOMENDADO</span>
                          </div>
                          <p className="mt-1.5 text-[14.5px] leading-[1.55] text-muted-foreground">
                            La vía principal. Es la más rápida para preparar el diagnóstico.
                          </p>
                        </div>
                      </div>

                      <div className="ct-divider flex gap-4 py-7">
                        <span className="ct-icon" aria-hidden="true">
                          <Phone className="h-5 w-5" />
                        </span>
                        <div>
                          <h3 className="font-display text-[17px] font-semibold">Llamada agendada</h3>
                          <p className="mt-1.5 text-[14.5px] leading-[1.55] text-muted-foreground">
                            Elige un hueco en la agenda y te llamamos.
                          </p>
                          <a
                            href={CONTACTO_ES.agendaHref}
                            className="mt-3 inline-block text-[14px] font-semibold text-orange hover:underline"
                          >
                            Agendar llamada →
                          </a>
                          <p className="mt-2 text-[13.5px] text-muted-foreground">
                            <a href={CONTACTO_ES.telefonoHref} className="hover:text-foreground">
                              {CONTACTO_ES.telefono}
                            </a>
                          </p>
                        </div>
                      </div>

                      <div className="ct-divider flex gap-4 py-7">
                        <span className="ct-icon" aria-hidden="true">
                          <MessageCircle className="h-5 w-5" />
                        </span>
                        <div>
                          <h3 className="font-display text-[17px] font-semibold">WhatsApp</h3>
                          <p className="mt-1.5 text-[14.5px] leading-[1.55] text-muted-foreground">
                            Si lo prefieres, escríbenos.
                          </p>
                          <a
                            href={CONTACTO_ES.whatsappHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-3 inline-block text-[14px] font-semibold text-muted-foreground hover:text-orange"
                          >
                            Escribir por WhatsApp →
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="ct-mini mt-6 p-5">
                      <p className="label-orange !text-[10px]">Datos</p>
                      <a
                        href={`mailto:${CONTACTO_ES.email}`}
                        className="mt-3 block text-[14.5px] font-semibold text-foreground hover:text-orange"
                      >
                        {CONTACTO_ES.email}
                      </a>
                      <p className="mt-2 text-[14px] text-muted-foreground">{CONTACTO_ES.direccion}</p>
                      <p className="mt-1 text-[14px] text-muted-foreground">{CONTACTO_ES.horario}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto | RCKT.es" },
      {
        name: "description",
        content:
          "Solicita un Revenue Diagnostic: cuéntanos tu situación comercial y preparamos la primera conversación.",
      },
      { property: "og:title", content: "Contacto | RCKT.es" },
      {
        property: "og:description",
        content:
          "Solicita un Revenue Diagnostic: cuéntanos tu situación comercial y preparamos la primera conversación.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.rckt.es/contacto" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://www.rckt.es/contacto" }],
  }),
  component: ContactoPage,
});
