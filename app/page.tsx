import Link from "next/link";
import { HeroVisual } from "@/components/hero-visual";
import { PresetCard } from "@/components/preset-card";
import { PhotoMosaic } from "@/components/photo-mosaic";
import { SectionHeading } from "@/components/section-heading";
import { presets } from "@/data/presets";
import { photoTiles } from "@/data/photos";
import { journalEntries } from "@/data/journal";

export default function Home() {
  const featuredPresets = presets.slice(0, 3);
  const featuredJournal = journalEntries.slice(0, 2);
  const assetPrefix = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  return (
    <>
      <HeroVisual
        title="Create Your Own MOPEZ — 당신의 방식으로 달린다."
        subtitle="사진 중심 아카이브와 모듈형 프리셋으로 구성된 브랜드 웹사이트. 모듈을 더하고 빼는 감각을 시각적으로 경험하세요."
        image={{
          src: presets[0].heroImage,
          alt: "MOPEZ City-01 프리셋을 타고 도심을 주행하는 라이더",
        }}
        video={{
          src: `${assetPrefix}/img/hero_main.mp4`,
          sources: [
            {
              src: `${assetPrefix}/img/hero_main.webm`,
              type: "video/webm",
            },
          ],
          poster: presets[0].heroImage,
          alt: "도심을 질주하는 MOPEZ 전기자전거 라이딩 영상",
          preload: "metadata",
        }}
        primaryCta={{ label: "프리셋 살펴보기", href: "/bikes/lineup" }}
        secondaryCta={{ label: "브랜드 스토리", href: "/story" }}
      />

      <main className="mx-auto mt-4 flex max-w-6xl flex-col gap-20 px-5 pb-24">
        <section className="space-y-10">
          <SectionHeading
            eyebrow="Presets"
            title="추천 프리셋 3선"
            description="라이딩 장면별로 큐레이션한 프리셋을 미리 경험하세요. 선택은 간결하게, 주행은 대담하게."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {featuredPresets.map((preset, index) => (
              <PresetCard
                key={preset.id}
                preset={preset}
                combinedStroke={index === 0}
                imageStroke={index === 2}
                infoStroke={index === 1}
              />
            ))}
          </div>
          <div>
            <Link
              href="/bikes/presets"
              className="text-xs font-semibold uppercase tracking-[0.24em] text-electric-blue transition hover:text-electric-yellow"
            >
              모든 프리셋 보기 →
            </Link>
          </div>
        </section>

        <section className="space-y-10">
        <SectionHeading
          eyebrow="Visual Archive"
          title="모듈과 씬을 담은 사진 그리드"
          description="씬 태그와 함께 사진을 탐색하며 모듈이 담아내는 분위기를 확인하세요."
        />
          <PhotoMosaic photos={photoTiles} />
        </section>

        <section className="space-y-8 rounded-[28px] bg-soft-gray/30 px-8 py-12">
          <SectionHeading
            eyebrow="Story"
            title="모듈은 자유다."
            description="모듈을 더하고 빼며 ‘나’를 만드는 과정. MOPEZ의 철학을 스토리 섹션에서 더 읽어보세요."
          />
          <Link
            href="/story"
            className="text-xs font-semibold uppercase tracking-[0.24em] text-electric-blue transition hover:text-electric-yellow"
          >
            스토리 읽기 →
          </Link>
        </section>

        <section className="space-y-10">
          <SectionHeading
            eyebrow="Journal"
            title="최근 저널 하이라이트"
            description="새로운 프리셋과 촬영 비하인드를 카드 뉴스 형식으로 소개합니다."
          />
        <div className="grid gap-6 md:grid-cols-2">
          {featuredJournal.map((entry) => (
            <Link
              key={entry.slug}
              href={`/journal/${entry.slug}`}
              className="group flex flex-col gap-4 rounded-[24px] border border-electric-blue/15 bg-off-white px-6 py-7 shadow-[0_8px_24px_rgba(17,17,17,0.08)] transition hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(17,17,17,0.14)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric-blue"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-electric-blue/70">
                {entry.date} · {entry.category}
              </p>
              <h3 className="font-display text-xl font-semibold text-electric-blue">
                {entry.title}
              </h3>
              <p className="text-sm text-ink">{entry.excerpt}</p>
              <span className="mt-auto text-xs font-semibold uppercase tracking-[0.24em] text-electric-blue transition group-hover:text-electric-yellow">
                더 읽기 →
              </span>
            </Link>
          ))}
        </div>
          <Link
            href="/journal"
            className="text-xs font-semibold uppercase tracking-[0.24em] text-electric-blue transition hover:text-electric-yellow"
          >
            저널 전체 보기 →
          </Link>
        </section>

      </main>
    </>
  );
}
