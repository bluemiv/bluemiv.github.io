# types 규칙

- 여러 디렉토리에서 쓰는 type utility만 둔다.
- runtime code와 도메인 model을 넣지 않는다.
- utility type은 `PropsWithXxx`, `XxxMap`처럼 목적이 보이게 짓는다.
- `PropsWithClassName<TProps>`는 React의 `className` 표기를 유지한다.
