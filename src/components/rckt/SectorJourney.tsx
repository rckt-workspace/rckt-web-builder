import type { LucideIcon } from "lucide-react";
import { BadgeCheck, CalendarCheck, Megaphone, MessageCircle, UserRound } from "lucide-react";

import useInView from "@/hooks/use-in-view";

const DEFAULT_ICONS: LucideIcon[] = [Megaphone, MessageCircle, UserRound, CalendarCheck, BadgeCheck];

export type JourneyLeak = { afterStage: number; label: string };

/** Recorrido vertical del sector: una estela enciende cada etapa al entrar en pantalla. */
export default function SectorJourney({
  stages,
  leaks = [],
  icons,
}: {
  stages: string[];
  leaks?: JourneyLeak[];
  icons?: LucideIcon[];
}) {
  const { ref, inView, ready } = useInView<HTMLDivElement>({ threshold: 0.15 });
  const total = stages.length;

  return (
    <div ref={ref} className="journey" data-in={inView} data-ready={ready}>
      <div className={`journey__line ${inView ? "is-in" : ""}`} aria-hidden="true" />
      <div className="journey__row">
        {stages.map((stage, i) => {
          const Icono = (icons ?? DEFAULT_ICONS)[i % (icons ?? DEFAULT_ICONS).length];
          const leak = leaks.find((l) => l.afterStage === i + 1);
          const delay = (900 / Math.max(total - 1, 1)) * i;
          return (
            <div key={stage} className="journey__stage">
              <div
                className={`journey__dot ${inView ? "is-in" : ""}`}
                style={{ transitionDelay: `${delay}ms` }}
              >
                <Icono className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
              </div>
              <p className="journey__name">{stage}</p>
              {leak ? (
                <div
                  className={`journey__leak ${inView ? "is-in" : ""}`}
                  style={{ transitionDelay: `${900 + i * 90}ms` }}
                >
                  <span className="journey__leak-line" aria-hidden="true" />
                  <span className="journey__leak-label">{leak.label}</span>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
