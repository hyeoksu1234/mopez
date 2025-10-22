import { PresetLineup } from "@/components/preset-lineup";
import { SectionHeading } from "@/components/section-heading";

export const metadata = {
  title: "Lineup",
  description:
    "도심, 비, 야간 등 장면별 MOPEZ 프리셋 라인업을 필터로 탐색하세요.",
};

export default function LineupPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-12 px-5 pb-24 pt-12 md:pt-16">
      <SectionHeading
        eyebrow="Lineup"
        title="모듈 프리셋 라인업"
        description="씬 태그와 스타일 필터로 자신에게 맞는 프리셋을 빠르게 찾을 수 있습니다."
      />
      <PresetLineup />
    </div>
  );
}
