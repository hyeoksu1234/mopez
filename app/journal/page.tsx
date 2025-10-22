import { SectionHeading } from "@/components/section-heading";
import { JournalCard } from "@/components/journal-card";
import { journalEntries } from "@/data/journal";

export const metadata = {
  title: "Journal",
  description:
    "신제품 소식, 촬영 비하인드, 라이더 인터뷰를 카드 뉴스 형식으로 만나요.",
};

export default function JournalPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-12 px-5 pb-24 pt-12 md:pt-16">
      <SectionHeading
        eyebrow="Journal"
        title="뉴스 & 스토리"
        description="라이더 경험과 모듈 소식을 담은 저널을 카드 뉴스 형식으로 만나보세요."
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {journalEntries.map((entry) => (
          <JournalCard key={entry.slug} entry={entry} />
        ))}
      </div>
    </div>
  );
}
