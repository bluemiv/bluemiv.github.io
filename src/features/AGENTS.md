# features 규칙

| 디렉토리         | 책임                               |
| ---------------- | ---------------------------------- |
| `adsense`        | 광고 script, slot, local preview   |
| `article`        | article metadata 검증과 SSG 조회   |
| `i18n`           | locale 판별, locale URL, 번역 문구 |
| `legacyRedirect` | 기존 URL과 canonical URL 매핑      |
| `navigation`     | site navigation과 header scroll    |
| `note`           | note metadata, SSG 조회, 탐색, SEO |
| `profile`        | 공개 경력 기간 계산                |
| `serviceWorker`  | 구형 worker와 cache 제거           |
| `theme`          | 초기 theme 적용과 전환             |

- feature는 사용자 기능 하나만 가진다.
- feature끼리 직접 import하지 않는다.
- route와 page layout을 feature에 넣지 않는다.
- browser API가 필요할 때만 최소 범위에 `"use client"`를 쓴다.
- 비즈니스 규칙은 가능한 순수 함수로 분리한다.
- 테스트는 대상 파일 옆 `*.test.ts`에 둔다.
- 로직 추가·변경 시 성공·실패·경계 조건을 함께 테스트한다.
- 새 feature 추가 시 위 표를 함께 갱신한다.
