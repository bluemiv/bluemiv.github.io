# article 규칙

- 경로: `src/articles/{slug}/{locale}.mdx`.
- 긴 글 용어는 `article`만 사용한다. `post`, `content` 금지.
- slug는 발행 후 바꾸지 않는 소문자 ASCII kebab-case다.
- metadata는 루트 `AGENTS.md` 스키마를 따른다.
- `author`를 생략하면 SSG build에서 `SITE_CONFIG.author`가 적용된다.
- 주 분류는 `topic`, 보조 키워드는 `tags`다.
- 본문 heading은 `##`부터 시작한다.
- code fence에 언어를 지정한다.
- 본문 수정 없이 이관할 때 원문 byte 동일성을 검증한다.
