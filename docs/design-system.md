# Bluemiv Tech Blog V2 디자인 시스템

> 상태: V2 기준 문서
> 마지막 검토: 2026-08-07
> 구현 기준: Next.js 16, Tailwind CSS v4, static export

이 문서는 Bluemiv Tech Blog V2의 시각 언어, 레이아웃, 컴포넌트, 상호작용, 접근성 기준을 정의하는 단일 원천이다. UI를 만들거나 수정하기 전에 이 문서를 먼저 확인한다.

디자인 시스템이 바뀌면 구현만 수정하지 않는다. **이 문서를 같은 커밋에서 함께 갱신해야 한다.** 문서와 구현이 다르면 문서가 오래된 것인지 구현이 잘못된 것인지 먼저 판단하고 둘을 일치시킨다.

## 1. 디자인 방향

### 1.1 테마 이름

**Blueprint Editorial**

기술 문서의 정밀함과 개인 아카이브의 온기를 결합한다. 화면 구조는 각지고 명확하게 유지하되, 타이포그래피와 여백은 부드럽고 오래 읽기 편해야 한다.

```text
Technical 60
Warm Editorial 40
```

### 1.2 목표

- 글을 찾고 읽는 흐름이 장식보다 먼저 보인다.
- 기술 블로그라는 정체성이 첫 화면에서 인식된다.
- 카드형 SaaS 템플릿과 구분되는 고유한 시각 언어를 가진다.
- 글, 짧은 기록, 앱, 정책 페이지가 같은 브랜드 안에서 역할별로 구분된다.
- 라이트/다크 테마 모두 별도 설계된 화면처럼 자연스럽다.
- 정적 사이트의 빠른 로딩과 접근성을 해치지 않는다.

### 1.3 핵심 인상

- precise
- thoughtful
- editorial
- calm
- technical
- personal

피해야 할 인상:

- dashboard-like
- card-heavy
- generic SaaS
- neon cyberpunk
- decorative brutalism
- over-animated

## 2. 디자인 원칙

### 2.1 콘텐츠 우선

제목, 설명, 날짜, 카테고리 순서가 먼저 읽혀야 한다. 배경, 아이콘, 모션은 이 순서를 강화할 때만 사용한다.

### 2.2 구조는 각지게, 콘텐츠는 따뜻하게

- 레이아웃, 구분선, 좌표 표기, 로고는 각지게 유지한다.
- 본문 타이포그래피, 이미지, 여백으로 온기를 만든다.
- 부드러움을 만들기 위해 모든 요소에 큰 radius를 사용하지 않는다.

### 2.3 한 화면에 하나의 주인공

히어로, featured article, 최신 글 목록이 동시에 같은 강도로 보이면 안 된다. 섹션마다 가장 중요한 요소 하나만 가장 큰 크기와 대비를 가진다.

### 2.4 장식은 반복 가능한 문법으로

blueprint grid, 번호, 좌표, 얇은 cobalt rail을 시그니처로 사용한다. 임의의 gradient, glow, 3D 장식은 추가하지 않는다.

### 2.5 긴 수명

유행을 그대로 복제하지 않는다. oversized type, 짧은 카피, 정교한 micro-interaction은 채택한다. bento grid, 과도한 blur, scroll animation은 기본 패턴으로 사용하지 않는다.

## 3. 브랜드 시각 언어

### 3.1 Blueprint motif

허용 요소:

- 28px 간격의 얇은 grid
- `01`, `02`, `N01` 같은 index 번호
- `EDITION`, `FORMAT`, `STATUS` 같은 짧은 기술 표기
- 1px cobalt rail 또는 1px neutral divider
- 작은 정사각형과 내부 offset square로 구성한 로고

사용 기준:

- grid는 hero 또는 cover 중 한 화면에 최대 1~2개만 사용한다.
- 좌표성 label은 정보 또는 브랜드 문맥을 가져야 한다.
- 같은 섹션 안에서 grid, 점선, 큰 번호를 모두 겹치지 않는다.
- 장식 텍스트는 본문보다 낮은 대비를 사용한다.

### 3.2 언어

