# navigation 규칙

- site navigation의 route 상태와 scroll 반응 규칙을 둔다.
- scroll 계산은 순수 함수로 유지하고 경계 조건을 테스트한다.
- browser event 연결과 markup은 사용하는 component가 담당한다.
- 작은 scroll 흔들림으로 header 상태가 반복 전환되지 않게 한다.
- page transition 방향은 `forward`, `back`, `swap`으로 정의한다.
- transition은 탐색 의미만 제공한다. 시각 효과는 공통 style과 component가 담당한다.
- pagination 번호 축약은 처음·끝과 현재 주변을 유지하는 순수 함수로 계산한다.
- active route 판별은 trailing slash 유무와 root 경계를 함께 처리한다.
- pagination은 잘못된 현재·전체 페이지 값을 명시적으로 거부한다.
