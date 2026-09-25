import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";

const SECTION_SELECTOR = "main section";
const BLOB_CLASS = "section-blob";
const LIGHT_SURFACES = new Set(["rgb(245, 242, 237)", "rgb(247, 235, 225)"]);
const DARK_SURFACES = new Set(["rgb(33, 33, 33)", "rgba(245, 242, 237, 0.04)"]);

type BlobSpec = {
  type: "strong" | "soft";
  x: number;
  y: number;
  interior?: boolean;
  reducedCore?: boolean;
};

const layouts: Record<1 | 2 | 3, BlobSpec[][]> = {
  1: [
    [{ type: "strong", x: 85, y: 20 }],
    [{ type: "strong", x: 8, y: 50 }],
  ],
  2: [
    [{ type: "strong", x: 85, y: 20 }, { type: "soft", x: 10, y: 80 }],
    [{ type: "strong", x: 8, y: 50 }, { type: "soft", x: 90, y: 15 }],
  ],
  3: [
    [
      { type: "strong", x: 85, y: 20 },
      { type: "soft", x: 10, y: 80 },
      { type: "soft", x: 50, y: 55, interior: true, reducedCore: true },
    ],
    [
      { type: "strong", x: 8, y: 50 },
      { type: "soft", x: 90, y: 15 },
      { type: "soft", x: 50, y: 55, interior: true, reducedCore: true },
    ],
  ],
};

const removeBlobs = (section: HTMLElement) => {
  section.querySelectorAll<HTMLElement>(`:scope > .${BLOB_CLASS}`).forEach((blob) => blob.remove());
};

const hasLightSurface = (section: HTMLElement) => {
  const isDark =
    document.documentElement.classList.contains("dark") ||
    document.documentElement.dataset.theme === "dark";
  let element: HTMLElement | null = section;

  while (element) {
    const color = window.getComputedStyle(element).backgroundColor;
    if (color !== "rgba(0, 0, 0, 0)" && color !== "transparent") {
      return LIGHT_SURFACES.has(color) || (isDark && DARK_SURFACES.has(color));
    }
    element = element.parentElement;
  }

  return false;
};

const hasOnlyOrangeContent = (section: HTMLElement) => {
  const orangeBands = Array.from(section.querySelectorAll<HTMLElement>(".band--orange"));

  if (orangeBands.length > 0) {
    const copy = section.cloneNode(true) as HTMLElement;
    copy.querySelectorAll(`.${BLOB_CLASS}, .band--orange`).forEach((element) => element.remove());
    const remainingText = copy.textContent?.replace(/\s+/g, " ").trim() ?? "";
    const remainingContent = copy.querySelector("img, picture, video, form, article, ul, ol, table");
    if (remainingText.length === 0 && remainingContent === null) return true;
  }

  const contentChildren = Array.from(section.children).filter(
    (child) => !child.classList.contains(BLOB_CLASS) && child.getAttribute("aria-hidden") !== "true",
  ) as HTMLElement[];

  if (contentChildren.length !== 1) return false;
  const onlyChild = contentChildren[0];
  if (!onlyChild) return false;
  const sectionRect = section.getBoundingClientRect();
  const childRect = onlyChild.getBoundingClientRect();
  const background = `${onlyChild.style.background} ${window.getComputedStyle(onlyChild).backgroundImage}`;
  const isOrange = background.includes("252, 92, 31") || background.includes("#fc5c1f");
  const coversSection = childRect.width >= sectionRect.width * 0.9 && childRect.height >= sectionRect.height * 0.9;
  return isOrange && coversSection;
};

const isExcluded = (section: HTMLElement) =>
  section.matches(".system-page-hero, #top, .general-cta, .band--orange") ||
  section.querySelector(":scope > .hero-photo") !== null ||
  hasOnlyOrangeContent(section) ||
  !hasLightSurface(section);

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
        const mediumThreshold = 450;
        const longThreshold = 1100;

        sections.forEach((section, sectionIndex) => {
          const excluded = isExcluded(section);
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
          const pattern = sectionIndex % 2;
          const specs = layouts[count][pattern];

          section.dataset.blobCount = String(count);
          section.dataset.blobPattern = String(pattern);
          specs.forEach((spec, blobIndex) => {
            const blob = document.createElement("span");
            blob.className = `${BLOB_CLASS} ${BLOB_CLASS}--${spec.type} pointer-events-none`;
            blob.dataset.blobPosition = spec.interior ? "interior" : "edge";
            blob.dataset.blobIndex = String(blobIndex);
            blob.style.setProperty("--blob-x", `${spec.x}%`);
            blob.style.setProperty("--blob-y", `${spec.y}%`);

            if (spec.reducedCore || (spec.interior && isTextBehindPoint(section, spec.x, spec.y))) {
              blob.classList.add(`${BLOB_CLASS}--muted`);
            }

            section.append(blob);
          });
        });
      });
    };

    const connect = () => {
      sections = Array.from(document.querySelectorAll<HTMLElement>(SECTION_SELECTOR));
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