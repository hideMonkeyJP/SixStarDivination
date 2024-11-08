// 運命星の種類
export type DestinyStar = {
  name: string;
  sign: '陽' | '陰';
  element: string;
  initialCycle: string;
};

// 運気周期の種類
export const FORTUNE_CYCLES = [
  "種子", "緑生", "立花", "健弱", "達成", "乱気",
  "再会", "財成", "安定", "陰影", "停止", "減退"
] as const;

export type FortuneCycle = typeof FORTUNE_CYCLES[number];

// 運命星の定義
export const DESTINY_STARS: Record<string, DestinyStar> = {
  "土星": { name: "土星", sign: "陽", element: "土", initialCycle: "種子" },
  "金星": { name: "金星", sign: "陽", element: "金", initialCycle: "立花" },
  "火星": { name: "火星", sign: "陽", element: "火", initialCycle: "達成" },
  "天王星": { name: "天王星", sign: "陽", element: "天", initialCycle: "再会" },
  "木星": { name: "木星", sign: "陽", element: "木", initialCycle: "安定" },
  "水星": { name: "水星", sign: "陽", element: "水", initialCycle: "停止" },
};

// 基礎数を計算
export function calculateBaseNumber(birthYear: number): number {
  const lastTwoDigits = birthYear % 100;
  const multiplied = lastTwoDigits * 9;
  let sum = String(multiplied).split('').reduce((acc, digit) => acc + parseInt(digit), 0);
  
  while (sum > 9) {
    sum = String(sum).split('').reduce((acc, digit) => acc + parseInt(digit), 0);
  }
  
  return sum;
}

// 運命数を計算
export function calculateFortuneNumber(birthMonth: number, birthDay: number, baseNumber: number): number {
  let fortuneNumber = birthMonth + birthDay - baseNumber;
  if (fortuneNumber <= 0) {
    fortuneNumber += 60;
  }
  return fortuneNumber;
}

// 運命星を決定
export function determineDestinyStar(fortuneNumber: number): string {
  if (fortuneNumber <= 10) return "土星";
  if (fortuneNumber <= 20) return "金星";
  if (fortuneNumber <= 30) return "火星";
  if (fortuneNumber <= 40) return "天王星";
  if (fortuneNumber <= 50) return "木星";
  return "水星";
}

// 陽陰を決定
export function determineSign(birthYear: number): '陽' | '陰' {
  return birthYear % 2 === 0 ? '陽' : '陰';
}

// 現在の運気周期を計算
export function calculateCurrentCycle(birthYear: number, star: DestinyStar): FortuneCycle {
  const currentYear = new Date().getFullYear();
  const age = currentYear - birthYear;
  const initialIndex = FORTUNE_CYCLES.indexOf(star.initialCycle as FortuneCycle);
  const cyclePosition = (initialIndex + age) % 12;
  return FORTUNE_CYCLES[cyclePosition];
}

// 運命星の特徴を取得
export function getStarCharacteristics(star: string, sign: '陽' | '陰'): string {
  const characteristics: Record<string, Record<string, string>> = {
    "土星": {
      "陽": "堅実で責任感が強く、努力家。物事を着実に進める力がある。",
      "陰": "慎重で計画的。地道な努力を惜しまない。"
    },
    "金星": {
      "陽": "芸術的センスが高く、人を魅了する力がある。社交的で華やか。",
      "陰": "繊細で優美。人との調和を大切にする。"
    },
    "火星": {
      "陽": "情熱的でエネルギッシュ。リーダーシップを発揮する。",
      "陰": "行動力があり、目標に向かって突き進む。"
    },
    "天王星": {
      "陽": "独創的で革新的。新しいものを生み出す力がある。",
      "陰": "直感力が鋭く、独自の視点を持つ。"
    },
    "木星": {
      "陽": "寛容で博愛的。大きな夢を持ち、それを実現する力がある。",
      "陰": "包容力があり、周りの人を支える。"
    },
    "水星": {
      "陽": "知的で機転が利く。コミュニケーション能力が高い。",
      "陰": "分析力に優れ、物事を論理的に考える。"
    }
  };

  return characteristics[star][sign] || "特徴情報がありません。";
}

// 運気周期の解説を取得
export function getCycleDescription(cycle: FortuneCycle): string {
  const descriptions: Record<FortuneCycle, string> = {
    "種子": "新しい始まりの時期。計画を立て、準備をする好機です。",
    "緑生": "成長の時期。学びや経験を積むのに適しています。",
    "立花": "才能が開花する時期。チャレンジするのに良い時期です。",
    "健弱": "充実の中にも注意が必要な時期。健康に気を付けましょう。",
    "達成": "目標が実を結ぶ時期。努力が報われます。",
    "乱気": "変化の多い時期。柔軟な対応が求められます。",
    "再会": "過去との再会や、新たな出会いがある時期です。",
    "財成": "物事が充実し、実りの多い時期です。",
    "安定": "安定した運気で、着実に前進できる時期です。",
    "陰影": "内省的になる時期。静かに過ごすのが良いでしょう。",
    "停止": "立ち止まって考える時期。慎重に行動しましょう。",
    "減退": "運気の変わり目。次の周期に向けて準備をする時期です。"
  };

  return descriptions[cycle];
}