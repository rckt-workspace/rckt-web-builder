import { useInView } from "@/hooks/use-in-view";

/**
 * Nota manuscrita al margen del titular, con flecha curva dibujada a mano.
 * En móvil: debajo del titular, alineada a la izquierda y sin flecha.
 */
export function HandNote({ text, className = "" }: { text: string; className?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);

  return (
    <div
      ref={ref}
      className={`hand-note ${inView ? "is-in" : ""} ${className}`}
    >
      <svg
        className="hand-note__arrow"
        aria-hidden="true"
        width="86"
        height="52"
        viewBox="0 0 86 52"
        fill="none"
      >
        <path
          d="M82 8C64 2 34 4 16 20c-5 4-9 10-9 16"
          stroke="#E8672E"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M2 28l5 9 9-4"
          stroke="#E8672E"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
      <span className="hand-note__text">{text}</span>
    </div>
  );
}

export default HandNote;
