# Bluemiv Tech Blog V2

Bluemiv Tech Blog의 새 구조를 만드는 로컬 작업 브랜치입니다.

## 실행

```bash
pnpm install
pnpm dev      # 개발 서버, port 4000
pnpm start    # SSG build 후 out/ 정적 서버, port 4000
```

개발 서버: `http://localhost:4000`

## 검증

```bash
pnpm lint
pnpm typecheck
pnpm format
pnpm format:check
pnpm build
```

## 원칙

- GitHub Pages용 static export
- 읽기 중심 UI
- 기존 글, 앱 URL, 개인정보처리방침 URL 보존
- 서비스 워커 캐시 미사용
- `/sw.js`는 `bluemiv-blog-*` 캐시 삭제와 기존 등록 해제만 수행하는 tombstone으로 영구 유지

## 문서

- [디자인 시스템](docs/design-system.md)
- [명명 규칙](docs/naming-conventions.md)
- [에이전트 작업 규칙](AGENTS.md)
- [Feature 작업 규칙](src/features/AGENTS.md)
- [오픈소스 폰트 고지](THIRD_PARTY_NOTICES.md)
