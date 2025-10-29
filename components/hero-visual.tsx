"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type HeroVisualProps = {
  title: string;
  subtitle: string;
  image?: {
    src: string;
    alt: string;
  };
  video?: {
    src: string;
    type?: string;
    poster?: string;
    alt?: string;
    preload?: "auto" | "metadata" | "none";
    sources?: Array<{
      src: string;
      type: string;
    }>;
  };
  primaryCta?: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
};

export function HeroVisual({
  title,
  subtitle,
  image,
  video,
  primaryCta,
  secondaryCta,
}: HeroVisualProps) {
  const mediaAlt = video?.alt ?? image?.alt ?? title;
  const heroRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [hasEntered, setHasEntered] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(() => !video);
  const composedVideoSources =
    video &&
    [
      ...(video.sources ?? []),
      video.src
        ? {
            src: video.src,
            type: video.type ?? "video/mp4",
          }
        : null,
    ].filter(
      (source): source is { src: string; type: string } => Boolean(source)
    );
  const videoSources =
    composedVideoSources &&
    Array.from(
      new Map(
        composedVideoSources.map((source) => [
          `${source.type}-${source.src}`,
          source,
        ])
      ).values()
    );

  useEffect(() => {
    if (!video) return;

    if (!image) {
      setShouldLoadVideo(true);
    }

    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;

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
      { rootMargin: "200px 0px", threshold: 0.1 }
    );

    observer.observe(heroSection);

    return () => observer.disconnect();
  }, [video, image]);

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
      { threshold: 0.3 }
    );

    observer.observe(card);

    return () => observer.disconnect();
  }, []);

  const cardClassName = [
    "rounded-[32px] bg-soft-gray/30 px-6 py-10 shadow-[0_24px_60px_rgba(32,32,32,0.12)] md:px-12 md:py-16",
    "transition-all duration-700 ease-out transform-gpu will-change-transform",
    hasEntered ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
  ].join(" ");
  const fallbackMediaSrc = image?.src ?? video?.poster;
  const activeVideo: HeroVisualProps["video"] | undefined =
    shouldLoadVideo && video ? video : undefined;

  return (
    <section className="relative isolate w-full">
      <div
        ref={heroRef}
        className="relative h-screen min-h-[520px] w-full overflow-hidden bg-carbon"
      >
        {activeVideo ? (
          <video
            poster={activeVideo.poster ?? image?.src}
            muted
            loop
            autoPlay
            playsInline
            preload={activeVideo.preload ?? "metadata"}
            className="h-full w-full object-cover"
            aria-label={mediaAlt}
          >
            {videoSources?.map(({ src, type }) => (
              <source key={`${type}-${src}`} src={src} type={type} />
            ))}
          </video>
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
        <div className="absolute bottom-8 left-8 rounded-2xl bg-off-white/80 px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-carbon backdrop-blur">
          City-01 · NightRide
        </div>
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
