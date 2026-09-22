import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/soluciones/ecommerce-rentable")({
  head: () => ({
    meta: [
      { title: "Ecommerce rentable · RCKT" },
      {
        name: "description",
        content:
          "Inviertes en pauta y no crece con margen. Diagnóstico y sistema para ecommerce rentable.",
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
          ← RCKT
        </Link>
        <div className="mt-8 flex items-center gap-3">
          <span className="inline-block h-5 w-[2px] bg-orange" />
          <span className="label-orange">Solución</span>
        </div>
        <h1 className="mt-4 text-[36px] leading-[1.05] tracking-[-0.03em] font-medium md:text-[52px]">
          Ecommerce rentable
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          Inviertes en pauta y no crece con margen.
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
