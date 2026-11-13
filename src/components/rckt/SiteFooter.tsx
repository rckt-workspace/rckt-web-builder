import { openCookiePreferences } from "@/lib/analytics";
import ThemeToggle from "@/components/rckt/ThemeToggle";
import { CONTACTO_ES } from "@/config/contacto-es";
import logoDark from "@/assets/rckt-logo-dark.webp";
import logoLight from "@/assets/rckt-logo-light.webp";

const FOOTER_PRODUCTOS = [
  { href: "/productos/ignition", label: "Ignition" },
  { href: "/productos/blueprint", label: "Blueprint" },
  { href: "/productos/engine", label: "Engine" },
  { href: "/productos/visibility", label: "Visibility" },
  { href: "/productos/signal", label: "Signal" },
  { href: "/growth-os", label: "Growth OS" },
];

const FOOTER_EMPRESA = [
  { href: "/metodo", label: "Método" },
  { href: "/sectores", label: "Sectores" },
  { href: "/casos", label: "Casos" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/nosotros/trabaja-con-nosotros", label: "Trabaja con nosotros" },
];

function FooterCol({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <nav aria-label={title}>
      <p className="label-orange !text-[10px]">{title}</p>
      <ul className="mt-4 space-y-2.5 text-sm">
        {links.map((l) => (
          <li key={l.href}>
            <a href={l.href} className="font-display text-paper/55 transition-colors hover:text-paper">
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

const FOOTER_LEGAL = [
  { href: "/legal/aviso-legal", label: "Aviso legal" },
  { href: "/legal/privacidad", label: "Privacidad" },
  { href: "/legal/cookies", label: "Cookies" },
];

export default function SiteFooter() {
  return (
    <footer className="section-deep" style={{ borderTop: "1px solid var(--line-lt)" }}>
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-6 md:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr_1fr]">
          <div className="self-start">
            <a href="/" className="flex items-center">
              <img src={logoDark} alt="RCKT.es" className="h-8 w-auto dark:hidden" />
              <img src={logoLight} alt="RCKT.es" className="hidden h-8 w-auto dark:block" />
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/50">
              RCKT · Ingeniería de crecimiento · IA supervisada y documentada
            </p>
            <div className="mt-6">
              <ThemeToggle />
            </div>
          </div>
          <FooterCol title="Productos" links={FOOTER_PRODUCTOS} />
          <FooterCol title="Empresa" links={FOOTER_EMPRESA} />
          <div>
            <p className="label-orange !text-[10px]">Contacto</p>
            <a
              href={`mailto:${CONTACTO_ES.email}`}
              className="font-display mt-4 inline-block text-sm text-paper/55 transition-colors hover:text-paper"
            >
              {CONTACTO_ES.email}
            </a>
            <p className="font-display mt-2 max-w-xs text-sm text-paper/55">Lunes a viernes, de 9:00 a 18:00, hora peninsular</p>
          </div>
          <div>
            <FooterCol title="Legal" links={FOOTER_LEGAL} />
            <button type="button" onClick={openCookiePreferences} className="mt-2.5 font-display text-sm text-paper/55 transition-colors hover:text-paper">
              Preferencias de cookies
            </button>
          </div>
        </div>
        <div
          className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t pt-6 text-xs text-paper/35"
          style={{ borderColor: "var(--line-lt)" }}
        >
          <p>© RCKT · Ingeniería de crecimiento</p>
        </div>
      </div>
    </footer>
  );
}
