# atoms 규칙

- 작고 도메인에 독립적인 UI만 둔다.
- `widgets`, `features`, `app`을 import하지 않는다.
- 화면 section 전체를 조합하지 않는다.
- data 조회와 route 조합을 하지 않는다.
- `className` 확장이 필요하면 `PropsWithClassName<TProps>`를 쓴다.
- article과 note가 공유하는 발행 정보 UI는 `PublicationMetadata`를 사용한다.
- 기본 HTML attribute와 ref 전달을 불필요하게 막지 않는다.
