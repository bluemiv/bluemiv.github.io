# i18n 규칙

- 지원 locale: `ko`, `en`, `ja`.
- `ko`는 prefix 없음. `en`, `ja`만 prefix 사용.
- URL 함수는 `localeConfig.ts`를 단일 원천으로 쓴다.
- 화면 문구는 `translations.ts`에 둔다.
- 날짜와 예상 읽기 시간 형식은 `publicationMetadata.ts`를 사용한다.
- locale마다 같은 JSX를 복사하지 않는다.
- 번역 없는 경로를 다른 언어로 조용히 대체하지 않는다.
