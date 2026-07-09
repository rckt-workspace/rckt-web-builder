import { Link } from "@tanstack/react-router";

export function LegalPage({ title, body }: { title: string; body: string[] }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <Link
          to="/"
          className="font-mono text-[12px] text-muted-foreground hover:text-foreground tracking-[0.12em] uppercase"
        >
          ← RCKT
        </Link>
        <h1 className="mt-8 text-[36px] md:text-[52px] leading-[1.05] tracking-[-0.03em] font-medium">
          {title}
        </h1>
        <div className="mt-10 space-y-6 text-[15.5px] leading-relaxed text-muted-foreground">
          {body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <div className="mt-16 font-mono text-[12px] text-muted-foreground">
          &gt; sistema activo · 2026
        </div>
      </div>
    </div>
  );
}