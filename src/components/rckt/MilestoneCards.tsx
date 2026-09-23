import useInView from "@/hooks/use-in-view";

export type Milestone = { dia: string; texto: string; kicker?: string };

/** Tres o cuatro hitos con barra de progreso propia encima de las cards. Reutilizable. */
export default function MilestoneCards({ items, kicker = "Día" }: { items: Milestone[]; kicker?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.25);
  const cols = items.length;

  return (
    <div
      ref={ref}
      className={`milestones mt-14 ${cols === 4 ? "milestones--4" : ""}`}
      style={{ ["--ms-cols" as string]: String(cols) }}
    >
      <div className="milestones__bar">
        <div className="milestones__track" aria-hidden="true">
          <span className={`milestones__fill ${inView ? "is-in" : ""}`} />
        </div>
        <div className="milestones__dots" aria-hidden="true">
          {items.map((m, i) => (
            <span key={m.dia} className="milestones__dot-cell">
              <span
                className={`milestones__dot ${inView ? "is-in" : ""}`}
                style={{ transitionDelay: `${i * (1200 / cols)}ms` }}
              />
            </span>
          ))}
        </div>
      </div>
      <div className="milestones__grid">
        {items.map((m, i) => (
          <article
            key={m.dia}
            className={`milestone-card ${inView ? "is-in" : ""}`}
            style={{ transitionDelay: `${i * 120}ms` }}
          >
            <span className="label-orange">{m.kicker ?? kicker}</span>
            <p className="milestone-card__num" data-align="left">
              {m.dia}
            </p>
            <p className="milestone-card__text" data-align="left">
              {m.texto}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
