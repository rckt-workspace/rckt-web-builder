import { Link } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowRight,
  CalendarCheck,
  CalendarRange,
  Check,
  CircleAlert,
  Database,
  Euro,
  FileSignature,
  Linkedin,
  LockKeyhole,
  Megaphone,
  Search,
  Workflow,
  X,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useRef, type ComponentType } from "react";

import heroPhoto from "@/assets/sector-b2b.jpg";
import heroPhotoB from "@/assets/lp-b2b-madrid-b-hero.jpeg";
import logoLight from "@/assets/rckt-logo-light.webp";
import { useLandingDarkTheme } from "@/hooks/use-landing-dark-theme";
import FaqSection, { type FaqItem } from "@/components/rckt/FaqSection";
import QualificationForm, { type QualificationValues } from "@/components/rckt/QualificationForm";
import { captureLeadFromQualification } from "@/lib/lead-capture";
import CookieConsent from "@/components/rckt/CookieConsent";
import { trackMeta } from "@/lib/meta-pixel";

const DIAGNOSTIC_ROWS = [
  ["Marketing reporta leads; ventas dice que no sirven", "Nadie tiene un criterio compartido de qué es una oportunidad válida"],
  ["El CRM se usa a medias", "No hay fecha de etapa ni origen; el informe se reconstruye a mano cada mes"],
  ["Las campañas optimizan por formulario enviado", "Google y Meta aprenden a traer más de lo que menos convierte"],
  ["El pipeline depende de referidos", "El crecimiento no es predecible y no se puede planificar"],
];

const STEPS = [
  ["Definiciones antes que campañas.", "Acordamos con tu equipo comercial qué es lead válido, qué es oportunidad aceptada y qué es venta. Esas definiciones se firman y gobiernan todo lo demás."],
  ["Captación con intención.", "Google Search sobre las búsquedas que hace tu comprador, LinkedIn donde el cargo lo justifica y remarketing sobre quien ya te conoce. Creatividades y mensajes probados cada semana."],
  ["Página de destino que filtra.", "El formulario pregunta lo que tu equipo comercial necesita saber antes de la primera llamada y puntúa cada solicitud, para que tus comerciales hablen primero con quien encaja."],
  ["CRM y seguimiento.", "Cada oportunidad entra con origen y responsable, con plazos de respuesta y secuencias definidas. El panel muestra el recorrido completo por etapa."],
  ["El dato vuelve.", "Oportunidad aceptada, reunión realizada y contrato firmado se envían a Google y Meta, que pasan a optimizar por lo que factura."],
];

const MILESTONES = [
  {
    day: "30",
    text: "Definiciones firmadas, CRM y medición operativos, campañas en marcha. Panel con inversión, leads, oportunidades aceptadas y reuniones",
    chips: ["Inversión", "Leads", "Oportunidades aceptadas", "Reuniones"],
  },
  {
    day: "60",
    text: "Primera lectura por canal y campaña con la calidad que reporta tu equipo comercial. Se reasigna presupuesto sobre ese dato",
    chips: ["Lectura por canal", "Calidad comercial"],
  },
  {
    day: "90",
    text: "Coste por oportunidad aceptada y por cliente nuevo, comparado con tu línea base. Decisión sobre qué escalar y qué apagar",
    chips: ["Coste por oportunidad", "Coste por cliente nuevo"],
  },
];

const PROOF_ITEMS: { text: string; Icon: LucideIcon }[] = [
  { text: "Las tres fugas principales cuantificadas en euros al mes", Icon: Euro },
  { text: "Tu línea base firmada", Icon: FileSignature },
  { text: "Un plan de 90 días con alcance y dependencias", Icon: CalendarRange },
];

const INTEGRATIONS: { name: string; Icon: LucideIcon }[] = [
  { name: "Google Ads", Icon: Search },
  { name: "Meta", Icon: Megaphone },
  { name: "LinkedIn", Icon: Linkedin },
  { name: "HubSpot", Icon: Database },
  { name: "Pipedrive", Icon: Workflow },
];

