import { useEffect, useRef, useState } from "react";

type UseInViewOptions = {
  threshold?: number;
  rootMargin?: string;
  fallbackMs?: number;
};

/** Devuelve una ref y si el elemento ya entró en pantalla (una sola vez). */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: number | UseInViewOptions = {},
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  const threshold = typeof options === "number" ? options : (options.threshold ?? 0.15);
  const rootMargin = typeof options === "number" ? "0px 0px -5% 0px" : (options.rootMargin ?? "0px 0px -5% 0px");
  const fallbackMs = typeof options === "number" ? undefined : options.fallbackMs;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rect = el.getBoundingClientRect();
    const visibleBottom = window.innerHeight * 0.95;
    if (reduceMotion || (rect.top < visibleBottom && rect.bottom > 0)) {
      setInView(true);
      return;
    }
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true);
            obs.disconnect();
          }
        }
      },
      { threshold, rootMargin },
    );
    obs.observe(el);
    const fallback = fallbackMs
      ? window.setTimeout(() => {
          setInView(true);
          obs.disconnect();
        }, fallbackMs)
      : undefined;
    return () => {
      obs.disconnect();
      if (fallback !== undefined) window.clearTimeout(fallback);
    };
  }, [fallbackMs, rootMargin, threshold]);

  return { ref, inView };
}

export default useInView;
