import type { CSSProperties } from "react";

import useInView from "@/hooks/use-in-view";

export type SectorPain = {
  titulo: string;
  descripcion: string;
  resuelve: string;
};

export default function SectorPains({ items }: { items: SectorPain[] }) {
  const { ref, inView, ready } = useInView<HTMLDivElement>({ threshold: 0.15 });

  return (
    <div ref={ref} className="sector-pain-list" data-in={inView} data-ready={ready}>
      {items.map((item, index) => (
        <article key={item.titulo} className="sector-pain-row" style={{ "--i": index } as CSSProperties}>
          <span className="sector-pain-number" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}.
          </span>
          <div className="sector-pain-copy">
            <h3>{item.titulo}</h3>
            <p>{item.descripcion}</p>
            <span className="sector-pain-pill">Lo resuelve: {item.resuelve}</span>
          </div>
        </article>
      ))}
    </div>
  );
}