export type StorySlice = {
  id: string;
  eyebrow: string;
  title: string;
  copy: string;
  image: {
    src: string;
    alt: string;
    orientation?: "left" | "right";
  };
};

export const storySlices: StorySlice[] = [
  {
    id: "philosophy",
    eyebrow: "Philosophy",
    title: "Customization = Joy",
    copy: "MOPEZ는 모듈을 더하고 빼는 과정 그 자체가 라이더의 개성을 드러내는 언어라 믿습니다. 각 프리셋은 라이더의 이동 습관과 감각을 기반으로 큐레이션되고, 작은 디테일까지 조정 가능합니다. 우리는 맞춤형 조립 기능을 내세우기보다, 정제된 추천 조합으로 자유의 폭을 제시합니다.",
    image: {
      src: "https://images.unsplash.com/photo-1675798226681-c1983af8ce92?auto=format&fit=crop&w=1600&q=80",
      alt: "정비사가 전기자전거 모터 모듈을 조정하는 모습",
    },
  },
  {
    id: "craft",
    eyebrow: "Craft",
    title: "정밀한 설계와 질감",
    copy: "프레임과 타이어, 배터리 모듈은 강성을 해치지 않는 범위 내에서 최소 무게화를 실현했습니다. 모든 금속 파츠는 크롬 실버 하드 코팅, 시트는 재생 원단을 기반으로 가공하며, 방수 테스팅을 통해 기후 변화에도 대응합니다. 촬영 시에는 소재의 질감을 살리기 위해 필름룩과 자연광을 우선합니다.",
    image: {
      src: "https://images.unsplash.com/photo-1669965691797-f7f25f04bc7d?auto=format&fit=crop&w=1600&q=80",
      alt: "전기자전거 구동계와 모터 허브 클로즈업",
      orientation: "left",
    },
  },
  {
    id: "sustainability",
    eyebrow: "Sustainability",
    title: "지속 가능한 모듈 생태계를 위하여",
    copy: "모듈 파츠는 순환을 전제로 설계됩니다. 사용이 끝난 배터리는 파트너십을 맺은 에너지 리사이클 센터로 회수되어 새로운 셀로 재사용 됩니다. 또한, 모든 포장재는 재생 섬유 기반 소재로 제작합니다.",
    image: {
      src: "https://images.unsplash.com/photo-1669965691611-e21a05a1f43e?auto=format&fit=crop&w=1600&q=80",
      alt: "전기자전거 디스플레이와 제어 버튼을 점검하는 손",
      orientation: "right",
    },
  },
];
