import { formatInTimeZone, fromZonedTime, toZonedTime } from "date-fns-tz";
import { format, parse } from "date-fns";
import { es } from "date-fns/locale";

export const BLOG_TIME_ZONE = "Europe/Madrid";

/**
 * Convierte ISO UTC a datetime-local string en Madrid
 * Entrada: "2026-10-07T15:30:00.000Z"
 * Salida: "2026-10-07T17:30" (si Madrid es UTC+2)
 */
export function isoToMadridDateTimeLocal(iso: string | null | undefined): string {
  if (!iso) return "";
  try {
    const date = new Date(iso);
    const zoned = toZonedTime(date, BLOG_TIME_ZONE);
    return format(zoned, "yyyy-MM-dd'T'HH:mm");
  } catch {
    return "";
  }
}

/**
 * Convierte datetime-local de Madrid a ISO UTC
 * Entrada: "2026-10-07T17:30"
 * Interpreta como Europe/Madrid
 * Salida: "2026-10-07T15:30:00.000Z"
 *
 * Valida con round-trip:
 * Madrid local → UTC → Madrid local
 * Si no coinciden, es inválido (hora inexistente durante cambio DST)
 */
export function madridDateTimeLocalToIso(value: string): string | null {
  if (!value || typeof value !== "string") return null;

  try {
    // Parse el valor como si fuera un datetime-local (sin timezone)
    const parsed = parse(value, "yyyy-MM-dd'T'HH:mm", new Date());

    // Interpretar explícitamente en Europe/Madrid
    const utc = fromZonedTime(parsed, BLOG_TIME_ZONE);
    const isoString = utc.toISOString();

    // Validar round-trip para detectar horas inexistentes (cambio DST)
    const roundTrip = isoToMadridDateTimeLocal(isoString);

    // Normalizar para comparación (a veces hay diferencias de precisión)
    const normalizedInput = value.replace(/\s+/g, "");
    const normalizedRoundTrip = roundTrip.replace(/\s+/g, "");

    if (normalizedInput !== normalizedRoundTrip) {
      return null; // Hora inválida (probablemente DST jump)
    }

    return isoString;
  } catch {
    return null;
  }
}

/**
 * Formatea ISO UTC como fecha en Madrid
 * style: "short" → "07 oct 2026"
 * style: "long" → "7 de octubre de 2026"
 */
export function formatBlogDateMadrid(
  iso: string | null | undefined,
  style: "short" | "long" = "short",
): string {
  if (!iso) return "";

  try {
    const date = new Date(iso);
    const zoned = toZonedTime(date, BLOG_TIME_ZONE);

    if (style === "short") {
      return format(zoned, "dd MMM yyyy", { locale: es }).toLowerCase();
    }

    return format(zoned, "d 'de' MMMM 'de' yyyy", { locale: es }).toLowerCase();
  } catch {
    return "";
  }
}

/**
 * Formatea ISO UTC como fecha y hora en Madrid
 * Ejemplo: "7 oct 2026, 17:30"
 */
export function formatBlogDateTimeMadrid(iso: string | null | undefined): string {
  if (!iso) return "";

  try {
    const date = new Date(iso);
    const zoned = toZonedTime(date, BLOG_TIME_ZONE);
    return format(zoned, "d MMM yyyy', 'HH:mm", { locale: es }).toLowerCase();
  } catch {
    return "";
  }
}

/**
 * Verifica si published_at está en el futuro
 * Útil para determinar si es "Programado"
 */
export function isScheduledPublish(publishedAt: string | null | undefined): boolean {
  if (!publishedAt) return false;
  try {
    const publishDate = new Date(publishedAt);
    const now = new Date();
    return publishDate > now;
  } catch {
    return false;
  }
}
