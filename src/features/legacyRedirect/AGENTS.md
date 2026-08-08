# legacyRedirect 규칙

- 기존 공개 URL을 현재 canonical URL로 1:1 매핑한다.
- redirect 생성과 조회는 순수 함수로 유지한다.
- 중복 source path와 지원하지 않는 path는 build를 실패시킨다.
- 신규 화면과 신규 URL을 만들지 않는다.
- static export에서 동작하는 redirect HTML만 생성한다.
- redirect target은 canonical trailing slash 경로여야 한다.