- 본문과 주요 안내는 한국어.
- `Articles`, `Notes`, `Apps`, `About` 같은 짧은 navigation label은 영어 허용.
- `FIELD NOTES`, `EDITION` 같은 영어 표기는 장식 또는 분류에만 제한.
- 한 문장 안에서 한국어와 영어를 불필요하게 섞지 않는다.
- hero copy는 2~4행, 설명은 2문장 이하.

## 4. 색상 시스템

색상 정의 위치: `src/app/globals.css`

### 4.1 원칙

- primitive token은 palette 정의에만 사용한다.
- 컴포넌트는 semantic token을 사용한다.
- 컴포넌트 파일에 임의 hex 값을 작성하지 않는다.
- accent는 cobalt 한 계열만 사용한다.
- 성공, 경고, 오류 색상은 실제 상태 표현이 필요할 때 별도 semantic token으로 추가한다.
- dark mode는 light 색상 반전으로 만들지 않는다.

### 4.2 Paper palette

| Token       |     Value | 용도                   |
| ----------- | --------: | ---------------------- |
| `paper-50`  | `#FBFAF7` | light surface          |
| `paper-100` | `#F7F6F2` | light canvas           |
| `paper-200` | `#EFEDE7` | muted surface          |
| `paper-300` | `#D9D6CE` | border                 |
| `paper-400` | `#B9B4A9` | strong border          |
| `paper-500` | `#918C82` | subtle text            |
| `paper-600` | `#6F6B63` | muted text             |
| `paper-700` | `#52504A` | secondary ink          |
| `paper-800` | `#343430` | dark surface candidate |
| `paper-900` | `#242421` | dark ink candidate     |
| `paper-950` | `#181817` | light foreground       |

### 4.3 Blueprint palette

| Token           |     Value | 용도                |
| --------------- | --------: | ------------------- |
| `blueprint-50`  | `#F3F6FF` | pale accent surface |
| `blueprint-100` | `#E7EDFF` | light accent-soft   |
| `blueprint-200` | `#CFDAFE` | light selection     |
| `blueprint-300` | `#AEBFFF` | dark accent hover   |
| `blueprint-400` | `#8DA7FF` | dark accent         |
| `blueprint-500` | `#5E7FF1` | medium accent       |
| `blueprint-600` | `#2F5BE8` | vivid accent        |
| `blueprint-700` | `#2450CC` | light accent        |
| `blueprint-800` | `#2043A5` | light accent hover  |
| `blueprint-900` | `#1E3A82` | deep accent         |
| `blueprint-950` | `#142452` | deepest accent      |

### 4.4 Semantic tokens

| Semantic utility  | Light           | Dark            | 용도                        |
| ----------------- | --------------- | --------------- | --------------------------- |
| `canvas`          | `paper-100`     | `#11120F`       | page background             |
| `surface`         | `paper-50`      | `#181915`       | 분리 필요 surface           |
| `surface-muted`   | `paper-200`     | `#20211D`       | code label, muted block     |
| `foreground`      | `paper-950`     | `#E9E6DE`       | primary text                |
| `muted`           | `paper-600`     | `#AAA69C`       | description, secondary meta |
| `subtle`          | `paper-500`     | `#7F7C74`       | decorative meta only        |
| `border`          | `paper-300`     | `#30312D`       | default divider             |
| `border-strong`   | `paper-400`     | `#4A4B45`       | emphasized boundary         |
| `accent`          | `blueprint-700` | `blueprint-400` | link, active, key label     |
| `accent-hover`    | `blueprint-800` | `blueprint-300` | hover                       |
| `accent-soft`     | `blueprint-100` | `#202D54`       | cover, quiet highlight      |
| `on-accent`       | `#FFFFFF`       | `#101A34`       | solid accent 위 text        |
| `code`            | `#1B1D21`       | `#0B0C0D`       | code background             |
| `code-foreground` | `#E9E6DE`       | `#E9E6DE`       | code text                   |

Tailwind 예:

```tsx
<main className="bg-canvas text-foreground">
  <p className="text-muted">설명</p>
  <a className="text-accent hover:text-accent-hover">링크</a>
  <section className="border-border bg-surface border">...</section>
</main>
```

