# public 규칙

- 브라우저에 그대로 공개되는 정적 파일만 둔다.
- secret과 내부 자료 금지.
- `ads.txt`, `.nojekyll`, `sw.js` 경로를 바꾸지 않는다.
- `sw.js`는 cache 제거용 tombstone으로 유지한다.
- `r/`는 기존 article asset URL 호환 경로다.
- `bluemiv-mark.svg`는 공개 로고 원본이다. `src/app/icon.svg`와 geometry를 동일하게 유지한다.
- 신규 article cover는 `32:17`, 권장 `1600×850px` WebP로 만든다.
- 공개 asset 경로는 소문자 kebab-case를 쓴다. 기존 호환 경로는 예외다.
- 사용하지 않는 생성물, source map, 원본 편집 파일을 커밋하지 않는다.
