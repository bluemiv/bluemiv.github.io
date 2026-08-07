# config 규칙

- 앱 전체에서 쓰는 공개 정적 설정만 둔다.
- 파일명은 camelCase, 상수는 UPPER_SNAKE_CASE.
- 파일명은 책임을 포함한다. 예: `siteConfig.ts`.
- secret과 환경별 private 값은 넣지 않는다.
- feature 전용 설정은 해당 feature에 둔다.
- 공개 경력 시작월은 `SITE_CONFIG.careerStartMonth`를 단일 원천으로 사용한다. 파생 개월 수를 하드코딩하지 않는다.
