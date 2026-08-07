# app 규칙

- Next.js route, layout, metadata, global CSS만 둔다.
- 공통 markup과 동작은 `components` 또는 `features`로 분리한다.
- `/`는 한국어 홈. `/en/`, `/ja/`만 locale prefix를 쓴다.
- 동적 route는 static export용 `generateStaticParams`를 제공한다.
- route folder는 public URL과 같은 소문자 kebab-case를 쓴다.
- route group과 Next.js 예약 파일명은 framework 규칙을 따른다.
- metadata 변경 시 canonical, hreflang, Open Graph를 함께 확인한다.
- runtime request API와 서버 전용 기능을 쓰지 않는다.
