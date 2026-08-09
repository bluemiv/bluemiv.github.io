# features 규칙

| 디렉토리         | 책임                                          |
| ---------------- | --------------------------------------------- |
| `adsense`        | 광고 script, slot, local preview              |
| `app`            | 개별 app 공개 정보와 상세 경로                |
| `article`        | article metadata, 식별 번호, SSG 조회         |
| `comment`        | giscus 댓글, discussion 식별, theme 동기화    |
| `i18n`           | locale 판별, locale URL, 번역 문구            |
| `legacyRedirect` | 기존 URL과 canonical URL 매핑                 |
| `navigation`     | site navigation과 header scroll               |
| `note`           | note metadata, heading, SSG 조회, 탐색, SEO   |
| `policy`         | 법적 문서, 기존 URL, 정적 이관                |
| `profile`        | 공개 경력 기간 계산                           |
| `serviceWorker`  | 구형 worker와 cache 제거                      |
| `search`         | 정적 글 검색, Pagefind client와 색인 metadata |
| `tag`            | article·note 공통 tag key와 공개 label        |
| `theme`          | 초기 theme 적용과 전환                        |

- feature는 사용자 기능 하나만 가진다.
- feature끼리 직접 import하지 않는다. article·note·search·SEO의 공통 tag registry 사용은 예외다.
- route와 page layout을 feature에 넣지 않는다.
- browser API가 필요할 때만 최소 범위에 `"use client"`를 쓴다.
- 공개 API는 feature root 또는 책임이 드러나는 파일에서만 export한다.
- UI state와 build-time domain data를 같은 module에 섞지 않는다.
- 비즈니스 규칙은 가능한 순수 함수로 분리한다.
- 테스트는 대상 파일 옆 `*.test.ts`에 둔다.
- 로직 추가·변경 시 성공·실패·경계 조건을 함께 테스트한다.
- 새 feature 추가 시 위 표를 함께 갱신한다.
- feature 삭제 시 import, test, 표 항목, 빈 디렉토리를 함께 제거한다.
