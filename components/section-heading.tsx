type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const alignment =
    align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <div className={`flex max-w-3xl flex-col gap-3 ${alignment}`}>
      {eyebrow && (
        <span className="rounded-full bg-electric-blue/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-electric-blue">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-[clamp(1.8rem,2vw,2.4rem)] font-semibold leading-tight text-carbon">
        {title}
      </h2>
      {description && <p className="text-base text-ink">{description}</p>}
    </div>
  );
}
