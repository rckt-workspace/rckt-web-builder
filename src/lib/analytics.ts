import { getConsent, loadMetaPixel } from "@/lib/meta-pixel";

export const GA4_ID = "G-QDWPL5YS6N";
export const CLARITY_ID = "zd54plh69h";
export const OPEN_COOKIE_PREFS_EVENT = "rckt:open-cookie-preferences";

type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  clarity?: (...args: unknown[]) => void;
};

let loaded = false;
let lastPagePath: string | null = null;

function ensureGtagStub() {
  const w = window as AnalyticsWindow;
  w.dataLayer = w.dataLayer || [];
  if (!w.gtag) {
    w.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params -- gtag.js necesita el objeto arguments
      w.dataLayer!.push(arguments);
    };
  }
  return w.gtag;
}

/** Carga Meta, GA4 (Consent Mode v2) y Clarity solo con consentimiento concedido. */
export function loadAnalytics() {
  if (typeof window === "undefined" || getConsent() !== "granted" || loaded) return;
  loaded = true;
  loadMetaPixel();

  const gtag = ensureGtagStub();
  gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
  });
  gtag("consent", "update", {
    ad_storage: "granted",
    ad_user_data: "granted",
    ad_personalization: "granted",
    analytics_storage: "granted",
  });
  gtag("js", new Date());
  gtag("config", GA4_ID, { send_page_view: false });
  const ga = document.createElement("script");
  ga.async = true;
  ga.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
  document.head.appendChild(ga);

  const clarity = document.createElement("script");
  clarity.text = `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${CLARITY_ID}");`;
  document.head.appendChild(clarity);

  lastPagePath = null;
  trackPageView(window.location.pathname);
}

/** Si se rechaza tras aceptar, actualiza Consent Mode a denegado. */
export function denyAnalytics() {
  if (typeof window === "undefined") return;
  const w = window as AnalyticsWindow;
  w.gtag?.("consent", "update", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
  });
}

export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined" || getConsent() !== "granted") return;
  const w = window as AnalyticsWindow;
  if (!w.gtag) return;
  w.gtag("event", name, { article_slug: window.location.pathname, ...params });
}

export function trackPageView(pathname: string) {
  if (typeof window === "undefined" || getConsent() !== "granted" || !loaded) return;
  if (lastPagePath === pathname) return;
  lastPagePath = pathname;
  trackEvent("page_view", {
    page_path: pathname,
    page_location: window.location.href,
    page_title: document.title,
  });
}

export function trackLead(params: Record<string, unknown> = {}) {
  trackEvent("generate_lead", params);
}

export function openCookiePreferences() {
  if (typeof window !== "undefined") window.dispatchEvent(new Event(OPEN_COOKIE_PREFS_EVENT));
}

/** Scroll, lectura y clics en CTA para la página actual. Devuelve la limpieza. */
export function startPageTracking(pathname: string) {
  if (typeof window === "undefined") return () => {};
  const start = Date.now();
  const fired = new Set<number>();
  let read = false;
  let reached75 = false;

  const depth = () => {
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    return max <= 0 ? 100 : (window.scrollY / max) * 100;
  };
  const checkRead = () => {
    if (!read && reached75 && Date.now() - start >= 30000) {
      read = true;
      trackEvent("article_read", { article_slug: pathname });
    }
  };
  const onScroll = () => {
    const d = depth();
    for (const t of [25, 50, 75, 90]) {
      if (d >= t && !fired.has(t)) {
        fired.add(t);
        trackEvent(`scroll_${t}`, { article_slug: pathname });
      }
    }
    if (d >= 75) reached75 = true;
    checkRead();
  };
  const timer = window.setInterval(checkRead, 5000);

  const onClick = (e: MouseEvent) => {
    const el = (e.target as Element | null)?.closest?.("a, button") as HTMLElement | null;
    if (!el) return;
    const href = el.getAttribute("href") ?? "";
    const isCta =
      href.includes("#formulario") ||
      href.includes("wa.me") ||
      href.startsWith("tel:") ||
      href.startsWith("mailto:") ||
      el.classList.contains("btn-orange");
    if (!isCta) return;
    const text = (el.textContent ?? "").replace(/\s+/g, " ").trim().slice(0, 100);
    trackEvent("cta_click", { article_slug: pathname, cta_id: text });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  document.addEventListener("click", onClick, true);
  onScroll();
  return () => {
    window.removeEventListener("scroll", onScroll);
    document.removeEventListener("click", onClick, true);
    window.clearInterval(timer);
  };
}
