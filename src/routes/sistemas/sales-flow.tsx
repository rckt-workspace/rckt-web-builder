import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/sistemas/sales-flow")({
  head: () => ({
    meta: [
      { title: "Sales Flow · RCKT.es" },
      {
        name: "description",
        content:
          "Sales Flow: conecta campañas, WhatsApp y CRM para que cada lead tenga respuesta, seguimiento y dueño.",
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
          <span className="label-orange">Sistema · S2</span>
        </div>
        <h1 className="mt-4 text-[36px] leading-[1.05] tracking-[-0.03em] font-medium md:text-[52px]">
          Sales Flow
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          Hoy pagas por un lead, te escribe, y ahí empieza a perderse: respuesta tarde, sin seguimiento, fuera del CRM. Sales Flow conecta tus campañas, WhatsApp y CRM para que cada lead tenga respuesta, seguimiento y dueño, y para que sepas cuáles compran.
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
