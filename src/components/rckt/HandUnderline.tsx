import type { ReactNode } from "react";

import { useInView } from "@/hooks/use-in-view";

/**
 * Palabra clave con un subrayado naranja dibujado a mano que se traza al entrar en pantalla.
 */
export function HandUnderline({ children }: { children: ReactNode }) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.15);

  return (
    <span ref={ref} className={`hand-underline ${inView ? "is-in" : ""}`}>
      <span className="hand-underline__text">{children}</span>
      <svg
        className="hand-underline__stroke"
        aria-hidden="true"
        viewBox="0 0 300 12"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M2 8.5C48 4.2 104 3.1 152 4.6c46 1.4 96 3.6 146 1.3"
          stroke="#E8672E"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </span>
  );
}

export default HandUnderline;
