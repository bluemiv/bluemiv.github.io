<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# 프로젝트 개요

Bluemiv Tech Blog V2는 Next.js 16 App Router와 Tailwind CSS v4로 만드는 GitHub Pages용 정적 사이트다. 기술 블로그, 짧은 글, 앱 랜딩, 개인정보처리방침을 한 저장소에서 제공하며 `output: "export"` 제약을 유지한다.

## 프로젝트 구조

```text
public/                          정적 원본 파일
├── sw.js                       기존 캐시 제거 전용 tombstone service worker
├── ads.txt                     AdSense 판매자 공개 인증
└── .nojekyll                   GitHub Pages의 Jekyll 처리 비활성화
docs/
└── design-system.md            디자인 시스템 단일 원천
src/
├── app/                        App Router의 route, layout, metadata, global CSS
│   └── (blog)/                 블로그 공통 shell을 공유하는 route group
├── features/                   독립된 사용자 기능과 도메인 동작
│   ├── adsense/                production 광고 script와 slot 초기화
│   ├── service-worker/         구형 service worker와 캐시 정리
│   └── theme/                  light/dark 테마 전환
├── shared/                     도메인에 종속되지 않는 config와 UI primitive
│   ├── config/
│   └── ui/
└── widgets/                    feature와 shared UI를 조합한 큰 화면 블록
    ├── blog-sidebar/
    ├── site-footer/
    └── site-header/
```

세부 feature 책임과 규칙은 `src/features/AGENTS.md`를 따른다. 하위 디렉토리에 `AGENTS.md`가 추가되면 더 가까운 파일의 규칙을 함께 적용한다.

## 계층과 의존 방향

```text
app → widgets → features → shared
               └────────→ shared
app ────────────────────→ shared
```

- `app`: route 진입점과 page composition을 담당한다. 재사용할 도메인 로직을 page 파일에 쌓지 않는다.
- `widgets`: header, footer, blog sidebar처럼 여러 작은 단위를 조합한 독립 화면 블록이다.
- `features`: theme 전환, service worker 정리처럼 명확한 사용자 동작 또는 도메인 책임을 가진다.
- `shared`: 여러 도메인에서 재사용 가능한 UI, config, utility만 둔다. `features`, `widgets`, `app`을 import하지 않는다.
- 의존은 위 방향으로만 흐른다. `features`가 `widgets` 또는 `app`을 import하거나, `widgets`가 `app`을 import하지 않는다.
- route 전용이며 재사용되지 않는 작은 표현은 `app`에 둘 수 있다. 두 곳 이상에서 재사용되거나 독립 책임을 가지면 알맞은 계층으로 이동한다.
- 새 최상위 계층을 임의로 만들지 않는다. 현재 계층으로 표현하기 어려울 때 구조 변경 이유와 경계를 먼저 문서화한다.

# 저장소 작업 규칙

- PUBLIC GitHub Pages 저장소. 시크릿, 토큰, 실제 `.env` 값 커밋 금지.
- 패키지 매니저는 pnpm.
- 개발 서버 포트는 4000.
- 정적 export 제약 유지. 서버 전용 기능 사용 금지.
- 기존 프로젝트는 `../bluemiv.github.io`에서 참고.
- 기존 블로그 글 URL은 아래 URL 정책에 따라 새 canonical URL로 1:1 이동한다. 앱과 개인정보처리방침처럼 외부에 등록된 URL도 삭제하지 않고 영구 호환 경로를 유지한다.
- `/sw.js`는 기존 캐시를 제거하기 위한 영구 tombstone service worker다. 삭제하거나 이름을 바꾸지 않고, `fetch` handler나 cache write 로직을 추가하지 않는다.
- 글 본문은 카드로 감싸지 않음. 타이포그래피와 여백 우선.
- 커밋 형식: `feat:`, `docs:`, `chore:`, `style:`, `fix:` + 한국어 내용.
- push 금지. 사용자가 별도 요청할 때만 push.

## URL·다국어·SEO 정책

### 기본 원칙

- 지원 locale은 한국어 `ko`, 영어 `en`, 일본어 `ja`다. 일본어 경로에 국가 코드인 `jp`를 사용하지 않는다.
- 모든 사용자용 canonical page는 locale을 첫 path segment로 사용한다. 언어마다 구조를 다르게 만들지 않는다.
- `/`는 `x-default` 언어 선택 화면이다. IP, `Accept-Language`, browser locale을 근거로 자동 이동시키지 않는다.
- 언어 전환은 현재 페이지의 실제 번역 URL을 가리키는 일반 `<a>` 링크로 제공한다.
- 번역이 없는 locale route는 생성하지 않는다. 다른 언어 본문이나 홈으로 조용히 대체하지 않는다.
- `ads.txt`, `robots.txt`, `sitemap.xml`, `sw.js`, favicon과 정적 asset은 locale prefix를 붙이지 않는다.
- `trailingSlash: true`를 유지하고 canonical, sitemap, 내부 링크에서도 끝 `/` 표기를 통일한다.

### Canonical route

