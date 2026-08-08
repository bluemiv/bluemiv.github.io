# article 규칙

- article metadata 검증, 본문 분석, build-time 조회를 담당한다.
- MDX metadata의 `author`는 선택값이다.
- `author`가 없으면 `SITE_CONFIG.author`를 사용한다.
- heading, 읽기 시간, 추천과 이전·다음 계산은 순수 함수로 유지한다.
- featured 분리, topic 집계·필터링 같은 article collection 계산도 순수 함수로 유지한다.
- archive pagination은 최신순 article 배열을 페이지당 10개로 나누고 경계 조건을 테스트한다.
- topic 공개 label은 `articleTopic.ts`를 단일 원천으로 사용한다.
- route와 화면 markup은 넣지 않는다.
- filesystem 조회는 SSG build에서만 실행한다.
