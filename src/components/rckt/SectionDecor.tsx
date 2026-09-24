import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useRouterState } from "@tanstack/react-router";

type SectionBlobsProps = {
  variant?: "a" | "b" | "c";
};

export function SectionBlobs({ variant = "a" }: SectionBlobsProps) {
  return (
    <div className={`section-blobs section-blobs--${variant}`} aria-hidden="true">
      <span className="section-blobs__mark section-blobs__mark--one" />
      <span className="section-blobs__mark section-blobs__mark--two" />
      <span className="section-blobs__mark section-blobs__mark--three" />
    </div>
  );
}

export function GlobalSectionBlobs() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [sections, setSections] = useState<HTMLElement[]>([]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setSections(
        Array.from(document.querySelectorAll<HTMLElement>("main > section")).filter(
          (section) =>
            !section.matches("#top, .system-page-hero, .band--orange, :last-child"),
        ),
      );
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  return sections.map((section, index) =>
    createPortal(
      <SectionBlobs variant={(["a", "b", "c"] as const)[index % 3]} />,
      section,
      `${pathname}-${index}`,
    ),
  );
}

/** Compatibilidad temporal para páginas existentes; las manchas se montan globalmente. */
export function DotGrid() {
  return null;
}

/** Compatibilidad temporal para páginas existentes; las manchas se montan globalmente. */
export function Blob() {
  return null;
}
