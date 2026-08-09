# 명명 규칙

## 도메인 용어

| 의미               | 표준 용어        | 쓰지 않는 용어               |
| ------------------ | ---------------- | ---------------------------- |
| 긴 글              | `article`        | `post`, `content`            |
| 짧은 글            | `note`           | `shortPost`, `shortContent`  |
| 1차 분야 분류      | `category`       | `section`, `group`           |
| 2차 세부 주제 분류 | `topic`          | `subject`                    |
| 보조 검색어        | `tag`            | `keyword`                    |
| 발행일             | `publishedAt`    | `createdAt`                  |
| 수정일             | `modifiedAt`     | `updatedAt`                  |
| 공개 여부          | `isPublished`    | `release`                    |
| 대표 이미지        | `coverImage`     | `thumbnail`                  |
| 작성자             | `author`         | 실명                         |
| 개별 앱            | `app`            | `application`, `product`     |
| 법적 문서          | `policyDocument` | `legalContent`, `policyPage` |

- `author`는 선택값이다. 생략하면 SSG build에서 `SITE_CONFIG.author`를 사용한다.
- 공개 author 기본값은 `Bluemiv`다.
- 사용자 화면에서 전체 article 목록은 `전체 글`, 분류 목록은 `{분류명} 글`로 표시한다.
- 사용자 화면에서 새로 발행한 article은 `최신 글`로 표시한다. `최근 글`은 사용하지 않는다.
- article 범위를 기술에 한정하는 `기술 글`은 사용자 화면과 metadata에 사용하지 않는다.

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
- component prop type은 `PropsWith{ComponentName}` 형식을 쓴다. 예: `PropsWithSiteHeader`.
- 공통 prop utility는 `PropsWithXxx<TProps>` 형식을 쓴다.

## URL

```text
/articles/{slug}/
/articles/page/{pageNumber}/
/categories/{category}/
/topics/{topic}/
/tags/{tag}/
/notes/{slug}/
/apps/{appSlug}/
/apps/{appSlug}/{documentType}/
/en/...
/ja/...
```

- 한국어는 prefix가 없다.
- URL 끝 `/`를 유지한다.
- 번역 article은 모든 locale에서 같은 slug를 쓴다.
- article metadata는 단일 `category`와 중복 없는 `topics` 배열을 사용한다.
- category/topic 계층은 `articleTaxonomy.ts`를 단일 원천으로 사용한다.
- `topics[0]`은 목록과 상세 화면에 먼저 표시하는 대표 topic이다.
- `page`는 article archive pagination을 위한 예약 slug다. article slug로 사용하지 않는다.
- `/apps/`는 app 목록 없이 `/`로 이동한다.
- 기존 policy의 `/privacy/.../`, `/blim/account-deletion/`, URL 내부 언어 코드는 호환을 위해 유지한다.

## article 분류

```yaml
category: backend
topics: [spring, kotlin]
tags: [dependency-injection]
```

| category           | 허용 topic                                                                             |
| ------------------ | -------------------------------------------------------------------------------------- |
| `backend`          | `spring`, `java`, `kotlin`, `go`, `firebase`                                           |
| `frontend`         | `react`, `nextjs`, `javascript`, `typescript`, `browser`, `html`, `tooling`, `styling` |
| `computer-science` | `algorithm`                                                                            |

- article은 category 하나와 topic 하나 이상을 가진다.
- 모든 topic은 선택한 category에 속해야 한다.
- 여러 category에 걸친 검색어는 계층에 억지로 넣지 않고 `tags`로 표현한다.
- tag key는 `features/tag/tagRegistry.ts`에 등록된 소문자 ASCII kebab-case를 사용한다.
- 화면, 검색 metadata와 SEO에는 registry의 공식 label을 사용한다.
- article의 category·topic과 같은 값을 tag에 반복하지 않는다.

## tag 표기

```yaml
tags: [github-pages, static-export, mdx, seo]
```

| key                 | 공개 label        |
| ------------------- | ----------------- |
| `github-pages`      | `GitHub Pages`    |
| `static-export`     | `Static Export`   |
| `mdx`               | `MDX`             |
| `seo`               | `SEO`             |
| `tailwind-css`      | `Tailwind CSS`    |
| `use-layout-effect` | `useLayoutEffect` |

- 띄어쓰기, 대문자, camelCase를 metadata key에 넣지 않는다.
- 같은 의미의 약어와 전체 이름을 tag로 함께 넣지 않는다.
- 새 tag는 registry에 공식 label을 먼저 정의한다.

## 변경 규칙

- 새 용어를 만들기 전에 이 문서의 기존 용어로 표현 가능한지 확인한다.
- 표준 용어를 바꾸면 코드, route, metadata, 문서를 같은 작업에서 갱신한다.
- 변경 후 금지 용어 검색과 SSG build를 실행한다.
