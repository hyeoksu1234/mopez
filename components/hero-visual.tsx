"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type HeroVideoSource = {
  src: string;
  type: string;
};

type HeroVideoAsset = {
  id?: string;
  src: string;
  type?: string;
  poster?: string;
  alt?: string;
  preload?: "auto" | "metadata" | "none";
  sources?: HeroVideoSource[];
  label?: string;
};

type HeroVisualProps = {
  title: string;
  subtitle: string;
  image?: {
    src: string;
    alt: string;
  };
  video?: HeroVideoAsset;
  videos?: HeroVideoAsset[];
  primaryCta?: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
};

const DEFAULT_LABEL = "City-01 · NightRide";

function dedupeSources(video: HeroVideoAsset) {
  const composed = [
    ...(video.sources ?? []),
    {
      src: video.src,
      type: video.type ?? "video/mp4",
    },
  ];

  return Array.from(
    new Map(
      composed.map(({ src, type }) => [
        `${type}-${src}`,
        { src, type },
      ]),
    ).values(),
  );
}

export function HeroVisual({
  title,
  subtitle,
  image,
  video,
  videos,
  primaryCta,
  secondaryCta,
}: HeroVisualProps) {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const swipeState = useRef<{
    pointerId: number | null;
    startX: number;
    startY: number;
    handled: boolean;
  }>({
    pointerId: null,
    startX: 0,
    startY: 0,
    handled: false,
  });

  const playlist = useMemo(() => {
    const base = videos?.length
      ? videos
      : video
        ? [video]
        : [];

    return base.map((item, index) => ({
      ...item,
      id: item.id ?? `hero-video-${index}`,
    }));
  }, [videos, video]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(
    () => playlist.length === 0,
  );
  const [hasEntered, setHasEntered] = useState(false);

  const currentSlide = playlist[activeIndex] ?? playlist[0];
  const mediaAlt =
    currentSlide?.alt ?? image?.alt ?? playlist[0]?.alt ?? title;
  const activeLabel =
    currentSlide?.label ?? playlist[0]?.label ?? DEFAULT_LABEL;
  const fallbackMediaSrc =
    image?.src ??
    currentSlide?.poster ??
    currentSlide?.src ??
    playlist[0]?.poster ??
    playlist[0]?.src;

  useEffect(() => {
    if (!playlist.length) {
      if (activeIndex !== 0) {
        setActiveIndex(0);
      }
      setShouldLoadVideo(false);
      return;
    }

    if (activeIndex >= playlist.length) {
      setActiveIndex(0);
    }
  }, [playlist, activeIndex]);

  useEffect(() => {
    if (!playlist.length) {
      return;
    }

    if (!image) {
      setShouldLoadVideo(true);
    }

    if (typeof window === "undefined") return;

    const prefersReducedMotion =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ??
      false;

    const connection = (navigator as Navigator & {
      connection?: {
        saveData?: boolean;
        effectiveType?: string;
      };
    }).connection;

    const isConnectionLimited =
      Boolean(connection?.saveData) ||
      (connection?.effectiveType
        ? ["slow-2g", "2g"].includes(connection.effectiveType)
        : false);

    if (prefersReducedMotion || isConnectionLimited) {
      return;
    }

    const heroSection = heroRef.current;
    if (!heroSection) {
      setShouldLoadVideo(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoadVideo(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: "200px 0px", threshold: 0.1 },
    );

    observer.observe(heroSection);

    return () => observer.disconnect();
  }, [playlist, image]);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasEntered(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 },
    );

    observer.observe(card);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoadVideo || playlist.length <= 1) {
      return;
    }

    if (typeof window === "undefined") {
      return;
    }

    const prefersReducedMotion =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ??
      false;

    if (prefersReducedMotion) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((previous) => (previous + 1) % playlist.length);
    }, 9000);

    return () => window.clearInterval(timer);
  }, [shouldLoadVideo, playlist.length]);

  useEffect(() => {
    if (!shouldLoadVideo || !playlist.length) {
      return;
    }

    const currentVideo = videoRefs.current[activeIndex];
    if (!currentVideo) {
      return;
    }

    const playVideo = () => {
      currentVideo.currentTime = 0;
      currentVideo.play().catch(() => {});
    };

    videoRefs.current.forEach((videoEl, index) => {
      if (!videoEl || index === activeIndex) {
        return;
      }
      videoEl.pause();
    });

    if (currentVideo.readyState >= 2) {
      playVideo();
      return;
    }

    const handleCanPlay = () => {
      currentVideo.removeEventListener("canplay", handleCanPlay);
      playVideo();
    };

    currentVideo.addEventListener("canplay", handleCanPlay);

    return () => {
      currentVideo.removeEventListener("canplay", handleCanPlay);
    };
  }, [activeIndex, shouldLoadVideo, playlist.length]);

  const handleNext = useCallback(() => {
    if (playlist.length <= 1) return;
    setActiveIndex((prev) => (prev + 1) % playlist.length);
  }, [playlist.length]);

  const handlePrev = useCallback(() => {
    if (playlist.length <= 1) return;
    setActiveIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
  }, [playlist.length]);

  const handleSelect = useCallback(
    (index: number) => {
      if (index === activeIndex) return;
      setActiveIndex(index);
    },
    [activeIndex],
  );

  useEffect(() => {
    const node = heroRef.current;
    if (!node || playlist.length <= 1) {
      return;
    }

    const state = swipeState.current;

    const handlePointerDown = (event: PointerEvent) => {
      if (event.pointerType === "mouse" && event.button !== 0) {
        return;
      }
      state.pointerId = event.pointerId;
      state.startX = event.clientX;
      state.startY = event.clientY;
      state.handled = false;
      node.setPointerCapture?.(event.pointerId);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (state.pointerId !== event.pointerId) {
        return;
      }
      const dx = event.clientX - state.startX;
      const dy = event.clientY - state.startY;
      if (!state.handled && Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 12) {
        state.handled = true;
      }
      if (state.handled && Math.abs(dx) > Math.abs(dy)) {
        event.preventDefault();
      }
    };

    const handlePointerEnd = (event: PointerEvent) => {
      if (state.pointerId !== event.pointerId) {
        return;
      }
      node.releasePointerCapture?.(event.pointerId);
      const dx = event.clientX - state.startX;
      const dy = event.clientY - state.startY;
      state.pointerId = null;
      const horizontal = Math.abs(dx) > Math.abs(dy);
      if (horizontal && Math.abs(dx) > 60) {
        if (dx < 0) {
          handleNext();
        } else {
          handlePrev();
        }
      }
    };

    const handlePointerCancel = (event: PointerEvent) => {
      if (state.pointerId !== event.pointerId) {
        return;
      }
      node.releasePointerCapture?.(event.pointerId);
      state.pointerId = null;
    };

    node.addEventListener("pointerdown", handlePointerDown);
    node.addEventListener("pointermove", handlePointerMove, { passive: false });
    node.addEventListener("pointerup", handlePointerEnd);
    node.addEventListener("pointercancel", handlePointerCancel);

    return () => {
      node.removeEventListener("pointerdown", handlePointerDown);
      node.removeEventListener("pointermove", handlePointerMove);
      node.removeEventListener("pointerup", handlePointerEnd);
      node.removeEventListener("pointercancel", handlePointerCancel);
    };
  }, [playlist.length, handleNext, handlePrev]);

  const cardClassName = [
    "rounded-[32px] bg-soft-gray/30 px-6 py-10 shadow-[0_24px_60px_rgba(32,32,32,0.12)] md:px-12 md:py-16",
    "transition-all duration-700 ease-out transform-gpu will-change-transform",
    hasEntered ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
  ].join(" ");

  const isVideoActive = shouldLoadVideo && playlist.length > 0;

  return (
    <section className="relative isolate w-full">
      <div
        ref={heroRef}
        className="relative h-screen min-h-[520px] w-full overflow-hidden bg-carbon"
        style={playlist.length > 1 ? { touchAction: "pan-y" } : undefined}
      >
        {isVideoActive ? (
          <div className="absolute inset-0">
            {playlist.map((slide, index) => {
              const sources = dedupeSources(slide);
              const isActive = index === activeIndex;

              return (
                <video
                  key={slide.id}
                  ref={(element) => {
                    videoRefs.current[index] = element;
                  }}
                  poster={slide.poster ?? image?.src}
                  muted
                  loop
                  playsInline
                  preload={slide.preload ?? "metadata"}
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[900ms] ease-out ${
                    isActive ? "opacity-100" : "pointer-events-none opacity-0"
                  }`}
                  aria-label={slide.alt ?? title}
                >
                  {sources.map(({ src, type }) => (
                    <source key={`${type}-${src}`} src={src} type={type} />
                  ))}
                </video>
              );
            })}
          </div>
        ) : fallbackMediaSrc ? (
          <Image
            src={fallbackMediaSrc}
            alt={mediaAlt}
            fill
            className="object-cover"
            priority
          />
        ) : null}
        <div
          className="absolute inset-0 bg-gradient-to-b from-carbon/10 via-carbon/10 to-carbon/70"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-8 left-8 rounded-2xl bg-off-white/80 px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-carbon backdrop-blur transition"
          aria-live="polite"
        >
          {activeLabel}
        </div>
        {playlist.length > 1 && (
          <div className="absolute bottom-8 right-8 flex items-center gap-3 text-off-white">
            <button
              type="button"
              onClick={handlePrev}
              className="grid h-10 w-10 place-items-center rounded-full bg-off-white/80 text-carbon shadow-lg transition hover:bg-off-white"
              aria-label="이전 영상"
            >
              ‹
            </button>
            <div className="flex items-center gap-1.5">
              {playlist.map((slide, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => handleSelect(index)}
                    className={`h-2.5 w-2.5 rounded-full transition ${
                      isActive
                        ? "bg-off-white"
                        : "bg-off-white/40 hover:bg-off-white/75"
                    }`}
                    aria-label={`영상 ${index + 1} 보기`}
                    aria-pressed={isActive}
                  />
                );
              })}
            </div>
            <button
              type="button"
              onClick={handleNext}
              className="grid h-10 w-10 place-items-center rounded-full bg-off-white/80 text-carbon shadow-lg transition hover:bg-off-white"
              aria-label="다음 영상"
            >
              ›
            </button>
          </div>
        )}
        <div
          className={`absolute bottom-10 left-1/2 -translate-x-1/2 text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-off-white/80 transition-opacity duration-500 ${
            hasEntered ? "opacity-0" : "opacity-80"
          }`}
        >
          Scroll
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 pb-16 pt-12 md:pt-16">
        <div ref={cardRef} className={cardClassName}>
          <div className="space-y-6">
            <span className="inline-block rounded-2xl border border-electric-blue/30 px-4 py-1 text-xs font-medium uppercase tracking-[0.3em] text-electric-blue">
              모듈은 자유다
            </span>
            <h1 className="font-display text-[clamp(2.6rem,3.6vw,4.2rem)] leading-[1.06] text-carbon">
              {title}
            </h1>
            <p className="max-w-2xl text-lg text-ink">{subtitle}</p>
          </div>

          {(primaryCta || secondaryCta) && (
            <div className="mt-8 flex flex-wrap gap-3">
              {primaryCta && (
                <Link
                  href={primaryCta.href}
                  className="rounded-2xl bg-electric-yellow px-6 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-off-white transition hover:bg-electric-blue"
                >
                  {primaryCta.label}
                </Link>
              )}
              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className="rounded-2xl border border-electric-blue px-6 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-electric-blue transition hover:bg-electric-blue hover:text-off-white"
                >
                  {secondaryCta.label}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
