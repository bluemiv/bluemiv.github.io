# Bluemiv Tech Blog V2

Bluemiv Tech Blog의 새 구조를 만드는 로컬 작업 브랜치입니다.

## 실행

```bash
pnpm install
pnpm dev
```

개발 서버: `http://localhost:4000`

## 검증

```bash
pnpm lint
pnpm typecheck
pnpm build
```

## 원칙

- GitHub Pages용 static export
- 읽기 중심 UI
- 기존 글, 앱 URL, 개인정보처리방침 URL 보존
- 서비스 워커 캐시 미사용
- `/sw.js`는 기존 클라이언트 정리용으로 영구 유지
