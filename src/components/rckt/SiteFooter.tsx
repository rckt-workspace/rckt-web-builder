import ThemeToggle from "@/components/rckt/ThemeToggle";
import logoDark from "@/assets/rckt-logo-dark.webp";
import logoLight from "@/assets/rckt-logo-light.webp";

const FOOTER_NAV = [
  { href: "/soluciones/", label: "Soluciones" },
  { href: "/sistemas/", label: "Sistemas" },
  { href: "/sectores/", label: "Sectores" },
  { href: "/casos/", label: "Casos" },
  { href: "/recursos/", label: "Recursos" },
  { href: "/nosotros/", label: "Nosotros" },
  { href: "/sistemas/revenue-diagnostic", label: "Revenue Diagnostic" },
];

const FOOTER_LEGAL = [
  { href: "/aviso-legal", label: "Aviso legal" },
  { href: "/privacidad", label: "Privacidad" },
  { href: "/cookies", label: "Cookies" },
  { href: "/tratamiento-datos", label: "Política de Tratamiento de Datos" },
];

export default function SiteFooter() {
  return (
    <footer className="section-deep" style={{ borderTop: "1px solid var(--line-lt)" }}>
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-6 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1.2fr_1fr]">
          <div className="self-start">
            <a href="/" className="flex items-center">
              <>
                <img src={logoDark} alt="RCKT.es" className="h-8 w-auto dark:hidden" />
                <img src={logoLight} alt="RCKT.es" className="hidden h-8 w-auto dark:block" />
              </>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/50">
              Sistemas de crecimiento con IA.
            </p>
            <p className="label-orange mt-8 !text-[10px]">Correo</p>
            <a
              href="mailto:hola@rckt.es"
              className="font-display mt-3 inline-block text-sm text-paper/55 transition-colors hover:text-paper"
            >
              hola@rckt.es
            </a>
          </div>
          <nav aria-label="Footer">
            <p className="label-orange !text-[10px]">Navegar</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {FOOTER_NAV.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="font-display text-paper/55 transition-colors hover:text-paper">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Legal">
            <p className="label-orange !text-[10px]">Legal</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {FOOTER_LEGAL.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="font-display text-paper/55 transition-colors hover:text-paper">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="label-orange !text-[10px]">Apariencia</p>
            <div className="mt-4">
              <ThemeToggle />
            </div>
            <p className="mt-3 text-xs text-paper/40">Versión clara u oscura, a tu gusto.</p>
          </div>
        </div>
        <div
          className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t pt-6 text-xs text-paper/35"
          style={{ borderColor: "var(--line-lt)" }}
        >
          <p>sistema activo · 2026</p>
          <p>© RCKT — Sistemas de crecimiento con IA</p>
        </div>
      </div>
    </footer>
  );
}
