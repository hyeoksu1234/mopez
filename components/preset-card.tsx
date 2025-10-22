import Image from "next/image";
import type { Preset } from "@/data/presets";

type PresetCardProps = {
  preset: Preset;
  combinedStroke?: boolean;
  imageStroke?: boolean;
  infoStroke?: boolean;
};

export function PresetCard({
  preset,
  combinedStroke = false,
  imageStroke = false,
  infoStroke = false,
}: PresetCardProps) {
  const articleClassName = [
    "group flex flex-col overflow-hidden rounded-[24px] bg-off-white shadow-[0_8px_24px_rgba(17,17,17,0.08)] transition hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(17,17,17,0.16)]",
    combinedStroke ? "border-[6px] border-electric-blue" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const mediaWrapperClassName = [
    "relative aspect-[4/5] overflow-hidden",
    combinedStroke ? "" : "rounded-[24px]",
    imageStroke ? "border-[6px] border-electric-blue" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const infoClassName = [
    "flex flex-1 flex-col gap-6 px-6 py-7",
    !combinedStroke && infoStroke ? "rounded-[20px] border-[6px] border-electric-blue" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={articleClassName}>
      <div className={mediaWrapperClassName}>
        <Image
          src={preset.heroImage}
          alt={preset.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute left-4 top-4 flex gap-2">
          {preset.sceneTags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-electric-blue px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-off-white"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className={infoClassName}>
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-carbon/50">
            {preset.series}
          </p>
          <h3 className="font-display text-2xl font-semibold text-carbon">
            {preset.name}
          </h3>
          <p className="text-sm text-ink">{preset.headline}</p>
        </header>

        <div className="flex flex-wrap items-center gap-2 text-xs text-ink">
          {preset.modules.map((module) => (
            <span
              key={module}
              className="rounded-2xl border border-carbon/15 px-3 py-1 font-medium uppercase tracking-[0.18em]"
            >
              {module}
            </span>
          ))}
        </div>

        <div className="mt-auto text-sm font-semibold text-electric-blue">
          {preset.priceRange ? preset.priceRange : "문의"}
        </div>
      </div>
    </article>
  );
}