const FOR_YOU = [
  "Ya vendes y ya inviertes en captación de forma sostenida.",
  "Tienes equipo comercial, aunque hoy trabaje a medias dentro del CRM.",
  "Tu ticket medio justifica trabajar cada oportunidad una por una.",
  "Puedes darnos acceso a datos de ventas para cerrar el ciclo de medición.",
];

const NOT_FOR_YOU = [
  "Estás validando todavía si hay mercado para lo que vendes.",
  "Buscas un proveedor que solo gestione campañas sin ver la calidad del lead.",
  "Quieres el coste por lead más bajo posible.",
  "Quieres que cobremos solo por resultados: no controlamos tu cierre, tus precios ni tu capacidad de entrega.",
];

export const B2B_FAQS: FaqItem[] = [
  { question: "¿Cuánto cuesta?", answer: "El presupuesto depende del alcance, y el alcance sale del diagnóstico. Lo que está definido de antemano es cómo trabajamos: una base mensual por el sistema que operamos y, cuando hay línea base de 90 días, la opción de añadir una parte variable ligada a resultados medibles." },
  { question: "¿Trabajáis con nuestro equipo o lo hacéis todo vosotros?", answer: "Las dos cosas son posibles. Lo habitual es que nosotros operemos el sistema y tu equipo comercial trabaje las oportunidades. También acompañamos a equipos internos que prefieren ejecutar ellos mismos." },
  { question: "¿Hace falta cambiar de CRM?", answer: "No, salvo que el actual impida medir hasta la venta. Si ese es el caso, lo decimos en el diagnóstico con el coste y el esfuerzo de migrar." },
  { question: "¿Cuánto presupuesto de medios necesito?", answer: "Lo calculamos en el diagnóstico a partir del coste por oportunidad de tu sector y de cuántos clientes nuevos quieres al mes. Si la cuenta no sale, te lo decimos antes de empezar." },
  { question: "¿Qué pasa si no funciona?", answer: "A los 90 días comparamos contra la línea base que firmaste. Si el sistema no mejora el coste por cliente nuevo, la conversación es sobre qué cambiar o parar, con datos sobre la mesa, no sobre percepciones." },
];

function submitDiagnostic(variant: "a" | "b") {
  return async (values: QualificationValues) => {
    const source = variant === "a" ? "lp-revenue-engine-b2b-madrid" : "lp-revenue-engine-b2b-madrid-b";
    await captureLeadFromQualification(values, source);
    trackMeta("Lead", { landing: source });
  };
}

function submitShortDiagnostic(variant: "a" | "b") {
  return async (values: QualificationValues) => {
    const source = variant === "a" ? "lp-revenue-engine-b2b-madrid" : "lp-revenue-engine-b2b-madrid-b";
    await captureLeadFromQualification(
      {
        ...values,
        web: "",
        pais: "",
        ciudad: "",
        sector: "",
        inversion: "",
        leads: "",
        crm: "",
        whatsapp: "",
        inicio: "",
      },
      source,
    );
    trackMeta("Lead", { landing: source, formulario: "corto" });
  };
}

function Note({ Icon, children }: { Icon: ComponentType<{ className?: string; strokeWidth?: number }>; children: React.ReactNode }) {
  return <div className="b2b-lp-note" data-b2b-reveal><span><Icon className="h-4 w-4" strokeWidth={1.8} /></span><i aria-hidden="true" /><p>{children}</p></div>;
}

function FilterCard({ positive, title, items }: { positive: boolean; title: string; items: string[] }) {
  const Icon = positive ? Check : X;
  return <article className={positive ? "b2b-lp-filter b2b-lp-filter--orange" : "b2b-lp-filter"} data-b2b-reveal><h3>{title}</h3><ul>{items.map((item) => <li key={item}><Icon className="h-4 w-4" aria-hidden="true" /><span>{item}</span></li>)}</ul></article>;
}

