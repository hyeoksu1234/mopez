"use client";

import { useMemo, useRef } from "react";
import Image from "next/image";
import { usePixelReveal } from "@/hooks/use-pixel-reveal";
import { usePuzzleGridProgress } from "@/hooks/use-puzzle-grid";
import type { PhotoTile } from "@/data/photos";
import type { CSSProperties } from "react";

type PhotoMosaicProps = {
  photos: PhotoTile[];
};

const tileClassMap: Record<PhotoTile["layout"], string> = {
  square: "",
  portrait: "row-span-2",
  landscape: "col-span-2",
};

type TagVariant = {
  showModuleTag: boolean;
  showSceneTag: boolean;
  order: "module-first" | "scene-first";
};

const tagVariants: TagVariant[] = [
  { showModuleTag: true, showSceneTag: true, order: "module-first" },
  { showModuleTag: true, showSceneTag: false, order: "module-first" },
  { showModuleTag: false, showSceneTag: true, order: "scene-first" },
  { showModuleTag: true, showSceneTag: true, order: "scene-first" },
  { showModuleTag: true, showSceneTag: false, order: "module-first" },
  { showModuleTag: false, showSceneTag: true, order: "scene-first" },
];

function getTagVariant(id: string, index: number): TagVariant {
  const hash = Array.from(id).reduce(
    (acc, char) => acc + char.charCodeAt(0),
    0,
  );
  return tagVariants[(hash + index) % tagVariants.length];
}

const DEFAULT_STROKE_CLASS = "border-[6px] border-electric-blue";

const strokeVariants: Array<string | null> = [
  null,
  null,
  DEFAULT_STROKE_CLASS,
  DEFAULT_STROKE_CLASS,
  DEFAULT_STROKE_CLASS,
];

function getStrokeVariant(photo: PhotoTile, index: number): string | null {
  if (photo.disableStroke) {
    return null;
  }

  if (photo.forceStroke) {
    return DEFAULT_STROKE_CLASS;
  }

  const hash = Array.from(photo.id).reduce(
    (acc, char) => acc + (char.charCodeAt(0) % 13),
    0,
  );

  return strokeVariants[(hash + index * 3) % strokeVariants.length];
}

type GeneratedTag = {
  id: string;
  label: string;
  className: string;
};

