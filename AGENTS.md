<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# 저장소 작업 규칙

- PUBLIC GitHub Pages 저장소. 시크릿, 토큰, 실제 `.env` 값 커밋 금지.
- 패키지 매니저는 pnpm.
- 개발 서버 포트는 4000.
- 정적 export 제약 유지. 서버 전용 기능 사용 금지.
- 기존 프로젝트는 `../bluemiv.github.io`에서 참고.
- 기존 블로그 글, 앱, 개인정보처리방침 URL 호환성 유지.
- 글 본문은 카드로 감싸지 않음. 타이포그래피와 여백 우선.
- 커밋 형식: `feat:`, `docs:`, `chore:`, `style:`, `fix:` + 한국어 내용.
- push 금지. 사용자가 별도 요청할 때만 push.
