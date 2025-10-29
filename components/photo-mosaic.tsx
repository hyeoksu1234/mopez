import Image from "next/image";
import type { PhotoTile } from "@/data/photos";

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

export function PhotoMosaic({ photos }: PhotoMosaicProps) {
  return (
    <div className="grid auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[190px] md:grid-cols-4 md:gap-4 lg:auto-rows-[220px]">
      {photos.map((photo, index) => {
        const tileClass = tileClassMap[photo.layout] ?? "";
        const { showModuleTag, showSceneTag, order } = getTagVariant(
          photo.id,
          index,
        );
        const strokeClass = getStrokeVariant(photo, index);

        const tags: Array<{ id: string; label: string; className: string }> = [];
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
          <figure
            key={photo.id}
            className={[
              "relative overflow-hidden rounded-[20px] bg-soft-gray shadow-[0_6px_18px_rgba(17,17,17,0.12)] transition hover:-translate-y-1 hover:shadow-[0_20px_38px_rgba(17,17,17,0.18)] before:pointer-events-none after:pointer-events-none",
              tileClass,
              strokeClass,
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover"
            />
            <figcaption
              className="absolute left-4 top-4 flex flex-col items-start gap-2 text-left text-xs uppercase tracking-[0.2em] text-off-white"
            >
              {tags.map((tag) => (
                <span key={tag.id} className={tag.className}>
                  {tag.label}
                </span>
              ))}
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}
