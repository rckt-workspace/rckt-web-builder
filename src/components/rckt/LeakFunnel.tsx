type Leak = {
  /** Índice de la etapa tras la cual aparece la fuga. Usa la última etapa para colgarla debajo del final. */
  afterStage: number;
  label: string;
};

export type LeakFunnelProps = {
  stages: string[];
  leaks?: Leak[];
};

/**
 * Embudo reutilizable: horizontal en desktop (bloques que se estrechan),
 * vertical en móvil. Sin cifras ni porcentajes.
 */
export default function LeakFunnel({ stages, leaks = [] }: LeakFunnelProps) {
  const total = stages.length;

  return (
    <div className="mt-12">
      {/* Desktop */}
      <div className="relative hidden md:block">
        <div
          aria-hidden="true"
          className="absolute top-[34px] right-0 left-0 h-px"
          style={{ background: "rgba(252, 92, 31,0.35)" }}
        />
        <div className="relative flex items-start gap-2">
          {stages.map((s, i) => {
            const scale = 1 - (i / Math.max(total - 1, 1)) * 0.42;
            const leak = leaks.find((l) => l.afterStage === i);
            return (
              <div key={s} className="relative flex-1">
                <div className="flex h-[68px] items-center justify-center">
                  <div
                    className="font-display flex w-full items-center justify-center rounded-xl px-2 text-center text-[13px] leading-tight font-semibold"
                    style={{
                      height: `${Math.round(68 * scale)}px`,
                      border: "1px solid rgba(252, 92, 31,0.45)",
                      background: "var(--card-surface)",
                      color: "var(--ink)",
                    }}
                  >
                    {s}
                  </div>
                </div>
                {leak ? (
                  <div className="absolute top-[80px] left-full w-[130px] -translate-x-1/2 text-center">
                    <span
                      className="mx-auto mb-2 block h-[9px] w-[9px] rounded-full"
                      style={{ background: "var(--orange)" }}
                      aria-hidden="true"
                    />
                    <span className="block text-[11.5px] leading-snug text-muted-foreground">{leak.label}</span>
                  </div>
                ) : null}
                {i === total - 1 && leaks.find((l) => l.afterStage === total) ? (
                  <div className="absolute top-[80px] right-0 left-0 text-center">
                    <span
                      className="mx-auto mb-2 block h-[9px] w-[9px] rounded-full"
                      style={{ background: "var(--orange)" }}
                      aria-hidden="true"
                    />
                    <span className="block text-[11.5px] leading-snug text-muted-foreground">
                      {leaks.find((l) => l.afterStage === total)!.label}
                    </span>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
        <div className="h-[110px]" />
      </div>

      {/* Móvil */}
      <div className="relative md:hidden">
        <div
          aria-hidden="true"
          className="absolute top-0 bottom-0 left-[5px] w-px"
          style={{ background: "rgba(252, 92, 31,0.35)" }}
        />
        <div className="flex flex-col gap-4">
          {stages.map((s, i) => {
            const leak = leaks.find((l) => l.afterStage === i);
            const isLast = i === total - 1;
            const endLeak = isLast ? leaks.find((l) => l.afterStage === total) : undefined;
            return (
              <div key={s} className="relative pl-8">
                <span
                  className="absolute top-[14px] left-0 block h-[11px] w-[11px] rounded-full"
                  style={{ background: "var(--orange)" }}
                  aria-hidden="true"
                />
                <div
                  className="font-display rounded-xl px-4 py-3 text-[14px] font-semibold"
                  style={{ border: "1px solid rgba(252, 92, 31,0.45)", background: "var(--card-surface)" }}
                >
                  {s}
                </div>
                {leak ? <p className="mt-2 text-[12.5px] text-muted-foreground">Fuga: {leak.label}</p> : null}
                {endLeak ? <p className="mt-2 text-[12.5px] text-muted-foreground">Fuga: {endLeak.label}</p> : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