금지:

```tsx
<div className="bg-[#f7f6f2] text-[#181817]" />
```

### 4.5 확인된 대비

| Pair                      |     Ratio |
| ------------------------- | --------: |
| light foreground / canvas | `16.43:1` |
| light muted / canvas      |  `4.90:1` |
| light accent / canvas     |  `6.28:1` |
| dark foreground / canvas  | `15.07:1` |
| dark muted / canvas       |  `7.74:1` |
| dark accent / canvas      |  `8.15:1` |

`subtle`은 큰 장식 label과 비필수 metadata에만 사용한다. 작은 본문이나 필수 정보에는 `muted` 이상을 사용한다.

## 5. 타이포그래피

### 5.1 Font roles

| Role          | Font                 | 용도                                          |
| ------------- | -------------------- | --------------------------------------------- |
| Sans          | Pretendard Variable  | 본문, navigation, UI, 기본 제목               |
| Display serif | Noto Serif KR        | hero 강조어, 인용문, 제한된 editorial heading |
| Mono          | SFMono/Consolas 계열 | 번호, 날짜, category, code                    |

현재 sans/display는 시스템 fallback 상태다. production 이전에 한국어 glyph를 포함한 font를 self-host해야 한다. OS별 fallback 결과를 최종 디자인으로 간주하지 않는다.

### 5.2 사용 비율

- 본문은 항상 sans.
- hero 전체를 serif로 만들지 않는다.
- display serif는 한 heading 안의 강조어 또는 짧은 문장에만 사용한다.
- mono는 metadata와 code에만 사용한다. 긴 설명에 사용하지 않는다.

### 5.3 Type scale

| Role         |  Mobile | Desktop | Line height |  Weight |
| ------------ | ------: | ------: | ----------: | ------: |
| Display hero | 48–56px | 76–82px |   1.04–1.10 |     600 |
| Page H1      | 40–48px | 56–64px |   1.10–1.18 |     600 |
| Article H1   | 36–44px | 52–60px |   1.12–1.20 | 650–700 |
| H2           | 28–32px | 32–36px |   1.25–1.35 | 650–700 |
| H3           | 22–24px | 24–28px |   1.35–1.45 | 650–700 |
| Lead         |    18px | 18–20px |   1.75–1.90 |     400 |
| Body         |    16px | 17–18px |   1.75–1.90 |     400 |
| UI           | 12–14px | 12–14px |     1.4–1.6 | 500–700 |
| Mono meta    | 10–12px | 10–12px |     1.5–1.8 | 400–700 |

### 5.4 본문 규칙

- 본문 최대 폭: `720–760px`.
- 한국어 본문 line-height: 최소 `1.75`.
- 한 줄 권장 길이: 한글 약 35–45자.
- 문단 간격: `1.25–1.5em`.
- heading 위 여백은 아래 여백보다 크다.
- 강제 양쪽 정렬 금지.
- 영문 uppercase label은 tracking을 넓히되 한국어 문장에는 과도한 tracking을 적용하지 않는다.

## 6. 간격 시스템

4px 단위를 기본으로 사용한다.

| 이름  |    값 | 대표 용도                |
| ----- | ----: | ------------------------ |
| `xs`  |   4px | icon/text micro gap      |
| `sm`  |   8px | tag, tight meta          |
| `md`  |  16px | component internal gap   |
| `lg`  |  24px | compact section gap      |
| `xl`  |  32px | component separation     |
| `2xl` |  48px | content block separation |
| `3xl` |  64px | mobile section padding   |
| `4xl` |  80px | desktop section padding  |
| `5xl` | 112px | major section separation |

원칙:

- 빈 공간을 카드 배경으로 채우지 않는다.
- 섹션 간격은 내부 요소 간격보다 명확히 커야 한다.
- 모바일 horizontal padding: `20px`.
- desktop horizontal padding: `32px`.

## 7. 형태, 선, 깊이

### 7.1 Radius

기본값은 `0`.

허용:

- 이미지와 code block: `2–4px`.
- 작은 control: 최대 `6px`.
- modal/search dialog: 최대 `8px`.
- 원형 icon button과 avatar: 기능상 필요할 때 허용.

