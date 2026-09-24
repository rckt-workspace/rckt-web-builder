import { Droplet } from "lucide-react";

import useInView from "@/hooks/use-in-view";

export type FunnelLeak = { stage: string; label: string };

const COLORS = [
  "#fc5c1f",
  "rgba(252,92,31,0.86)",
  "rgba(252,92,31,0.72)",
  "rgba(252,92,31,0.58)",
  "rgba(252,92,31,0.44)",
  "rgba(252,92,31,0.3)",
  "rgba(252,92,31,0.16)",
];

/** Embudo vertical de barras, reutilizable. Sin cifras. */
export default function FunnelBars({
  stages,
  leaks = [],
}: {
  stages: string[];
  leaks?: FunnelLeak[];
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.25);
  const total = stages.length;

  return (
    <div ref={ref} className="funnel mt-12">
      {stages.map((stage, i) => {
        const pct = 100 - (i * 60) / Math.max(total - 1, 1);
        const color = COLORS[Math.min(i, COLORS.length - 1)];
        const light = i < Math.ceil(total / 2) - 1;
        const leak = leaks.find((l) => l.stage === stage);
        return (
          <div className="funnel__row" key={stage}>
            <div className="funnel__track">
              <div
                className={`funnel__bar ${inView ? "is-in" : ""}`}
                style={{
                  width: `${pct}%`,
                  background: color,
                  color: light ? "#FFFFFF" : "var(--ink)",
                  transitionDelay: `${i * 80}ms`,
                }}
              >
                {stage}
              </div>
            </div>
            <div className="funnel__leak">
              {leak ? (
                <>
                  <span className="funnel__dash" aria-hidden="true" />
                  <span className="funnel__pill">
                    <Droplet className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden="true" />
                    {leak.label}
                  </span>
                </>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}
