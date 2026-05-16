# AGENTS.md

이 파일은 Codex가 이 프로젝트에서 효과적으로 작업할 수 있도록 돕는 가이드입니다.

## 프로젝트 개요

**Bluemiv Tech Blog** - Next.js 16 기반의 정적 기술 블로그
- 배포: GitHub Pages (`bluemiv.github.io`)
- 콘텐츠: MDX 기반 마크다운 포스트
- 출력: Static Export (SSG)

## 기술 스택

| 영역 | 기술 |
|------|------|
| Framework | Next.js 16.2.6 (App Router, Turbopack) |
| Runtime UI | React 19 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| State | Zustand 5 |
| Animation | Motion 12 |
| MDX | next-mdx-remote, gray-matter, rehype-pretty-code, shiki |
| Package Manager | pnpm |

## 프로젝트 구조

```
src/
├── _posts/          # 블로그 포스트 (MDX)
│   ├── algorithm/   # 카테고리별 폴더
│   ├── javascript/
│   ├── react/
│   └── _drafts/     # 초안 (빌드 제외)
├── _short/          # 짧은 글 (MDX)
├── app/             # Next.js App Router
│   ├── (blog)/      # 블로그 라우트 그룹
│   └── privacy/     # 개인정보처리방침
├── features/        # 도메인별 기능 모듈
│   ├── post/        #   포스트 (api, model, components)
│   ├── tag/         #   태그 (components)
│   ├── privacy/     #   개인정보 (constants, components)
│   ├── theme/       #   테마 (store, hooks, components)
│   └── serviceWorker/
├── shared/          # 공용 유틸, 타입, 컴포넌트
└── widgets/         # 페이지 조합 컴포넌트
```

## 개발 명령어

```bash
pnpm dev      # 개발 서버 (Turbopack, port 3333)
pnpm build    # 정적 빌드 (prebuild로 SW 자동 생성)
pnpm lint     # ESLint 실행
pnpm format   # Prettier 포맷팅
```

## 코딩 컨벤션

### Import 순서 (자동 정렬됨)
```typescript
import React from 'react';           // 1. React
import { motion } from 'motion';     // 2. 서드파티
import { PostCard } from '@/entities/post';  // 3. 내부 절대경로
import { Button } from './Button';   // 4. 상대경로
```

### 경로 별칭
- `@/*` → `./src/*` (tsconfig.json)

### 스타일링
- Tailwind CSS 클래스 사용
- 다크모드: `dark:` 접두사
- 커스텀 색상: `app-primary`, `app-text`, `app-bg` 등
- 아이콘은 `lucide-react` 우선 사용

### UI/UX 규칙
- 기술 블로그는 읽기 흐름이 우선이다. 장식보다 정보 계층, 타이포그래피, 여백을 먼저 정리한다.
- 카드 남발 금지. 카드는 글 목록, 반복 아이템, CTA, 모달처럼 명확히 분리해야 하는 요소에만 사용한다.
- 글 본문(`article`)은 카드/박스로 감싸지 않는다. 배경 위에 자연스럽게 놓고, 제목/본문/코드/표의 리듬으로 구분한다.
- 글 상세 상단 메타 영역은 얇은 구분선과 타이포 계층을 우선한다. 큰 카드나 중첩 카드는 피한다.
- TOC는 본문 보조 내비게이션이다. 카드로 무겁게 감싸지 말고, 얇은 rail/indicator와 active text 중심으로 표현한다.
- 날짜, 작성자, 수정일 같은 metadata는 액션 칩이 아니다. 불필요한 pill/rounded badge로 감싸지 말고 조용한 inline meta로 둔다.
- 태그/카테고리처럼 클릭 가능한 분류만 chip/pill 형태를 허용한다.
- 모션은 `opacity`, `transform` 중심으로 가볍게 사용하고, layout shift를 만들지 않는다.
- `prefers-reduced-motion` 대응을 유지한다.
- 라이트/다크 테마 모두에서 contrast와 border 가시성을 확인한다.

### 파일 네이밍
- 컴포넌트: PascalCase (`PostCard.tsx`)
- 유틸/훅: camelCase (`useThemeStore.ts`)
- 포스트: 숫자 (`001.mdx`, `002.mdx`)

