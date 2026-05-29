# bluemiv.github.io

> 기술 블로그 + 개인 Android 앱 랜딩/개인정보처리방침 호스팅 사이트.

- 라이브: https://bluemiv.github.io
- 스택: Next.js 16 (App Router, Turbopack), React 19, TypeScript 5, Tailwind CSS v4, MDX.
- 배포: GitHub Pages (Static Export).

## 본 저장소의 역할

1. **기술 블로그** — `src/_posts/<category>/<N>.mdx` 형태의 MDX 포스트.
2. **앱 랜딩 + 개인정보처리방침** — 각 Android 앱이 Play Store 등록 시 사용할 Privacy Policy URL을 발급.

## ⚠️ Public Repo 안내

본 저장소는 GitHub Pages용 **PUBLIC repo**입니다.

- API key, 토큰, `.env` 실제값 등 **민감 정보 커밋 금지**.
- 일반적인 클라이언트 노출 ID(GA tracking 등)는 commit 가능하지만 PR에서 한 번 더 확인합니다.
- 작업 가이드는 [`AGENTS.md`](./AGENTS.md) 참고.

## 개인정보처리방침 URL 패턴

신규 앱은 **`https://bluemiv.github.io/apps/<app-name>/privacy[/<lang>]/`** (kebab-case)만 사용합니다.

레거시 `/privacy/<app-name>/<lang>/` 경로는 더 이상 신규 추가하지 않으며 점진 이관 예정입니다. 자세한 매핑은 `src/shared/constants/route.ts`를 참고하세요.

## 개발

```bash
pnpm install
pnpm dev      # http://localhost:3333
pnpm build    # 정적 export → out/
pnpm lint
pnpm format
```

## 룰 / 작업 가이드

본 저장소의 코딩·콘텐츠·디렉토리·URL 정책은 [`AGENTS.md`](./AGENTS.md)가 단일 원천입니다. `CLAUDE.md` / `GEMINI.md`는 동일 내용을 가리키는 한 줄 포인터입니다.
