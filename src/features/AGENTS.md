# Feature 작업 규칙

이 파일은 `src/features/` 아래 모든 코드에 적용된다. feature는 사용자가 인식할 수 있는 동작 또는 하나의 명확한 도메인 책임을 캡슐화한다.

## 현재 feature 책임

| Feature          | 책임                                                    | 포함할 수 있는 것                                          | 포함하지 않는 것                                               |
| ---------------- | ------------------------------------------------------- | ---------------------------------------------------------- | -------------------------------------------------------------- |
| `theme`          | light/dark 테마 선택과 전환                             | theme control, browser preference 확인, 사용자 선택 저장   | 디자인 token 정의, page layout, 범용 button                    |
| `service-worker` | 기존 캐싱 service worker 등록 해제와 Cache Storage 정리 | browser-side unregister fallback, legacy cache prefix 정리 | offline cache, fetch interception, PWA 설치, push notification |

## 공통 경계

- feature는 `shared`를 import할 수 있다.
- feature는 다른 feature를 직접 import하지 않는다. 조합이 필요하면 `widgets` 또는 `app`에서 수행한다.
- feature는 `widgets`와 `app`을 import하지 않는다.
- 범용 UI primitive와 도메인 무관 utility는 `shared`로 이동한다.
- page 전체 section을 조합하는 코드는 `widgets`로 이동한다.
- 아직 존재하지 않는 요구를 예상해 store, context, service abstraction을 미리 만들지 않는다.
- Client Component는 browser API, state, event 처리가 실제로 필요한 가장 작은 경계에만 `"use client"`를 선언한다.

## `theme` 규칙

- `.dark` class와 `src/app/globals.css`의 semantic token mapping을 단일 테마 표현 방식으로 사용한다.
- 사용자 선택 저장 key는 `theme`을 유지한다.
- 초기 paint 이전 테마 적용은 root layout의 inline script와 일치해야 한다.
- `ThemeToggle`은 현재 상태를 접근성 속성으로 전달해야 하며 hydration 차이를 만들지 않아야 한다.
- 색상 값과 디자인 결정은 feature 내부에 추가하지 않고 `docs/design-system.md`와 `src/app/globals.css`에서 관리한다.
- 테마 하나만을 위해 전역 상태 라이브러리를 도입하지 않는다.

## `service-worker` 규칙

- `public/sw.js`는 기존 캐싱 worker를 제거하기 위한 영구 tombstone이다. URL과 scope 호환을 위해 파일을 삭제하거나 이름을 변경하지 않는다.
- tombstone은 install 시 `skipWaiting`, activate 시 `bluemiv-blog-*` 캐시 삭제, 자체 unregister, 기존 window client 해제만 수행한다.
- `fetch` event listener, `caches.open`, `cache.put`, offline fallback을 추가하지 않는다.
- 다른 앱이 사용할 수 있는 Cache Storage까지 지우지 않는다. 알려진 legacy prefix만 삭제한다.
- `ServiceWorkerCleanup.tsx`는 V2가 이미 로드된 경우를 위한 client fallback이다. 구형 `/sw.js` 등록과 알려진 legacy cache만 정리한다.
- 구형 controller를 제거한 경우에만 한 번 reload한다. 등록이 없는 일반 방문에서는 reload하지 않는다.
- service worker 정리 실패가 애플리케이션 렌더링을 막아서는 안 된다.

## 새 feature 추가 절차

1. 사용자 동작 또는 도메인 책임을 한 문장으로 정의한다.
2. 기존 feature, `shared`, `widgets` 중 어디에도 속하지 않는지 확인한다.
3. `src/features/<feature-name>/`에 구현한다.
4. 이 문서의 현재 feature 책임 표에 역할과 비책임을 같은 커밋에서 추가한다.
5. browser API가 없다면 Server Component 또는 일반 module을 기본으로 한다.
6. feature 간 조합은 상위 계층에서 수행한다.
