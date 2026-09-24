import { createFileRoute } from "@tanstack/react-router";
import { Briefcase, Clock, FileUp, Sparkles, Users } from "lucide-react";
import { useEffect, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";

import SiteFooter from "@/components/rckt/SiteFooter";
import SiteNav from "@/components/rckt/SiteNav";
import SystemPageHero from "@/components/rckt/SystemPageHero";
import { useInView } from "@/hooks/use-in-view";
import heroPhotoImg from "@/assets/rckt-cta-final.jpg";

const heroPhoto = heroPhotoImg;
const DIAGNOSTIC_HREF = "/sistemas/revenue-diagnostic";

const GLOW =
  "radial-gradient(ellipse 700px 500px at 100% 0%, rgba(252, 92, 31,0.35) 0%, rgba(252, 92, 31,0.18) 40%, rgba(252, 92, 31,0) 75%)";

/* ── Datos estáticos (sin backend) ─────────────────────────────────── */

type Vacante = {
  titulo: string;
  modalidad: string;
  area: string;
  ubicacion: string;
  href: string;
};

// Cuando haya vacantes, añadirlas aquí y la lista se renderiza sola.
const VACANTES: Vacante[] = [];

const CULTURA = [
  {
    n: "01",
    Icon: Users,
    titulo: "Todos somos RCKT",
    texto:
      "Estamos comprometidos con construir entornos de trabajo más equitativos e inclusivos. Impulsamos iniciativas para prevenir sesgos, fomentar el respeto y reconocer el talento sin distinción de género.",
  },
  {
    n: "02",
    Icon: Clock,
    titulo: "Flexibilidad que se adapta a las personas",
    texto:
      "Somos una organización 100% remota. Entendemos la flexibilidad como una herramienta para promover la autonomía, la confianza y una mejor integración entre la vida personal y profesional. Nos enfocamos en los objetivos, los resultados y la responsabilidad de cada persona del equipo.",
  },
  {
    n: "03",
    Icon: Sparkles,
    titulo: "Humanizamos el trabajo mientras incorporamos IA",
    texto:
      "La tecnología debe potenciar a las personas, no reemplazar lo que nos hace humanos. Usamos la IA de forma responsable para automatizar tareas y liberar tiempo para el pensamiento crítico, la creatividad, la empatía y la toma de decisiones.",
  },
];

/* ── Piezas ─────────────────────────────────────────────────────────── */

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="inline-block h-4 w-[2px] bg-orange" />
      <span className="label-orange">{children}</span>
    </div>
  );
}

function Rise({ children, i = 0, className = "" }: { children: ReactNode; i?: number; className?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);
  return (
    <div
      ref={ref}
      className={`nos-rise ${inView ? "is-in" : ""} ${className}`}
      style={{ transitionDelay: `${i * 100}ms` }}
    >
      {children}
    </div>
  );
}

function CulturaCard({ c, i }: { c: (typeof CULTURA)[number]; i: number }) {
  const Icon = c.Icon;
  return (
    <Rise i={i} className="h-full">
      <article className="tw-card flex h-full flex-col p-7">
        <div className="flex items-center justify-between">
          <span className="tw-icon-circle">
            <Icon className="h-[22px] w-[22px] text-orange" strokeWidth={1.5} aria-hidden="true" />
          </span>
          <span className="font-serif-accent text-[34px] leading-none text-orange italic">{c.n}</span>
        </div>
        <h3 className="font-display mt-5 text-[20px] font-semibold tracking-tight">{c.titulo}</h3>
        <p className="mt-3 text-[15px] leading-[1.65] text-muted-foreground">{c.texto}</p>
      </article>
    </Rise>
  );
}

function Vacantes() {
  if (VACANTES.length === 0) {
    return (
      <Rise className="mx-auto max-w-xl">
        <div className="tw-empty p-10 text-center md:p-12">
          <span className="tw-icon-circle mx-auto">
            <Briefcase className="h-[22px] w-[22px] text-orange" strokeWidth={1.5} aria-hidden="true" />
          </span>
          <p className="font-display mt-6 text-[20px] font-semibold tracking-tight">
            Ahora mismo no tenemos vacantes abiertas.
          </p>
          <p className="mt-3 text-[15px] leading-[1.65] text-muted-foreground">
            Si crees que encajas con nuestra forma de trabajar, déjanos tu perfil y te escribiremos cuando se
            abra una posición.
          </p>
          <a href="#aliados" className="tw-text-link mt-6 inline-flex items-center gap-1 text-[14.5px] font-semibold text-orange">
            Dejar mi perfil →
          </a>
        </div>
      </Rise>
    );
  }
  return (
    <ul className="divide-y" style={{ borderColor: "rgba(252, 92, 31,0.18)" }}>
      {VACANTES.map((v) => (
        <li
          key={v.titulo}
          className="tw-vac-row flex flex-col gap-3 py-6 md:flex-row md:items-center md:justify-between md:gap-8"
        >
          <div>
            <h3 className="font-display text-[18px] font-semibold tracking-tight">{v.titulo}</h3>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="res-chip">{v.modalidad}</span>
              <span className="res-chip">{v.area}</span>
              <span className="text-[13px] text-muted-foreground">{v.ubicacion}</span>
            </div>
          </div>
          <a href={v.href} className="tw-text-link inline-flex shrink-0 items-center gap-1 text-[14.5px] font-semibold text-orange">
            Ver vacante →
          </a>
        </li>
      ))}
    </ul>
  );
}

