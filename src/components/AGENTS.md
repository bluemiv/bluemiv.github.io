# components 규칙

- 작은 UI는 `atoms`, 큰 화면 조합은 `widgets`에 둔다.
- `atoms`는 `widgets`를 import하지 않는다.
- `widgets`는 `atoms`와 `features`를 조합할 수 있다.
- 컴포넌트 파일과 export는 PascalCase.
- 기능 로직은 `features`로 보낸다.
- 공통 `className` prop은 `PropsWithClassName<TProps>`를 쓴다.
- component prop type은 `PropsWith{ComponentName}` 형식으로 짓는다. `XxxProps` 형식은 사용하지 않는다.
- React prop은 `className` 표기를 유지한다.
- 한 번 쓰는 단순 wrapper는 만들지 않는다.
- 디자인 작업 전 `docs/design-system.md`를 확인한다.
- native semantic element를 먼저 사용한다. div에 button/link 역할을 흉내 내지 않는다.
- interaction만 client component로 분리한다. 정적 markup 전체를 client로 바꾸지 않는다.
- interactive UI는 keyboard, focus, accessible name, reduced motion을 확인한다.
