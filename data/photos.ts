export type PhotoTile = {
  id: string;
  src: string;
  alt: string;
  moduleLabel: string;
  scene: string;
  layout: "square" | "portrait" | "landscape";
  forceStroke?: boolean;
  disableStroke?: boolean;
};

export const photoTiles: PhotoTile[] = [
  {
    id: "city-lights",
    src: "https://images.unsplash.com/photo-1730397041695-9f41c560c3be?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzYxMTIyMTUxfA&ixlib=rb-4.1.0&auto=format&fit=crop&w=1200&q=80",
    alt: "네온 조명 속 전기자전거로 질주하는 라이더",
    moduleLabel: "Frame A",
    scene: "NightRide",
    layout: "portrait",
    forceStroke: true,
  },
  {
    id: "urban-turn",
    src: "https://images.unsplash.com/photo-1601391721091-4646369e0bb5?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzYxMTIyMjAzfA&ixlib=rb-4.1.0&auto=format&fit=crop&w=1200&q=80",
    alt: "도심 골목에서 궤도를 그리는 미니멀 전기자전거",
    moduleLabel: "Fat Tire",
    scene: "Urban",
    layout: "square",
  },
  {
    id: "rain-detail",
    src: "https://images.unsplash.com/photo-1695647925337-0fc7057a4c03?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzYxMTIyMjA4fA&ixlib=rb-4.1.0&auto=format&fit=crop&w=1200&q=80",
    alt: "빗속에서도 시야를 밝히는 방수 헤드라이트",
    moduleLabel: "Rain Guard",
    scene: "Rain",
    layout: "square",
  },
  {
    id: "weekend-pair",
    src: "https://images.unsplash.com/photo-1711385476787-8e56fc2ca2de?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzYxMTIyMTgzfA&ixlib=rb-4.1.0&auto=format&fit=crop&w=1200&q=80",
    alt: "호수를 배경으로 나란히 달리는 주말 전기자전거",
    moduleLabel: "Trail Kit",
    scene: "Weekend",
    layout: "landscape",
  },
  {
    id: "battery-swap",
    src: "https://images.unsplash.com/photo-1621394457665-6e6d4961f686?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzYxMTIyMjA3fA&ixlib=rb-4.1.0&auto=format&fit=crop&w=1200&q=80",
    alt: "모듈 배터리를 손쉽게 분리하는 장면",
    moduleLabel: "720Wh",
    scene: "Urban",
    layout: "square",
    forceStroke: true,
  },
  {
    id: "trail-leap",
    src: "https://images.unsplash.com/photo-1668106401134-ff9c584a507b?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzYxMTIyMTYyfA&ixlib=rb-4.1.0&auto=format&fit=crop&w=1200&q=80",
    alt: "숲속 트레일을 뛰어넘는 e-트레일 바이크",
    moduleLabel: "Trail Tire",
    scene: "Trail",
    layout: "portrait",
    disableStroke: true,
  },
  {
    id: "commute-morning",
    src: "https://images.unsplash.com/photo-1621576912675-f62566f2ebc5?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzYxMTIyMjA2fA&ixlib=rb-4.1.0&auto=format&fit=crop&w=1200&q=80",
    alt: "출근길 한강변을 가르는 도심 커뮤터",
    moduleLabel: "Commute Kit",
    scene: "Commute",
    layout: "square",
  },
  {
    id: "studio-detail",
    src: "https://images.unsplash.com/photo-1620282451330-467acd26eb99?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzYxMTIyMjA3fA&ixlib=rb-4.1.0&auto=format&fit=crop&w=1200&q=80",
    alt: "스튜디오 조명 아래 반짝이는 핸들바 디테일",
    moduleLabel: "Chrome Silver",
    scene: "Studio",
    layout: "square",
    disableStroke: true,
  },
  {
    id: "sunset-curve",
    src: "https://images.unsplash.com/photo-1649878938553-1eaac5c27375?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzYxMTIyMjAyfA&ixlib=rb-4.1.0&auto=format&fit=crop&w=1200&q=80",
    alt: "노을빛 커브를 타는 하이라이트 라이딩",
    moduleLabel: "Edge Kit",
    scene: "Sunset",
    layout: "landscape",
  },
  {
    id: "coast-ride",
    src: "https://images.unsplash.com/photo-1672860354854-41aa6d520182?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzYxMTIyMjc3fA&ixlib=rb-4.1.0&auto=format&fit=crop&w=1200&q=80",
    alt: "해변 모래 위에 세워 둔 샌드 컬러 전기자전거",
    moduleLabel: "Coast Kit",
    scene: "Weekend",
    layout: "landscape",
  },
  {
    id: "team-train",
    src: "https://images.unsplash.com/photo-1573943859481-5603be673445?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzYxMTIyMjg4fA&ixlib=rb-4.1.0&auto=format&fit=crop&w=1200&q=80",
    alt: "야간 트랙을 가르는 팀 라이딩 크루",
    moduleLabel: "Race Pack",
    scene: "Track",
    layout: "landscape",
    disableStroke: true,
  },
  {
    id: "mountain-glow",
    src: "https://images.unsplash.com/photo-1668520970538-1ac510813f0d?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzYxMTIyMTY2fA&ixlib=rb-4.1.0&auto=format&fit=crop&w=1200&q=80",
    alt: "산악 숲길을 오르는 eMTB 라이더",
    moduleLabel: "Summit Kit",
    scene: "Trail",
    layout: "portrait",
  },
];