/* ── Formulario de aliados (solo diseño) ────────────────────────────── */

type Errors = Partial<Record<"nombre" | "email" | "telefono" | "portfolio" | "descripcion" | "privacidad", string>>;

function AliadosForm() {
  const [values, setValues] = useState({
    nombre: "",
    email: "",
    telefono: "",
    portfolio: "",
    descripcion: "",
    privacidad: false,
  });
  const [cvName, setCvName] = useState<string | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const set = (k: keyof typeof values) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const v = e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value;
    setValues((s) => ({ ...s, [k]: v }));
    setErrors((s) => ({ ...s, [k]: undefined }));
  };

  const onFile = (f: File | null | undefined) => {
    if (f) setCvName(f.name);
  };

  const validate = (): Errors => {
    const e: Errors = {};
    if (!values.nombre.trim()) e.nombre = "Escribe tu nombre completo.";
    if (!values.email.trim()) e.email = "Escribe tu email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) e.email = "Ese email no parece válido.";
    if (!values.descripcion.trim()) e.descripcion = "Cuéntanos brevemente qué servicio ofreces.";
    if (!values.privacidad) e.privacidad = "Debes aceptar la política de privacidad.";
    return e;
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO: conectar backend
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setSent(true);
  };

  const field = (
    id: "nombre" | "email" | "telefono" | "portfolio",
    label: string,
    opts: { type?: string; required?: boolean; placeholder?: string } = {},
  ) => (
    <div>
      <label htmlFor={`tw-${id}`} className="tw-label">
        {label}
        {opts.required ? <span className="text-orange"> *</span> : null}
      </label>
      <input
        id={`tw-${id}`}
        type={opts.type ?? "text"}
        value={values[id]}
        onChange={set(id)}
        placeholder={opts.placeholder}
        className="tw-input mt-1.5 w-full px-4 py-3 text-[14.5px] outline-none"
        aria-invalid={!!errors[id]}
      />
      {errors[id] ? <p className="tw-error mt-1.5 text-[12.5px]">{errors[id]}</p> : null}
    </div>
  );

  return (
    <form onSubmit={onSubmit} noValidate className="tw-form-card relative p-8 md:p-9">
      <div className="grid gap-5">
        {field("nombre", "Nombre completo", { required: true })}
        <div className="grid gap-5 sm:grid-cols-2">
          {field("email", "Email", { type: "email", required: true })}
          {field("telefono", "Teléfono", { type: "tel" })}
        </div>
        {field("portfolio", "Portafolio o LinkedIn", { type: "url", placeholder: "https://" })}

        <div>
          <span className="tw-label">CV (PDF)</span>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              onFile(e.dataTransfer.files?.[0]);
            }}
            className="tw-drop mt-1.5 flex w-full flex-col items-center justify-center gap-2 px-4 py-8 text-center"
            data-dragging={dragging}
          >
            <FileUp className="h-6 w-6 text-orange" strokeWidth={1.5} aria-hidden="true" />
            {cvName ? (
              <span className="text-[14px] font-semibold text-foreground">{cvName}</span>
            ) : (
              <span className="text-[14px] text-muted-foreground">Arrastra tu CV aquí o haz clic para seleccionar</span>
            )}
            <span className="text-[12px] text-muted-foreground">PDF, máx. 10 MB</span>
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={(e) => onFile(e.target.files?.[0])}
            aria-label="Subir CV en PDF"
          />
        </div>

        <div>
          <label htmlFor="tw-descripcion" className="tw-label">
            Descripción del servicio que ofreces<span className="text-orange"> *</span>
          </label>
          <textarea
            id="tw-descripcion"
            rows={4}
            value={values.descripcion}
            onChange={set("descripcion")}
            className="tw-input mt-1.5 w-full resize-y px-4 py-3 text-[14.5px] outline-none"
            aria-invalid={!!errors.descripcion}
          />
          {errors.descripcion ? <p className="tw-error mt-1.5 text-[12.5px]">{errors.descripcion}</p> : null}
        </div>

        <div>
          <label className="flex cursor-pointer items-start gap-3 text-[13.5px] leading-[1.55] text-muted-foreground">
            <input
              type="checkbox"
              checked={values.privacidad}
              onChange={set("privacidad")}
              className="tw-check mt-0.5"
              aria-invalid={!!errors.privacidad}
            />
            <span>
              Acepto la{" "}
              <a href="/legal/privacidad" className="font-semibold text-orange underline underline-offset-2">
                política de privacidad
              </a>{" "}
              y el tratamiento de mis datos para gestionar mi candidatura.
            </span>
          </label>
          {errors.privacidad ? <p className="tw-error mt-1.5 text-[12.5px]">{errors.privacidad}</p> : null}
        </div>

        <button
          type="submit"
          className="btn-orange font-display inline-flex items-center justify-center rounded-full px-8 py-4 text-[15px] font-semibold"
        >
          Enviar candidatura →
        </button>

        {sent ? (
          <p className="tw-status text-center text-[14px] font-medium" role="status">
            El formulario aún no está activo. Muy pronto podrás enviar tu candidatura desde aquí.
          </p>
        ) : null}
      </div>
    </form>
  );
}

