# i18n 규칙

- 지원 locale: `ko`, `en`, `ja`.
- `ko`는 prefix 없음. `en`, `ja`만 prefix 사용.
- URL 함수는 `localeConfig.ts`를 단일 원천으로 쓴다.
- 화면 문구는 `translations.ts`에 둔다.
- `Articles`, `Notes`, `Apps`처럼 제품 navigation에서 통용되는 짧은 영문은 억지로 번역하지 않는다.
- accessible name도 화면 문구와 같은 언어 기준을 따른다.
- 날짜와 예상 읽기 시간 형식은 `publicationMetadata.ts`를 사용한다.
- locale마다 같은 JSX를 복사하지 않는다.
- 번역 없는 경로를 다른 언어로 조용히 대체하지 않는다.
- locale 추가·변경 시 font token, metadata, hreflang, static params를 함께 확인한다.
