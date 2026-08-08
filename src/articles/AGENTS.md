# article 규칙

- 경로: `src/articles/{slug}/{locale}.mdx`.
- 긴 글 용어는 `article`만 사용한다. `post`, `content` 금지.
- slug는 발행 후 바꾸지 않는 소문자 ASCII kebab-case다.
- metadata는 루트 `AGENTS.md` 스키마를 따른다.
- `author`를 생략하면 SSG build에서 `SITE_CONFIG.author`가 적용된다.
- 주 분류는 `topic`, 보조 키워드는 `tags`다.
- 본문 heading은 `##`부터 시작한다.
- 신규 heading에 `1.`, `1.1.` 같은 번호를 직접 쓰지 않는다. 화면에서 자동 생성한다.
- 이관 article의 기존 heading 번호는 과거 anchor 호환을 위해 유지할 수 있다.
- code fence에 언어를 지정한다.
- code fence는 상세 화면에서 language label과 코드 복사 action이 자동 적용된다. 본문에 별도 복사 UI를 넣지 않는다.
- cover 이미지는 `32:17` 비율을 지킨다. 권장 크기는 `1600×850px` WebP다.
- cover의 핵심 요소는 잘림과 반응형 축소를 고려해 가장자리에서 충분히 띄운다.
- 본문 수정 없이 이관할 때 원문 byte 동일성을 검증한다.
