import { useEffect } from "react";

// Runs in the leaf head before paint, without changing the stored site preference.
export const landingDarkThemeScript = `(function(){var r=document.documentElement;if(!r.hasAttribute('data-landing-previous-theme'))r.setAttribute('data-landing-previous-theme',r.classList.contains('dark')?'dark':'light');r.classList.add('dark');r.setAttribute('data-theme','dark');})();`;

export function useLandingDarkTheme(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    const previousTheme = root.getAttribute("data-landing-previous-theme") ?? (root.classList.contains("dark") ? "dark" : "light");
    root.removeAttribute("data-landing-previous-theme");
    let storedTheme: string | null = null;
    try { storedTheme = localStorage.getItem("rckt-theme"); } catch { /* Storage may be unavailable. */ }
    const preserveSitePreference = () => {
      try {
        if (storedTheme === null) localStorage.removeItem("rckt-theme");
        else localStorage.setItem("rckt-theme", storedTheme);
      } catch { /* Storage may be unavailable. */ }
    };
    window.addEventListener("rckt:theme", preserveSitePreference);
    root.classList.add("dark");
    root.setAttribute("data-theme", "dark");
    window.dispatchEvent(new Event("rckt:theme"));
    return () => {
      window.removeEventListener("rckt:theme", preserveSitePreference);
      root.classList.toggle("dark", previousTheme === "dark");
      root.setAttribute("data-theme", previousTheme);
      preserveSitePreference();
      window.dispatchEvent(new Event("rckt:theme"));
    };
  }, [enabled]);
}