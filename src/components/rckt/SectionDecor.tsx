import type { CSSProperties } from "react";

/** Mancha naranja difuminada reutilizable. Conserva la API para no alterar layouts. */
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
      className={`brand-mark ${variant === "corner" ? "brand-mark--a" : "brand-mark--b"}`}
      style={style}
    />
  );
}

/** Mancha naranja difuminada reutilizable. */
export function Blob({ style, shape = 1 }: { style?: CSSProperties; shape?: 1 | 2 }) {
  return (
    <div
      aria-hidden="true"
      className={`brand-mark ${shape === 1 ? "brand-mark--b" : "brand-mark--c"}`}
      style={style}
    />
  );
}

export default DotGrid;
