import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";

const BLOB_SELECTOR = "main > section:not(.system-page-hero):not(#top):not(.general-cta):not(:last-child)";

export default function GlobalSectionBlobs() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  useEffect(() => {
    let frame = 0;
    let sections: HTMLElement[] = [];

    const classify = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const threshold = window.innerWidth < 768 ? 600 : 700;
        let shortIndex = 0;

        sections.forEach((section, index) => {
          const excluded = section.querySelector(".band--orange") !== null;
          section.classList.toggle("blob-section", !excluded);
          section.toggleAttribute("data-no-blobs", excluded);

          if (excluded) {
            section.removeAttribute("data-blobs");
            section.removeAttribute("data-blob-side");
            return;
          }

          const isLong = section.getBoundingClientRect().height >= threshold;
          section.dataset.blobs = isLong ? "long" : shortIndex++ % 2 === 0 ? "strong" : "soft";
          section.dataset.blobSide = index % 2 === 0 ? "right" : "left";
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

    const observer = connect();
    window.addEventListener("resize", classify, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", classify);
      sections.forEach((section) => {
        section.classList.remove("blob-section");
        section.removeAttribute("data-blobs");
        section.removeAttribute("data-blob-side");
        section.removeAttribute("data-no-blobs");
      });
    };
  }, [pathname]);

  return null;
}