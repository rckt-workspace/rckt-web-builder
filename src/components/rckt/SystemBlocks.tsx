import type { CSSProperties, ComponentType, ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";

const pad = (n: number) => String(n + 1).padStart(2, "0");

/* ---------- CapabilityCards ---------- */
export type Capability = {
  Icono?: ComponentType<{ className?: string; strokeWidth?: number; "aria-hidden"?: boolean | "true" }>;
  titulo: string;
  detalle: string;
  href?: string;
  linkLabel?: string;
};

export function CapabilityCards({ items, compact = false }: { items: Capability[]; compact?: boolean }) {
  const { ref, inView, ready } = useInView<HTMLDivElement>({ fallbackMs: 1500 });
  return (
    <div
      ref={ref}
      className={`cap-grid mt-10 ${compact ? "cap-grid--compact" : ""}`}
      data-in={inView}
      data-ready={ready}
    >
      {items.map((c, i) => (
        <article key={c.titulo} className="cap-card" style={{ "--i": i } as CSSProperties}>
          <div className="cap-card__top">
            <span className="cap-card__num">{pad(i)}</span>
            {c.Icono ? <c.Icono className="cap-card__icon" strokeWidth={1.6} aria-hidden="true" /> : null}
          </div>
          <h3 className="cap-card__title">{c.titulo}</h3>
          {c.detalle ? <p className="cap-card__text">{c.detalle}</p> : null}
          {c.href ? (
            <Link to={c.href} className="cap-card__link">
              {c.linkLabel ?? "Ver sistema →"}
            </Link>
          ) : null}
        </article>
      ))}
    </div>
  );
}

/* ---------- RuleList ---------- */
export function RuleList({ items }: { items: string[] }) {
  const { ref, inView, ready } = useInView<HTMLOListElement>({ fallbackMs: 1500 });
  return (
    <ol ref={ref} className="rule-list mt-10" data-in={inView} data-ready={ready}>
      {items.map((t, i) => (
        <li key={t} className="rule-row" style={{ "--i": i } as CSSProperties}>
          <span className="rule-row__num">{pad(i)}</span>
          <span className="rule-row__text">{t}</span>
        </li>
      ))}
    </ol>
  );
}

/* ---------- AcceptanceSteps ---------- */
export type AcceptanceStep = { texto: ReactNode; hito?: string; label?: string };

export function AcceptanceSteps({ items, plazo }: { items: AcceptanceStep[]; plazo?: string }) {
  const { ref, inView, ready } = useInView<HTMLDivElement>({ fallbackMs: 1500 });
  return (
    <div className="mt-10">
      {plazo ? <span className="acc-pill">{plazo}</span> : null}
      <div
        ref={ref}
        className="acc-steps"
        data-in={inView}
        data-ready={ready}
        style={{ "--n": items.length } as CSSProperties}
      >
        <span className="acc-steps__line" aria-hidden="true" />
        {items.map((s, i) => (
          <div key={i} className="acc-step" style={{ "--i": i } as CSSProperties}>
            <span className="acc-step__dot" aria-hidden={s.hito ? undefined : "true"}>
              {s.hito ? (
                <span className="acc-step__hito">{s.hito}</span>
              ) : (
                <Check className="h-4 w-4" strokeWidth={2.6} aria-hidden="true" />
              )}
            </span>
            <div className="acc-step__card">
              {s.label ? <p className="label-orange acc-step__label">{s.label}</p> : null}
              <p className="acc-step__text">{s.texto}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
