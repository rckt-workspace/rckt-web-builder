import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/sistemas/demand-system")({
  head: () => ({
    meta: [
      { title: "Demand System · RCKT.es" },
      {
        name: "description",
        content:
          "Demand System: campañas optimizadas por oportunidades que tu equipo comercial acepta y por las que terminan en venta.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <Link
          to="/"
          className="font-mono text-[12px] text-muted-foreground tracking-[0.12em] uppercase hover:text-foreground"
        >
          ← RCKT.es
        </Link>
        <div className="mt-8 flex items-center gap-3">
          <span className="inline-block h-5 w-[2px] bg-orange" />
          <span className="label-orange">Sistema · S1</span>
        </div>
        <h1 className="mt-4 text-[36px] leading-[1.05] tracking-[-0.03em] font-medium md:text-[52px]">
          Demand System
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          Manejamos tus campañas, pero no las optimizamos por leads baratos: las optimizamos por las oportunidades que tu equipo comercial acepta y por las que terminan en venta.
        </p>
        <p className="mt-4 text-[15.5px] leading-relaxed text-muted-foreground">
          Contenido en desarrollo.
        </p>
        <div className="mt-10">
          <a
            href="/#contacto"
            className="btn-orange inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-medium"
          >
            Revenue Diagnostic
          </a>
        </div>
      </div>
    </div>
  ),
});
