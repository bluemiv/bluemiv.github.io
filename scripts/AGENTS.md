# scripts 규칙

- 이관·검증처럼 반복 가능한 작업만 둔다.
- 파일명과 함수명은 camelCase.
- 기존 저장소는 읽기만 한다.
- 기존 target을 묵시적으로 덮어쓰지 않는다.
- article 본문과 asset 경로가 바뀌지 않았는지 검증한다.
- 변환 규칙은 순수 함수로 분리하고 `*.test.mjs`로 검증한다.
- `pnpm build`는 static export 후 내부 link target 존재 여부까지 검증한다.
