# article 규칙

- article metadata 검증, 본문 분석, build-time 조회를 담당한다.
- MDX metadata의 `author`는 선택값이다.
- `author`가 없으면 `SITE_CONFIG.author`를 사용한다.
- heading, 읽기 시간, 추천과 이전·다음 계산은 순수 함수로 유지한다.
- route와 화면 markup은 넣지 않는다.
- filesystem 조회는 SSG build에서만 실행한다.
