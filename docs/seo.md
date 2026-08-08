# SEO 가이드

## 검색 대상

사이트맵에는 검색 결과로 노출할 canonical URL만 넣는다.

- locale 홈: `/`, `/en/`, `/ja/`
- article 목록과 페이지: `/articles/`, `/articles/page/{pageNumber}/`
- article 상세: `/articles/{slug}/`
- category 목록: `/categories/{category}/`
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

## 사이트 내부 검색

- Pagefind가 static export의 canonical article과 note 상세만 색인한다.
- 실제 본문에만 `data-pagefind-body`를 두고 header, footer, archive, 광고, 관련 글은 제외한다.
- title, description은 metadata로, type, category, topic, tag는 filter로 명시한다.
- title, description, category, topic, tag의 검색 문맥은 본문 색인 영역 안에서 가중치를 적용한다.
- locale별 HTML `lang`을 기준으로 index를 분리한다. 번역 상세가 없는 locale에는 빈 검색 UI를 노출하지 않는다.
- 검색 query URL과 검색 결과 page를 만들지 않는다. canonical, sitemap, feed에는 영향을 주지 않는다.
- `pnpm build`에서 Pagefind index 생성 후 표시한 상세 수와 실제 index page 수가 같은지 검증한다.

## Social metadata

- 모든 색인 페이지는 title, description, canonical과 함께 Open Graph와 Twitter Card를 생성한다.
- OG에는 `site_name`, locale, canonical URL, title, description, image를 포함한다.
- website는 `og:type=website`, article과 note 상세는 `og:type=article`을 사용한다.
- article과 note 상세에는 발행일, 수정일, 작성자, tag를 포함한다.
- article과 note의 `coverImage`가 있으면 social image로 사용한다.
- cover가 없거나 목록·분류·홈·app 상세이면 `/og-default.webp`를 사용한다.
- 공통 이미지는 `1200×630px`, `summary_large_image`로 제공한다.
- OG와 Twitter 생성은 `src/features/seo/socialMetadata.ts`를 단일 기준으로 사용한다.

## 사이트맵

- 경로: `/sitemap.xml`
- Next.js static export를 위해 route에 `dynamic = "force-static"`을 명시한다.
- URL은 `SITE_CONFIG.url` 기준 절대 URL과 trailing slash를 사용한다.
- 공개된 article과 note만 포함한다.
- 공개 article이 있는 category와 topic archive만 포함한다.
- `lastmod`는 콘텐츠의 실제 `modifiedAt`을 사용한다.
- article과 note의 `coverImage`가 있으면 image sitemap 정보로 포함한다.
- article 구조화 데이터는 `Home > Articles > Category > Article` breadcrumb를 포함한다.
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

## 검색 서비스 소유확인

- 네이버 서치어드바이저는 `/naver0b3c7144e2b65f42ae8194ba42c9f26c.html` 파일로 소유권을 확인한다.
- 인증 파일은 `public/`에서 root 정적 파일로 배포한다. 파일명과 내용을 변경하지 않는다.
- 소유확인 파일은 공개 검증값이다. 환경변수나 runtime script로 생성하지 않는다.
- 네이버 소유확인은 1년마다 서치어드바이저에서 연장한다. 만료 전에도 같은 인증 파일을 유지한다.
- 배포 후 서치어드바이저에는 `/sitemap.xml`과 `/rss.xml`을 각각 사이트맵과 RSS로 제출한다.

## 변경 규칙

- article, note, category, topic, locale 경로가 바뀌면 sitemap과 feed 생성기를 함께 갱신한다.
- 새 policy route는 sitemap과 feed에 넣지 않고 `noindex, follow`를 적용한다.
- `lastmod`에 빌드 시각이나 현재 시각을 넣지 않는다.
- `pnpm build`는 내부 링크, SEO 정적 산출물, 내부 검색 index를 함께 검증한다.
- 변경 후 test, XML 문법 검사, static export 산출물 검증을 실행한다.
