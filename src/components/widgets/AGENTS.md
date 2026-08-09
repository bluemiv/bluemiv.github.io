# widgets 규칙

- header, footer, sidebar, page section 같은 큰 UI 조합을 둔다.
- `atoms`와 `features`를 조합할 수 있다.
- route, metadata, `html`, `body`는 넣지 않는다.
- 한 route에만 필요한 단순 markup은 `app`에 둔다.
- home의 article과 note는 repository의 실제 SSG 데이터만 사용한다. 번역 copy에 콘텐츠를 하드코딩하지 않는다.
- archive의 category/topic 계층, count, article, 추천 영역은 실제 repository와 유효한 route만
  사용한다. mock 목록과 비동작 control을 두지 않는다.
- Home Latest와 archive는 공통 article row를 사용한다. divider list와 우측 `32:17` compact cover를
  유지하고 cover가 없으면 placeholder와 빈 column을 만들지 않는다.
- Home Latest와 archive의 목록 조합은 공통 `ArticleList`를 사용한다.
- article과 note archive 상단은 `ArchivePageHeader`, 상세 복귀는 `ArchiveBackLink`, 이전·다음
  탐색은 `AdjacentEntryNavigation`을 사용한다.
- note 목록 조합은 `NoteList`, 개별 row는 `NoteListRow`를 사용한다.
- tag archive는 `TagArchivePage`에서 article과 note를 분리하되 공통 목록 컴포넌트를 재사용한다.
- `HomePage`는 SSG data 조회와 home section widget 조합만 담당한다.
- Home discovery rail과 archive sidebar는 공통 `ArticleTaxonomyNavigation`을 사용한다.
- article row thumbnail의 왼쪽은 image와 border를 함께 canvas로 dissolve한다. 상시 장식을 더하지 않고
  hover/focus에서만 dissolve 경계에 짧은 accent registration tick을 표시한다.
- desktop archive taxonomy는 category link와 접기 button을 분리한다. 전체 글에서는 category를
  기본으로 접고, category/topic route에서는 현재 category만 자동으로 펼친다. 한 번에 하나만 연다.
- taxonomy toggle은 최소 44px, `aria-expanded`, `aria-controls`, 명확한 accessible name을 제공한다.
- 접힌 topic list는 keyboard와 accessibility tree에서 제외한다.
- taxonomy의 category header와 topic row는 같은 divider와 active rail 문법을 사용한다. topic에만
  상시 세로 border를 두지 않는다.
- `xl` 미만 taxonomy는 현재 분류가 앞에 오는 horizontal navigation을 유지한다.
- blog page 전환은 `PageTransition`으로 감싸고 navigation의 `forward`, `back`, `swap` 의미를 사용한다.
- pagination은 실제 정적 route만 link하고 현재 페이지에 `aria-current="page"`를 제공한다.
- widget interaction 변경 후 production build를 desktop/mobile에서 직접 확인한다.
- desktop search trigger는 header utility, mobile search trigger는 menu 첫 행에 두고 같은 dialog를 연다.
- article detail cover는 문서 흐름을 유지하고 image layer만 transform으로 drift한다. cover가 있으면
  category/topic, title, description, 발행 정보를 하나의 overlay hero에 한 번만 표시한다.
- detail cover에는 낮은 dark scrim을 두고 image와 scrim을 하단 canvas로 dissolve한다. 본문 시작을
  늦추는 별도 title header와 cover의 연속 배치를 만들지 않는다.
- detail cover 하단 약 20%는 theme canvas로 명확히 fade하고 metadata는 fade 시작점 위에 유지한다.
- detail cover의 image layer는 frame보다 세로로 16% 크게 두고 view timeline에서 `+4%`부터 `-4%`
  사이만 transform한다. frame, text, scrim과 fade는 움직이지 않는다.
- article detail sidebar의 context와 광고는 문서 흐름에 둔다. 광고는 sticky로 만들지 않는다.
- TOC만 72px header 아래 `top-20`에 sticky로 두고 최대 높이는 `calc(100vh - 6rem)`으로 제한한다.
- article detail의 context와 광고는 간결한 여백으로 분리한다. 광고 상단 divider를 만들지 않는다.
- desktop TOC 항목은 `text-xs`, `leading-5`, `py-1.5`로 조밀하게 유지한다. scrollbar는 기본으로
  숨기고 hover와 focus-within에서만 표시한다.