금지:

- page section 전체 `rounded-2xl`.
- article 본문 card.
- 모든 목록 항목 card화.
- 장식 목적의 pill 남발.

### 7.2 Border

- 기본 divider: `1px solid border`.
- 강조 divider: `border-strong`.
- 한 요소에 outline과 shadow를 동시에 쓰지 않는다.
- 모든 section에 상하 border를 넣지 않는다. 리듬상 필요한 한쪽만 선택한다.

### 7.3 Shadow

기본 UI에는 shadow를 사용하지 않는다.

허용:

- modal
- command palette
- floating accessibility control

shadow는 낮은 opacity의 단일 soft shadow만 사용한다.

## 8. 레이아웃

### 8.1 Global container

- shell content max width: `1120px`.
- `Container` outer max width는 desktop `32px` 좌우 padding을 포함해 `1184px`로 둔다.
- article max width: `760px`.
- blog main + sidebar 전체 max width: `1120px`.
- desktop blog grid: `minmax(0, 760px) 300px`, column gap `60px`.
- sidebar 내부 TOC width: `200–240px`.
- blog sidebar는 `xl` 이상에서만 사용한다. 그 아래에서는 1-column으로 재배치한다.
- sidebar는 글 탐색과 광고를 위한 contextual rail이다. 모든 페이지에 붙는 site-wide navigation으로 사용하지 않는다.

### 8.2 Breakpoints

Tailwind 기본 breakpoint를 사용한다.

| Breakpoint | 역할                                       |
| ---------- | ------------------------------------------ |
| `< sm`     | phone, compact navigation                  |
| `sm`       | 주요 navigation 노출                       |
| `md`       | 2-column editorial layout 시작             |
| `lg`       | display type 확장, article side space 확보 |
| `xl`       | article/archive 300px sidebar 노출         |

viewport별 별도 디자인으로 검토한다. desktop 축소판을 mobile에 그대로 쌓지 않는다.

### 8.3 Grid

- 홈은 12-column 사고방식을 사용하되 실제 구현은 단순 CSS Grid를 우선한다.
- featured 영역은 대략 `1fr / 1.1fr`.
- article 목록은 번호, category, content, date 순서로 정렬한다.
- mobile에서는 category와 date를 title 위/아래로 재배치한다.

## 9. 페이지 패턴

### 9.1 Home

순서:

1. Brand hero
2. Featured article
3. Latest articles
4. Short notes
5. Footer

Hero:

- production 목표 높이: `540–580px`.
- H1은 2–4행.
- 소개 문장은 2문장 이하.
- status panel은 secondary information.
- 최신 글이 지나치게 아래로 밀리지 않게 한다.
- hero 안에 CTA는 최대 1개.

Featured article:

- 화면당 하나.
- cover와 text를 2-column으로 배치 가능.
- cover는 category별 typographic/diagram 문법을 사용한다.
- 일반 post 목록보다 명확히 크되 hero와 경쟁하지 않는다.

Latest articles:

- card grid 대신 divider 기반 list.
- desktop에서 설명 표시 가능.
- mobile에서는 설명을 2행으로 제한하거나 숨긴다.
- 번호와 arrow가 중복 장식이 되면 하나를 제거한다.
- hover는 title color, 1–4px 이동, accent rail 중 하나만 사용한다.

### 9.2 Articles archive

- 상단에 짧은 H1과 전체 글 수.
- category/tag filter는 text tab 또는 compact chip.
- filter가 많으면 horizontal scroll 또는 search와 결합.
- 글 목록은 home latest pattern과 동일한 문법 사용.
- pagination은 페이지 번호와 이전/다음 관계가 명확해야 한다.
- `xl` 이상에서는 `760px` 글 목록과 `300px` sidebar를 `60px` 간격으로 배치한다.
- archive sidebar 순서는 category index, `300×250` 광고, 추천 글이다.
- category와 추천 글은 카드가 아니라 divider 기반 text list로 표현한다.
- `xl` 미만에서는 sidebar를 제거하고 category index를 목록 위 horizontal scroll로 옮긴다.
- mobile/tablet 광고는 글 목록의 세 번째 또는 네 번째 항목 뒤에 가로 슬롯으로 배치한다.

