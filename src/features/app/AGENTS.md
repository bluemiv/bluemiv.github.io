# app 규칙

- `/apps/`는 목록을 렌더링하지 않고 `/`로 정적 이동한다.
- primary navigation에 Apps를 넣지 않는다.
- 기존 개별 app URL은 직접 접근 가능하게 유지한다.
- app 상세는 목적, 핵심 기능, Google Play, 법적 문서만 간결하게 보여준다.
- app 정보와 공개 URL은 `appProfiles.ts`를 단일 원천으로 사용한다.
- 제거한 app profile과 route를 다른 목록에 남기지 않는다.
- 법적 문서 내용은 `policy` feature가 담당한다.
- app 상세에 블로그 sidebar와 광고를 넣지 않는다.
- app route 변경 시 Play Store 공개 URL 호환 여부를 먼저 확인한다.
