import type { ReactNode } from "react";

export function SectionHeader({
  num,
  label,
  title,
  phrase,
}: {
  num: string;
  label: string;
  title: ReactNode;
  phrase?: ReactNode;
}) {
  return (
    <div className="text-left">
      <div className="mb-10 flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="num-orange">{num}</span>
        <div className="rule" />
        <span className="label-orange">{label}</span>
      </div>
      <div className={`grid gap-6 md:items-start md:gap-12 ${phrase ? "md:grid-cols-2" : ""}`}>
        <h2 className="font-display text-3xl leading-tight font-semibold md:text-5xl">{title}</h2>
        {phrase ? <p className="text-sm leading-relaxed text-muted-foreground md:text-base md:pt-2">{phrase}</p> : null}
      </div>
    </div>
  );
}

export default SectionHeader;
