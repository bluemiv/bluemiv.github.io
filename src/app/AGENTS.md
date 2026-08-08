# app 규칙

- Next.js route, layout, metadata, global CSS만 둔다.
- 공통 markup과 동작은 `components` 또는 `features`로 분리한다.
- page는 build-time data 조회와 widget 조합만 담당한다.
- `/`는 한국어 홈. `/en/`, `/ja/`만 locale prefix를 쓴다.
- 동적 route는 static export용 `generateStaticParams`를 제공한다.
- route folder는 public URL과 같은 소문자 kebab-case를 쓴다.
- `blog` route는 기존 URL redirect 전용이다. 신규 화면을 추가하지 않는다.
- category archive는 `/categories/[category]/`, topic archive는 `/topics/[topic]/`에서 SSG로
  생성한다. 둘 다 공개 article이 있는 값만 `generateStaticParams`에 포함한다.
- category/topic archive는 현재 분류를 sidebar에 전달해 해당 category를 처음부터 펼친다.
- article archive 첫 페이지는 `/articles/`, 2페이지부터 `/articles/page/[pageNumber]/`에서 SSG로 생성한다.
- `/articles/page/1/` 중복 route를 만들지 않는다.
- route group과 Next.js 예약 파일명은 framework 규칙을 따른다.
- 미등록 URL은 `global-not-found.tsx`와 `experimental.globalNotFound`로 처리한다. 완전한 HTML 문서를 유지한다.
- metadata 변경 시 canonical, hreflang, Open Graph를 함께 확인한다.
- sitemap, feed, robots route는 root `app`에 두고 `dynamic = "force-static"`과 static export 산출물을 검증한다.
- policy document metadata에는 `noindex, follow`를 적용한다.
- runtime request API와 서버 전용 기능을 쓰지 않는다.
- route 추가·변경 후 `out/`의 실제 HTML 경로와 내부 link를 확인한다.