### 9.3 Article detail

블로그 디자인 확정 전 반드시 실제 긴 글로 검증한다.

구조:

1. category
2. H1
3. description
4. author/date/updated/read time
5. optional cover
6. article body
7. related posts
8. comments
9. previous/next

규칙:

- article 자체를 card로 감싸지 않는다.
- metadata는 조용한 inline text.
- 클릭 가능한 category/tag만 chip 허용.
- author/date/read time을 pill로 만들지 않는다.
- cover는 최대 폭을 넓힐 수 있지만 본문 rhythm을 깨지 않는다.
- desktop sidebar는 category 탐색, 광고, TOC, 관련 글을 수용할 수 있다. 한 화면에서 모두 같은 강도로 강조하지 않는다.
- desktop TOC는 sidebar 내부 thin rail이며 TOC만 sticky를 허용한다. 별도 heavy card 금지.
- 광고는 sticky로 만들지 않는다.
- mobile TOC는 접이식 또는 생략하고, 광고는 첫 번째 실질적 section 이후 본문 흐름에 둔다.

### 9.4 Notes

- 짧은 기록은 본문보다 조밀한 list 사용.
- `N01` index 허용.
- thumbnail 필수 아님.
- 짧은 글을 큰 post card로 부풀리지 않는다.

### 9.5 Apps

- app은 명확한 반복 item이므로 제한적으로 card 허용.
- 앱 아이콘, 이름, 한 줄 설명, 상태, CTA 순서.
- blog visual motif를 강제로 app landing에 덮지 않는다.
- privacy/terms 페이지는 장식보다 법적 내용과 언어 탐색 우선.
- 기존 public URL을 유지한다.

### 9.6 About

- profile card보다 editorial biography 우선.
- 사진은 1장.
- 경력, 관심 기술, 운영 원칙을 section으로 구분.
- social link는 compact text link.

## 10. 컴포넌트 규칙

### 10.1 Header

- 높이: `64–72px`.
- logo, primary navigation, search, theme control만 배치.
- sticky 허용.
- blur를 쓰면 투명도가 읽기성을 해치지 않아야 한다.
- mobile에서 navigation 전체를 제거하지 않는다.
- mobile menu 또는 최소 `Articles`, `Notes` 접근 경로 제공.
- 모든 touch target 최소 `44×44px`.

### 10.2 Logo

- square + offset square motif 유지.
- animation은 hover 시 `1–4px` transform만.
- glow, rotate loop 금지.

### 10.3 Link와 button

- navigation link: text color 변화.
- inline link: underline 또는 accent color.
- primary CTA: solid accent 허용.
- secondary CTA: text 또는 1px border.
- link에 button처럼 과도한 padding/radius를 주지 않는다.
- hover만으로 상태를 전달하지 않는다.

### 10.4 Tag와 category

- category는 탐색 기능이 있을 때만 interactive.
- tag는 실제 filter route가 있을 때 link.
- decoration-only 기술명 나열은 plain text 사용.
- chip 사용 시 radius와 background 대비를 낮춘다.

### 10.5 Card

허용:

- app item
- related post
- modal/search result
- 명확한 CTA

비권장:

- 일반 post archive 전체
- profile
- metadata
- article body
- TOC

### 10.6 Search

- post 수가 늘면 command palette 또는 full-width dialog.
- title, description, category, tag 검색.
- keyboard focus trap, Escape close, focus restore 필수.
- 검색 결과는 compact list.

### 10.7 TOC

- active heading에 accent text 또는 rail 사용.
- container card 금지.
- heading depth는 indentation으로 표현.
- 긴 제목 ellipsis보다 wrap 우선.

### 10.8 Code block

- background: `code`.
- foreground: `code-foreground`.
- radius: `2–4px`.
- filename/language label은 muted header에 표시 가능.
- horizontal scroll 필수.
- line highlight는 accent-soft 계열.
- copy button touch target 최소 40px.

### 10.9 Table

- mobile horizontal scroll.
- header는 surface-muted.
- cell border는 최소화.
- zebra stripe 기본 사용 금지.
- 숫자는 mono 또는 tabular numerals 사용 가능.

