import { useEffect, useState } from "react";
import { getConsent, setConsent } from "@/lib/meta-pixel";
import { denyAnalytics, loadAnalytics, OPEN_COOKIE_PREFS_EVENT } from "@/lib/analytics";

export default function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const consent = getConsent();
    if (consent === "granted") loadAnalytics();
    else if (consent === null) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_COOKIE_PREFS_EVENT, reopen);
    return () => window.removeEventListener(OPEN_COOKIE_PREFS_EVENT, reopen);
  }, []);

  if (!open) return null;

  const choose = (value: "granted" | "denied") => {
    setConsent(value);
    if (value === "granted") loadAnalytics();
    else denyAnalytics();
    setOpen(false);
  };

  return (
    <div className="cookie-consent" role="dialog" aria-label="Aviso de cookies">
      <p>
        RCKT usa cookies propias y de terceros (Google Analytics, Microsoft Clarity y Meta) para medir el uso del sitio y qué campañas funcionan. Puedes aceptarlas o rechazarlas.{" "}
        <a href="/legal/cookies">Más información</a>
      </p>
      <div className="cookie-consent__actions">
        <button type="button" className="cookie-consent__btn" onClick={() => choose("denied")}>Rechazar</button>
        <button type="button" className="cookie-consent__btn cookie-consent__btn--accept" onClick={() => choose("granted")}>Aceptar cookies</button>
      </div>
    </div>
  );
}
