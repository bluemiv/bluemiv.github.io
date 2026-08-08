# search 규칙

- Pagefind index는 `next build`가 만든 `out/`에서 생성한다.
- article과 note 상세 본문만 `data-pagefind-body`로 색인한다.
- archive, header, footer, 광고, 관련 글은 검색 본문에 넣지 않는다.
- title, description, type, category, topic, tag는 명시적 metadata와 filter로 제공한다.
- title, description, category, topic, tag의 숨은 검색 문맥은 본문 색인 영역 안에 둔다.
- 현재 문서의 `lang`에 맞는 index만 조회한다.
- 검색 engine은 dialog를 열었을 때 지연 로드한다.
- 검색 실패는 페이지 탐색을 막지 않고 정적 미리보기 안내로 처리한다.
- query와 result 변환은 순수 함수로 분리하고 경계 조건을 테스트한다.
- dialog는 상단 accent rail, `S01` index, linear filter tab을 사용한다.
- result focus는 quiet surface, title color, 왼쪽 accent rail로 표시한다.
- result 설명은 description metadata를 우선하고 본문 excerpt를 fallback으로 사용한다.
