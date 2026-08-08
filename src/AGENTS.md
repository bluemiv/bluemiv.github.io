# src 규칙

- `app`은 route 진입과 metadata만 담당한다.
- 재사용 UI는 `components/atoms`, 큰 조합 UI는 `components/widgets`에 둔다.
- 전역 공개 설정은 `config`, 공통 type utility는 `types`에 둔다.
- article MDX는 `articles`, note MDX는 `notes`에 둔다.
- 최상위 `shared`, `widgets`, 임의의 새 최상위 계층을 만들지 않는다.
- 디렉토리는 camelCase. public route와 slug는 kebab-case 예외다.
- 내부 import는 `@/*` alias를 우선한다. 같은 디렉토리 안에서는 상대 경로를 허용한다.
- server/client 경계를 가장 작은 파일에 둔다.
- 사용하지 않는 파일과 빈 디렉토리는 즉시 제거한다.
