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
- 색인 페이지에서 redirect source로 연결하는 내부 link도 build 실패로 처리한다.
- `pnpm build`는 sitemap, feed, robots, policy noindex, 색인 페이지 social metadata도 함께 검증한다.
- `pnpm build`는 domain root의 `WebSite` 구조화 데이터를 검증한다.
- `pnpm build`는 Pagefind index 생성 후 locale prefix를 포함한 실제 article·note 상세만
  색인되었는지, 표시된 locale별 index가 생성되었는지 함께 검증한다.
- `pnpm lint`는 `text-xs` 이상과 Tailwind 표준 font-size 단계 사용 여부를 함께 검증한다.
- 임시 파일과 검증 산출물은 실행 종료 후 남기지 않는다.
