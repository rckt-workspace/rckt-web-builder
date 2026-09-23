import useInView from "@/hooks/use-in-view";

export type Milestone = { dia: string; texto: string };

/** Tres hitos con barra de progreso animada detrás. Reutilizable. */
export default function MilestoneCards({ items }: { items: Milestone[] }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.25);

  return (
    <div ref={ref} className="milestones mt-14">
      <div className="milestones__track" aria-hidden="true">
        <span className={`milestones__fill ${inView ? "is-in" : ""}`} />
      </div>
      <div className="milestones__grid">
        {items.map((m, i) => (
          <article
            key={m.dia}
            className={`milestone-card ${inView ? "is-in" : ""}`}
            style={{ transitionDelay: `${i * 120}ms` }}
          >
            <span className="milestone-card__dot" aria-hidden="true" />
            <span className="label-orange">Día</span>
            <p className="milestone-card__num">{m.dia}</p>
            <p className="mt-4 text-[17px] leading-relaxed">{m.texto}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
