# seo 규칙

- sitemap, robots, RSS, Atom 같은 검색·구독용 정적 문서를 담당한다.
- 검색 노출 대상은 canonical URL만 포함한다.
- policy document, redirect, app route는 sitemap과 feed에서 제외한다.
- policy document는 `noindex, follow`로 유지하고 robots.txt에서 차단하지 않는다.
- sitemap `lastmod`는 실제 `modifiedAt`만 사용한다. 현재 시각을 임의로 넣지 않는다.
- XML 값은 반드시 entity escape하고 생성 로직을 순수 함수로 테스트한다.
