# public 규칙

- 브라우저에 그대로 공개되는 정적 파일만 둔다.
- secret과 내부 자료 금지.
- `ads.txt`, `.nojekyll`, `sw.js` 경로를 바꾸지 않는다.
- `sw.js`는 cache 제거용 tombstone으로 유지한다.
- `r/`는 기존 article asset URL 호환 경로다.
