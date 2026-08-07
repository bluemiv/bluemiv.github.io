# features 규칙

| 디렉토리        | 책임                               |
| --------------- | ---------------------------------- |
| `adsense`       | 광고 script, slot, local preview   |
| `i18n`          | locale 판별, locale URL, 번역 문구 |
| `serviceWorker` | 구형 worker와 cache 제거           |
| `theme`         | 초기 theme 적용과 전환             |

- feature는 사용자 기능 하나만 가진다.
- feature끼리 직접 import하지 않는다.
- route와 page layout을 feature에 넣지 않는다.
- browser API가 필요할 때만 최소 범위에 `"use client"`를 쓴다.
- 새 feature 추가 시 위 표를 함께 갱신한다.
