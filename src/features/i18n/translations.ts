import type { Locale } from "./localeConfig";

type SiteCopy = {
  homeLabel: string;
  navigationLabel: string;
  nav: {
    articles: string;
    notes: string;
    apps: string;
    about: string;
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
  footer: {
    description: string;
  };
};

type HomeArticle = {
  number: string;
  topic: string;
  title: string;
  description: string;
  date: string;
  dateTime: string;
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
    description: string;
    cta: string;
    statusLabel: string;
    status: string;
  };
  featured: {
    eyebrow: string;
    heading: string;
    updated: string;
    topic: string;
    title: string;
    description: string;
    readTime: string;
    action: string;
  };
  latest: {
    heading: string;
    description: string;
    action: string;
    articles: readonly HomeArticle[];
  };
  notes: {
    eyebrow: string;
    heading: string;
    action: string;
    items: readonly (readonly [string, string])[];
  };
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
      apps: "Apps",
      about: "About",
    },
    mobileMenu: { open: "메뉴 열기", close: "메뉴 닫기" },
    languageLabel: "언어 선택",
    theme: {
      toggle: "색상 테마 전환",
      light: "라이트 테마로 전환",
      dark: "다크 테마로 전환",
    },
    footer: { description: "서울에서 기록하는 정적 기술 아카이브" },
  },
  en: {
    homeLabel: "Bluemiv home",
    navigationLabel: "Primary navigation",
    nav: {
      articles: "Articles",
      notes: "Notes",
      apps: "Apps",
      about: "About",
    },
    mobileMenu: { open: "Open menu", close: "Close menu" },
    languageLabel: "Choose language",
    theme: {
      toggle: "Change color theme",
      light: "Switch to light theme",
      dark: "Switch to dark theme",
    },
    footer: { description: "A static technology archive from Seoul" },
  },
  ja: {
    homeLabel: "Bluemiv ホーム",
    navigationLabel: "メインメニュー",
    nav: {
      articles: "Articles",
      notes: "Notes",
      apps: "Apps",
      about: "About",
    },
    mobileMenu: { open: "メニューを開く", close: "メニューを閉じる" },
    languageLabel: "言語を選択",
    theme: {
      toggle: "カラーテーマを変更",
      light: "ライトテーマに切り替え",
      dark: "ダークテーマに切り替え",
    },
    footer: { description: "ソウルから綴る静的な技術アーカイブ" },
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
      description:
        "Java, Spring, React, Next.js를 다루며 만난 문제와 선택의 이유를 오래 읽을 수 있는 기술 기록으로 정리합니다.",
      cta: "최근 글 살펴보기",
      statusLabel: "상태",
      status: "기록 중",
    },
    featured: {
      eyebrow: "Featured / 01",
      heading: "최근 기록",
      updated: "2025.12.28 갱신",
      topic: "Kotlin",
      title: "Kotlin이란?",
      description:
        "Kotlin이 어떤 언어인지, 어디에 사용되는지, Java와 비교했을 때 기본 문법은 어떻게 다른지 정리합니다.",
      readTime: "8분",
      action: "글 살펴보기",
    },
    latest: {
      heading: "Latest Articles",
      description: "최근 정리한 개발 기록",
      action: "전체 글",
      articles: [
        {
          number: "01",
          topic: "Kotlin",
          title: "Kotlin이란?",
          description:
            "Java 생태계를 활용하면서 더 간결하고 안전하게 코드를 작성하는 언어를 살펴봅니다.",
          date: "2025.12.28",
          dateTime: "2025-12-28",
        },
        {
          number: "02",
          topic: "Java",
          title: "POJO(Plain Old Java Object)란?",
          description: "프레임워크에 종속되지 않는 객체와 Spring에서의 활용 방식을 정리합니다.",
          date: "2025.12.26",
          dateTime: "2025-12-26",
        },
        {
          number: "03",
          topic: "Spring",
          title: "@RequestParam과 @PathVariable 사용법",
          description: "Query string과 경로 변수를 구분하고 선택하는 기준을 알아봅니다.",
          date: "2025.09.04",
          dateTime: "2025-09-04",
        },
        {
          number: "04",
          topic: "Spring",
          title: "HTTP 메서드와 매핑 어노테이션",
          description: "REST API의 HTTP 메서드와 Spring 매핑 어노테이션을 연결합니다.",
          date: "2025.09.01",
          dateTime: "2025-09-01",
        },
      ],
    },
    notes: {
      eyebrow: "Short Notes",
      heading: "짧게 남긴 생각.",
      action: "모든 노트",
      items: [
        ["02", "기술 선택에서 익숙함과 적합함 구분하기"],
        ["01", "블로그를 다시 만드는 이유"],
      ],
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
      description:
        "Long-lived notes on the problems I meet while working with Java, Spring, React, and Next.js—and the reasoning behind each decision.",
      cta: "Browse recent writing",
      statusLabel: "Status",
      status: "Writing",
    },
    featured: {
      eyebrow: "Featured / 01",
      heading: "Selected writing",
      updated: "Updated 2025.12.28",
      topic: "Kotlin",
      title: "What is Kotlin?",
      description:
        "A practical introduction to Kotlin, where it fits, and how its basic syntax compares with Java.",
      readTime: "8 min read",
      action: "Explore the article",
    },
    latest: {
      heading: "Latest Articles",
      description: "Recently published development notes",
      action: "All articles",
      articles: [
        {
          number: "01",
          topic: "Kotlin",
          title: "What is Kotlin?",
          description:
            "A concise look at writing safer, clearer code while staying inside the Java ecosystem.",
          date: "2025.12.28",
          dateTime: "2025-12-28",
        },
        {
          number: "02",
          topic: "Java",
          title: "What is a Plain Old Java Object?",
          description:
            "Understanding framework-independent objects and how they are used in Spring.",
          date: "2025.12.26",
          dateTime: "2025-12-26",
        },
        {
          number: "03",
          topic: "Spring",
          title: "Using @RequestParam and @PathVariable",
          description:
            "How to distinguish query strings from path variables and choose between them.",
          date: "2025.09.04",
          dateTime: "2025-09-04",
        },
        {
          number: "04",
          topic: "Spring",
          title: "HTTP methods and mapping annotations",
          description: "Connecting RESTful HTTP methods to Spring's request mapping annotations.",
          date: "2025.09.01",
          dateTime: "2025-09-01",
        },
      ],
    },
    notes: {
      eyebrow: "Short Notes",
      heading: "Thoughts, kept brief.",
      action: "All notes",
      items: [
        ["02", "Familiarity is not the same as suitability"],
        ["01", "Why I am rebuilding this blog"],
      ],
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
      description:
        "Java、Spring、React、Next.jsを扱う中で出会った課題と、選択に至った理由を長く読める技術記事としてまとめます。",
      cta: "最近の記事を見る",
      statusLabel: "状態",
      status: "執筆中",
    },
    featured: {
      eyebrow: "Featured / 01",
      heading: "注目の記事",
      updated: "2025.12.28 更新",
      topic: "Kotlin",
      title: "Kotlinとは？",
      description:
        "Kotlinがどのような言語で、どこで使われているのか。Javaとの基本構文の違いもあわせて整理します。",
      readTime: "8分",
      action: "記事を見る",
    },
    latest: {
      heading: "Latest Articles",
      description: "最近公開した開発記録",
      action: "すべての記事",
      articles: [
        {
          number: "01",
          topic: "Kotlin",
          title: "Kotlinとは？",
          description:
            "Javaのエコシステムを活かしながら、より簡潔で安全なコードを書くための言語を紹介します。",
          date: "2025.12.28",
          dateTime: "2025-12-28",
        },
        {
          number: "02",
          topic: "Java",
          title: "POJO（Plain Old Java Object）とは？",
          description: "フレームワークに依存しないオブジェクトと、Springでの活用方法を整理します。",
          date: "2025.12.26",
          dateTime: "2025-12-26",
        },
        {
          number: "03",
          topic: "Spring",
          title: "@RequestParamと@PathVariableの使い分け",
          description: "クエリ文字列とパス変数の違い、選択するときの基準を解説します。",
          date: "2025.09.04",
          dateTime: "2025-09-04",
        },
        {
          number: "04",
          topic: "Spring",
          title: "HTTPメソッドとマッピングアノテーション",
          description: "REST APIのHTTPメソッドとSpringのマッピングアノテーションを結び付けます。",
          date: "2025.09.01",
          dateTime: "2025-09-01",
        },
      ],
    },
    notes: {
      eyebrow: "Short Notes",
      heading: "短く残した考え。",
      action: "すべてのノート",
      items: [
        ["02", "技術選定で「慣れ」と「適性」を分けて考える"],
        ["01", "このブログを作り直す理由"],
      ],
    },
  },
};
