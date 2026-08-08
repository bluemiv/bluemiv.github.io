# config 규칙

- 앱 전체에서 쓰는 공개 정적 설정만 둔다.
- 파일명은 camelCase, 상수는 UPPER_SNAKE_CASE.
- 파일명은 책임을 포함한다. 예: `siteConfig.ts`.
- secret과 환경별 private 값은 넣지 않는다.
- feature 전용 설정은 해당 feature에 둔다.
- 설정 객체는 `as const` 또는 readonly type으로 변경을 막는다.
- 같은 값의 복제 상수를 만들지 않는다. 기존 config를 import한다.
- 공개 경력 시작월은 `SITE_CONFIG.careerStartMonth`를 단일 원천으로 사용한다. 파생 개월 수를 하드코딩하지 않는다.
