import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import demandImg from "@/assets/sistema-demand.jpg";
import salesFlowImg from "@/assets/sistema-sales-flow.jpg";
import operationsImg from "@/assets/sistema-operations.jpg";

const SISTEMA_FOTOS = { radar: demandImg, flow: salesFlowImg, cycle: operationsImg } as const;

export type SystemCardData = {
  badge: string;
  kicker: string;
  title: string;
  shortName: string;
  desc: string;
  href: string;
  art: "radar" | "flow" | "cycle";
};

export const SISTEMAS_CARDS: SystemCardData[] = [
  {
    badge: "S1",
    kicker: "Demanda hasta la venta",
    title: "Demand System",
    shortName: "Demand",
    desc: "Manejamos tus campañas, pero no las optimizamos por leads baratos: las optimizamos por las oportunidades que tu equipo comercial acepta y por las que terminan en venta. Cada semana ves el embudo completo, no solo los clics.",
    href: "/sistemas/demand-system",
    art: "radar",
  },
  {
    badge: "S2",
    kicker: "Núcleo de Conversion System",
    title: "Sales Flow",
    shortName: "Sales Flow",
    desc: "Hoy pagas por un lead, te escribe, y ahí empieza a perderse: respuesta tarde, sin seguimiento, fuera del CRM. Sales Flow conecta tus campañas, WhatsApp y CRM para que cada lead tenga respuesta, seguimiento y dueño, y para que sepas cuáles compran.",
    href: "/sistemas/sales-flow",
    art: "flow",
  },
  {
    badge: "S3",
    kicker: "Procesos con supervisión",
    title: "Operations System",
    shortName: "Operations",
    desc: "No te vendemos IA. Elegimos un proceso que tu equipo repite cien veces por semana, medimos cuánto te cuesta hoy, y en ocho semanas lo dejamos funcionando solo, con una persona aprobando lo que importa.",
    href: "/sistemas/operations-system",
    art: "cycle",
  },
];

export function SistemaArt({ kind }: { kind: "radar" | "flow" | "cycle" }) {
  if (kind === "radar") {
    return (
      <svg viewBox="0 0 120 100" fill="none" aria-hidden="true" className="h-full w-full">
        <circle cx="46" cy="50" r="32" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="46" cy="50" r="21" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="46" cy="50" r="10" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="46" cy="50" r="3.5" fill="#fc5c1f" />
        <line x1="88" y1="72" x2="88" y2="52" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="97" y1="72" x2="97" y2="40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="106" y1="72" x2="106" y2="58" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="115" y1="72" x2="115" y2="30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  if (kind === "flow") {
    return (
      <svg viewBox="0 0 120 100" fill="none" aria-hidden="true" className="h-full w-full">
        <line x1="29" y1="50" x2="43" y2="50" stroke="currentColor" strokeWidth="1.5" />
        <path d="M40 46 L45 50 L40 54" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="73" y1="50" x2="87" y2="50" stroke="currentColor" strokeWidth="1.5" />
        <path d="M84 46 L89 50 L84 54" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="18" cy="50" r="11" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="62" cy="50" r="11" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="105" cy="50" r="11" fill="#fc5c1f" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 120 100" fill="none" aria-hidden="true" className="h-full w-full">
      <path d="M60 20 A 30 30 0 0 1 90 50" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M84 42 L90 50 L98 44" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M60 80 A 30 30 0 0 1 30 50" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M36 58 L30 50 L22 56" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M51 50 L58 57 L71 43" stroke="#fc5c1f" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SystemCards({ systems }: { systems: SystemCardData[] }) {
  const gridRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const cards = Array.from(el.querySelectorAll<HTMLElement>(".sys-card"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);
  return (
    <div ref={gridRef} className="grid gap-6 md:grid-cols-3">
      {systems.map((s, i) => (
        <Link
          key={s.badge}
          to={s.href}
          className="card-kraft sys-card group flex h-full flex-col overflow-hidden p-0"
          style={{ "--d": `${i * 100}ms` } as CSSProperties}
        >
          <div className="sys-card__head">
            <img src={SISTEMA_FOTOS[s.art]} alt="" aria-hidden="true" loading="lazy" className="sys-card__art" />
            <span className="sys-card__badge absolute top-4 left-4 rounded-full bg-[rgba(245,242,237,0.85)] px-3 py-1 font-mono text-[11px] tracking-wider text-ink">
              {s.badge}
            </span>
            <span className="sys-card__arrow absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(245,242,237,0.85)] text-ink">
              <ArrowUpRight className="h-4 w-4" />
            </span>
            <span className="sys-card__name">{s.shortName}</span>
          </div>
          <div className="flex flex-1 flex-col p-6">
            <span className="sys-card__kicker">{s.kicker}</span>
            <h3 className="font-display mt-2 text-lg leading-snug font-semibold">{s.title}</h3>
            <p className="mt-3 text-[13.5px] leading-relaxed text-muted-foreground">{s.desc}</p>
            <span className="sys-card__more">
              Ver sistema
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="h-3.5 w-3.5">
                <path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
