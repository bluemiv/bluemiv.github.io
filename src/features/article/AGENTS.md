# article 규칙

- article metadata 검증, 본문 분석, build-time 조회를 담당한다.
- MDX metadata의 `author`는 선택값이다.
- `author`가 없으면 `SITE_CONFIG.author`를 사용한다.
- 식별 번호, heading, 읽기 시간, 추천과 이전·다음 계산은 순수 함수로 유지한다.
- featured 분리, category/topic 집계·필터링 같은 article collection 계산도 순수 함수로 유지한다.
- archive pagination은 최신순 article 배열을 페이지당 10개로 나누고 경계 조건을 테스트한다.
- reading progress와 active heading 계산은 하나의 provider에서 공유하고 순수 계산을 테스트한다.
- 상세 구조화 데이터는 Google Article 형식의 `BlogPosting`과 canonical `@id`, `url`을 사용한다.
- category/topic 계층, 공개 label, 허용 관계는 `articleTaxonomy.ts`를 단일 원천으로 사용한다.
- taxonomy summary는 정의된 category/topic 순서를 유지하고 공개 article만 집계한다.
- metadata의 `category`는 단일 값, `topics`는 중복 없는 비어 있지 않은 배열이다.
- `topics[0]`은 UI에서 대표 topic으로 사용한다.
- 모든 topic은 선택한 category 아래에 정의되어야 하며 잘못된 조합은 build에서 거부한다.
- tag는 공통 registry key만 허용하고 category·topic과 중복되면 build에서 거부한다.
- route와 화면 markup은 넣지 않는다.
- filesystem 조회는 SSG build에서만 실행한다.
- taxonomy 변경 시 metadata 검증, archive route, count 테스트를 함께 갱신한다.
