"use client";

import { useEffect, useRef } from "react";

type PixelRevealOptions = {
  rootMargin?: string;
  threshold?: number;
};

/**
 * Adds a `data-pixel-reveal` attribute to the bound element and
 * flips it to `"visible"` once the element intersects the viewport.
 * The attribute hooks into the global pixel reveal animation styles.
 */
export function usePixelReveal<T extends HTMLElement>({
  rootMargin = "120px 0px",
  threshold = 0.35,
}: PixelRevealOptions = {}) {
  const elementRef = useRef<T | null>(null);

  useEffect(() => {
    const node = elementRef.current;
    if (!node) {
      return;
    }

    if (!node.hasAttribute("data-pixel-reveal")) {
      node.setAttribute("data-pixel-reveal", "hidden");
    }

    if (typeof window === "undefined") {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      node.setAttribute("data-pixel-reveal", "visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            node.setAttribute("data-pixel-reveal", "visible");
            observer.disconnect();
          }
        });
      },
      { rootMargin, threshold },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [rootMargin, threshold]);

  return elementRef;
}
