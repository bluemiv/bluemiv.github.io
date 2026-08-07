# 명명 규칙

## 도메인 용어

| 의미        | 표준 용어     | 쓰지 않는 용어              |
| ----------- | ------------- | --------------------------- |
| 긴 글       | `article`     | `post`, `content`           |
| 짧은 글     | `note`        | `shortPost`, `shortContent` |
| 주 분류     | `topic`       | `category`                  |
| 보조 키워드 | `tag`         | `keyword`                   |
| 발행일      | `publishedAt` | `createdAt`                 |
| 수정일      | `modifiedAt`  | `updatedAt`                 |
| 공개 여부   | `isPublished` | `release`                   |
| 대표 이미지 | `coverImage`  | `thumbnail`                 |
| 작성자      | `author`      | 실명                        |

- `author`는 선택값이다. 생략하면 SSG build에서 `SITE_CONFIG.author`를 사용한다.
- 공개 author 기본값은 `Bluemiv`다.

## 디렉토리

- 코드 디렉토리: camelCase. 예: `serviceWorker`.
- article: `src/articles/{slug}/{locale}.mdx`.
- note: `src/notes/{slug}/{locale}.mdx`.
- public route와 slug: 소문자 ASCII kebab-case.
- App Router 예약 표기인 `(group)`, `[param]`은 Next.js 규칙을 따른다.
- 최상위 `shared`, `widgets`, 별도 `layouts` 디렉토리는 사용하지 않는다.
- 작은 UI는 `components/atoms`, 큰 조합 UI는 `components/widgets`에 둔다.

## 파일

- React 컴포넌트: PascalCase. 예: `SiteHeader.tsx`.
- 일반 TypeScript/JavaScript: camelCase. 예: `siteConfig.ts`.
- 문서: 소문자 kebab-case. 예: `design-system.md`.
- Next.js 예약 파일: `page.tsx`, `layout.tsx` 등 framework 이름 유지.
- 공개 호환 파일: `sw.js`, `ads.txt` 이름 유지.
- `app/**/blog`는 기존 `/blog/...` redirect URL만 위한 예외다.
- 기존 asset의 `thumbnail.webp`는 URL 호환 때문에 유지한다. 신규 asset은 `cover.webp`를 쓴다.

## 코드

- 컴포넌트와 type: PascalCase.
- 함수와 지역 변수: camelCase.
- module 상수: UPPER_SNAKE_CASE.
- boolean: `is`, `has`, `can`, `should` 접두사.
- 경로 생성 함수: `getXxxPath`.
- 판별 함수: `isXxx`.
- React prop은 `className`을 사용한다.
- 공통 prop utility는 `PropsWithXxx<TProps>` 형식을 쓴다.

## URL

```text
/articles/{slug}/
/topics/{topic}/
/tags/{tag}/
/notes/{slug}/
/en/...
/ja/...
```

- 한국어는 prefix가 없다.
- URL 끝 `/`를 유지한다.
- 번역 article은 모든 locale에서 같은 slug를 쓴다.

## 변경 규칙

- 새 용어를 만들기 전에 이 문서의 기존 용어로 표현 가능한지 확인한다.
- 표준 용어를 바꾸면 코드, route, metadata, 문서를 같은 작업에서 갱신한다.
- 변경 후 금지 용어 검색과 SSG build를 실행한다.
