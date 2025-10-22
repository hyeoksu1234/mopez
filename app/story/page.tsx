import { SectionHeading } from "@/components/section-heading";
import { StoryBlock } from "@/components/story-block";
import { storySlices } from "@/data/stories";

export const metadata = {
  title: "Story",
  description:
    "MOPEZ의 철학, 제작 공정, 지속 가능성에 대한 이야기와 사진 시퀀스를 확인하세요.",
};

export default function StoryPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-14 px-5 pb-24 pt-12 md:pt-16">
      <SectionHeading
        eyebrow="Story"
        title="모듈을 더하고 빼며 ‘나’를 만든다"
        description="MOPEZ가 말하는 커스터마이징은 단순한 파츠 조합이 아닌, 라이더의 감각을 찾아가는 여정입니다."
      />
      {storySlices.map((slice) => (
        <StoryBlock
          key={slice.id}
          id={slice.id}
          eyebrow={slice.eyebrow}
          title={slice.title}
          copy={slice.copy}
          image={slice.image}
        />
      ))}
    </div>
  );
}