### 10.10 Callout

- 정보, 경고, 오류 의미가 있을 때만.
- 왼쪽 rail + quiet surface 사용.
- 큰 icon, gradient, shadow 조합 금지.

### 10.11 Blog sidebar

- 적용 페이지: article archive, category archive, article detail, 충분한 결과가 있는 search page.
- 제외 페이지: home, notes, about, app landing, privacy/policy, 404.
- width는 `300px`로 고정하고 main column을 `720px` 아래로 줄이지 않는다.
- archive 기본 순서는 category index, 광고, 추천 글이다.
- article detail에서는 category, 광고, TOC, 같은 category 글 순서를 기본으로 하되 글 길이에 따라 조정할 수 있다.
- category index는 번호, 이름, 글 수를 사용한 divider list로 표현한다.
- 추천 글은 thumbnail card가 아닌 compact text list를 우선한다.
- sidebar 전체를 sticky로 만들지 않는다. TOC처럼 읽기 보조 기능만 sticky 허용한다.
- `xl` 미만에서는 sidebar DOM을 그대로 아래로 쌓지 않는다. category, 광고, TOC, 관련 글을 각자의 mobile reading order로 재배치한다.

### 10.12 광고

- 콘텐츠와 명확한 간격으로 분리.
- article 문단 중간 삽입 최소화.
- 광고 container가 주요 콘텐츠 card처럼 보이지 않게 한다.
- 광고와 category, pagination, previous/next, copy button 등 interactive element 사이에 최소 `32–40px` 간격을 둔다.
- custom label이 필요하면 `Advertisements`를 사용한다. 추천, 관련 글처럼 오해할 표현을 쓰지 않는다.
- sidebar 기본 슬롯은 `300×250`이며 페이지당 하나부터 시작한다.
- 가로 슬롯은 viewport 기준으로 `<520px: 320×100`, `520–799px: 468×60`, `≥800px: 728×90`을 기본으로 한다.
- 실제 광고가 로드되기 전에 CSS로 width/height 또는 min-height를 예약해 layout shift를 막는다.
- 빈 광고 슬롯의 collapse는 below-the-fold에서만 허용하고 visible content를 밀지 않는지 확인한다.
- placeholder는 layout 검토용으로만 quiet surface를 사용할 수 있다. production 광고를 자체 card처럼 꾸미지 않는다.
- home 최대 1개, archive 최대 1개, article은 읽기 시간에 따라 0–2개를 기준으로 한다.
- notes, about, app landing, privacy/policy, 404에는 기본적으로 광고를 넣지 않는다.

## 11. 이미지와 cover

- post thumbnail은 선택 사항.
- 이미지가 없다고 빈 placeholder card를 만들지 않는다.
- category cover는 typography, 번호, 간단한 code/diagram을 조합한다.
- grid motif는 cover마다 같은 밀도로 반복하지 않는다.
- 이미지 aspect ratio를 page별로 고정한다.
- 의미 있는 이미지는 구체적인 alt 제공.
- 장식 이미지는 빈 alt.
- 과도한 hover zoom 금지. 최대 `scale(1.02)`.

## 12. Motion과 interaction

### 12.1 원칙

- motion은 상태 변화와 탐색 관계를 설명해야 한다.
- `opacity`, `transform`, color 중심.
- layout property animation 금지.
- 자동 재생 loop 금지.
- scroll reveal 남발 금지.

### 12.2 Timing

| 종류            |  Duration | Easing                         |
| --------------- | --------: | ------------------------------ |
| hover color     | 120–160ms | ease-out                       |
| small transform | 160–200ms | ease-out                       |
| dialog enter    | 200–260ms | cubic-bezier(0.22, 1, 0.36, 1) |
| theme color     | 160–200ms | ease                           |

### 12.3 허용 예

- link underline 확장
- title color 변경
- arrow 2–4px 이동
- logo 내부 square 2–4px 이동
- reading progress
- theme transition

### 12.4 Reduced motion

`prefers-reduced-motion: reduce`에서 animation과 smooth scroll을 사실상 제거한다. 기능과 정보는 motion 없이 동일해야 한다.

