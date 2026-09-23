import type { LucideIcon } from "lucide-react";

export type Signal = {
  titulo: string;
  frase: string;
  Icono: LucideIcon;
};

/** Cards grandes de señales: 2x2 + una card ancha al final. Reutilizable. */
export default function SignalCards({ items }: { items: Signal[] }) {
  const grid = items.slice(0, 4);
  const wide = items.slice(4);

  return (
    <div className="mt-10 grid gap-5 md:grid-cols-2">
      {grid.map((s, i) => (
        <Card key={s.titulo} n={i + 1} signal={s} />
      ))}
      {wide.map((s, i) => (
        <div key={s.titulo} className="md:col-span-2">
          <Card n={grid.length + i + 1} signal={s} wide />
        </div>
      ))}
    </div>
  );
}

function Card({ n, signal, wide = false }: { n: number; signal: Signal; wide?: boolean }) {
  const { titulo, frase, Icono } = signal;
  return (
    <article className={`signal-card ${wide ? "signal-card--wide" : ""}`}>
      <div className="signal-card__body">
        <div className="flex items-center gap-3">
          <span className="signal-card__num">{n}</span>
          <h3 className="font-display text-[15px] font-semibold tracking-[0.06em] uppercase">{titulo}</h3>
        </div>
        <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{frase}</p>
      </div>
      <span className="signal-card__art" aria-hidden="true">
        <Icono className="h-12 w-12 text-orange" strokeWidth={1.4} />
      </span>
    </article>
  );
}
