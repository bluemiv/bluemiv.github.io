# widgets 규칙

- header, footer, sidebar, page section 같은 큰 UI 조합을 둔다.
- `atoms`와 `features`를 조합할 수 있다.
- route, metadata, `html`, `body`는 넣지 않는다.
- 한 route에만 필요한 단순 markup은 `app`에 둔다.
- home의 article과 note는 repository의 실제 SSG 데이터만 사용한다. 번역 copy에 콘텐츠를 하드코딩하지 않는다.
- archive의 category/topic 계층, count, article, 추천 영역은 실제 repository와 유효한 route만
  사용한다. mock 목록과 비동작 control을 두지 않는다.
- blog page 전환은 `PageTransition`으로 감싸고 navigation의 `forward`, `back`, `swap` 의미를 사용한다.
- pagination은 실제 정적 route만 link하고 현재 페이지에 `aria-current="page"`를 제공한다.
