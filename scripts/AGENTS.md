# scripts 규칙

- 이관·검증처럼 반복 가능한 작업만 둔다.
- 파일명과 함수명은 camelCase.
- 기존 저장소는 읽기만 한다.
- 기존 target을 묵시적으로 덮어쓰지 않는다.
- 기본 실행은 저장소 밖 파일과 외부 서비스를 변경하지 않는다.
- article 본문과 asset 경로가 바뀌지 않았는지 검증한다.
- 변환 규칙은 순수 함수로 분리하고 `*.test.mjs`로 검증한다.
- 실패는 원인과 대상 경로를 포함해 non-zero exit로 끝낸다.
- `pnpm build`는 static export 후 내부 link target 존재 여부까지 검증한다.
- `pnpm build`는 sitemap, feed, robots, policy noindex도 함께 검증한다.
- `pnpm lint`는 `text-xs` 이상과 Tailwind 표준 font-size 단계 사용 여부를 함께 검증한다.
- 임시 파일과 검증 산출물은 실행 종료 후 남기지 않는다.
