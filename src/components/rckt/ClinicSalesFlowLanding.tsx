import { Link } from "@tanstack/react-router";
import {
  CalendarCheck,
  CircleAlert,
  LockKeyhole,
  ShieldCheck,
  Check,
  X,
  Search,
  Megaphone,
  MessageCircle,
  PhoneCall,
  Database,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useRef, useState, type ComponentType } from "react";

import heroPhoto from "@/assets/sector-salud.jpg";
import heroPhotoB from "@/assets/lp-clinicas-madrid-b-hero.jpeg";
import logoLight from "@/assets/rckt-logo-light.webp";
import { useLandingDarkTheme } from "@/hooks/use-landing-dark-theme";
import FaqSection, { type FaqItem } from "@/components/rckt/FaqSection";
import QualificationForm, { type QualificationValues } from "@/components/rckt/QualificationForm";
import { captureLeadFromQualification } from "@/lib/lead-capture";
import CookieConsent from "@/components/rckt/CookieConsent";
import { trackMeta } from "@/lib/meta-pixel";

const QUESTIONS = [
  {
    question: "De cada 100 solicitudes del mes pasado, ¿cuántas recibieron respuesta en menos de una hora?",
    failure: "La solicitud llega fuera de horario o en hora punta de consulta y se responde al día siguiente",
  },
  {
    question: "¿Cuántas recibieron una segunda comunicación si no contestaron la primera?",
    failure: "No hay secuencia de seguimiento definida; depende de quién esté libre",
  },
  {
    question: "¿Cuántas citas agendadas se convirtieron en visita realizada?",
    failure: "Nadie recuerda la cita al paciente 24 horas antes",
  },
  {
    question: "¿Qué campaña trajo a los pacientes que firmaron presupuesto?",
    failure: "El dato de venta vive en el software de gestión y nunca vuelve a Google ni a Meta",
  },
];

const STEPS = [
  ["Entrada unificada.", "Formulario, llamada y WhatsApp entran al mismo sitio con su origen: campaña, anuncio y palabra clave."],
  ["Calificación en minutos.", "Un agente supervisado responde al instante, confirma el tratamiento de interés y la disponibilidad, y pasa a una persona en cuanto hay intención real de reservar o una duda clínica."],
  ["Asignación con responsable.", "Cada solicitud tiene dueño, sede y plazo de respuesta. Si se incumple, salta un aviso."],
  ["Seguimiento y recordatorio.", "Secuencia en día 0, 1, 3 y 7 para quien no contesta; recordatorio 24 horas y 2 horas antes de la cita; recuperación de quien no acudió."],
  ["Vuelta del dato.", "Cuando la cita se realiza y cuando el presupuesto se acepta, esa señal vuelve a Google y Meta, que dejan de optimizar por formularios y empiezan a optimizar por pacientes."],
];

const DAYS = [
  ["30", "Todas las solicitudes en un solo sitio con su origen. Un panel con solicitudes, tiempo de primera respuesta, citas agendadas, citas realizadas y no presentados"],
  ["60", "Primera lectura por campaña: cuáles traen solicitudes que se convierten en visita y cuáles no. Ajuste de inversión y de creatividades sobre ese dato"],
  ["90", "Comparación con tu línea base: coste por primera visita y por presupuesto aceptado, antes y después. Decisión con datos sobre qué escalar"],
];

const INTEGRATIONS: { name: string; Icon: LucideIcon }[] = [
  { name: "Google Ads", Icon: Search },
  { name: "Meta", Icon: Megaphone },
  { name: "WhatsApp Business", Icon: MessageCircle },
  { name: "Centralita", Icon: PhoneCall },
  { name: "Software de gestión / CRM", Icon: Database },
];

const FOR_YOU = [
  "Ya inviertes en Google o Meta de forma sostenida.",
  "Recibes solicitudes y tienes personal atendiéndolas.",
  "El ticket medio de tu tratamiento justifica trabajar el seguimiento.",
  "Puedes dar acceso a tus datos de agenda y facturación para medir hasta el final.",
];

