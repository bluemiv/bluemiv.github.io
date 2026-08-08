import type { Locale } from "./localeConfig";

type SiteCopy = {
  homeLabel: string;
  navigationLabel: string;
  nav: {
    articles: string;
    notes: string;
  };
  mobileMenu: {
    open: string;
    close: string;
  };
  languageLabel: string;
  theme: {
    toggle: string;
    light: string;
    dark: string;
  };
};

type HomeCopy = {
  metadata: {
    title: string;
    description: string;
  };
  hero: {
    eyebrow: string;
    lineOne: string;
    lineTwo: string;
    lineThreePrefix: string;
    accent: string;
    lineThreeSuffix: string;
    description: (careerMonthOrdinal: number) => string;
    cta: string;
    statusLabel: string;
    status: string;
    articleCountLabel: string;
    topicCountLabel: string;
    noteCountLabel: string;
  };
  featured: {
    eyebrow: string;
    heading: string;
    action: string;
    readTimeSuffix: string;
  };
  latest: {
    eyebrow: string;
    heading: string;
    description: string;
    action: string;
    empty: string;
  };
  topics: {
    eyebrow: string;
    heading: string;
  };
  notes: {
    eyebrow: string;
    heading: string;
    description: string;
    action: string;
  };
};

type PublicationMetadataCopy = {
  author: string;
  publishedAt: string;
  modifiedAt: string;
  readingTime: string;
};

export const LANGUAGE_NAMES: Record<Locale, { native: string; english: string }> = {
  ko: { native: "한국어", english: "Korean" },
  en: { native: "English", english: "English" },
  ja: { native: "日本語", english: "Japanese" },
};

export const SITE_COPY: Record<Locale, SiteCopy> = {
  ko: {
    homeLabel: "Bluemiv 홈",
    navigationLabel: "주요 메뉴",
    nav: {
      articles: "Articles",
      notes: "Notes",
    },
    mobileMenu: { open: "메뉴 열기", close: "메뉴 닫기" },
    languageLabel: "언어 선택",
    theme: {
      toggle: "색상 테마 전환",
      light: "라이트 테마로 전환",
      dark: "다크 테마로 전환",
    },
  },
  en: {
    homeLabel: "Bluemiv home",
    navigationLabel: "Primary navigation",
    nav: {
      articles: "Articles",
      notes: "Notes",
    },
    mobileMenu: { open: "Open menu", close: "Close menu" },
    languageLabel: "Choose language",
    theme: {
      toggle: "Change color theme",
      light: "Switch to light theme",
      dark: "Switch to dark theme",
    },
  },
  ja: {
    homeLabel: "Bluemiv ホーム",
    navigationLabel: "メインメニュー",
    nav: {
      articles: "Articles",
      notes: "Notes",
    },
    mobileMenu: { open: "メニューを開く", close: "メニューを閉じる" },
    languageLabel: "言語を選択",
    theme: {
      toggle: "カラーテーマを変更",
      light: "ライトテーマに切り替え",
      dark: "ダークテーマに切り替え",
    },
  },
};

export const PUBLICATION_METADATA_COPY: Record<Locale, PublicationMetadataCopy> = {
  ko: {
    author: "작성자",
    publishedAt: "발행",
    modifiedAt: "수정",
    readingTime: "예상 읽기 시간",
  },
  en: {
    author: "Author",
    publishedAt: "Published",
    modifiedAt: "Updated",
    readingTime: "Estimated reading time",
  },
  ja: {
    author: "著者",
    publishedAt: "公開",
    modifiedAt: "更新",
    readingTime: "推定読了時間",
  },
};

