# note 규칙

- note metadata 검증, build-time 조회, 식별 번호, 이전·다음 탐색, SEO 데이터를 담당한다.
- MDX metadata의 `author`는 선택값이다.
- `author`가 없으면 `SITE_CONFIG.author`를 사용한다.
- 식별 번호, 이전·다음 탐색, 구조화 데이터 생성은 순수 함수로 유지한다.
- route와 화면 markup은 넣지 않는다.
- filesystem 조회는 SSG build에서만 실행한다.
