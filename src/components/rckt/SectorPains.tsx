import type { CSSProperties } from "react";
import { Droplet } from "lucide-react";

import useInView from "@/hooks/use-in-view";

export type SectorPain = {
  titulo: string;
  descripcion: string;
  resuelve: string;
};

export default function SectorPains({ items }: { items: SectorPain[] }) {
  const { ref, inView, ready } = useInView<HTMLDivElement>({ threshold: 0.15, fallbackMs: 900 });

  return (
    <div
      ref={ref}
      className="sector-pain-list"
      data-count={items.length}
      data-in={inView}
      data-ready={ready}
    >
      {items.map((item, index) => (
        <article key={item.titulo} className="sector-pain-block" style={{ "--i": index } as CSSProperties}>
          <div className="sector-pain-top">
            <span className="sector-pain-icon" aria-hidden="true"><Droplet size={18} strokeWidth={1.9} /></span>
            <span className="sector-pain-kicker">Fuga {String(index + 1).padStart(2, "0")}</span>
          </div>
          <h3>{item.titulo}</h3>
          <p>{item.descripcion}</p>
          <div className="sector-pain-solution">
            <span>→ Lo resuelve:</span> <strong>{item.resuelve}</strong>
          </div>
        </article>
      ))}
    </div>
  );
}