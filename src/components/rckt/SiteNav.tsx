import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import ThemeToggle from "@/components/rckt/ThemeToggle";
import logoDark from "@/assets/rckt-logo-dark.webp";
import logoLight from "@/assets/rckt-logo-light.webp";

export const NAV_LINKS = [
  { href: "/metodo", label: "Método" },
  { href: "/productos", label: "Productos" },
  { href: "/sectores", label: "Sectores" },
  { href: "/casos", label: "Casos" },
  { href: "/nosotros", label: "Nosotros" },
];

export const PRODUCT_LINKS = [
  { href: "/productos/ignition", label: "Ignition" },
  { href: "/productos/blueprint", label: "Blueprint" },
  { href: "/productos/engine", label: "Engine" },
  { href: "/productos/visibility", label: "Visibility" },
  { href: "/productos/signal", label: "Signal" },
];
export const GROWTH_OS_LINK = { href: "/growth-os", label: "Growth OS" };

export const DIAGNOSTIC_HREF = "/contacto";

function ProductsMenu({ active }: { active: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={`font-display inline-flex cursor-pointer items-center gap-1 whitespace-nowrap transition-colors duration-200 ${
          active ? "text-[#fc5c1f]" : "hover:text-ink dark:hover:text-paper"
        }`}
      >
        Productos
        <svg viewBox="0 0 12 12" className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M3 4.5l3 3 3-3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div className="absolute left-1/2 top-full z-[70] -translate-x-1/2 pt-3">
          <div className="nav-pill flex min-w-[190px] flex-col p-2">
            {PRODUCT_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="font-display rounded-lg px-3 py-2 text-sm text-ink/80 hover:bg-ink/5 hover:text-ink dark:text-paper/80 dark:hover:bg-paper/10 dark:hover:text-paper">
                {l.label}
              </a>
            ))}
            <div className="my-1.5 h-px bg-ink/10 dark:bg-paper/15" />
            <a href={GROWTH_OS_LINK.href} className="font-display rounded-lg px-3 py-2 text-sm font-semibold text-ink hover:bg-ink/5 dark:text-paper dark:hover:bg-paper/10">
              {GROWTH_OS_LINK.label}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

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
        alt="RCKT.es"
        className={`w-auto transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] dark:hidden ${
          scrolled ? "h-5 md:h-6" : "h-6 md:h-8"
        }`}
      />
      <img
        src={logoLight}
        alt="RCKT.es"
        className={`hidden w-auto transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] dark:block ${
          scrolled ? "h-5 md:h-6" : "h-6 md:h-8"
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
        className={`pointer-events-auto relative mx-auto hidden max-w-7xl items-stretch transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] min-[1100px]:flex ${
          scrolled ? "w-fit justify-center gap-0 py-1.5 px-6" : "justify-between gap-4"
        }`}
      >
        <div className={`nav-bg ${scrolled ? "" : "nav-bg-off"}`} />
        <div
          className={`relative flex items-center transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            scrolled ? "" : "px-5 py-2 xl:px-6"
          }`}
        >
          <div className={`nav-bg ${scrolled ? "nav-bg-off" : ""}`} />
          {logo}
          <div className="relative flex items-center gap-4 pl-8 text-sm text-ink/70 dark:text-paper/70 xl:gap-5">
            {NAV_LINKS.map((l) => l.href === "/productos" ? (
              <ProductsMenu key={l.href} active={isActive("/productos") || isActive("/growth-os")} />
            ) : (
              <a
                key={l.href}
                href={l.href}
                className={`font-display whitespace-nowrap transition-colors duration-200 ${
                  isActive(l.href)
                    ? "text-[#fc5c1f]"
                    : "hover:text-ink dark:hover:text-paper"
                }`}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>

        <div
          className={`relative mx-6 h-7 w-px bg-ink/15 transition-opacity duration-600 dark:bg-paper/15 ${
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
              className="btn-signal font-display inline-flex items-center justify-center rounded-full px-[22px] py-2.5 text-sm font-semibold whitespace-nowrap transition-all duration-600"
            >
              Solicitar diagnóstico
            </a>
          </div>
        </div>
      </div>

      {/* Mobile / tablet */}
      <div className="pointer-events-auto mx-auto max-w-6xl min-[1100px]:hidden">
        <div
          className={`nav-pill flex items-center justify-between gap-2 px-3 transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            scrolled ? "py-1.5" : "py-2"
          }`}
        >
          {logo}
          <div className="flex items-center gap-1 sm:gap-2">
            <ThemeToggle />
            <a
              href={DIAGNOSTIC_HREF}
              className="btn-signal font-display inline-flex items-center justify-center rounded-full px-1.5 py-2 text-[9px] font-semibold whitespace-nowrap transition-all duration-600 sm:px-[18px] sm:py-2.5 sm:text-sm"
            >
              Solicitar diagnóstico
            </a>
            <button
              type="button"
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className={`inline-flex cursor-pointer items-center justify-center rounded-full border border-ink/15 text-ink transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-ink/5 dark:border-paper/20 dark:text-paper ${
                scrolled ? "h-8 w-8" : "h-9 w-9"
              } sm:h-10 sm:w-10`}
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
            {NAV_LINKS.map((l) => l.href === "/productos" ? (
              <div key={l.href} className="flex flex-col">
                <span className="font-display px-3 pt-2.5 pb-1 text-base text-ink/80 dark:text-paper/80">Productos</span>
                {[...PRODUCT_LINKS, GROWTH_OS_LINK].map((p) => (
                  <a
                    key={p.href}
                    href={p.href}
                    onClick={() => setMenuOpen(false)}
                    className={`font-display rounded-xl py-2 pl-6 pr-3 text-[15px] transition-colors ${
                      p.href === "/growth-os" ? "mt-1 border-t border-ink/10 pt-3 dark:border-paper/15 " : ""
                    }${isActive(p.href) ? "text-[#fc5c1f]" : "text-ink/70 hover:bg-ink/5 hover:text-ink dark:text-paper/70 dark:hover:bg-paper/10 dark:hover:text-paper"}`}
                  >
                    {p.label}
                  </a>
                ))}
              </div>
            ) : (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className={`font-display rounded-xl px-3 py-2.5 text-base transition-colors ${
                  isActive(l.href)
                    ? "text-[#fc5c1f]"
                    : "text-ink/80 hover:bg-ink/5 hover:text-ink dark:text-paper/80 dark:hover:bg-paper/10 dark:hover:text-paper"
                }`}
              >
                {l.label}
              </a>
            ))}
            <a
              href={DIAGNOSTIC_HREF}
              onClick={() => setMenuOpen(false)}
              className="btn-signal font-display mt-2 inline-flex items-center justify-center rounded-full px-[22px] py-3 text-sm font-semibold whitespace-nowrap"
            >
              Solicitar diagnóstico
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
