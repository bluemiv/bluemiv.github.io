# note 규칙

- 경로: `src/notes/{slug}/{locale}.mdx`.
- 짧은 글 용어는 `note`만 사용한다.
- 공통 발행 metadata 이름은 article과 같지만 note에는 `category`와 `topics`를 사용하지 않는다.
- `author`를 생략하면 SSG build에서 `SITE_CONFIG.author`가 적용된다.
- tag는 `features/tag/tagRegistry.ts`에 등록된 소문자 ASCII kebab-case key만 사용한다.
- 공식 대소문자 표기를 metadata에 직접 쓰지 않는다.
- slug와 locale 규칙은 article과 같다.
- note를 article로 부풀리거나 두 형식을 섞지 않는다.
- 본문에서 가운데점(`·`)으로 단어를 나열하지 않는다. 문장에는 쉼표나 `와/과`, 분류 관계에는 `/`를 쓴다.
- 본문 heading은 `##`부터 시작하고 source에 번호를 직접 붙이지 않는다.
- code fence에는 언어를 지정한다.
- 내부 link는 canonical route와 trailing slash를 사용한다.
