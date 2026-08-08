# SEO 가이드

## 검색 대상

사이트맵에는 검색 결과로 노출할 canonical URL만 넣는다.

- locale 홈: `/`, `/en/`, `/ja/`
- article 목록과 페이지: `/articles/`, `/articles/page/{pageNumber}/`
- article 상세: `/articles/{slug}/`
- topic 목록: `/topics/{topic}/`
- note 목록과 상세: `/notes/`, `/notes/{slug}/`
- app 상세: `/apps/{appSlug}/`

아래 URL은 사이트맵과 feed에서 제외한다.

- policy document: privacy, terms, account deletion
- app 목록 `/apps/`
- app 하위 policy document
- legacy redirect: `/blog/...`, `/ko/`

policy document는 `noindex, follow`를 사용한다. 검색봇이 `noindex`를 읽을 수 있도록
`robots.txt`에서 차단하지 않는다.

## 사이트맵

- 경로: `/sitemap.xml`
- Next.js static export를 위해 route에 `dynamic = "force-static"`을 명시한다.
- URL은 `SITE_CONFIG.url` 기준 절대 URL과 trailing slash를 사용한다.
- 공개된 article과 note만 포함한다.
- `lastmod`는 콘텐츠의 실제 `modifiedAt`을 사용한다.
- article과 note의 `coverImage`가 있으면 image sitemap 정보로 포함한다.
- locale 홈은 `ko`, `en`, `ja`, `x-default` hreflang을 서로 연결한다.
- Google이 사용하지 않는 `priority`, `changefreq`는 만들지 않는다.

## Feed

- Atom 1.0: `/feed.xml`
- RSS 2.0: `/rss.xml`
- 두 route 모두 `dynamic = "force-static"`을 명시한다.
- 최근 수정순 최대 50개 article과 note를 제공한다.
- 항목 URL은 canonical 절대 URL을 사용한다.
- Atom은 `published`, `updated`를 모두 제공한다.
- RSS는 `pubDate`와 `atom:updated`를 제공한다.
- XML에 들어가는 모든 콘텐츠 값은 entity escape한다.
- 한국어 root layout에서 두 feed를 `<link rel="alternate">`로 노출한다.

## robots.txt

- 경로: `/robots.txt`
- Next.js static export를 위해 route에 `dynamic = "force-static"`을 명시한다.
- 모든 공개 페이지의 크롤링을 허용한다.
- `/sitemap.xml`, `/feed.xml`, `/rss.xml`의 절대 URL을 안내한다.
- 검색 제외는 robots 차단이 아니라 페이지 `noindex`로 처리한다.

## 변경 규칙

- article, note, topic, locale 경로가 바뀌면 sitemap과 feed 생성기를 함께 갱신한다.
- 새 policy route는 sitemap과 feed에 넣지 않고 `noindex, follow`를 적용한다.
- `lastmod`에 빌드 시각이나 현재 시각을 넣지 않는다.
- `pnpm build`는 내부 링크와 SEO 정적 산출물을 함께 검증한다.
- 변경 후 test, XML 문법 검사, static export 산출물 검증을 실행한다.