```text
/                                      x-default 언어 선택
/{locale}/                             locale 홈

/{locale}/articles/                    글 목록
/{locale}/articles/page/{page}/        글 목록 2페이지 이상
/{locale}/articles/{slug}/             글 상세

/{locale}/topics/                      전체 주제
/{locale}/topics/{topic}/              주제별 글 목록
/{locale}/topics/{topic}/page/{page}/  주제별 글 2페이지 이상

/{locale}/tags/                        전체 태그
/{locale}/tags/{tag}/                  태그별 글 목록
/{locale}/tags/{tag}/page/{page}/      태그별 글 2페이지 이상

/{locale}/notes/                       짧은 글 목록
/{locale}/notes/page/{page}/           짧은 글 목록 2페이지 이상
/{locale}/notes/{slug}/                짧은 글 상세

/{locale}/apps/                        앱 목록
/{locale}/apps/{app-name}/             앱 상세
/{locale}/apps/{app-name}/privacy/     개인정보처리방침
/{locale}/apps/{app-name}/terms/       이용약관
/{locale}/apps/{app-name}/account-deletion/ 계정 삭제 안내

/{locale}/about/                       소개
/{locale}/rss.xml                      locale별 RSS
```

- 첫 목록 페이지는 `/page/1/`을 만들지 않고 목록 root를 canonical로 사용한다.
- `topic`은 글마다 하나인 주 분류다. `tag`는 여러 개를 허용하는 보조 키워드다.
- 상세 URL에 topic을 넣지 않는다. topic을 바꿔도 글 URL은 유지되어야 한다.
- `slug`, `topic`, `tag`, `app-name`은 소문자 ASCII kebab-case를 사용한다.
- 글 slug는 frontmatter에 명시하고 발행 뒤 바꾸지 않는다. 제목으로부터 build 시점마다 자동 생성하지 않는다.
- 번역본은 같은 콘텐츠 식별자와 slug를 공유한다. locale마다 slug를 따로 번역하지 않는다.
- `page`, `topics`, `tags`는 article과 note slug 예약어다. slug는 콘텐츠 종류 안에서 유일해야 한다.

### 번역 metadata

- 각 언어 페이지의 canonical은 자기 자신의 locale URL이다. 영어·일본어 페이지의 canonical을 한국어 페이지로 지정하지 않는다.
- 실제로 존재하는 번역만 `hreflang`에 넣고 각 번역 페이지에서 자기 자신을 포함한 동일한 언어 집합을 상호 참조한다.
- 언어 코드는 `ko`, `en`, `ja`를 사용한다. 콘텐츠 페이지의 `x-default`는 대응하는 한국어 URL을 사용한다.
- root 언어 선택 페이지는 자기 자신을 `x-default`로 사용하고 각 locale 홈을 alternate로 제공한다.
- page의 `<html lang>`, Open Graph locale, 구조화 데이터의 `inLanguage`를 실제 언어와 일치시킨다.
- 제목, 설명, 본문만이 아니라 navigation과 접근성 문구까지 해당 locale로 제공한다.
- sitemap에는 canonical URL만 넣고 사용 가능한 언어 alternate 관계를 함께 표현한다. 내부 링크도 canonical URL만 사용한다.

### 기존 URL 이전

- 기존 URL을 404로 만들거나 모든 글을 하나의 목록 페이지로 보내지 않는다. 반드시 의미가 같은 새 URL로 1:1 대응한다.
- GitHub Pages 정적 export에서는 기존 경로에 0초 `meta refresh`, `location.replace()`, 새 URL canonical을 가진 정적 이동 페이지를 생성한다.
- 기존 이동 페이지는 검색엔진 이전과 외부 링크 호환성을 위해 장기 유지한다.
- 기존 URL은 sitemap과 새 내부 링크에서 제외한다.

```text
/blog/{category}/{slug}/              → /ko/articles/{new-slug}/
/blog/short/{slug}/                   → /ko/notes/{new-slug}/
/blog/category/{category}/1/          → /ko/topics/{topic}/
/blog/category/{category}/{page}/     → /ko/topics/{topic}/page/{page}/
/blog/tags/{tag}/1/                   → /ko/tags/{tag}/
/blog/tags/{tag}/{page}/              → /ko/tags/{tag}/page/{page}/
/1/                                   → /ko/articles/
/{page}/                              → /ko/articles/page/{page}/
/articles/...                         → /ko/articles/...
/notes/...                            → /ko/notes/...
```

- 앱 랜딩, 개인정보처리방침, 이용약관, 계정 삭제처럼 Play Console이나 외부 서비스에 등록된 기존 URL도 새 locale-first URL로 1:1 연결하며 삭제하지 않는다.
- route를 추가하거나 바꿀 때 canonical, alternate, sitemap, breadcrumb, RSS, legacy mapping을 함께 검토한다.

## 디자인 작업 필수 절차

- UI, UX, layout, typography, color, spacing, motion, responsive, accessibility 관련 작업 전 `docs/design-system.md`를 처음부터 끝까지 읽는다.
- 디자인 구현은 `docs/design-system.md`의 token, component, page pattern, 금지 규칙을 따른다.
- 디자인 시스템 자체가 바뀌면 코드만 수정하지 않는다. `docs/design-system.md`를 같은 커밋에서 반드시 업데이트한다.
- 기존 규칙을 단순 적용하는 변경은 문서 수정이 필수는 아니다. 재사용 가능한 새 결정이나 예외가 생기면 문서화한다.
- 문서와 구현이 충돌하면 임의로 한쪽을 무시하지 않는다. 변경 의도를 확인하고 둘을 일치시킨다.
- 디자인 완료 전 light/dark, mobile/desktop, keyboard focus, reduced motion을 확인한다.