/* ── Página ─────────────────────────────────────────────────────────── */

function TrabajaPage() {
  useEffect(() => {
    // Scroll suave a #vacantes si la URL ya trae el hash al cargar.
    if (window.location.hash) {
      const el = document.querySelector(window.location.hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div className="nos-page bg-background text-foreground antialiased">
      <SiteNav />
      <main>
        <SystemPageHero
          label="Trabaja con nosotros"
          title={
            <>
              Descubre <em className="font-serif-accent">el futuro del trabajo</em> con nosotros.
            </>
          }
          descriptor="En RCKT buscamos personas curiosas, autónomas, colaborativas y con ganas de aprender constantemente. Si quieres formar parte de una cultura flexible, humana, diversa y preparada para el futuro, queremos conocerte."
          ctaLabel="Ver vacantes →"
          ctaHref="#vacantes"
        />

        {/* 01 · Cultura */}
        <section className="nos-sec nos-glow--tl">
          <div className="mx-auto max-w-6xl px-6">
            <SectionLabel>01. Cultura</SectionLabel>
            <h2 className="font-display text-[28px] leading-tight font-semibold tracking-tight md:text-[40px]">
              Así nos <em className="font-serif-accent">diferenciamos</em>.
            </h2>
            <div className="mt-12 grid items-stretch gap-6 md:grid-cols-3">
              {CULTURA.map((c, i) => (
                <CulturaCard key={c.n} c={c} i={i} />
              ))}
            </div>
          </div>
        </section>

        {/* 02 · Vacantes */}
        <section id="vacantes" className="nos-sec nos-sec--warm scroll-mt-24">
          <div className="mx-auto max-w-6xl px-6">
            <SectionLabel>02. Oportunidades</SectionLabel>
            <h2 className="font-display text-[28px] leading-tight font-semibold tracking-tight md:text-[40px]">
              Vacantes abiertas.
            </h2>
            <div className="mt-12">
              <Vacantes />
            </div>
          </div>
        </section>

        {/* 03 · Aliados */}
        <section id="aliados" className="nos-sec scroll-mt-24">
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "10%",
              right: "5%",
              width: "640px",
              height: "520px",
              zIndex: -1,
              pointerEvents: "none",
              background: GLOW,
            }}
          />
          <div className="mx-auto grid max-w-6xl items-start gap-12 px-6 lg:grid-cols-2">
            <div className="lg:sticky lg:top-[120px]">
              <SectionLabel>03. Aliados</SectionLabel>
              <h2 className="font-display text-[28px] leading-tight font-semibold tracking-tight md:text-[38px]">
                ¿Tienes un servicio o trabajas como <em className="font-serif-accent">freelance</em>?
              </h2>
              <p className="mt-4 max-w-md text-[16px] leading-[1.65] text-muted-foreground">
                Cuéntanos qué haces. Sumamos aliados y especialistas a nuestros proyectos de forma continua.
              </p>
            </div>
            <Rise>
              <AliadosForm />
            </Rise>
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
                style={{ color: "#f5f2ed" }}
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
              style={{ borderColor: "rgba(245,242,237,0.22)", color: "rgba(245,242,237,0.7)" }}
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

export const Route = createFileRoute("/nosotros/trabaja-con-nosotros")({
  head: () => ({
    meta: [
      { title: "Trabaja con nosotros | RCKT.es" },
      {
        name: "description",
        content:
          "Buscamos personas curiosas, autónomas y colaborativas. Conoce la cultura de RCKT, nuestras vacantes y cómo sumarte como aliado o freelance.",
      },
      { property: "og:title", content: "Trabaja con nosotros | RCKT.es" },
      {
        property: "og:description",
        content:
          "Buscamos personas curiosas, autónomas y colaborativas. Conoce la cultura de RCKT, nuestras vacantes y cómo sumarte como aliado o freelance.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.rckt.es/nosotros/trabaja-con-nosotros" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://www.rckt.es/nosotros/trabaja-con-nosotros" }],
  }),
  component: TrabajaPage,
});
