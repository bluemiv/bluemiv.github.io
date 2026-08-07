<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Bluemiv Tech Blog V2

Next.js 16 App Router 기반 정적 기술 블로그다. GitHub Pages에 배포한다.

## 핵심 규칙

- 패키지 매니저: pnpm.
- 개발 포트: 4000.
- `output: "export"`, `trailingSlash: true` 유지.
- 서버 전용 기능과 runtime API 사용 금지.
- PUBLIC 저장소. secret, token, 실제 `.env` 값 커밋 금지.
- 공개 author 이름은 `Bluemiv`만 사용한다. 실명 표기 금지.
- 기존 저장소 `../bluemiv.github.io`는 읽기 전용 참고 자료다.
- push 금지. 사용자가 명시할 때만 push.
- 커밋: `feat:`, `docs:`, `chore:`, `style:`, `fix:` + 한국어 내용.
- 커밋 작성자: `bluemiv <public.bluemiv@gmail.com>`.

## 구조

```text
src/
├── app/             route, layout, metadata, global CSS
├── articles/        article MDX
├── notes/           note MDX
├── components/      공통 UI
│   ├── atoms/       작은 공통 UI
│   └── widgets/     큰 조합 UI
├── config/          앱 전역 공개 설정
├── features/        사용자 기능
└── types/           공통 type utility
public/              정적 공개 파일
scripts/             이관·검증 스크립트
docs/                설계 문서
```

- 최상위 `shared`, `widgets`, 별도 `layouts` 계층을 만들지 않는다.
- 작은 공통 UI는 `components/atoms`, 큰 조합 UI는 `components/widgets`에 둔다.
- route layout은 `app/**/layout.tsx`만 사용한다.
- 사용하지 않는 파일과 빈 디렉토리는 제거한다.
- 가까운 디렉토리의 `AGENTS.md`를 함께 따른다.

## 용어

- 긴 글: `article`. `post`, `content`를 같은 뜻으로 쓰지 않는다.
- 짧은 글: `note`.
- 주 분류: `topic`. `category`를 새 코드에 쓰지 않는다.
- 보조 키워드: `tag`.
- 전체 규칙: `docs/naming-conventions.md`.

## URL·locale

- 기본 locale: 한국어 `ko`. `/`에 표시한다. `/ko/` canonical을 만들지 않는다.
- 영어: `/en/`. 일본어: `/ja/`.
- article: `/articles/{slug}/`.
- topic: `/topics/{topic}/`. tag: `/tags/{tag}/`.
- note: `/notes/{slug}/`.
- 영어·일본어는 동일 route 앞에 locale prefix를 붙인다.
- slug와 public route는 소문자 ASCII kebab-case.
- canonical, hreflang, sitemap, 내부 link는 trailing slash를 유지한다.
- 번역 없는 locale route를 만들지 않는다.
- 기존 URL은 대응하는 새 URL로 1:1 정적 이동한다.

## article metadata

필드명은 아래만 사용한다.

```yaml
id: article-001
slug: example-article
locale: ko
topic: nextjs
legacyPaths: []
title: 제목
description: 설명
publishedAt: 2026-01-01T00:00:00+09:00
modifiedAt: 2026-01-01T00:00:00+09:00
tags: []
isPublished: true
coverImage: /r/i/example/cover.webp
```

- `createdAt`, `updatedAt`, `release`, `thumbnail` 사용 금지.
- `author`는 선택값. 없으면 SSG build에서 `SITE_CONFIG.author`를 사용한다.
- 번역 article은 같은 `id`, `slug`를 사용한다.

## UI

- UI 작업 전 `docs/design-system.md` 전체 확인.
- 디자인 결정 변경 시 같은 커밋에서 문서도 갱신.
- article 본문을 card로 감싸지 않는다.
- semantic color token과 Tailwind CSS 사용.
- light/dark, mobile/desktop, keyboard, reduced motion 확인.

## Service Worker

- `public/sw.js`는 구형 캐시 제거용 tombstone이다.
- 삭제·이름 변경·fetch handler·cache write 금지.

## 검증

```bash
pnpm lint
pnpm typecheck
pnpm build
pnpm format:check
```

- 커밋 전 `git diff --cached`로 secret과 불필요 파일 확인.
