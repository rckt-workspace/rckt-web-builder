import { useEffect, useState } from "react";
import { getConsent, setConsent, loadMetaPixel } from "@/lib/meta-pixel";

export default function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const consent = getConsent();
    if (consent === "granted") loadMetaPixel();
    else if (consent === null) setOpen(true);
  }, []);

  if (!open) return null;

  const choose = (value: "granted" | "denied") => {
    setConsent(value);
    setOpen(false);
  };

  return (
    <div className="cookie-consent" role="dialog" aria-label="Aviso de cookies">
      <p>
        RCKT usa cookies propias y de terceros (Meta) para medir qué campañas funcionan. Puedes aceptarlas o rechazarlas.{" "}
        <a href="/legal/cookies">Más información</a>
      </p>
      <div className="cookie-consent__actions">
        <button type="button" className="cookie-consent__btn" onClick={() => choose("denied")}>Rechazar</button>
        <button type="button" className="cookie-consent__btn cookie-consent__btn--accept" onClick={() => choose("granted")}>Aceptar cookies</button>
      </div>
    </div>
  );
}