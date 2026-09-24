import SiteFooter from "@/components/rckt/SiteFooter";
import SiteNav from "@/components/rckt/SiteNav";

export function LegalPage({ title, body }: { title: string; body: string[] }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main>
        <div className="mx-auto max-w-3xl px-6 pb-20 pt-32 md:pb-28 md:pt-40">
          <h1 className="hero-title text-[36px] leading-[1.05] font-semibold md:text-[52px]">
            {title}
          </h1>
          <div className="mt-10 space-y-6 text-[15.5px] leading-relaxed text-muted-foreground">
            {body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div className="mt-16 font-mono text-[12px] text-muted-foreground">
            &gt; sistema activo · 2026
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}