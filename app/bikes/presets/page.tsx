import { PresetCard } from "@/components/preset-card";
import { SectionHeading } from "@/components/section-heading";
import { presets } from "@/data/presets";

export const metadata = {
  title: "Presets",
  description:
    "MOPEZ 프리셋 6–9종 모듈 조합과 스펙을 한 페이지에서 살펴보세요.",
};

export default function PresetsPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-12 px-5 pb-24 pt-12 md:pt-16">
      <SectionHeading
        eyebrow="Presets"
        title="추천 셋업 아카이브"
        description="MOPEZ가 큐레이션한 프리셋은 라이딩 환경과 감성에 따라 구성되었습니다. 카드를 눌러 각 프리셋의 모듈 조합과 요약 스펙을 살펴보세요."
      />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {presets.map((preset) => (
          <PresetCard key={preset.id} preset={preset} />
        ))}
      </div>
    </div>
  );
}
