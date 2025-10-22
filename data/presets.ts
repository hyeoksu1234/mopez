export type Preset = {
  id: string;
  name: string;
  series: string;
  headline: string;
  modules: string[];
  sceneTags: string[];
  priceRange?: string;
  heroImage: string;
  gallery: string[];
  spec: {
    weight: string;
    range: string;
    motor: string;
  };
  cta: {
    label: string;
    href: string;
  };
};

export const presetFilters = [
  "전체",
  "Urban",
  "NightRide",
  "Rain",
  "Commute",
  "Weekend",
  "Trail",
];

export const presets: Preset[] = [
  {
    id: "city-01",
    name: "City-01",
    series: "City Series",
    headline: "도심에 최적화된 페이스. 야간 주행에서 빛나는 모듈 조합.",
    modules: ["Frame A", "Fat Tire", "720Wh", "Low Seat", "Matte Black"],
    sceneTags: ["Urban", "NightRide"],
    priceRange: "KRW 2.9M ~",
    heroImage:
      "https://images.unsplash.com/photo-1700705581216-87c10e0bf547?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzYxMTIyMTQ1fA&ixlib=rb-4.1.0&auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1640957517313-74e5bf9a6b86?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzYxMTIyMTI0fA&ixlib=rb-4.1.0&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1630533663703-2f5981838e60?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzYxMTIyMTQ5fA&ixlib=rb-4.1.0&auto=format&fit=crop&w=1200&q=80",
    ],
    spec: {
      weight: "28kg",
      range: "80–110km",
      motor: "BAFANG 500W",
    },
    cta: {
      label: "문의하기",
      href: "/support/contact?preset=city-01",
    },
  },
  {
    id: "commute-02",
    name: "Commute-02",
    series: "Commute Series",
    headline: "출퇴근을 위해 튜닝된 모듈 셋업. 기상 변화에도 안정적인 주행.",
    modules: ["Frame B", "All-Terrain", "620Wh", "Mid Seat", "Steel Grey"],
    sceneTags: ["Commute", "Rain"],
    priceRange: "KRW 3.1M ~",
    heroImage:
      "https://images.unsplash.com/photo-1620802090791-fd9420668913?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzYxMTIyMjA2fA&ixlib=rb-4.1.0&auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1621394445346-c7b502f07206?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzYxMTIyMjA0fA&ixlib=rb-4.1.0&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1618322704848-b71bf61dd300?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzYxMTIyMjA1fA&ixlib=rb-4.1.0&auto=format&fit=crop&w=1200&q=80",
    ],
    spec: {
      weight: "30kg",
      range: "90–120km",
      motor: "BROSE 550W",
    },
    cta: {
      label: "문의하기",
      href: "/support/contact?preset=commute-02",
    },
  },
  {
    id: "weekend-03",
    name: "Weekend-03",
    series: "Weekend Series",
    headline: "주말 라이딩을 위한 모듈. 즐거운 곡선과 자유로운 주행 라인.",
    modules: ["Frame C", "Hybrid", "680Wh", "High Seat", "Olive Green"],
    sceneTags: ["Weekend", "Urban"],
    priceRange: "KRW 3.4M ~",
    heroImage:
      "https://images.unsplash.com/photo-1711385476787-8e56fc2ca2de?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzYxMTIyMTgzfA&ixlib=rb-4.1.0&auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1758764055486-c59902d77e94?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzYxMTIyMTgzfA&ixlib=rb-4.1.0&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1618520625602-22c667163000?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzYxMTIyMjgxfA&ixlib=rb-4.1.0&auto=format&fit=crop&w=1200&q=80",
    ],
    spec: {
      weight: "29kg",
      range: "85–115km",
      motor: "Shimano EP8 500W",
    },
    cta: {
      label: "문의하기",
      href: "/support/contact?preset=weekend-03",
    },
  },
  {
    id: "trail-04",
    name: "Trail-04",
    series: "Trail Series",
    headline: "거친 노면을 위한 강화 서스펜션과 하이 토크 모터 구성.",
    modules: ["Frame D", "Trail Tire", "780Wh", "Mid Seat", "Matte Sand"],
    sceneTags: ["Trail", "Weekend"],
    priceRange: "KRW 3.8M ~",
    heroImage:
      "https://images.unsplash.com/photo-1681261669206-c653789dc7bb?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzYxMTIyMTY5fA&ixlib=rb-4.1.0&auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1668106401134-ff9c584a507b?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzYxMTIyMTYyfA&ixlib=rb-4.1.0&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1668520970538-1ac510813f0d?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzYxMTIyMTY2fA&ixlib=rb-4.1.0&auto=format&fit=crop&w=1200&q=80",
    ],
    spec: {
      weight: "31kg",
      range: "95–130km",
      motor: "BAFANG Ultra 750W",
    },
    cta: {
      label: "문의하기",
      href: "/support/contact?preset=trail-04",
    },
  },
  {
    id: "rain-05",
    name: "Rain-05",
    series: "Weather Series",
    headline: "방수 하우징과 하이드로포빅 시트로 빗속에서도 흐트러짐 없이.",
    modules: ["Frame B", "Rain Tire", "650Wh", "Mid Seat", "Matte Navy"],
    sceneTags: ["Rain", "Commute"],
    priceRange: "KRW 3.2M ~",
    heroImage:
      "https://images.unsplash.com/photo-1621972750749-0fbb1abb7736?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzYxMTIyMjExfA&ixlib=rb-4.1.0&auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1695647925337-0fc7057a4c03?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzYxMTIyMjA4fA&ixlib=rb-4.1.0&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1709211078117-10729052ecb4?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzYxMTIyMzIzfA&ixlib=rb-4.1.0&auto=format&fit=crop&w=1200&q=80",
    ],
    spec: {
      weight: "30kg",
      range: "85–110km",
      motor: "YAMAHA PW-X3 550W",
    },
    cta: {
      label: "문의하기",
      href: "/support/contact?preset=rain-05",
    },
  },
  {
    id: "night-06",
    name: "Night-06",
    series: "Signature Series",
    headline: "일렁이는 도심 네온에 맞춰 세팅한 하이 콘트라스트 라이팅.",
    modules: ["Frame A", "Street Tire", "700Wh", "Low Seat", "Neon Black"],
    sceneTags: ["NightRide", "Urban"],
    priceRange: "KRW 3.6M ~",
    heroImage:
      "https://images.unsplash.com/photo-1730397041695-9f41c560c3be?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzYxMTIyMTUxfA&ixlib=rb-4.1.0&auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1693847573245-9f4c76f31d95?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzYxMTIyMTQ2fA&ixlib=rb-4.1.0&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1623728783018-fb220d91f99d?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzYxMTIyMTUxfA&ixlib=rb-4.1.0&auto=format&fit=crop&w=1200&q=80",
    ],
    spec: {
      weight: "27kg",
      range: "90–118km",
      motor: "BAFANG 620W",
    },
    cta: {
      label: "문의하기",
      href: "/support/contact?preset=night-06",
    },
  },
];
