"use client";

import { useEffect, useState } from "react";
import type { RefObject } from "react";

export function usePuzzleGridProgress(
  gridRef: RefObject<HTMLElement | null>,
) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const node = gridRef.current;

    if (!node || typeof window === "undefined") {
      return;
    }

    const motionMediaQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    if (motionMediaQuery.matches) {
      node.style.setProperty("--puzzle-progress", "1");
      setProgress(1);
      return;
    }

    let frame = 0;
    let previousValue = -1;

    const updateProgress = () => {
      frame = 0;
      const element = gridRef.current;
      if (!element) {
        return;
      }

      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      if (viewportHeight <= 0) {
        return;
      }

      const startLine = viewportHeight * 0.9;
      const endLine = viewportHeight * 0.35;
      const range = Math.max(startLine - endLine, 1);
      let raw = (startLine - rect.top) / range;

      if (rect.bottom <= viewportHeight * 0.6) {
        raw = 1;
      }

      const clamped = Math.max(0, Math.min(1, raw));

      if (Math.abs(clamped - previousValue) > 0.012 || clamped === 0 || clamped === 1) {
        previousValue = clamped;
        element.style.setProperty(
          "--puzzle-progress",
          clamped.toFixed(3),
        );
        setProgress(clamped);
      }
    };

    const requestUpdate = () => {
      if (frame !== 0) {
        return;
      }
      frame = window.requestAnimationFrame(updateProgress);
    };

    requestUpdate();

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    const handleMotionPreference = (event: MediaQueryListEvent) => {
      if (event.matches) {
        const element = gridRef.current;
        if (element) {
          element.style.setProperty("--puzzle-progress", "1");
        }
        setProgress(1);
        window.removeEventListener("scroll", requestUpdate);
        window.removeEventListener("resize", requestUpdate);
      } else {
        previousValue = -1;
        requestUpdate();
        window.addEventListener("scroll", requestUpdate, { passive: true });
        window.addEventListener("resize", requestUpdate);
      }
    };

    motionMediaQuery.addEventListener("change", handleMotionPreference);

    return () => {
      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
      }
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      motionMediaQuery.removeEventListener("change", handleMotionPreference);
    };
  }, [gridRef]);

  return progress;
}