type PuzzlePlan = {
  xSteps: number;
  ySteps: number;
  firstAxis: "x-first" | "y-first";
  switchPoint: number;
  delay: number;
  duration: number;
  tilt: number;
};

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function hashFromId(id: string, index: number) {
  let hash = 0;
  const key = `${id}-${index}`;
  for (let i = 0; i < key.length; i += 1) {
    hash = (hash << 5) - hash + key.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function randomInRange(seed: number, min: number, max: number) {
  return min + seededRandom(seed) * (max - min);
}

function clamp(value: number, min = 0, max = 1) {
  if (value < min) {
    return min;
  }
  if (value > max) {
    return max;
  }
  return value;
}

function easeOutCubic(x: number) {
  return 1 - Math.pow(1 - x, 3);
}

function getPuzzlePlan(photo: PhotoTile, index: number): PuzzlePlan {
  const base = hashFromId(photo.id, index) + index * 19;

  const chooseStep = (seed: number): number => {
    const r = seededRandom(seed);
    if (r < 0.38) {
      return 0;
    }
    if (r > 0.73) {
      return 1;
    }
    return -1;
  };

  let xSteps = chooseStep(base + 5);
  let ySteps = chooseStep(base + 11);

  if (xSteps === 0 && ySteps === 0) {
    if (seededRandom(base + 17) > 0.5) {
      xSteps = chooseStep(base + 23);
    } else {
      ySteps = chooseStep(base + 29);
    }
  }

  xSteps = Math.max(-1, Math.min(1, xSteps === 0 ? chooseStep(base + 31) : xSteps));
  ySteps = Math.max(-1, Math.min(1, ySteps === 0 ? chooseStep(base + 33) : ySteps));

  const firstAxis: "x-first" | "y-first" =
    seededRandom(base + 37) > 0.5 ? "x-first" : "y-first";
  const switchPoint = clamp(0.28 + seededRandom(base + 41) * 0.32, 0.18, 0.78);
  const delay = seededRandom(base + 47) * 0.22;
  const duration = 0.7 + seededRandom(base + 53) * 0.4;
  const tilt = randomInRange(base + 59, -3.6, 3.6);

  return { xSteps, ySteps, firstAxis, switchPoint, delay, duration, tilt };
}

function getAxisProgress(
  localProgress: number,
  start: number,
  length: number,
): number {
  if (length <= 0.0001) {
    return localProgress >= start ? 1 : 0;
  }
  return clamp((localProgress - start) / length);
}

type PhotoMosaicTileProps = {
  photo: PhotoTile;
  figureClassName: string;
  tags: GeneratedTag[];
  plan: PuzzlePlan;
  globalProgress: number;
};

function PhotoMosaicTile({
  photo,
  figureClassName,
  tags,
  plan,
  globalProgress,
}: PhotoMosaicTileProps) {
  const figureRef = usePixelReveal<HTMLElement>();

  const localProgressRaw = clamp(
    (globalProgress - plan.delay) / Math.max(plan.duration, 0.0001),
  );
  const isGlobalComplete = globalProgress >= 0.998;
  const localProgress =
    isGlobalComplete || localProgressRaw >= 0.99 ? 1 : localProgressRaw;
  const easedOverall = easeOutCubic(localProgress);

  const safeSwitch = clamp(plan.switchPoint, 0.2, 0.8);
  const xStart = plan.firstAxis === "x-first" ? 0 : safeSwitch;
  const xLength = plan.firstAxis === "x-first" ? safeSwitch : 1 - safeSwitch;
  const yStart = plan.firstAxis === "y-first" ? 0 : safeSwitch;
  const yLength = plan.firstAxis === "y-first" ? safeSwitch : 1 - safeSwitch;

  const rawXProgress =
    plan.xSteps === 0 ? 1 : getAxisProgress(localProgress, xStart, xLength);
  const rawYProgress =
    plan.ySteps === 0 ? 1 : getAxisProgress(localProgress, yStart, yLength);

  const xProgress = localProgress === 1 ? 1 : easeOutCubic(rawXProgress);
  const yProgress = localProgress === 1 ? 1 : easeOutCubic(rawYProgress);

  const translateMultiplierX: Record<PhotoTile["layout"], number> = {
    square: 106,
    portrait: 106,
    landscape: 54,
  };

  const translateMultiplierY: Record<PhotoTile["layout"], number> = {
    square: 106,
    portrait: 54,
    landscape: 106,
  };

  const translateX =
    plan.xSteps === 0
      ? 0
      : (1 - xProgress) * plan.xSteps * translateMultiplierX[photo.layout];
  const translateY =
    plan.ySteps === 0
      ? 0
      : (1 - yProgress) * plan.ySteps * translateMultiplierY[photo.layout];
  const rotate = plan.tilt * (1 - easedOverall);

  const isComplete = localProgress === 1;

  const shadowStrength = isComplete ? 0 : 0.32 * (1 - easedOverall);
  const shadow = shadowStrength
    ? `0 ${Math.max(4, shadowStrength * 18)}px ${Math.max(12, shadowStrength * 36)}px rgba(17,17,17,${0.12 + shadowStrength * 0.22})`
    : "0 8px 24px rgba(17,17,17,0.08)";

  const style: CSSProperties = isComplete
    ? {
        transform: "none",
        boxShadow: shadow,
      }
    : {
        transform: `translate3d(${translateX}%, ${translateY}%, 0) rotate(${rotate}deg)`,
        boxShadow: shadow,
      };

  return (
    <figure
      ref={figureRef}
      data-pixel-reveal="hidden"
      data-puzzle-piece
      className={figureClassName}
      style={style}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes="(max-width: 768px) 50vw, 25vw"
        className="pixel-reveal-media object-cover"
      />
      <figcaption className="absolute left-4 top-4 z-20 flex flex-col items-start gap-2 text-left text-xs uppercase tracking-[0.2em] text-off-white">
        {tags.map((tag) => (
          <span key={tag.id} className={tag.className}>
            {tag.label}
          </span>
        ))}
      </figcaption>
    </figure>
  );
}

export function PhotoMosaic({ photos }: PhotoMosaicProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const puzzleProgress = usePuzzleGridProgress(gridRef);
  const puzzlePlans = useMemo(
    () => photos.map((photo, index) => getPuzzlePlan(photo, index)),
    [photos],
  );

  return (
    <div
      ref={gridRef}
      data-puzzle-grid
      className="grid auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[190px] md:grid-cols-4 md:gap-4 lg:auto-rows-[220px]"
    >
      {photos.map((photo, index) => {
        const tileClass = tileClassMap[photo.layout] ?? "";
        const { showModuleTag, showSceneTag, order } = getTagVariant(
          photo.id,
          index,
        );
        const strokeClass = getStrokeVariant(photo, index);
        const plan = puzzlePlans[index];

        const tags: GeneratedTag[] = [];
        if (showModuleTag) {
          tags.push({
            id: "module",
            label: photo.moduleLabel,
            className: "rounded-full bg-electric-yellow px-3 py-1",
          });
        }
        if (showSceneTag) {
          tags.push({
            id: "scene",
            label: `#${photo.scene}`,
            className: "rounded-full bg-electric-blue px-3 py-1",
          });
        }

        if (order === "scene-first" && tags.length === 2) {
          tags.reverse();
        }

        return (
          <PhotoMosaicTile
            key={photo.id}
            photo={photo}
            figureClassName={[
              "relative overflow-hidden rounded-[20px] bg-soft-gray shadow-[0_8px_24px_rgba(17,17,17,0.08)] transition-transform duration-500 hover:-translate-y-1 hover:shadow-[0_20px_38px_rgba(17,17,17,0.18)] before:pointer-events-none after:pointer-events-none",
              tileClass,
              strokeClass,
            ]
              .filter(Boolean)
              .join(" ")}
            tags={tags}
            plan={plan}
            globalProgress={puzzleProgress}
          />
        );
      })}
    </div>
  );
}
