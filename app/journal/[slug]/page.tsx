import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { findJournalEntry, journalEntries } from "@/data/journal";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props) {
  const { slug } = params;
  const entry = findJournalEntry(slug);

  if (!entry) {
    return {
      title: "Journal",
    };
  }

  return {
    title: entry.title,
    description: entry.excerpt,
  };
}

export function generateStaticParams() {
  return journalEntries.map((entry) => ({
    slug: entry.slug,
  }));
}

export default async function JournalDetailPage({ params }: Props) {
  const { slug } = params;
  const entry = findJournalEntry(slug);

  if (!entry) {
    notFound();
  }

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-10 px-5 pb-24 pt-12 md:pt-16">
      <Link
        href="/journal"
        className="inline-flex w-fit items-center gap-2 rounded-full border border-electric-blue/30 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-electric-blue transition hover:border-electric-blue hover:bg-electric-blue/10"
      >
        ← 저널 목록
      </Link>
      <SectionHeading
        eyebrow={entry.category}
        title={entry.title}
        description={entry.excerpt}
      />
      <div className="relative aspect-[16/9] overflow-hidden rounded-[28px]">
        <Image
          src={entry.coverImage}
          alt={entry.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 70vw"
          priority
        />
      </div>
      <article className="space-y-6 text-base leading-relaxed text-ink">
        {entry.content.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </article>
      <div className="grid gap-4 md:grid-cols-2">
        {entry.gallery.map((image) => (
          <div
            key={image}
            className="relative aspect-[4/3] overflow-hidden rounded-[24px]"
          >
            <Image
              src={image}
              alt={`${entry.title} gallery`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 45vw"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