const NOT_FOR_YOU = [
  "Estás abriendo y aún no tienes pacientes ni campañas.",
  "Buscas solo que alguien publique en redes sociales.",
  "Buscas el precio más bajo por lead, sin mirar cuántos acaban en visita.",
  "No puedes o no quieres compartir qué solicitudes terminaron en tratamiento.",
];

export const CLINIC_FAQS: FaqItem[] = [
  { question: "¿Cuánto cuesta?", answer: "El precio depende de dónde esté la fuga, y eso es lo que mide el diagnóstico. Lo que sí está cerrado desde el principio es el alcance: qué incluye, qué no incluye y cómo se acepta cada entrega." },
  { question: "¿Cuánto tardamos en ver algo?", answer: "El sistema está operativo en 30 días desde el inicio. La primera lectura por campaña llega hacia el día 60 y la comparación con la línea base, al día 90." },
  { question: "¿Hay que cambiar el software de gestión?", answer: "No. Nos conectamos al que uses. Si el que tienes no permite conexión, lo decimos en el diagnóstico con las alternativas." },
  { question: "¿Va a contestar un robot a mis pacientes?", answer: "Un agente responde al instante, pregunta lo básico y ordena la solicitud. Cualquier duda clínica, de precio o de reclamación pasa a una persona de tu equipo. Cada cuenta tiene documentado por escrito qué hace el agente solo y qué requiere aprobación." },
  { question: "¿Garantizáis más pacientes?", answer: "No. No controlamos tu agenda, tus precios ni tu equipo. Lo que sí vas a tener en 30 días es tu embudo completo con datos reales, y cada decisión que tomemos estará medida hasta la visita." },
];

function submitDiagnostic(variant: "a" | "b") {
  return async (values: QualificationValues) => {
    const source = variant === "a" ? "lp-sales-flow-clinicas-madrid" : "lp-sales-flow-clinicas-madrid-b";
    await captureLeadFromQualification(values, source);
    trackMeta("Lead", { landing: source });
  };
}

function Note({ Icon, children }: { Icon: ComponentType<{ className?: string; strokeWidth?: number }>; children: React.ReactNode }) {
  return (
    <div className="clinic-lp-note" data-lp-reveal>
      <span><Icon className="h-4 w-4" strokeWidth={1.8} /></span>
      <i aria-hidden="true" />
      <p>{children}</p>
    </div>
  );
}

function CalculatorCard({ question, failure }: { question: string; failure: string }) {
  const [value, setValue] = useState(0);
  return (
    <article className="clinic-lp-calc-card" data-lp-reveal>
      <div className="clinic-lp-calc-head">
        <h3>{question}</h3>
        <label>
          <span className="sr-only">Valor de 0 a 100</span>
          <input
            type="number"
            min={0}
            max={100}
            inputMode="numeric"
            value={value}
            onChange={(event) => setValue(Math.min(100, Math.max(0, Number(event.target.value) || 0)))}
          />
          <b>%</b>
        </label>
      </div>
      <div className="clinic-lp-meter" aria-hidden="true"><span style={{ width: `${value}%` }} /></div>
      <p className="clinic-lp-failure-label">Lo que suele fallar</p>
      <p className="clinic-lp-failure">{failure}</p>
    </article>
  );
}

function FilterCard({ positive, title, items }: { positive: boolean; title: string; items: string[] }) {
  const Icon = positive ? Check : X;
  return (
    <article className={positive ? "clinic-lp-filter clinic-lp-filter--orange" : "clinic-lp-filter"} data-lp-reveal>
      <h3>{title}</h3>
      <ul>
        {items.map((item) => <li key={item}><Icon className="h-4 w-4" aria-hidden="true" /><span>{item}</span></li>)}
      </ul>
    </article>
  );
}

