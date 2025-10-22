export type JournalEntry = {
  slug: string;
  title: string;
  category: string;
  coverImage: string;
  date: string;
  excerpt: string;
  content: string[];
  gallery: string[];
};

export const journalEntries: JournalEntry[] = [
  {
    slug: "night-ride-collective",
    title: "네온 속에서 만난 MOPEZ Night Collective",
    category: "Behind",
    coverImage:
      "https://images.unsplash.com/photo-1642789663763-d747854c5360?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzYxMTIyNDYwfA&ixlib=rb-4.1.0&auto=format&fit=crop&w=1200&q=80",
    date: "2024.09.18",
    excerpt:
      "서울 야간 라이딩 크루와 함께한 Night-06 프리셋 촬영 비하인드를 공유합니다.",
    content: [
      "Night-06 프리셋은 도심 야간 주행을 위해 밝기를 세밀하게 조절한 라이트 모듈을 탑재했습니다. 네온 사인이 많은 지역에서는 대비를 높이고, 골목 진입 시에는 눈부심을 줄이는 하향 조사를 자동으로 수행합니다.",
      "촬영은 성수와 을지로 일대를 오가며 진행했고, 라이더들의 실제 세팅 경험을 반영하기 위해 커뮤니티 피드백을 사전에 수집했습니다.",
      "결과물은 라이더가 체감한 감정선과 모듈의 세밀한 반응을 균형 있게 담아낼 예정입니다.",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1730397041695-9f41c560c3be?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzYxMTIyMTUxfA&ixlib=rb-4.1.0&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1573943859481-5603be673445?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzYxMTIyMjg4fA&ixlib=rb-4.1.0&auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    slug: "rain-ready-preset",
    title: "비오는 날에도 흐트러짐 없는 Rain-05",
    category: "Product",
    coverImage:
      "https://images.unsplash.com/photo-1709211078117-10729052ecb4?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzYxMTIyMzIzfA&ixlib=rb-4.1.0&auto=format&fit=crop&w=1200&q=80",
    date: "2024.08.02",
    excerpt:
      "Rain-05 프리셋 개발 과정과 방수 레이어 시험 결과를 요약했습니다.",
    content: [
      "Rain-05는 다운튜브와 배터리 모듈에 하이드로포빅 실링 공법을 사용하여 장마 시즌에도 안정적인 주행을 제공합니다.",
      "타이어는 빗물 배수 성능이 검증된 패턴을 채택했고, 브레이크는 습기에 강한 세라믹 패드를 적용했습니다.",
      "A/S 센터에서는 Rain-05 전용 점검 패키지를 제공하며, 모든 고객은 구매 후 2년간 무상으로 이용할 수 있습니다.",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1695647925337-0fc7057a4c03?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzYxMTIyMjA4fA&ixlib=rb-4.1.0&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1642248285017-2b5141118f30?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzYxMTIyMjEwfA&ixlib=rb-4.1.0&auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    slug: "modular-lab",
    title: "MOPEZ Modular Lab : 제작 노트",
    category: "Story",
    coverImage:
      "https://images.unsplash.com/photo-1605271864611-58dd08d10547?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzYxMTIyNDAzfA&ixlib=rb-4.1.0&auto=format&fit=crop&w=1200&q=80",
    date: "2024.06.24",
    excerpt:
      "모듈 실험실에서 진행 중인 새로운 파츠 테스트와 디자인 철학을 소개합니다.",
    content: [
      "Modular Lab에서는 사용자들의 라이딩 로그를 분석해 모듈 조합의 우선순위를 업데이트합니다. 데이터는 Plausible과 자체 로그를 통해 수집하며 개인 식별 정보는 저장하지 않습니다.",
      "최근 실험 중인 모듈은 소음 저감 드라이브와 가변 포지션 핸들바입니다. 두 모듈 모두 프리셋으로 큐레이션될 예정입니다.",
      "조만간 Brand Kit 섹션에서 실험 장면을 담은 사진 패키지를 공개할 계획입니다.",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1620282451330-467acd26eb99?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzYxMTIyMjA3fA&ixlib=rb-4.1.0&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1621394457665-6e6d4961f686?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzYxMTIyMjA3fA&ixlib=rb-4.1.0&auto=format&fit=crop&w=1200&q=80",
    ],
  },
];

export function findJournalEntry(slug: string) {
  return journalEntries.find((entry) => entry.slug === slug);
}
