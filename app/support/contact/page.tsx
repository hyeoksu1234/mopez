import { ContactForm } from "@/components/contact-form";
import { SectionHeading } from "@/components/section-heading";

export const metadata = {
  title: "Contact",
  description:
    "프리셋 상담, 테스트 라이딩, 미디어 협업 문의를 남겨주세요. 24시간 내에 답변드립니다.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-10 px-5 pb-24 pt-12 md:pt-16">
      <SectionHeading
        eyebrow="Contact"
        title="문의 및 테스트 라이딩 신청"
        description="희망 프리셋과 라이딩 장면을 알려주시면, 담당 컨설턴트가 맞춤 제안을 드립니다."
      />
      <ContactForm />
      <div className="rounded-[24px] border border-soft-gray bg-off-white px-6 py-8 text-sm text-ink shadow-[0_8px_24px_rgba(17,17,17,0.08)] md:px-10">
        <p>
          SNS에서도 최신 프리셋 소식을 확인하세요. Instagram @mopez.official /
          YouTube @mopez-rides
        </p>
        <p className="mt-4 text-xs uppercase tracking-[0.24em] text-carbon/60">
          Create Your Own MOPEZ
        </p>
      </div>
    </div>
  );
}
