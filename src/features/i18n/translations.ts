import type { Locale } from "./localeConfig";

export type SearchCopy = {
  close: string;
  description: string;
  empty: string;
  filterLabel: string;
  filters: {
    all: string;
    article: string;
    note: string;
  };
  hint: string;
  label: string;
  loading: string;
  open: string;
  placeholder: string;
  resultCount: (count: number) => string;
  shortcut: string;
  title: string;
  types: {
    article: string;
    note: string;
  };
  unavailable: string;
};

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
  search: SearchCopy;
  theme: {
    toggle: string;
    light: string;
    dark: string;
  };
};

export type HomeCopy = {
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
    search: {
      close: "검색 닫기",
      description: "글을 검색합니다.",
      empty: "일치하는 기록이 없습니다. 다른 단어로 검색해보세요.",
      filterLabel: "검색할 기록 유형",
      filters: { all: "All", article: "Articles", note: "Notes" },
      hint: "두 글자 이상 입력하면 기록을 검색합니다.",
      label: "검색어",
      loading: "기록을 찾고 있습니다.",
      open: "글 검색 열기",
      placeholder: "무엇을 찾고 있나요?",
      resultCount: (count) => `${count}개의 검색 결과`,
      shortcut: "Command 또는 Control K",
      title: "Search archive",
      types: { article: "Article", note: "Note" },
      unavailable: "개발 서버에서는 검색 index가 없습니다. pnpm start로 확인해주세요.",
    },
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
    search: {
      close: "Close search",
      description: "Search the archive.",
      empty: "No matching entries. Try a different search.",
      filterLabel: "Entry type",
      filters: { all: "All", article: "Articles", note: "Notes" },
      hint: "Enter at least two characters to search the archive.",
      label: "Search query",
      loading: "Searching the archive.",
      open: "Open writing search",
      placeholder: "What are you looking for?",
      resultCount: (count) => `${count} search results`,
      shortcut: "Command or Control K",
      title: "Search archive",
      types: { article: "Article", note: "Note" },
      unavailable: "Search is available in the static preview started with pnpm start.",
    },
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
    search: {
      close: "検索を閉じる",
      description: "記録を検索します。",
      empty: "一致する記録がありません。別のキーワードで検索してください。",
      filterLabel: "記録の種類",
      filters: { all: "All", article: "Articles", note: "Notes" },
      hint: "2文字以上入力すると記録を検索します。",
      label: "検索キーワード",
      loading: "記録を検索しています。",
      open: "記事検索を開く",
      placeholder: "何をお探しですか？",
      resultCount: (count) => `${count}件の検索結果`,
      shortcut: "CommandまたはControl K",
      title: "Search archive",
      types: { article: "Article", note: "Note" },
      unavailable: "検索はpnpm startで起動した静的プレビューで利用できます。",
    },
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
      title: "배움과 경험을 기록하는 블로그",
      description: "관심사와 경험, 문제를 해결하며 배운 내용을 기록합니다.",
    },
    hero: {
      eyebrow: "Learning · Experience · Writing",
      lineOne: "배우고,",
      lineTwo: "경험하고,",
      lineThreePrefix: "",
      accent: "기록",
      lineThreeSuffix: "으로 남깁니다.",
      description: (careerMonthOrdinal) =>
        `개발자로 일한 지 ${careerMonthOrdinal}개월째. 문제를 해결하며 내린 선택과 배움을 기록합니다.`,
      cta: "최신 글 살펴보기",
      statusLabel: "상태",
      status: "기록 중",
      articleCountLabel: "Articles",
      topicCountLabel: "Topics",
      noteCountLabel: "Notes",
    },
    featured: {
      eyebrow: "New release / 01",
      heading: "최신 글",
      action: "글 읽기",
      readTimeSuffix: "분 읽기",
    },
    latest: {
      eyebrow: "Archive / Latest",
      heading: "Latest Articles",
      description: "최신 글을 발행순으로 살펴봅니다.",
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
      title: "A personal archive of learning and experience",
      description: "Writing about interests, experiences, problems, and the lessons that follow.",
    },
    hero: {
      eyebrow: "Learning · Experience · Writing",
      lineOne: "Stay curious.",
      lineTwo: "Learn by doing.",
      lineThreePrefix: "Keep a ",
      accent: "record",
      lineThreeSuffix: ".",
      description: (careerMonthOrdinal) =>
        `${careerMonthOrdinal} months into my career as a developer. I document the decisions and lessons shaped by solving real problems.`,
      cta: "Browse latest writing",
      statusLabel: "Status",
      status: "Translating",
      articleCountLabel: "Articles",
      topicCountLabel: "Topics",
      noteCountLabel: "Notes",
    },
    featured: {
      eyebrow: "New release / 01",
      heading: "Latest article",
      action: "Read article",
      readTimeSuffix: "min read",
    },
    latest: {
      eyebrow: "Archive / Latest",
      heading: "Latest Articles",
      description: "Browse the latest writing in publication order.",
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
      title: "学びと経験を記録するブログ",
      description: "関心のあることや日々の経験、問題を解決する中で得た学びを記録します。",
    },
    hero: {
      eyebrow: "Learning · Experience · Writing",
      lineOne: "好奇心を持ち、",
      lineTwo: "経験から学び、",
      lineThreePrefix: "",
      accent: "記録",
      lineThreeSuffix: "として残します。",
      description: (careerMonthOrdinal) =>
        `開発者として働き始めて${careerMonthOrdinal}か月目。課題を解決する中での選択と学びを記録しています。`,
      cta: "最新の記事を見る",
      statusLabel: "状態",
      status: "翻訳中",
      articleCountLabel: "Articles",
      topicCountLabel: "Topics",
      noteCountLabel: "Notes",
    },
    featured: {
      eyebrow: "New release / 01",
      heading: "最新記事",
      action: "記事を読む",
      readTimeSuffix: "分で読めます",
    },
    latest: {
      eyebrow: "Archive / Latest",
      heading: "Latest Articles",
      description: "最新の記事を公開順に紹介します。",
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