## 13. Dark mode

- `.dark` class 기반.
- 사용자 선택을 `localStorage`에 저장.
- 초기 paint 전에 class를 적용해 flash를 막는다.
- toggle은 현재 상태를 `aria-pressed` 또는 명확한 label로 전달해야 한다.
- `meta[name="theme-color"]` 동기화를 production 전에 검토한다.
- dark surface를 pure black으로 통일하지 않는다.
- border와 muted text를 light 값의 단순 반전으로 만들지 않는다.
- 이미지, code, 광고까지 dark theme에서 확인한다.

## 14. 접근성

### 14.1 필수 기준

- 일반 text contrast 최소 `4.5:1`.
- 큰 text 최소 `3:1`.
- focus-visible 항상 표시.
- keyboard만으로 navigation/search/theme/TOC 사용 가능.
- touch target 최소 `44×44px` 권장.
- heading level 순서 유지.
- landmark `header`, `nav`, `main`, `article`, `aside`, `footer` 사용.
- color만으로 상태 전달 금지.
- icon-only control에 accessible name 제공.
- decorative blueprint element는 `aria-hidden="true"`.

### 14.2 콘텐츠 접근성

- 링크 문구는 목적을 설명한다.
- `여기`, `더보기` 단독 사용 지양.
- code block language 지정.
- table caption 또는 주변 설명 제공.
- 이미지 alt에 `이미지`, `사진` 같은 중복 단어를 넣지 않는다.

## 15. 반응형 검토

최소 확인 viewport:

```text
360×800
390×844
768×1024
1024×768
1280×800
1440×900
```

Mobile:

- hero 제목이 화면 밖으로 잘리지 않는다.
- navigation 접근 가능.
- 목록 column이 자연스러운 reading order로 재배치된다.
- desktop sidebar를 통째로 목록 아래에 붙이지 않는다.
- category index는 horizontal scroll, TOC는 접이식, 광고는 content flow로 각각 재배치한다.
- code/table horizontal scroll 가능.
- fixed control이 콘텐츠를 가리지 않는다.
- hover 없이 모든 기능 사용 가능.

Desktop:

- container가 지나치게 넓어지지 않는다.
- article line length 유지.
- sidebar가 `300px`, gap이 `60px`인지 확인한다.
- TOC와 광고가 본문을 압박하지 않는다.
- sidebar가 없는 페이지에 불필요한 빈 column을 남기지 않는다.
- 큰 여백이 빈 UI처럼 보이지 않고 hierarchy를 만든다.

## 16. Tailwind CSS 구현 규칙

### 16.1 Token 계층

```text
primitive palette
  ↓
theme semantic variable
  ↓
Tailwind semantic utility
  ↓
component class
```

예:

```text
blueprint-700
  ↓
--theme-accent
  ↓
text-accent / bg-accent / border-accent
```

### 16.2 사용 규칙

- 색상은 semantic utility 우선.
- spacing과 type은 Tailwind utility 우선.
- 반복되는 복합 pattern만 component 또는 CSS class로 추출.
- arbitrary value는 디자인 시스템에 없는 값을 실험할 때만 사용하고 확정 후 token화한다.
- className이 너무 길어도 의미 없는 wrapper component를 만들지 않는다.
- dark variant를 component마다 반복하기보다 semantic mapping으로 해결한다.

권장:

```tsx
<p className="text-sm leading-7 text-muted" />
<section className="border-t border-border py-16" />
```

비권장:

```tsx
<div className="rounded-2xl border bg-white p-6 shadow-xl dark:bg-slate-900" />
```

## 17. Page QA checklist

### 17.1 공통

- [ ] 가장 중요한 정보가 3초 안에 보이는가?
- [ ] card 없이도 hierarchy가 명확한가?
- [ ] semantic color token만 사용하는가?
- [ ] light/dark 모두 자연스러운가?
- [ ] focus-visible이 보이는가?
- [ ] reduced motion에서 문제없는가?
- [ ] mobile navigation이 가능한가?
- [ ] 360px에서 horizontal overflow가 없는가?
- [ ] SSG build를 깨는 runtime API가 없는가?

