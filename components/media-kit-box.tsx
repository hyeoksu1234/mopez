import Link from "next/link";

type MediaKitBoxProps = {
  title: string;
  description: string;
  files: { label: string; href: string }[];
};

export function MediaKitBox({ title, description, files }: MediaKitBoxProps) {
  return (
    <div className="flex flex-col gap-6 rounded-[24px] border border-electric-blue/20 bg-off-white px-8 py-10 shadow-[0_8px_24px_rgba(17,17,17,0.08)]">
      <div className="space-y-3">
        <h3 className="font-display text-2xl font-semibold text-electric-blue">
          {title}
        </h3>
        <p className="text-sm text-ink">{description}</p>
      </div>
      <div className="grid gap-3">
        {files.map((file) => (
          <Link
            key={file.href}
            href={file.href}
            className="flex items-center justify-between rounded-full border border-electric-blue px-4 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-electric-blue transition hover:bg-electric-yellow hover:text-off-white"
          >
            {file.label}
            <span aria-hidden>↓</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
