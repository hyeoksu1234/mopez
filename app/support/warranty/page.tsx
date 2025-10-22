import { SectionHeading } from "@/components/section-heading";
import { FAQList } from "@/components/faq-list";
import { faqs, warrantySummary } from "@/data/support";

export const metadata = {
  title: "Warranty",
  description:
    "MOPEZ 프레임, 배터리, 모듈 파츠의 보증 정책과 자주 묻는 질문을 확인하세요.",
};

export default function WarrantyPage() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-12 px-5 pb-24 pt-12 md:pt-16">
      <SectionHeading
        eyebrow="Support"
        title="보증 & A/S 정책"
        description="프레임, 배터리, 모듈 파츠에 대한 보증 기간과 커버리지를 요약했습니다. 상세 기준은 상담 시 안내됩니다."
      />
      <div className="grid gap-6 md:grid-cols-3">
        {warrantySummary.map((item) => (
          <div
            key={item.title}
            className="rounded-[24px] border border-soft-gray bg-off-white px-6 py-8 text-sm text-ink shadow-[0_8px_24px_rgba(17,17,17,0.08)]"
          >
            <h3 className="mb-3 font-display text-lg font-semibold text-carbon">
              {item.title}
            </h3>
            <p>{item.detail}</p>
          </div>
        ))}
      </div>
      <div className="space-y-6">
        <h3 className="font-display text-2xl font-semibold text-carbon">
          FAQ
        </h3>
        <FAQList items={faqs} />
      </div>
    </div>
  );
}
