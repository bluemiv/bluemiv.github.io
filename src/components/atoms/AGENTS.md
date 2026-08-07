# atoms 규칙

- 작고 도메인에 독립적인 UI만 둔다.
- `widgets`, `features`, `app`을 import하지 않는다.
- 화면 section 전체를 조합하지 않는다.
- `className` 확장이 필요하면 `PropsWithClassName<TProps>`를 쓴다.