export default function RevenueEngineB2BLanding({ variant }: { variant: "a" | "b" }) {
  const rootRef = useRef<HTMLDivElement>(null);
  useLandingDarkTheme(variant === "b");

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-b2b-reveal]"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || typeof IntersectionObserver === "undefined") {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.15 });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={rootRef} className={`b2b-lp bg-background text-foreground`}>
      <header className="b2b-lp-header">
        <a href="/" aria-label="RCKT.es — Inicio"><img src={logoLight} alt="RCKT.es" /></a>
        <a href="#formulario" className="btn-orange">Solicitar diagnóstico de captación</a>
      </header>

      <main>
        <section className="b2b-lp-hero system-page-hero" aria-labelledby="b2b-lp-title">
          <img src={variant === "b" ? heroPhotoB : heroPhoto} alt="Equipo comercial B2B trabajando en Madrid" />
          <div className="b2b-lp-hero-shade" aria-hidden="true" />
          <div className="b2b-lp-shell b2b-lp-hero-content">
            <p className="b2b-lp-kicker">Revenue Engine B2B · Madrid</p>
            <h1 id="b2b-lp-title">Generamos oportunidades B2B y las medimos hasta el <span className="hero-hand">contrato</span>, no hasta el formulario.</h1>
            <p className="b2b-lp-hero-copy">Diseñamos y operamos el sistema completo: campañas, página de destino, CRM y seguimiento, con una sola cifra al final del mes que es cuánto te cuesta cada cliente nuevo.</p>
            <a href="#formulario" className="btn-orange b2b-lp-hero-cta">Solicitar diagnóstico de captación</a>
            <Note Icon={CalendarCheck}>Tres semanas. Te entregamos dónde pierdes oportunidades entre la campaña y el cierre, con tus números.</Note>
          </div>
        </section>

        <section className="b2b-lp-section b2b-lp-problem">
          <div className="b2b-lp-shell">
            <div className="b2b-lp-heading" data-b2b-reveal><p className="b2b-lp-kicker">El problema</p><h2>Tu proveedor optimiza por coste por lead. Tu cuenta de resultados no funciona así.</h2><p>En servicios B2B, una venta puede valer decenas de miles de euros y el ciclo dura semanas o meses. Con ese ticket, el problema casi nunca es el número de leads: es que nadie sabe cuáles de esos leads el equipo comercial aceptó como oportunidad real, cuáles llegaron a reunión y cuáles firmaron.</p><strong>Lo que suele pasar dentro de la empresa:</strong></div>
            <div className="b2b-lp-diagnostic" data-b2b-reveal>{DIAGNOSTIC_ROWS.map(([symptom, consequence]) => <div className="b2b-lp-diagnostic-row" key={symptom}><p>{symptom}</p><span aria-hidden="true" className="b2b-lp-diag-arrow"><ArrowRight size={16} strokeWidth={2} className="b2b-lp-diag-arrow-right" /><ArrowDown size={16} strokeWidth={2} className="b2b-lp-diag-arrow-down" /></span><p>{consequence}</p></div>)}</div>
            <Note Icon={CircleAlert}>Si el dato de contrato firmado no vuelve a las plataformas, estás pagando por que aprendan del indicador equivocado.</Note>
          </div>
        </section>

        <section className="b2b-lp-section b2b-lp-pipeline-section">
          <div className="b2b-lp-shell">
            <div className="b2b-lp-heading" data-b2b-reveal><p className="b2b-lp-kicker">Cómo funciona</p><h2>Revenue Engine: un sistema y un responsable, del clic al contrato.</h2></div>
            <ol className="b2b-lp-pipeline">{STEPS.map(([title, text], index) => <li key={title} data-b2b-reveal style={{ transitionDelay: `${index * 90}ms` }}><b>{String(index + 1).padStart(2, "0")}</b><h3>{title}</h3><p>{text}</p></li>)}</ol>
          </div>
        </section>

        <section className="b2b-lp-section b2b-lp-days">
          <div className="b2b-lp-shell">
            <div className="b2b-lp-heading" data-b2b-reveal><p className="b2b-lp-kicker">90 días</p><h2>Del sistema operativo al coste por cliente nuevo.</h2></div>
            <div className="b2b-lp-timeline">{MILESTONES.map(({ day, text, chips }) => <article key={day} data-b2b-reveal><span className="b2b-lp-timeline-dot" /><div><strong>DÍA {day}</strong><p>{text}</p><ul>{chips.map((chip) => <li key={chip}>{chip}</li>)}</ul></div></article>)}</div>
          </div>
        </section>

        <section className="b2b-lp-section b2b-lp-proof">
          <div className="b2b-lp-shell">
            <div className="b2b-lp-proof-card" data-b2b-reveal><p className="b2b-lp-kicker">Prueba</p><h2>El diagnóstico primero, siempre.</h2><p className="b2b-lp-proof-copy">Antes de proponerte nada, dedicamos tres semanas a reconstruir tu recorrido real: inversión, leads, oportunidades, reuniones, propuestas y contratos de los últimos tres meses, más una revisión técnica de campañas, web, medición y CRM y entrevistas con tu responsable comercial. El resultado es un documento con las tres fugas principales cuantificadas en euros al mes, tu línea base firmada y un plan de 90 días con alcance y dependencias.</p><div className="b2b-lp-proof-items">{PROOF_ITEMS.map(({ text, Icon }) => <div key={text}><span><Icon size={22} strokeWidth={1.7} /></span><p>{text}</p></div>)}</div></div>
          </div>
        </section>

        <section className="b2b-lp-section b2b-lp-integrations">
          <div className="b2b-lp-shell">
            <div className="b2b-lp-heading" data-b2b-reveal><p className="b2b-lp-kicker">Integraciones</p><h2>Tus cuentas, tu CRM, tus datos.</h2><p>Trabajamos sobre tus cuentas de Google Ads, Meta y LinkedIn y sobre tu CRM, sea HubSpot, Pipedrive u otro. Configuramos la medición completa, incluido el envío de conversiones desde el CRM a las plataformas. Todo queda documentado y con accesos tuyos: si un día dejamos de trabajar juntos, el sistema se queda contigo.</p></div>
            <div className="b2b-lp-integration-grid">{INTEGRATIONS.map(({ name, Icon }, index) => <div key={name} data-b2b-reveal style={{ transitionDelay: `${index * 80}ms` }}><span><Icon size={24} strokeWidth={1.8} /></span><strong>{name}</strong></div>)}</div>
            <Note Icon={LockKeyhole}>Consentimiento y tratamiento de datos conforme al RGPD, configurado antes de encender la primera campaña.</Note>
          </div>
        </section>

        <section className="b2b-lp-section b2b-lp-filter-section"><div className="b2b-lp-shell b2b-lp-filter-grid"><FilterCard positive title="Es para tu empresa si:" items={FOR_YOU} /><FilterCard positive={false} title="No es para tu empresa si:" items={NOT_FOR_YOU} /></div></section>

        <div className="b2b-lp-faq"><FaqSection items={B2B_FAQS} /></div>

        <section id="formulario" className={`b2b-lp-section b2b-lp-form scroll-mt-8 ${variant === "b" ? "lp-form-corto" : ""}`}>
          <div className="b2b-lp-shell b2b-lp-form-inner">
            <div className="b2b-lp-heading" data-b2b-reveal><p className="b2b-lp-kicker">Formulario</p><h2>Solicita tu diagnóstico de captación.</h2>{variant === "b" ? <p>Te llamamos para completar el resto.</p> : null}</div>
            <QualificationForm onSubmit={variant === "b" ? submitShortDiagnostic(variant) : submitDiagnostic(variant)} />
          </div>
        </section>

        <section className="b2b-lp-closing"><div className="b2b-lp-shell"><div data-b2b-reveal><p className="b2b-lp-kicker">Siguiente paso</p><h2>Empieza por saber dónde pierdes oportunidades.</h2><p>Tres semanas, tus números y un plan de 90 días presentado a quien decide.</p><a href="#formulario">Solicitar diagnóstico de captación</a></div></div></section>
      </main>

      <CookieConsent />
      <footer className="b2b-lp-legal"><span>© RCKT.es</span><Link to="/legal/privacidad">Privacidad</Link><Link to="/legal/cookies">Cookies</Link></footer>
    </div>
  );
}