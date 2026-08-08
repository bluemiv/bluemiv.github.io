# theme 규칙

- `.dark` class와 semantic token만 사용한다.
- 저장 key는 `theme`이다.
- 첫 paint 전에 `ThemeInitializer`로 theme를 적용한다.
- toggle은 접근성 label과 현재 상태를 제공한다.
- 색상 값은 `src/app/globals.css`와 디자인 문서에서 관리한다.
- 전환 wipe는 View Transition을 쓰고 `prefers-reduced-motion`에서 즉시 전환한다.
- theme 변경 중 페이지 폭과 scroll position을 바꾸지 않는다.
- light/dark에서 text, border, code highlight contrast를 각각 확인한다.