## 포스트 작성

### 위치
- 일반 포스트: `src/_posts/[category]/[number].mdx`
- 짧은 글: `src/_short/[number].mdx`
- 초안: `src/_posts/_drafts/[number].mdx`

### 프론트매터 형식
```yaml
---
title: 포스트 제목
description: 포스트에 대한 설명을 작성합니다.
createdAt: 2025-08-02T14:23:17+09:00
updatedAt: 2025-08-02T14:23:17+09:00
tags: ['tag1', 'tag2', 'tag3']
release: true
author: 김태홍 (bluemiv)
thumbnail: /r/i/[category]/[number]/thumbnail.webp
---
```

### 프론트매터 필드 설명
| 필드 | 필수 | 설명 |
|------|------|------|
| title | O | 포스트 제목 (따옴표 없이 작성, 특수문자 있으면 작은따옴표로 감싸기) |
| description | O | 포스트 설명 |
| createdAt | O | 작성일 (ISO 8601 형식: `YYYY-MM-DDTHH:mm:ss+09:00`) |
| updatedAt | O | 수정일 (ISO 8601 형식) |
| tags | O | 태그 배열 (`['tag1', 'tag2']` 형식) |
| release | O | 공개 여부 (`true`/`false`, false면 빌드 제외) |
| author | O | 작성자 (`김태홍 (bluemiv)`) |
| thumbnail | O | 썸네일 경로 (`/r/i/[category]/[number]/thumbnail.webp`) |

### 본문 작성 규칙
- 마크다운 + JSX 문법 사용 가능
- 제목은 `##` (h2)부터 시작 (h1은 title로 자동 생성)
- 코드 블록: 언어 지정 필수 (```java, ```typescript 등)
- 이미지: `/r/i/[category]/[number]/` 경로에 저장

### 카테고리 목록
`algorithm`, `firebase`, `frontend`, `go`, `java`, `javascript`, `nextjs`, `react`, `spring`

## 주요 파일 위치

| 용도 | 경로 |
|------|------|
| 글로벌 스타일 | `src/app/globals.css` |
| 레이아웃 | `src/app/layout.tsx` |
| 환경변수 | `.env` |
| 테마 스토어 | `src/features/theme/store/` |
| 포스트 API | `src/features/post/api/` |
| 공용 컴포넌트 | `src/shared/components/` |

## 환경변수 (.env)

```
BASE_URL=https://bluemiv.github.io
METADATA_TITLE=Bluemiv Tech Blog
METADATA_AUTHOR=Taehong Kim
GA_ID=G-XGMWR2ZV55
NEXT_PUBLIC_COMMENTS_REPO=bluemiv/githubblog-comment
```

## 주의사항

1. **정적 빌드**: `output: 'export'` 설정으로 서버 기능 사용 불가 (API Routes, 동적 서버 렌더링 등)

2. **이미지**: `unoptimized: true` 설정으로 Next.js Image 최적화 비활성화됨

3. **MDX 처리**: `next-mdx-remote`로 서버에서 직렬화 후 클라이언트 렌더링

4. **테마**: Zustand persist로 localStorage에 저장, SSR hydration 주의

5. **포스트 필터링**: `release: false`인 포스트는 빌드에서 제외됨

## 자주 하는 작업

### 새 포스트 추가
1. `src/_posts/[category]/` 폴더에 MDX 파일 생성
2. 프론트매터 작성 (필수 필드 포함)
3. `release: true` 설정
4. `pnpm build`로 확인

### 새 카테고리 추가
1. `src/_posts/[new-category]/` 폴더 생성
2. 해당 카테고리의 첫 포스트 작성

### 컴포넌트 수정
- 공용 컴포넌트: `src/shared/components/`
- 도메인 컴포넌트: `src/features/[domain]/components/`
- 위젯: `src/widgets/`

### 스타일 수정
- 글로벌 변수: `src/app/globals.css`의 `@theme` 블록
- 컴포넌트별: Tailwind 클래스 직접 수정

## 디버깅 팁

- 개발서버: `http://localhost:3333`
- 빌드 결과: `out/` 폴더
- Service Worker: `scripts/build-sw.js`에서 생성
