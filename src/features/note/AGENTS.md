# note 규칙

- note metadata 검증, build-time 조회, heading 추출, 식별 번호, 이전·다음 탐색, SEO 데이터를 담당한다.
- MDX metadata의 `author`는 선택값이다.
- `author`가 없으면 `SITE_CONFIG.author`를 사용한다.
- 식별 번호, 이전·다음 탐색, 구조화 데이터 생성은 순수 함수로 유지한다.
- 상세 구조화 데이터는 `BlogPosting`과 canonical `@id`, `url`을 사용한다.
- TOC는 h2만 사용하고 3개 이상일 때만 표시한다. source의 기존 번호는 label에서 제거하고 번호를 자동 생성한다.
- tag는 공통 registry key만 허용하고 중복 값을 build에서 거부한다.
- note에 article category/topic 계산을 재사용하지 않는다.
- route와 화면 markup은 넣지 않는다.
- filesystem 조회는 SSG build에서만 실행한다.
- note 변경 시 heading, navigation, structured data 경계를 테스트한다.