export const HOME_COPY: Record<Locale, HomeCopy> = {
  ko: {
    metadata: {
      title: "기술을 배우고 기록하는 개발 블로그",
      description: "Java, Spring, React, Next.js를 다루며 만난 문제와 선택의 이유를 기록합니다.",
    },
    hero: {
      eyebrow: "Software · Architecture · Learning",
      lineOne: "기술을 익히고,",
      lineTwo: "문제를 풀고,",
      lineThreePrefix: "",
      accent: "기록",
      lineThreeSuffix: "으로 남깁니다.",
      description: (careerMonthOrdinal) =>
        `개발자로 일한 지 ${careerMonthOrdinal}개월째. 문제를 해결하며 내린 선택과 배움을 기록합니다.`,
      cta: "최근 글 살펴보기",
      statusLabel: "상태",
      status: "기록 중",
      articleCountLabel: "Articles",
      topicCountLabel: "Topics",
      noteCountLabel: "Notes",
    },
    featured: {
      eyebrow: "New release / 01",
      heading: "새로 공개한 글",
      action: "글 읽기",
      readTimeSuffix: "분 읽기",
    },
    latest: {
      eyebrow: "Archive / Latest",
      heading: "Latest Articles",
      description: "최근 공개한 글을 시간순으로 살펴봅니다.",
      action: "전체 글",
      empty: "공개된 글을 준비하고 있습니다.",
    },
    topics: {
      eyebrow: "Explore / Topics",
      heading: "주제별 기록",
    },
    notes: {
      eyebrow: "Short Notes",
      heading: "짧게 남긴 기록.",
      description: "한 가지 개념과 작은 문제 해결을 짧게 정리합니다.",
      action: "모든 노트",
    },
  },
  en: {
    metadata: {
      title: "A developer blog for learning in public",
      description: "Notes on software, architecture, and the reasoning behind technical decisions.",
    },
    hero: {
      eyebrow: "Software · Architecture · Learning",
      lineOne: "Learn deeply.",
      lineTwo: "Solve deliberately.",
      lineThreePrefix: "Keep a ",
      accent: "record",
      lineThreeSuffix: ".",
      description: (careerMonthOrdinal) =>
        `${careerMonthOrdinal} months into my career as a developer. I document the decisions and lessons shaped by solving real problems.`,
      cta: "Browse recent writing",
      statusLabel: "Status",
      status: "Translating",
      articleCountLabel: "Articles",
      topicCountLabel: "Topics",
      noteCountLabel: "Notes",
    },
    featured: {
      eyebrow: "New release / 01",
      heading: "Recently published",
      action: "Read article",
      readTimeSuffix: "min read",
    },
    latest: {
      eyebrow: "Archive / Latest",
      heading: "Latest Articles",
      description: "Browse the most recently published writing.",
      action: "All articles",
      empty: "Translated articles are being prepared.",
    },
    topics: {
      eyebrow: "Explore / Topics",
      heading: "Browse by topic",
    },
    notes: {
      eyebrow: "Short Notes",
      heading: "Thoughts, kept brief.",
      description: "Small concepts and focused solutions, recorded without the extra weight.",
      action: "All notes",
    },
  },
  ja: {
    metadata: {
      title: "学びと問題解決を記録する技術ブログ",
      description: "ソフトウェア、アーキテクチャ、技術選定の背景を丁寧に記録します。",
    },
    hero: {
      eyebrow: "Software · Architecture · Learning",
      lineOne: "技術を学び、",
      lineTwo: "問題を解き、",
      lineThreePrefix: "",
      accent: "記録",
      lineThreeSuffix: "として残します。",
      description: (careerMonthOrdinal) =>
        `開発者として働き始めて${careerMonthOrdinal}か月目。課題を解決する中での選択と学びを記録しています。`,
      cta: "最近の記事を見る",
      statusLabel: "状態",
      status: "翻訳中",
      articleCountLabel: "Articles",
      topicCountLabel: "Topics",
      noteCountLabel: "Notes",
    },
    featured: {
      eyebrow: "New release / 01",
      heading: "新着記事",
      action: "記事を読む",
      readTimeSuffix: "分で読めます",
    },
    latest: {
      eyebrow: "Archive / Latest",
      heading: "Latest Articles",
      description: "最近公開した記事を新しい順に紹介します。",
      action: "すべての記事",
      empty: "翻訳記事を準備しています。",
    },
    topics: {
      eyebrow: "Explore / Topics",
      heading: "トピックから探す",
    },
    notes: {
      eyebrow: "Short Notes",
      heading: "短く残した記録。",
      description: "一つの概念や小さな問題解決を短くまとめます。",
      action: "すべてのノート",
    },
  },
};
