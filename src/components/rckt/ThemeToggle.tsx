import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const THEME_EVENT = "rckt:theme";

function apply(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  try {
    localStorage.setItem("rckt-theme", theme);
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new CustomEvent<Theme>(THEME_EVENT, { detail: theme }));
}

function currentTheme(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    setTheme(currentTheme());
    const onThemeChange = () => setTheme(currentTheme());
    window.addEventListener(THEME_EVENT, onThemeChange);
    window.addEventListener("storage", onThemeChange);
    return () => {
      window.removeEventListener(THEME_EVENT, onThemeChange);
      window.removeEventListener("storage", onThemeChange);
    };
  }, []);

  const toggle = () => {
    const next: Theme = currentTheme() === "dark" ? "light" : "dark";
    apply(next);
    setTheme(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Activar versión clara" : "Activar versión oscura"}
      title={theme === "dark" ? "Versión clara" : "Versión oscura"}
      className={`relative inline-flex h-7 w-[52px] items-center rounded-full border border-border bg-foreground/5 transition-colors hover:bg-foreground/10 ${className}`}
    >
      <span
        className="absolute left-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-background shadow-sm transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ transform: theme === "dark" ? "translateX(24px)" : "translateX(0)" }}
      >
        {theme === "dark" ? <Moon /> : <Sun />}
      </span>
    </button>
  );
}

const Sun = () => (
  <svg className="h-3.5 w-3.5 text-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);

const Moon = () => (
  <svg className="h-3.5 w-3.5 text-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" />
  </svg>
);
