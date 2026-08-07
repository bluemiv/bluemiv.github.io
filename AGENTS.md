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
- 기존 블로그 글, 앱, 개인정보처리방침 URL 호환성 유지.
- `/sw.js`는 기존 캐시를 제거하기 위한 영구 tombstone service worker다. 삭제하거나 이름을 바꾸지 않고, `fetch` handler나 cache write 로직을 추가하지 않는다.
- 글 본문은 카드로 감싸지 않음. 타이포그래피와 여백 우선.
- 커밋 형식: `feat:`, `docs:`, `chore:`, `style:`, `fix:` + 한국어 내용.
- push 금지. 사용자가 별도 요청할 때만 push.

## 디자인 작업 필수 절차

- UI, UX, layout, typography, color, spacing, motion, responsive, accessibility 관련 작업 전 `docs/design-system.md`를 처음부터 끝까지 읽는다.
- 디자인 구현은 `docs/design-system.md`의 token, component, page pattern, 금지 규칙을 따른다.
- 디자인 시스템 자체가 바뀌면 코드만 수정하지 않는다. `docs/design-system.md`를 같은 커밋에서 반드시 업데이트한다.
- 기존 규칙을 단순 적용하는 변경은 문서 수정이 필수는 아니다. 재사용 가능한 새 결정이나 예외가 생기면 문서화한다.
- 문서와 구현이 충돌하면 임의로 한쪽을 무시하지 않는다. 변경 의도를 확인하고 둘을 일치시킨다.
- 디자인 완료 전 light/dark, mobile/desktop, keyboard focus, reduced motion을 확인한다.
