import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";

const BLOB_SELECTOR = "main > section:not(.system-page-hero):not(#top):not(.general-cta):not(:last-child)";
const BLOB_CLASS = "section-blob";

type BlobSpec = {
  type: "strong" | "soft";
  x: number;
  y: number;
  interior?: boolean;
};

const layouts: Record<1 | 2 | 3, BlobSpec[][]> = {
  1: [
    [{ type: "strong", x: 14, y: 52 }],
    [{ type: "soft", x: 86, y: 48 }],
  ],
  2: [
    [{ type: "soft", x: 14, y: 28 }, { type: "strong", x: 58, y: 68, interior: true }],
    [{ type: "strong", x: 86, y: 30 }, { type: "soft", x: 42, y: 64, interior: true }],
  ],
  3: [
    [
      { type: "strong", x: 14, y: 22 },
      { type: "soft", x: 56, y: 52, interior: true },
      { type: "strong", x: 86, y: 78 },
    ],
    [
      { type: "soft", x: 86, y: 20 },
      { type: "strong", x: 44, y: 50, interior: true },
      { type: "soft", x: 14, y: 80 },
    ],
  ],
};

const removeBlobs = (section: HTMLElement) => {
  section.querySelectorAll<HTMLElement>(`:scope > .${BLOB_CLASS}`).forEach((blob) => blob.remove());
};

const isTextBehindPoint = (section: HTMLElement, x: number, y: number) => {
  const sectionRect = section.getBoundingClientRect();
  const pointX = sectionRect.left + (sectionRect.width * x) / 100;
  const pointY = sectionRect.top + (sectionRect.height * y) / 100;
  const textBlocks = section.querySelectorAll<HTMLElement>("h1, h2, h3, p");

  return Array.from(textBlocks).some((block) => {
    if (block.tagName === "P" && (block.textContent?.trim().length ?? 0) < 100) return false;
    const rect = block.getBoundingClientRect();
    return pointX >= rect.left && pointX <= rect.right && pointY >= rect.top && pointY <= rect.bottom;
  });
};

export default function GlobalSectionBlobs() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  useEffect(() => {
    let frame = 0;
    let timer = 0;
    let sections: HTMLElement[] = [];

    const classify = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const isMobile = window.innerWidth < 768;
        const mediumThreshold = isMobile ? 360 : 450;
        const longThreshold = isMobile ? 880 : 1100;
        let patternIndex = 0;

        sections.forEach((section) => {
          const excluded = section.querySelector(".band--orange") !== null;
          section.classList.toggle("blob-section", !excluded);
          section.toggleAttribute("data-no-blobs", excluded);
          removeBlobs(section);

          if (excluded) {
            section.removeAttribute("data-blob-count");
            section.removeAttribute("data-blob-pattern");
            return;
          }

          const height = section.getBoundingClientRect().height;
          const count: 1 | 2 | 3 = height < mediumThreshold ? 1 : height <= longThreshold ? 2 : 3;
          const pattern = patternIndex % 2;
          const specs = layouts[count][pattern];

          section.dataset.blobCount = String(count);
          section.dataset.blobPattern = String(pattern);
          specs.forEach((spec, blobIndex) => {
            const isEdge = !spec.interior;
            const blobSize = spec.type === "strong" ? 430 : 620;
            const edgeOffset = blobSize * 0.25;
            const edgeX = spec.x < 50 ? edgeOffset : section.clientWidth - edgeOffset;
            const blob = document.createElement("span");
            blob.className = `${BLOB_CLASS} ${BLOB_CLASS}--${spec.type} pointer-events-none`;
            blob.dataset.blobPosition = spec.interior ? "interior" : "edge";
            blob.dataset.blobIndex = String(blobIndex);
            blob.style.setProperty("--blob-x", isEdge ? `${edgeX}px` : `${spec.x}%`);
            blob.style.setProperty("--blob-y", `${spec.y}%`);

            if (spec.interior && spec.type === "strong" && isTextBehindPoint(section, spec.x, spec.y)) {
              blob.classList.add(`${BLOB_CLASS}--muted`);
            }

            section.append(blob);
          });
          patternIndex += 1;
        });
      });
    };

    const connect = () => {
      sections = Array.from(document.querySelectorAll<HTMLElement>(BLOB_SELECTOR));
      const observer = new ResizeObserver(classify);
      sections.forEach((section) => observer.observe(section));
      classify();
      return observer;
    };

    let observer: ResizeObserver | null = null;
    timer = window.setTimeout(() => {
      observer = connect();
    }, 100);
    window.addEventListener("resize", classify, { passive: true });

    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener("resize", classify);
      sections.forEach((section) => {
        removeBlobs(section);
        section.classList.remove("blob-section");
        section.removeAttribute("data-blob-count");
        section.removeAttribute("data-blob-pattern");
        section.removeAttribute("data-no-blobs");
      });
    };
  }, [pathname]);

  return null;
}