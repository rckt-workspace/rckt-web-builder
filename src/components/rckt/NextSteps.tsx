import { useState, type FormEvent } from "react";
import { toast } from "sonner";

const steps = [
  { n: "01", title: "Conversación", body: "Una primera lectura conjunta del momento del negocio, las prioridades comerciales y el estado de la operación digital." },
  { n: "02", title: "Plan", body: "Recomendación operativa a noventa días, priorizada por impacto en el negocio y velocidad de ejecución." },
  { n: "03", title: "Sistema", body: "Growth System completo o servicios específicos, calibrados según la madurez interna y la ambición comercial." },
];

const revenueRanges = [
  "< 1M €",
  "1M – 5M €",
  "5M – 20M €",
  "20M – 100M €",
  "> 100M €",
];

const focusAreas = [
  "Growth System completo",
  "Performance & medios pagados",
  "SEO & contenido",
  "CRO & web",
  "Data & medición",
  "Aún por definir",
];

const ContactForm = () => {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "").trim();
    const company = String(data.get("company") || "").trim();
    const email = String(data.get("email") || "").trim();
    const role = String(data.get("role") || "").trim();
    const revenue = String(data.get("revenue") || "").trim();
    const focus = String(data.get("focus") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name || !company || !email || !message) {
      toast.error("Completa los campos obligatorios.");
      setSubmitting(false);
      return;
    }
    if (name.length > 120 || company.length > 160 || email.length > 200 || message.length > 2000) {
      toast.error("Alguno de los campos excede el límite permitido.");
      setSubmitting(false);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Introduce un email corporativo válido.");
      setSubmitting(false);
      return;
    }

    const body = [
      `Nombre: ${name}`,
      `Empresa: ${company}`,
      `Cargo: ${role || "—"}`,
      `Email: ${email}`,
      `Facturación anual: ${revenue || "—"}`,
      `Foco de interés: ${focus || "—"}`,
      "",
      "Contexto:",
      message,
    ].join("\n");

    const href = `mailto:contacto@rckt.es?subject=${encodeURIComponent(
      `Nueva conversación — ${company}`,
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = href;
    toast.success("Abriendo tu cliente de correo…");
    setTimeout(() => setSubmitting(false), 600);
  };

  return (
    <div className="mt-24 border-t border-border pt-20">
      <div className="grid grid-cols-12 gap-8 mb-12">
        <div className="col-span-12 lg:col-span-4 space-y-2">
          <span className="text-[11px] uppercase tracking-widest text-muted-foreground">Formulario</span>
          <p className="text-[11px] font-mono text-muted-foreground">RC-INTAKE / 027</p>
        </div>
        <div className="col-span-12 lg:col-span-8 space-y-4">
          <h3 className="font-serif text-3xl md:text-4xl leading-[1.05]">
            O abre la conversación desde aquí.
          </h3>
          <p className="text-muted-foreground max-w-xl text-sm leading-relaxed">
            Cuéntanos brevemente el momento de tu compañía. Respondemos en menos de 48 horas hábiles, solo a contactos corporativos.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-x-8 gap-y-10">
        <Field className="col-span-12 md:col-span-6" label="Nombre" name="name" required maxLength={120} />
        <Field className="col-span-12 md:col-span-6" label="Empresa" name="company" required maxLength={160} />
        <Field className="col-span-12 md:col-span-6" label="Email corporativo" name="email" type="email" required maxLength={200} />
        <Field className="col-span-12 md:col-span-6" label="Cargo" name="role" maxLength={120} />

        <SelectField
          className="col-span-12 md:col-span-6"
          label="Facturación anual"
          name="revenue"
          options={revenueRanges}
        />
        <SelectField
          className="col-span-12 md:col-span-6"
          label="Foco de interés"
          name="focus"
          options={focusAreas}
        />

        <div className="col-span-12 space-y-2">
          <label htmlFor="message" className="block text-[11px] uppercase tracking-widest text-muted-foreground">
            Contexto<span className="text-accent"> *</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            maxLength={2000}
            rows={5}
            placeholder="Etapa, prioridades comerciales, equipo actual, mercados…"
            className="w-full bg-transparent border-b border-border focus:border-foreground outline-none py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors resize-none"
          />
        </div>

        <div className="col-span-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6 pt-4">
          <p className="text-[11px] text-muted-foreground max-w-md leading-relaxed">
            Al enviar aceptas que utilicemos estos datos exclusivamente para responder a tu solicitud.
          </p>
          <button
            type="submit"
            disabled={submitting}
            className="group inline-flex items-center gap-3 bg-foreground text-background px-7 py-3.5 text-sm font-semibold rounded-full shadow-soft hover:bg-foreground/90 transition-colors disabled:opacity-60"
          >
            <span>{submitting ? "Enviando…" : "Iniciar conversación"}</span>
            <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
          </button>
        </div>
      </form>
    </div>
  );
};

const Field = ({
  className = "",
  label,
  name,
  type = "text",
  required = false,
  maxLength,
}: {
  className?: string;
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  maxLength?: number;
}) => (
  <div className={`${className} space-y-2`}>
    <label htmlFor={name} className="block text-[11px] uppercase tracking-widest text-muted-foreground">
      {label}
      {required && <span className="text-accent"> *</span>}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      required={required}
      maxLength={maxLength}
      className="w-full bg-transparent border-b border-border focus:border-foreground outline-none py-3 text-sm text-foreground transition-colors"
    />
  </div>
);

const SelectField = ({
  className = "",
  label,
  name,
  options,
}: {
  className?: string;
  label: string;
  name: string;
  options: string[];
}) => (
  <div className={`${className} space-y-2`}>
    <label htmlFor={name} className="block text-[11px] uppercase tracking-widest text-muted-foreground">
      {label}
    </label>
    <select
      id={name}
      name={name}
      defaultValue=""
      className="w-full bg-transparent border-b border-border focus:border-foreground outline-none py-3 text-sm text-foreground transition-colors appearance-none cursor-pointer"
    >
      <option value="" className="bg-background text-foreground">Selecciona una opción</option>
      {options.map((opt) => (
        <option key={opt} value={opt} className="bg-background text-foreground">
          {opt}
        </option>
      ))}
    </select>
  </div>
);

const NextSteps = () => (
  <section id="contacto" className="px-8 py-32 border-t border-border">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-12 gap-8 mb-20">
        <div className="col-span-12 lg:col-span-4 space-y-2">
          <span className="text-[11px] uppercase tracking-widest text-muted-foreground">Próximos pasos</span>
          <p className="text-[11px] font-mono text-muted-foreground">RC-INTAKE / 026</p>
        </div>
        <div className="col-span-12 lg:col-span-8 space-y-8">
          <h2 className="font-serif text-5xl md:text-6xl leading-[0.95]">
            Tres pasos para empezar a operar como sistema.
          </h2>
          <p className="text-muted-foreground max-w-xl leading-relaxed">
            Trabajamos con un número acotado de compañías por año. Escríbenos a <a href="mailto:contacto@rckt.es" className="text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground">contacto@rckt.es</a> para iniciar la conversación.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 border-t border-border">
        {steps.map((s, i) => (
          <div
            key={s.n}
            className={`py-10 md:py-12 md:px-10 space-y-4 ${i < steps.length - 1 ? "md:border-r border-border" : ""}`}
          >
            <div className="flex items-baseline justify-between">
              <span className="text-[11px] font-mono text-muted-foreground tracking-widest">{s.n}</span>
              <div className="w-1 h-1 bg-accent rounded-full" />
            </div>
            <h3 className="font-serif text-3xl">{s.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{s.body}</p>
          </div>
        ))}
      </div>
      <ContactForm />
    </div>
  </section>
);

export default NextSteps;