export default function ClinicSalesFlowLanding({ variant }: { variant: "a" | "b" }) {
  const rootRef = useRef<HTMLDivElement>(null);
  useLandingDarkTheme(variant === "b");

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-lp-reveal]"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || typeof IntersectionObserver === "undefined") {
      items.forEach((item) => { item.classList.add("is-visible"); item.style.transitionDelay = ""; });
      return;
    }
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.classList.add("is-visible");
            el.addEventListener("transitionend", () => { el.style.transitionDelay = ""; }, { once: true });
            observer.unobserve(el);
          }
        });
    }, { threshold: 0.15 });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={rootRef} className="clinic-lp bg-background text-foreground">
      <header className="clinic-lp-header">
        <a href="/" aria-label="RCKT.es — Inicio"><img src={logoLight} alt="RCKT.es" /></a>
        <a href="#formulario" className="btn-orange">Solicitar diagnóstico de captación</a>
      </header>

      <main>
        <section className="clinic-lp-hero system-page-hero" aria-labelledby="clinic-lp-title">
          <img src={variant === "b" ? heroPhotoB : heroPhoto} alt="Profesionales atendiendo a un paciente en una clínica" />
          <div className="clinic-lp-hero-shade" aria-hidden="true" />
          <div className="clinic-lp-shell clinic-lp-hero-content">
            <p className="clinic-lp-kicker">Sales Flow para clínicas · Madrid</p>
            <h1 id="clinic-lp-title">
              {variant === "a" ? <>Sabes cuántos formularios recibes. ¿Sabes cuántos acabaron en <span className="hero-hand">primera visita</span>?</> : <>Tus pacientes potenciales escriben a tres clínicas. Gana la que responde <span className="hero-hand">primero</span>.</>}
            </h1>
            <p className="clinic-lp-hero-copy">Conectamos tus campañas, tu teléfono y tu WhatsApp con tu sistema de gestión de pacientes, para que cada solicitud tenga respuesta, seguimiento y responsable, y sepas qué campaña llena la agenda.</p>
            <a href="#formulario" className="btn-orange clinic-lp-hero-cta">Solicitar diagnóstico de captación</a>
            <Note Icon={CalendarCheck}>Tres semanas. Te entregamos el mapa de dónde se pierden tus solicitudes y qué haríamos en 90 días.</Note>
          </div>
        </section>

        <section className="clinic-lp-section clinic-lp-problem">
          <div className="clinic-lp-shell">
            <div className="clinic-lp-heading" data-lp-reveal>
              <p className="clinic-lp-kicker">El problema</p>
              <h2>El coste de una primera visita no es lo que pagas por el clic.</h2>
              <p>Una clínica invierte cada mes en Google y Meta, recibe solicitudes por formulario, teléfono y WhatsApp, y las reparte entre recepción y comerciales. Entre la solicitud y la primera visita se pierde una parte, y casi nunca está medida.</p>
              <strong>Haz este cálculo con tus números:</strong>
            </div>
            <div className="clinic-lp-calc-grid">{QUESTIONS.map((item) => <CalculatorCard key={item.question} {...item} />)}</div>
            <Note Icon={CircleAlert}>Si no puedes responder las cuatro con datos, tu inversión en medios se está optimizando a ciegas: las plataformas aprenden de formularios, no de pacientes.</Note>
          </div>
        </section>

        <section className="clinic-lp-section clinic-lp-how">
          <div className="clinic-lp-shell clinic-lp-how-grid">
            <div className="clinic-lp-sticky" data-lp-reveal>
              <p className="clinic-lp-kicker">Cómo funciona</p>
              <h2>Sales Flow: de la solicitud a la primera visita, sin huecos.</h2>
            </div>
            <ol className="clinic-lp-steps">
              {STEPS.map(([title, text], index) => (
                <li key={title} data-lp-reveal><span className="clinic-lp-step-dot" /><b>{String(index + 1).padStart(2, "0")}</b><div><h3>{title}</h3><p>{text}</p></div></li>
              ))}
            </ol>
          </div>
          <div className="clinic-lp-shell"><Note Icon={ShieldCheck}>Ninguna decisión clínica ni de precio la toma un sistema automático. El agente responde, ordena y avisa; la persona decide.</Note></div>
        </section>

        <section className="clinic-lp-section clinic-lp-days">
          <div className="clinic-lp-shell">
            <div className="clinic-lp-heading" data-lp-reveal><p className="clinic-lp-kicker">90 días</p><h2>Una lectura más completa en cada etapa.</h2></div>
            <div className="clinic-lp-days-grid">
              {DAYS.map(([day, text]) => <article key={day} data-lp-reveal><small>DÍA</small><strong>{day}</strong><div className="clinic-lp-day-line"><i /></div><p>{text}</p></article>)}
            </div>
          </div>
        </section>

        <section className="clinic-lp-section clinic-lp-proof">
          <div className="clinic-lp-shell clinic-lp-proof-grid">
            <div data-lp-reveal><p className="clinic-lp-kicker">Prueba</p><h2>Antes de tocar nada, medimos.</h2></div>
            <p data-lp-reveal>El primer paso siempre es el mismo: tres semanas revisando tus campañas, tus solicitudes, tus conversaciones y tus datos de facturación para reconstruir el recorrido completo, desde la inversión hasta el presupuesto aceptado. De ahí sale un documento con tres cosas: dónde se pierde el dinero, cuánto, y qué haremos en 90 días. Esa medición inicial queda firmada y es la referencia contra la que se compara todo lo que venga después.</p>
          </div>
        </section>

        <section className="clinic-lp-section clinic-lp-integrations">
          <div className="clinic-lp-shell">
            <div className="clinic-lp-heading" data-lp-reveal><p className="clinic-lp-kicker">Integraciones</p><h2>Funciona con lo que ya tienes.</h2><p>Conectamos tus cuentas de Google Ads y Meta, tu número de WhatsApp Business, tu centralita y tu software de gestión de pacientes o tu CRM. No cambiamos tu sistema de gestión: lo conectamos. Las cuentas publicitarias, el número y los datos siguen siendo tuyos, y te entregamos los accesos y la documentación desde el primer día.</p></div>
            <div className="clinic-lp-integration-grid">
              {INTEGRATIONS.map(({ name, Icon }, i) => (
                <div key={name} data-lp-reveal style={{ transitionDelay: `${i * 80}ms` }}>
                  <span className="clinic-lp-integration-icon" aria-hidden="true"><Icon size={24} strokeWidth={1.8} /></span>
                  <strong>{name}</strong>
                </div>
              ))}
            </div>
            <Note Icon={LockKeyhole}>Tratamiento de datos conforme al RGPD, con consentimiento expreso en cada formulario y en la primera conversación de WhatsApp.</Note>
          </div>
        </section>

        <section className="clinic-lp-section clinic-lp-filter-section">
          <div className="clinic-lp-shell clinic-lp-filter-grid">
            <FilterCard positive title="Es para tu clínica si:" items={FOR_YOU} />
            <FilterCard positive={false} title="No es para tu clínica si:" items={NOT_FOR_YOU} />
          </div>
        </section>

        <FaqSection items={CLINIC_FAQS} />

        <section id="formulario" className="clinic-lp-section clinic-lp-form scroll-mt-8">
          <div className="clinic-lp-shell clinic-lp-form-inner">
            <div className="clinic-lp-heading" data-lp-reveal><p className="clinic-lp-kicker">Formulario</p><h2>Solicita tu diagnóstico de captación.</h2></div>
            <QualificationForm mode="clinic" onSubmit={submitDiagnostic(variant)} />
          </div>
        </section>

        <section className="clinic-lp-closing">
          <div className="clinic-lp-shell"><div className="clinic-lp-closing-card" data-lp-reveal><p className="clinic-lp-kicker">Siguiente paso</p><h2>Empecemos por medir.</h2><p>Tres semanas, un documento con tus números y una reunión con quien decide en tu clínica.</p><a href="#formulario" className="clinic-lp-closing-cta">Solicitar diagnóstico de captación</a></div></div>
        </section>
      </main>

      <CookieConsent />
      <footer className="clinic-lp-legal"><span>© RCKT.es</span><Link to="/legal/privacidad">Privacidad</Link><Link to="/legal/cookies">Cookies</Link></footer>
    </div>
  );
}
