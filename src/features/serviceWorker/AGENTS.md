# serviceWorker 규칙

- 역할은 구형 service worker와 `bluemiv-blog-*` cache 제거뿐이다.
- `public/sw.js`와 제거 조건을 일치시킨다.
- fetch interception, offline cache, push 기능 금지.
- 다른 앱의 cache를 지우지 않는다.
- 제거 실패가 화면 렌더링을 막지 않게 한다.
- 제거 대상 cache prefix는 테스트로 고정한다.
- 새 asset versioning과 배포 로직을 service worker에 추가하지 않는다.
