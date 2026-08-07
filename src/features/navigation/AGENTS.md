# navigation 규칙

- site navigation의 route 상태와 scroll 반응 규칙을 둔다.
- scroll 계산은 순수 함수로 유지하고 경계 조건을 테스트한다.
- browser event 연결과 markup은 사용하는 component가 담당한다.
- 작은 scroll 흔들림으로 header 상태가 반복 전환되지 않게 한다.
