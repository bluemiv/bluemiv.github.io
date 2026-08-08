# seo 규칙

- sitemap, robots, RSS, Atom 같은 검색·구독용 정적 문서를 담당한다.
- 검색 노출 대상은 canonical URL만 포함한다.
- canonical, hreflang, sitemap URL은 locale와 trailing slash 규칙을 공유한다.
- app 상세는 sitemap에 포함한다. app 목록, policy document, redirect는 제외한다.
- feed에는 article과 note만 포함한다.
- policy document는 `noindex, follow`로 유지하고 robots.txt에서 차단하지 않는다.
- sitemap `lastmod`는 실제 `modifiedAt`만 사용한다. 현재 시각을 임의로 넣지 않는다.
- XML 값은 반드시 entity escape하고 생성 로직을 순수 함수로 테스트한다.
- pagination과 taxonomy archive는 중복 title·description·canonical을 만들지 않는다.
- redirect source와 noindex 문서는 검색 discovery 산출물에서 제외한다.
- 색인 페이지의 OG와 Twitter Card는 `socialMetadata.ts`에서 생성한다.
- article과 note는 개별 cover를 우선하고 없으면 `/og-default.webp`를 사용한다.
