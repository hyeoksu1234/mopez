import Image from "next/image";
import Link from "next/link";
import type { JournalEntry } from "@/data/journal";

type JournalCardProps = {
  entry: JournalEntry;
};

export function JournalCard({ entry }: JournalCardProps) {
  return (
    <Link
      href={`/journal/${entry.slug}`}
      className="group flex flex-col overflow-hidden rounded-[24px] border border-electric-blue/15 bg-off-white shadow-[0_8px_24px_rgba(17,17,17,0.08)] transition hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(17,17,17,0.14)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric-blue"
    >
      <div className="relative aspect-[5/4] overflow-hidden">
        <Image
          src={entry.coverImage}
          alt={entry.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <span className="absolute left-4 top-4 rounded-full bg-electric-yellow px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-off-white">
          {entry.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-4 px-6 py-7">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-electric-blue/70">
          {entry.date}
        </p>
        <h3 className="font-display text-xl font-semibold text-electric-blue">
          {entry.title}
        </h3>
        <p className="text-sm text-ink">{entry.excerpt}</p>
        <span className="mt-auto text-xs font-semibold uppercase tracking-[0.24em] text-electric-blue transition group-hover:text-electric-yellow">
          더 읽기 →
        </span>
      </div>
    </Link>
  );
}
