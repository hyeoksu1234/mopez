"use client";

import Image from "next/image";
import { usePixelReveal } from "@/hooks/use-pixel-reveal";

type StoryBlockProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  copy: string;
  image: {
    src: string;
    alt: string;
    orientation?: "left" | "right";
  };
};

export function StoryBlock({
  id,
  eyebrow,
  title,
  copy,
  image,
}: StoryBlockProps) {
  const imageLeft = image.orientation === "left";
  const mediaRevealRef = usePixelReveal<HTMLDivElement>();

  return (
    <section
      id={id}
      className="grid items-center gap-8 rounded-[28px] border border-electric-blue/15 bg-off-white px-6 py-10 shadow-[0_10px_30px_rgba(17,17,17,0.08)] md:grid-cols-[1.05fr,1fr] md:px-12 md:py-14"
    >
      <div
        className={`order-2 flex flex-col gap-4 ${
          imageLeft ? "md:order-2" : "md:order-1"
        }`}
      >
        {eyebrow && (
          <span className="w-fit rounded-full bg-electric-yellow/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-electric-yellow">
            {eyebrow}
          </span>
        )}
        <h3 className="font-display text-[clamp(1.8rem,2.4vw,2.6rem)] leading-tight text-electric-blue">
          {title}
        </h3>
        <p className="text-base leading-relaxed text-ink">{copy}</p>
      </div>

      <div
        ref={mediaRevealRef}
        data-pixel-reveal="hidden"
        className={`relative order-1 overflow-hidden rounded-[24px] aspect-[16/9] md:max-w-none ${
          imageLeft ? "md:order-1" : "md:order-2"
        }`}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="pixel-reveal-media object-cover"
          sizes="(max-width: 768px) 95vw, (min-width: 1024px) 52vw, 52vw"
        />
      </div>
    </section>
  );
}