### 17.2 Home

- [ ] hero가 최신 글을 지나치게 아래로 밀지 않는가?
- [ ] featured가 한 개만 강조되는가?
- [ ] 목록이 card grid로 회귀하지 않았는가?
- [ ] blueprint motif가 과하지 않은가?
- [ ] 실제 콘텐츠 제목 길이로 검증했는가?

### 17.3 Article

- [ ] 실제 긴 MDX로 검증했는가?
- [ ] 본문 폭이 720–760px인가?
- [ ] H2/H3/code/table/image rhythm이 명확한가?
- [ ] metadata가 pill로 과장되지 않았는가?
- [ ] TOC가 보조 navigation처럼 보이는가?
- [ ] sidebar가 category 탐색, 광고, TOC 사이의 우선순위를 유지하는가?
- [ ] 광고와 navigation 사이에 충분한 간격이 있는가?
- [ ] mobile code/table scroll이 되는가?

### 17.4 Apps와 policy

- [ ] 기존 URL이 유지되는가?
- [ ] policy 언어 navigation이 명확한가?
- [ ] 법적 내용을 장식이 방해하지 않는가?
- [ ] app card가 blog post card처럼 보이지 않는가?

## 18. 금지 패턴

- article 전체를 큰 rounded card로 감싸기
- 모든 페이지에 동일한 site-wide sidebar 적용
- sidebar 전체 또는 광고를 custom sticky/floating 처리
- 일반 글 목록을 동일 크기 3-column card grid로 구성
- metadata를 모두 pill로 만들기
- 한 화면에 여러 gradient와 glow 사용
- 의미 없는 sparkle/rocket icon 사용
- 모든 section fade-in
- hover에서 큰 scale 또는 layout shift
- inline hex 색상 반복
- light palette 단순 반전 dark mode
- mobile navigation 제거
- OS font fallback을 production typography로 확정
- 디자인 변경 후 이 문서를 갱신하지 않기

## 19. 현재 미완료 항목

다음 항목은 V2 production 전 해결한다.

1. Pretendard Variable self-host
2. 한국어 display serif 확정 및 self-host
3. mobile navigation 구현
4. theme toggle 현재 상태 접근성 제공
5. article detail 실제 MDX 시안
6. category별 cover system
7. search interaction
8. responsive visual QA
9. `theme-color` 동기화 검토
10. hero 높이 `540–580px` 범위로 최종 조정
11. category와 추천 글을 실제 콘텐츠 route에 연결
12. AdSense ID, consent, 실제 광고 슬롯 연동

## 20. 변경 관리

### 20.1 문서 업데이트가 필요한 변경

- color token 추가/변경/삭제
- font family, type scale 변경
- spacing, radius, shadow 기준 변경
- global container/article width 변경
- page hierarchy 변경
- 공통 component pattern 변경
- motion timing 또는 interaction 원칙 변경
- breakpoint와 responsive behavior 변경
- 접근성 기준 변경
- card 허용 범위 변경
- blueprint motif 변경

### 20.2 같은 커밋 원칙

디자인 시스템을 변경하는 구현 커밋은 `docs/design-system.md` 변경을 포함해야 한다.

```text
style: 본문 타이포그래피 체계 개선
  ├─ src/app/globals.css
  ├─ src/features/post/...
  └─ docs/design-system.md
```

단순히 기존 규칙을 적용한 컴포넌트 구현은 문서를 수정하지 않아도 된다. 문서가 빠졌는지 판단이 애매하면 변경 이유와 영향을 검토하고, 재사용 가능한 새 결정이면 문서에 추가한다.

### 20.3 예외

특정 페이지가 가이드와 달라야 한다면 코드에 임의로 예외를 만들지 않는다.

1. 예외가 필요한 이유를 확인한다.
2. 일회성인지 새 pattern인지 판단한다.
3. 새 pattern이면 이 문서에 허용 범위와 이유를 기록한다.
4. 같은 커밋에서 구현한다.

이 문서는 디자인 완료 후 보관하는 산출물이 아니다. 구현과 함께 계속 유지하는 작업 규칙이다.
