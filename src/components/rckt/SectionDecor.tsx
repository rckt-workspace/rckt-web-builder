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
    const frame = window.requestAnimationFrame(() => {
      setSections(
        Array.from(document.querySelectorAll<HTMLElement>("main > section"))
          .filter(
            (section) =>
              !section.matches("#top, .system-page-hero, .band--orange, :last-child"),
          )
          .map((el) => ({ el, tall: el.offsetHeight > 900 })),
      );
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  return sections.map(({ el, tall }, index) =>
    createPortal(
      <SectionBlobs variant={(["a", "b", "c"] as const)[index % 3]} tall={tall} />,
      el,
      `${pathname}-${index}`,
    ),
  );
}
