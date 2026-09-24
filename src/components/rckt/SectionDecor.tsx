import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useRouterState } from "@tanstack/react-router";

type SectionBlobsProps = {
  variant?: "a" | "b" | "c";
  tall?: boolean;
};

export function SectionBlobs({ variant = "a", tall = false }: SectionBlobsProps) {
  return (
    <div
      className={`section-blobs section-blobs--${variant}`}
      data-tall={tall ? "true" : "false"}
      aria-hidden="true"
    >
      <span className="section-blobs__mark section-blobs__mark--one" />
      <span className="section-blobs__mark section-blobs__mark--two" />
      <span className="section-blobs__mark section-blobs__mark--three" />
      <span className="section-blobs__mark section-blobs__mark--four" />
    </div>
  );
}

export function GlobalSectionBlobs() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [sections, setSections] = useState<{ el: HTMLElement; tall: boolean }[]>([]);

  useEffect(() => {
    const collect = () =>
      setSections((prev) => {
        const next = Array.from(document.querySelectorAll<HTMLElement>("main > section"))
          .filter(
            (section) =>
              !section.matches("#top, .system-page-hero, .band--orange, :last-child"),
          )
          .map((el) => ({ el, tall: el.offsetHeight > 900 }));
        const same =
          prev.length === next.length &&
          prev.every((p, i) => p.el === next[i].el && p.tall === next[i].tall);
        return same ? prev : next;
      });

    // Esperar a que la hidratación haya terminado (evento load) antes de
    // inyectar los portales, para no romper la hidratación de las secciones.
    let cleanup: (() => void) | null = null;
    const start = () => {
      const frame = window.requestAnimationFrame(collect);
      const timers = [300, 1000, 2500].map((ms) => window.setTimeout(collect, ms));
      window.addEventListener("resize", collect);
      cleanup = () => {
        window.cancelAnimationFrame(frame);
        timers.forEach((t) => window.clearTimeout(t));
        window.removeEventListener("resize", collect);
      };
    };
    if (document.readyState === "complete") {
      start();
    } else {
      window.addEventListener("load", start, { once: true });
    }

    return () => {
      window.removeEventListener("load", start);
      cleanup?.();
    };
  }, [pathname]);

  return sections.map(({ el, tall }, index) =>
    createPortal(
      <SectionBlobs variant={(["a", "b", "c"] as const)[index % 3]} tall={tall} />,
      el,
      `${pathname}-${index}`,
    ),
  );
}
