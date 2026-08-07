export type AppProfile = {
  slug: string;
  locale: "ko" | "en";
  name: string;
  description: string;
  features: readonly string[];
  googlePlayUrl: string;
  legalLinks: readonly { label: string; href: string }[];
};

const APP_PROFILES = [
  {
    slug: "lottocat645",
    locale: "ko",
    name: "로또켓645",
    description:
      "로또 6/45 번호 추천, QR 당첨 확인, 번호 분석, 세금 계산과 저장 관리를 한곳에서 제공하는 Android 편의 앱입니다.",
    features: ["번호 추천과 저장", "QR 당첨 확인", "회차별 번호 분석", "당첨금 세금 계산"],
    googlePlayUrl:
      "https://play.google.com/store/apps/details?id=com.berryfy.lottocat645&pcampaignid=web_share",
    legalLinks: [{ label: "개인정보 처리방침", href: "/apps/lottocat645/privacy/" }],
  },
  {
    slug: "potion-sort-quest",
    locale: "en",
    name: "Potion Sort Quest",
    description:
      "A relaxing offline Android puzzle game about sorting colorful potion layers into matching bottles.",
    features: ["Offline puzzle play", "Undo and hints", "Level progress", "18 languages"],
    googlePlayUrl: "https://play.google.com/store/apps/details?id=com.berryfy.potion_sort_quest",
    legalLinks: [
      { label: "Privacy Policy", href: "/apps/potion-sort-quest/privacy/en/" },
      { label: "개인정보 처리방침", href: "/apps/potion-sort-quest/privacy/" },
      { label: "プライバシーポリシー", href: "/apps/potion-sort-quest/privacy/jp/" },
    ],
  },
] as const satisfies readonly AppProfile[];

export function getAppProfiles(): readonly AppProfile[] {
  return APP_PROFILES;
}

export function getAppProfile(slug: string): AppProfile | undefined {
  return APP_PROFILES.find((profile) => profile.slug === slug);
}
