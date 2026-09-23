import type { CSSProperties } from "react";

/** Trama de puntos reutilizable: en una esquina o cubriendo toda la sección. */
export function DotGrid({
  variant = "corner",
  style,
}: {
  variant?: "corner" | "full";
  style?: CSSProperties;
}) {
  return (
    <div
      aria-hidden="true"
      className={variant === "corner" ? "sec-dots-corner" : "sec-dots-full"}
      style={style}
    />
  );
}

/** Mancha orgánica sólida (sin blur) detrás del contenido. */
export function Blob({ style, shape = 1 }: { style?: CSSProperties; shape?: 1 | 2 }) {
  return (
    <div
      aria-hidden="true"
      className={shape === 1 ? "sec-blob sec-blob--a" : "sec-blob sec-blob--b"}
      style={style}
    />
  );
}

export default DotGrid;
