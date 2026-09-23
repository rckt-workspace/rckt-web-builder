import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import ThemeToggle from "@/components/rckt/ThemeToggle";
import logoDark from "@/assets/rckt-logo-dark.webp";

export const NAV_LINKS = [
  { href: "/soluciones/", label: "Soluciones" },
  { href: "/sistemas/", label: "Sistemas" },
  { href: "/sectores/", label: "Sectores" },
  { href: "/casos/", label: "Casos" },
  { href: "/recursos/", label: "Recursos" },
  { href: "/nosotros/", label: "Nosotros" },
];

export const DIAGNOSTIC_HREF = "/sistemas/revenue-diagnostic#formulario";

export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isActive = (href: string) => {
    const h = href.replace(/\/+$/, "") || "/";
    const p = (pathname || "").replace(/\/+$/, "") || "/";
    return p === h || p.startsWith(h + "/");
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const logo = (
    <a href="/" className="relative flex shrink-0 items-center" onClick={() => setMenuOpen(false)}>
      <img
        src={logoDark}
        alt="RCKT"
        className={`w-auto transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled ? "h-6 md:h-6" : "h-8 md:h-8"
        }`}
      />
    </a>
  );

  return (
    <header
      className={`pointer-events-none fixed inset-x-0 z-50 px-4 transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] sm:px-5 md:px-12 ${
        scrolled ? "top-3 md:top-4" : "top-4 md:top-6"
      }`}
    >
      {/* Desktop */}
      <div
        className={`pointer-events-auto relative mx-auto hidden max-w-6xl items-stretch transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] lg:flex ${
          scrolled ? "w-fit justify-center gap-0 py-1.5 pr-3 pl-6" : "justify-between gap-4"
        }`}
      >
        <div className={`nav-bg ${scrolled ? "" : "nav-bg-off"}`} />
        <div
          className={`relative flex items-center transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            scrolled ? "" : "px-5 py-2"
          }`}
        >
          <div className={`nav-bg ${scrolled ? "nav-bg-off" : ""}`} />
          {logo}
          <div className="relative flex items-center gap-6 pl-7 text-sm text-ink/70 dark:text-paper/70">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`font-display transition-colors duration-200 ${
                  isActive(l.href)
                    ? "text-[#E8672E]"
                    : "hover:text-ink dark:hover:text-paper"
                }`}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>

        <div
          className={`relative mx-4 h-7 w-px bg-ink/15 transition-opacity duration-600 dark:bg-paper/15 ${
            scrolled ? "opacity-100" : "opacity-0"
          }`}
        />

        <div
          className={`relative flex items-center gap-3 transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            scrolled ? "" : "px-4 py-2"
          }`}
        >
          <div className={`nav-bg ${scrolled ? "nav-bg-off" : ""}`} />
          <div className="relative flex items-center gap-3">
            <ThemeToggle />
            <a
              href={DIAGNOSTIC_HREF}
              className="btn-signal font-display inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-600"
            >
              Solicitar diagnóstico
            </a>
          </div>
        </div>
      </div>

      {/* Mobile / tablet */}
      <div className="pointer-events-auto mx-auto max-w-6xl lg:hidden">
        <div
          className={`nav-pill flex items-center justify-between gap-3 px-4 transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            scrolled ? "py-1.5" : "py-2"
          }`}
        >
          {logo}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className={`inline-flex cursor-pointer items-center justify-center rounded-full border border-ink/15 text-ink transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-ink/5 dark:border-paper/20 dark:text-paper ${
                scrolled ? "h-9 w-9" : "h-10 w-10"
              }`}
            >
              <svg
                viewBox="0 0 24 24"
                className={`transition-all duration-600 ${scrolled ? "h-4 w-4" : "h-5 w-5"}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                {menuOpen ? (
                  <>
                    <path d="M6 6l12 12" />
                    <path d="M18 6L6 18" />
                  </>
                ) : (
                  <>
                    <path d="M4 7h16" />
                    <path d="M4 12h16" />
                    <path d="M4 17h16" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="nav-pill nav-drawer mt-2 flex flex-col gap-1 p-3">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className={`font-display rounded-xl px-3 py-2.5 text-base transition-colors ${
                  isActive(l.href)
                    ? "text-[#E8672E]"
                    : "text-ink/80 hover:bg-ink/5 hover:text-ink dark:text-paper/80 dark:hover:bg-paper/10 dark:hover:text-paper"
                }`}
              >
                {l.label}
              </a>
            ))}
            <a
              href={DIAGNOSTIC_HREF}
              onClick={() => setMenuOpen(false)}
              className="btn-signal font-display mt-2 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold"
            >
              Solicitar diagnóstico
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
