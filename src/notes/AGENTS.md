# note 규칙

- 경로: `src/notes/{slug}/{locale}.mdx`.
- 짧은 글 용어는 `note`만 사용한다.
- 공통 발행 metadata 이름은 article과 같지만 note에는 `category`와 `topics`를 사용하지 않는다.
- `author`를 생략하면 SSG build에서 `SITE_CONFIG.author`가 적용된다.
- slug와 locale 규칙은 article과 같다.
- note를 article로 부풀리거나 두 형식을 섞지 않는다.
