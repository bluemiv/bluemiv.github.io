# src 규칙

- `app`은 route 진입과 metadata만 담당한다.
- 재사용 UI는 `components/atoms`, 큰 조합 UI는 `components/widgets`에 둔다.
- 전역 공개 설정은 `config`, 공통 type utility는 `types`에 둔다.
- article MDX는 `articles`, note MDX는 `notes`에 둔다.
- 최상위 `shared`, `widgets`, 임의의 새 최상위 계층을 만들지 않는다.
- 디렉토리는 camelCase. public route와 slug는 kebab-case 예외다.
- 사용하지 않는 파일과 빈 디렉토리는 즉시 제거한다.
