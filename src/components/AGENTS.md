# components 규칙

- 작은 UI는 `atoms`, 큰 화면 조합은 `widgets`에 둔다.
- `atoms`는 `widgets`를 import하지 않는다.
- `widgets`는 `atoms`와 `features`를 조합할 수 있다.
- 컴포넌트 파일과 export는 PascalCase.
- 기능 로직은 `features`로 보낸다.
- 공통 `className` prop은 `PropsWithClassName<TProps>`를 쓴다.
- prop type은 `PropsWithXxx`, `XxxProps`처럼 역할이 보이게 짓는다.
- React prop은 `className` 표기를 유지한다.
- 한 번 쓰는 단순 wrapper는 만들지 않는다.
- 디자인 작업 전 `docs/design-system.md`를 확인한다.
