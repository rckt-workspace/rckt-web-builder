export const META_PIXEL_ID = "1568790304997222";
const CONSENT_KEY = "rckt-cookie-consent";
type FbqWindow = Window & { fbq?: (...args: unknown[]) => void };

export function getConsent(): "granted" | "denied" | null {
  try {
    const value = localStorage.getItem(CONSENT_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

export function setConsent(value: "granted" | "denied") {
  try { localStorage.setItem(CONSENT_KEY, value); } catch { /* almacenamiento bloqueado */ }
  if (value === "granted") loadMetaPixel();
}

// Solo carga el píxel si la persona aceptó las cookies (RGPD).
export function loadMetaPixel() {
  if (typeof window === "undefined" || getConsent() !== "granted") return;
  const w = window as FbqWindow;
  if (w.fbq) return;
  const script = document.createElement("script");
  script.text = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`;
  document.head.appendChild(script);
}

export function trackMeta(event: string, data: Record<string, unknown> = {}, custom = false) {
  if (typeof window === "undefined" || getConsent() !== "granted") return;
  const w = window as FbqWindow;
  if (!w.fbq) return;
  const eventID = `${event}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  w.fbq(custom ? "trackCustom" : "track", event, data, { eventID });
}