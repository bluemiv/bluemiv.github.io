# Bluemiv Tech Blog V2 디자인 시스템

> 상태: V2 기준 문서
> 마지막 검토: 2026-08-08
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
- 글, 짧은 기록, 개별 앱, 정책 페이지가 같은 브랜드 안에서 역할별로 구분된다.
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
- 열린 두 개의 frame rail과 세로로 정렬한 두 개의 active cell로 구성한 로고

사용 기준:

- grid는 hero 또는 cover 중 한 화면에 최대 1~2개만 사용한다.
- 좌표성 label은 정보 또는 브랜드 문맥을 가져야 한다.
- 같은 섹션 안에서 grid, 점선, 큰 번호를 모두 겹치지 않는다.
- 장식 텍스트는 본문보다 낮은 대비를 사용한다.

### 3.2 언어

- 본문과 주요 안내는 한국어.
- `Articles`, `Notes`처럼 짧고 익숙한 구조명은 모든 locale에서 영어를 유지한다.
- `Featured`, `Latest`, `Status` 같은 쉬운 단어는 짧은 분류·장식 label일 때 영어를 우선한다.
- 문장, CTA, 오류, 도움말, 접근성 label은 사용자가 자연스럽게 이해하도록 각 locale 언어로 번역한다.
- 해당 언어권에서 현지어 표기가 일반적인 용어는 쉬운 영어라도 자연스러운 현지어를 우선한다.
- `EDITION`, `NEW RELEASE` 같은 영어 표기는 장식 또는 분류에만 제한.
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

| Role          | Korean                 | English                  | Japanese               | Weight  | 용도                                          |
| ------------- | ---------------------- | ------------------------ | ---------------------- | ------- | --------------------------------------------- |
| Sans          | Wanted Sans Variable   | Instrument Sans Variable | Noto Sans JP Variable  | 400–700 | 본문, navigation, UI, 기본 제목               |
| Display serif | Noto Serif KR Variable | Newsreader Variable      | Noto Serif JP Variable | 400–600 | hero 강조어, 인용문, 제한된 editorial heading |
| Mono          | IBM Plex Mono          | IBM Plex Mono            | IBM Plex Mono          | 400/600 | 번호, 날짜, topic, code                       |

모든 폰트는 OFL 라이선스이며 npm package에 버전을 고정한다. Wanted Sans와 Noto CJK 계열은 `unicode-range`로 분할된 WOFF2를 번들링하고, IBM Plex Mono는 `next/font/local`로 Regular와 SemiBold WOFF2만 포함한다. 브라우저가 외부 CDN에 요청하지 않도록 모든 폰트 asset은 static export 결과물에서 self-host한다.

- `lang="ja"`에서는 sans와 display serif를 각각 Noto Sans JP와 Noto Serif JP로 교체해 일본어 고유 glyph를 사용한다.
- `lang="en"`에서는 sans와 display serif를 각각 Instrument Sans와 Newsreader로 교체한다. Newsreader의 optical sizing은 browser에 맡긴다.
- 한국어 root 아래의 영문 app 상세와 영문·일문 policy는 콘텐츠 `lang`에 맞춰 각각 Instrument Sans와 Noto Sans JP를 적용한다.
- 모든 locale 폰트는 같은 역할과 weight 범위를 유지한다. locale 변경이 정보 계층이나 브랜드 강도를 바꾸면 안 된다.

### 5.2 사용 비율

- 본문은 항상 sans.
- hero 전체를 serif로 만들지 않는다.
- display serif는 한 heading 안의 강조어 또는 짧은 문장에만 사용한다.
- mono는 metadata와 code에만 사용한다. 긴 설명에 사용하지 않는다.
- 한글에 synthetic italic을 적용하지 않는다. 실제 italic face를 추가하기 전까지 display serif는 normal style만 사용한다.
- 분할된 한글 폰트는 필요한 glyph asset만 브라우저가 선택하게 하며, 전체 한글 폰트 파일을 수동 preload하지 않는다.
- Mono는 주요 콘텐츠 렌더링을 막지 않도록 preload하지 않는다.

### 5.3 Type scale

글자 크기는 root 글자 크기를 존중하도록 `rem`으로 구현한다. 아래 괄호 안의 `px`는 브라우저
기본값 `1rem = 16px`일 때의 참고값이다.

| Role                | Mobile                          | Desktop                         | Line height |  Weight |
| ------------------- | ------------------------------- | ------------------------------- | ----------: | ------: |
| Display hero        | `text-5xl` (48px)               | `text-7xl` (72px)               |   1.04–1.10 |     600 |
| Decorative numeral  | `text-7xl` (72px)               | `text-9xl` (128px)              |        1.00 | 400–600 |
| Page / detail H1    | `text-4xl` (36px)               | `text-6xl` (60px)               |   1.10–1.18 | 600–700 |
| Article H2          | `text-3xl` (30px)               | `text-4xl` (36px)               |   1.25–1.35 | 650–700 |
| Article H3          | `text-2xl` (24px)               | `text-3xl` (30px)               |   1.30–1.40 | 650–700 |
| Article H4          | `text-lg` (18px)                | `text-lg` (18px)                |        1.50 |     700 |
| Lead                | `text-lg` (18px)                | `text-xl` (20px)                |   1.75–1.90 |     400 |
| Article body        | `text-base` (16px)              | `text-lg` (18px)                |   1.75–1.90 |     400 |
| General body / list | `text-sm`–`text-base` (14–16px) | `text-base`–`text-lg` (16–18px) |   1.60–1.85 | 400–600 |
| UI / action         | `text-sm` (14px)                | `text-sm` (14px)                |   1.40–1.70 | 500–700 |
| Compact meta        | `text-xs` (12px)                | `text-xs` (12px)                |   1.50–1.80 | 400–700 |

- 화면에 보이는 최소 크기는 `text-xs`(12px)다. `text-micro`와 11px 이하는 사용하지 않는다.
- 읽거나 누르는 navigation, action, 본문 metadata는 기본 `text-sm`(14px)을 사용한다.
- `text-xs`는 날짜, 순번, topic, section 수, eyebrow처럼 짧고 보조적인 정보에만 사용한다.
- 중간 본문 단계는 Tailwind의 `text-md`가 아니라 `text-base`다.
- font size는 Tailwind 표준 단계로만 지정한다. `text-[…]`, px/rem 직접 입력, font-size용
  `clamp()`를 사용하지 않는다.
- 반응형 제목은 `text-4xl sm:text-5xl md:text-6xl`처럼 breakpoint별 표준 단계를 사용한다.
- display hero는 `text-5xl sm:text-6xl md:text-7xl`, 장식 숫자는
  `text-7xl sm:text-8xl lg:text-9xl`을 기준으로 한다.
- 문맥 크기에 비례해야 하는 inline code, heading anchor, list marker의 `em` 크기는 허용한다.
- line-height와 letter-spacing은 글꼴 및 역할에 맞춘 임의 값을 허용하되 font-size 단계와 섞지 않는다.

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
| `2xl` |  48px | section block separation |
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

- shell inner max width: `1120px`.
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
- article 목록은 번호, topic, article, date 순서로 정렬한다.
- mobile에서는 topic과 date를 title 위/아래로 재배치한다.

## 9. 페이지 패턴

### 9.1 Home

순서:

1. Compact brand hero
2. New release article
3. Latest articles + topic discovery rail
4. Short notes
5. Footer

Hero:

- 실제 콘텐츠 기준 목표 높이: mobile `560–620px`, desktop `520–560px`.
- H1은 2–4행.
- 소개 문장은 2문장 이하.
- 한국어 소개 문장은 `개발자로 일한 지 {경력 개월 차수}개월째. 문제를 해결하며 내린 선택과 배움을 기록합니다.`를 사용한다.
- 경력 개월 차수는 `SITE_CONFIG.careerStartMonth`부터 서울 기준 현재월까지 시작월을 포함해 SSG build 시 계산한다. 숫자를 번역 문구에 하드코딩하지 않는다.
- 영어와 일본어도 같은 개월 차수를 각 locale 문장에 반영한다.
- status panel에는 실제 locale의 article, topic, note 개수와 발행 상태만 표시한다. mobile에서도 4개 지표를 한 행으로 유지한다.
- hero와 status panel은 `lg`부터 2-column으로 분리한다. tablet에서는 제목 폭을 우선하고 status를 하단 1행으로 둔다.
- `800px` 높이의 일반 노트북 화면에서 다음 콘텐츠의 시작이 보여야 한다.
- hero 안에 CTA는 최대 1개.
- 해당 locale에 공개 article이 없으면 빈 Latest section으로 이동하는 hero CTA를 노출하지 않는다.

Featured article:

- 화면당 하나.
- 해당 locale의 최신 article을 사용하며 Latest articles 목록에서는 중복 노출하지 않는다.
- `md` 이상에서 cover와 text를 2-column으로 배치한다.
- 실제 `coverImage`가 있으면 `32:17` frame을 채워 표시한다. 인접한 제목이 같은 링크 목적을 설명하므로 홈 cover의 alt는 비운다.
- `coverImage`가 없으면 topic, article 번호, grid를 조합한 typographic cover를 사용한다.
- 일반 article 목록보다 명확히 크되 hero와 경쟁하지 않는다.

Latest articles:

- card grid 대신 divider 기반 list.
- 목록에는 thumbnail을 반복하지 않는다. 제목, 설명, topic, 날짜의 탐색 밀도를 우선하고 대표 이미지는 Featured article에만 집중한다.
- desktop에서 설명 표시 가능.
- mobile에서는 설명을 2행으로 제한하거나 숨긴다.
- 번호와 arrow가 중복 장식이 되면 하나를 제거한다.
- hover와 keyboard focus는 accent rail과 title color로 상태를 함께 전달한다. title 이동은 최대 `2px`로 제한한다.
- 최근 article은 featured를 제외하고 최대 6개 노출한다.
- title, description, topic, date, link는 MDX repository의 실제 metadata에서 build time에 생성한다.
- 번역되지 않은 article이나 note의 제목을 UI copy에 가짜 번역해 표시하지 않는다.

Home discovery rail:

- `xl` 이상에서 Latest articles 오른쪽에 `300px` rail을 둔다.
- rail에는 실제 article metadata에서 집계한 상위 topic 6개와 광고 1개만 둔다.
- topic은 실제 `/topics/{topic}/` archive로 연결하고 글 수를 함께 표시한다.
- `xl` 미만에서는 topic index를 latest 목록 위 horizontal list로 옮기고 광고를 세 번째 article 뒤에 둔다.
- home rail은 해당 section의 탐색 보조 영역이며 site-wide sidebar나 sticky 영역으로 사용하지 않는다.

Short notes:

- 실제 locale의 최신 note를 최대 3개 노출한다.
- 공개 note가 없으면 section 자체를 생략한다.
- note row는 해당 상세 route로 직접 연결한다.

### 9.2 Articles archive

- 상단에 짧은 H1과 전체 글 수.
- topic filter는 `/articles/`와 `/topics/{topic}/` 정적 route를 사용하는 text link다.
- 선택 topic은 `aria-current="page"`, accent text와 얇은 underline/rail로 표시한다.
- filter가 많으면 horizontal scroll 또는 search와 결합.
- 글 목록은 home latest pattern과 동일한 문법 사용.
- 전체 article archive는 최신순으로 페이지당 10개를 표시한다.
- 첫 페이지 URL은 `/articles/`를 유지하고 2페이지부터 `/articles/page/{pageNumber}/`로 SSG 생성한다. `/articles/page/1/`은 만들지 않는다.
- 각 페이지는 고유 title, description, canonical과 실제 이전·다음 관계를 가진다.
- desktop은 현재 위치 주변의 페이지 번호와 이전·다음 link를 표시한다. 페이지가 많으면 처음·끝과 현재 주변만 남기고 ellipsis로 줄인다.
- mobile은 이전, `현재 / 전체`, 다음 순서의 compact navigation을 사용한다.
- 현재 페이지는 `aria-current="page"`와 accent rail로 표시한다. 이전·다음 경계에서는 동작하지 않는 link를 만들지 않는다.
- 목록 상단에는 전체 article 수와 현재 페이지의 article 범위를 함께 표시한다.
- `xl` 이상에서는 `760px` 글 목록과 `300px` sidebar를 `60px` 간격으로 배치한다.
- archive sidebar 기본 순서는 실제 topic index, `300×250` 광고다.
- 추천 글은 실제 article link와 선정 기준이 있을 때만 추가한다. 가짜 제목이나 준비 중 label을 노출하지 않는다.
- `xl` 미만에서는 sidebar를 제거하고 topic index를 목록 위 horizontal scroll로 옮긴다.
- mobile topic archive에서는 선택 topic을 `All articles` 바로 뒤로 옮겨 좁은 viewport에서도 현재 상태가 처음부터 보이게 한다.
- mobile/tablet 광고는 글 목록의 세 번째 또는 네 번째 항목 뒤에 가로 슬롯으로 배치한다.
- archive의 제목, 설명, 날짜, 읽기 시간, topic count는 MDX repository의 build-time 데이터만 사용한다.
- `/topics/{topic}/`에서도 Header의 Articles navigation을 active로 유지한다.

### 9.3 Article detail

블로그 디자인 확정 전 반드시 실제 긴 글로 검증한다.

구조:

1. topic
2. H1
3. description
4. author/date/updated/read time
5. optional cover
6. article body
7. related articles
8. comments
9. previous/next

규칙:

- article 자체를 card로 감싸지 않는다.
- metadata는 조용한 inline text.
- 상세 metadata는 `16px` Lucide 아이콘과 값을 함께 사용한다. 작성자, 발행일, 수정일, 예상
  읽기 시간 label은 시각적으로 감추되 `<dt>`로 유지한다.
- 예상 읽기 시간은 `Clock3` 아이콘과 `약 {n}분`으로 표시하고, machine-readable
  `time[datetime="PT{n}M"]`을 제공한다. 아이콘만으로 의미를 전달하지 않는다.
- 클릭 가능한 topic/tag만 chip 허용.
- author/date/read time을 pill로 만들지 않는다.
- cover는 최대 폭을 넓힐 수 있지만 본문 rhythm을 깨지 않는다.
- 상세 header와 sidebar의 topic은 해당 topic archive로 연결한다.
- desktop sidebar는 topic 탐색, 광고, TOC, 관련 article을 수용할 수 있다. 한 화면에서 모두 같은 강도로 강조하지 않는다.
- desktop TOC는 sidebar 내부 thin rail이며 TOC만 sticky를 허용한다. 별도 heavy card 금지.
- 광고는 sticky로 만들지 않는다.
- mobile TOC는 접이식 또는 생략하고, 광고는 첫 번째 실질적 section 이후 본문 흐름에 둔다.

현재 구현 기준:

- `@next/mdx`로 article MDX를 build time에 컴파일하고 GFM, heading anchor, syntax highlighting을 적용한다.
- header는 넓은 editorial 영역, 본문은 최대 `760px`, desktop sidebar는 `300px`로 구성한다.
- desktop은 광고 다음에 thin rail TOC를 두고 TOC만 sticky 처리한다.
- mobile은 native `details` TOC를 본문 전에 두며 첫 버전에서는 본문 중간 광고를 삽입하지 않는다.
- 본문 뒤에는 tag, 같은 topic article, 이전·다음 article 순서로 탐색을 이어간다.
- code block은 dark surface를 고정 사용하고 language label, 가로 스크롤, highlighted line을 지원한다.
- code block toolbar 오른쪽에는 `Copy` action을 둔다. 복사 성공 시 아이콘과 label을 `Copied`로 2초간 바꾸고, 실패 시 `Retry`를 표시한다.
- 복사 대상은 toolbar를 제외한 `<code>`의 원문 전체다. 버튼은 항상 보이고 keyboard focus와 screen reader 상태 안내를 제공한다.
- article `h2`–`h4` 번호는 문서 순서로 build time에 자동 생성한다. `01`, `01.01`, `01.01.01` 형식을 사용한다.
- 이관 article의 기존 heading 번호는 anchor 호환을 위해 source에 남기되 화면에서는 자동 번호로 대체한다.
- highlighted code line은 code surface와 accent를 혼합한 어두운 배경을 사용해 두 theme에서 token 대비를 유지한다.

### 9.4 Notes

- 짧은 기록은 본문보다 조밀한 list 사용.
- `N01` index 허용.
- `coverImage` 필수 아님.
- note를 큰 article card로 부풀리지 않는다.
- 목록 페이지는 sidebar, 광고, thumbnail 없이 최대 `920px`의 단일 column을 사용한다.
- 목록 section header에 최신순 정렬 상태와 실제 공개 note 수를 한 번만 표시한다.
- note row는 번호, tag, 제목, 설명, 발행일 순서의 divider list로 구성한다.
- mobile에서는 날짜와 이동 화살표를 본문 아래 한 행에 두고 설명은 최대 3행으로 제한한다.
- note 설명은 범위와 독자가 얻을 내용을 한 문장으로 쓰고 같은 서술어를 반복하지 않는다.
- 상세 페이지는 최대 `760px` 단일 reading column을 사용하고 sidebar, 광고, 큰 cover를 두지 않는다.
- 상세 header는 목록 복귀, `Note / N01`, 제목, 설명, 아이콘을 곁들인 작성자·발행일·수정일
  정보 순서로 구성한다.
- h2가 3개 이상이면 본문 위에 divider 기반 compact TOC를 표시하고, 1~2개면 생략한다.
- note TOC는 h2만 사용한다. source의 기존 번호는 anchor 호환을 위해 유지하되 label과 화면 heading 번호는 build time에 자동 생성한다.
- article용 sticky sidebar나 접이식 mobile TOC를 note에 재사용하지 않는다.
- article 본문 스타일을 공유하되 heading 간격은 짧은 호흡에 맞게 줄인다.
- 한국어 제목, 설명, 본문은 어절 우선으로 줄바꿈하고 긴 code와 URL은 `overflow-wrap` fallback을 유지한다.
- 본문 뒤에는 tag와 더 이전·더 최근 note 탐색을 둔다.
- `coverImage`는 상세의 Open Graph, Twitter Card, 구조화 데이터에 사용하고 화면 상단에는 반복 노출하지 않는다.

### 9.5 App detail과 policy

- `/apps/`는 목록을 렌더링하지 않고 `/`로 정적 이동한다.
- primary navigation에 Apps 항목을 두지 않는다.
- 기존 개별 app, privacy, terms, account deletion public URL은 유지한다.
- 개별 app 상세는 이름, 설명, Google Play, 핵심 기능, 법적 문서 순서의 단일 column을 사용한다.
- app 상세의 기능은 card grid가 아닌 divider list로 표현한다.
- policy는 최대 `820px` reading column에서 heading, paragraph, list, link만 명확하게 표현한다.
- policy 본문은 기존 법적 문구를 유지하고 실명과 개인 전화번호는 공개하지 않는다.
- policy에는 sidebar, 광고, app 목록 navigation, 장식용 cover를 두지 않는다.

## 10. 컴포넌트 규칙

### 10.1 Header

- 바깥 shell은 `72px`를 유지하고, scroll down compact 상태에서는 surface와 내부 콘텐츠만
  시각적으로 `56px` 높이에 맞춘다. layout height를 animation하지 않는다. `44px` touch target
  위아래에 각각 `6px` 여백을 남긴다.
- logo, primary navigation, search, theme control만 배치.
- sticky 허용.
- header surface는 `canvas 80%`와 `backdrop-blur-xl`을 사용해 본문과 분리하되 배경 흐름을 남긴다.
- desktop은 logo, 중앙 primary navigation, utility control의 3영역으로 구성한다.
- header wordmark는 `Bluemiv`만 사용하고 tagline이나 장식 문구를 덧붙이지 않는다.
- active navigation은 text와 1px accent rail을 함께 사용한다.
- locale에 실제 archive/detail route가 없으면 해당 primary navigation과 mobile menu trigger를 노출하지 않는다. 404 link를 구조 보존용으로 두지 않는다.
- 언어 메뉴의 현재 locale은 현 경로를 유지한다. 대응 번역 route가 없는 다른 locale은 존재하지 않는 경로 대신 해당 locale 홈으로 이동한다.
- 아래로 `32px` 이상 scroll하면 compact, 위로 `16px` 이상 scroll하면 기본 높이로 전환한다.
- mobile menu에서 모든 primary navigation을 제공한다.
- header 상단과 mobile menu는 서로 독립된 blur surface로 구성해 중첩 `backdrop-filter`를 만들지 않는다.
- mobile menu surface는 `canvas 92%`와 `backdrop-blur-2xl`을 사용해 배경 글자를 흐리면서 navigation 대비를 유지한다.
- compact transition은 `transform`만 사용하며 `180ms ease-out`, menu transition은 `200ms ease-out`을 사용한다. reduced motion에서는 제거한다.
- 모든 touch target 최소 `44×44px`.

### 10.2 Logo

- 로고 이름은 **Active Field Mark**다.
- 좌상단과 우하단의 열린 frame rail은 기술 문서의 좌표계와 확장 가능한 기록 영역을 뜻한다.
- 중앙의 두 active cell은 축적되는 기록과 계속 움직이는 관점을 뜻한다.
- `64×64` viewBox와 `8px` 기본 module을 유지해 작은 favicon에서도 형태가 뭉개지지 않게 한다.
- symbol은 wordmark 없이 단독 사용 가능하며, header에서는 `20×20px`로 사용한다.
- light theme은 `blueprint-700`, dark theme은 `blueprint-400`을 사용한다.
- 공개 원본은 `/bluemiv-mark.svg`, app icon은 `src/app/icon.svg`를 사용하고 geometry를 동일하게 유지한다.
- animation은 hover 시 active cell에만 `1–4px` transform을 허용한다.
- glow, rotate loop 금지.

### 10.3 Link와 button

- navigation link: text color 변화.
- inline link: underline 또는 accent color.
- primary CTA: solid accent 허용.
- secondary CTA: text 또는 1px border.
- link에 button처럼 과도한 padding/radius를 주지 않는다.
- hover만으로 상태를 전달하지 않는다.

### 10.4 Tag와 topic

- topic은 탐색 기능이 있을 때만 interactive.
- tag는 실제 filter route가 있을 때 link.
- decoration-only 기술명 나열은 plain text 사용.
- chip 사용 시 radius와 background 대비를 낮춘다.

### 10.5 Card

허용:

- related article
- modal/search result
- 명확한 CTA

비권장:

- 일반 article archive 전체
- profile
- metadata
- article body
- TOC

### 10.6 Search

- article 수가 늘면 command palette 또는 full-width dialog.
- title, description, topic, tag 검색.
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

- 적용 페이지: article archive, topic archive, article detail, 충분한 결과가 있는 search page.
- 제외 페이지: home, notes, app detail, privacy/policy, 404.
- width는 `300px`로 고정하고 main column을 `720px` 아래로 줄이지 않는다.
- archive 기본 순서는 topic index, 광고다. 추천 글은 실제 link와 선정 기준이 있을 때만 뒤에 추가한다.
- article detail에서는 topic, 광고, TOC, 같은 topic article 순서를 기본으로 하되 글 길이에 따라 조정할 수 있다.
- topic index는 번호, 이름, 글 수를 사용한 divider list로 표현한다.
- 추천 글을 추가하면 image card가 아닌 compact text list를 우선한다.
- sidebar 전체를 sticky로 만들지 않는다. TOC처럼 읽기 보조 기능만 sticky 허용한다.
- `xl` 미만에서는 sidebar DOM을 그대로 아래로 쌓지 않는다. topic, 광고, TOC, 관련 article을 각자의 mobile reading order로 재배치한다.
- home의 Latest articles 옆 discovery rail은 Blog sidebar와 별도 패턴이다. Home 규칙의 제한된 콘텐츠만 사용한다.

### 10.12 광고

- 콘텐츠와 명확한 간격으로 분리.
- article 문단 중간 삽입 최소화.
- 광고 container가 주요 콘텐츠 card처럼 보이지 않게 한다.
- 광고와 topic, pagination, previous/next, copy button 등 interactive element 사이에 최소 `32–40px` 간격을 둔다.
- custom label이 필요하면 `Advertisements`를 사용한다. 추천, 관련 글처럼 오해할 표현을 쓰지 않는다.
- sidebar 기본 슬롯은 `300×250`이며 페이지당 하나부터 시작한다.
- 가로 슬롯은 viewport 기준으로 `<520px: 320×100`, `520–799px: 468×60`, `≥800px: 728×90`을 기본으로 한다.
- 실제 광고가 로드되기 전에 CSS로 width/height 또는 min-height를 예약해 layout shift를 막는다.
- 빈 광고 슬롯의 collapse는 below-the-fold에서만 허용하고 visible article을 밀지 않는지 확인한다.
- placeholder는 layout 검토용으로만 quiet surface를 사용할 수 있다. production 광고를 자체 card처럼 꾸미지 않는다.
- home 최대 1개, archive 최대 1개, article은 읽기 시간에 따라 0–2개를 기준으로 한다.
- notes, app detail, privacy/policy, 404에는 기본적으로 광고를 넣지 않는다.

현재 구현 기준:

- 수동 display ad를 기본으로 하며 Auto ads는 별도 layout 검증 전 활성화하지 않는다.
- 한국어 `/`와 `/articles`에서 필요한 경우에만 AdSense script를 `afterInteractive`로 로드한다.
- home은 latest article이 4개 이상일 때만 광고를 노출한다.
- home desktop은 topic rail 아래 `300×250`, mobile/tablet은 세 번째 latest article 뒤 responsive banner를 사용한다. 한 viewport에서 하나만 초기화한다.
- `/articles`는 desktop `xl` 이상에서 sidebar `300×250`, 그 미만에서는 세 번째 글 뒤 responsive banner 하나만 초기화한다.
- `pnpm dev`에서는 외부 AdSense script를 요청하지 않고 동일 크기의 placeholder를 표시한다.
- production static export에서만 실제 unit을 활성화하며 현재 viewport에 보이지 않는 unit은 광고 요청을 보내지 않는다.
- 공개 publisher/slot ID는 `src/features/adsense/adSenseConfig.ts`, 판매자 인증은 `public/ads.txt`를 단일 원천으로 사용한다.
- 지역별 개인정보 보호 규정과 consent/CMP는 실제 배포 전 운영 설정까지 함께 확인한다.

## 11. 이미지와 cover

- article `coverImage`는 선택 사항.
- 이미지가 없다고 빈 placeholder card를 만들지 않는다.
- topic cover는 typography, 번호, 간단한 code/diagram을 조합한다.
- grid motif는 cover마다 같은 밀도로 반복하지 않는다.
- article cover 비율은 `32:17`로 고정한다.
- 신규 cover 권장 크기는 `1600×850px` WebP다.
- 핵심 요소는 잘림과 반응형 축소를 고려해 가장자리에서 충분히 띄운다.
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
- 제목, 설명, 본문처럼 의미 있는 콘텐츠는 animation 전에도 항상 렌더링하고 보이게 한다.
- motion을 위해 client-side 데이터 요청이나 hydration 전용 콘텐츠를 추가하지 않는다.
- 미지원 브라우저는 정적인 기본 화면으로 자연스럽게 fallback해야 한다.

공통 token:

| Token                        | Value                            | 용도                 |
| ---------------------------- | -------------------------------- | -------------------- |
| `--motion-duration-fast`     | `140ms`                          | color, 빠른 feedback |
| `--motion-duration-base`     | `180ms`                          | 작은 transform       |
| `--motion-duration-emphasis` | `280ms`                          | page enter           |
| `--motion-ease-out`          | `cubic-bezier(0.22, 1, 0.36, 1)` | 강조 transition      |

### 12.2 Timing

| 종류            |  Duration | Easing                         |
| --------------- | --------: | ------------------------------ |
| hover color     | 120–160ms | ease-out                       |
| small transform | 160–200ms | ease-out                       |
| page exit       |     140ms | ease-in                        |
| page enter      |     280ms | cubic-bezier(0.22, 1, 0.36, 1) |
| shared cover    |     360ms | cubic-bezier(0.22, 1, 0.36, 1) |
| dialog enter    | 200–260ms | cubic-bezier(0.22, 1, 0.36, 1) |
| theme fallback  | 160–200ms | ease                           |
| theme wipe      |     360ms | cubic-bezier(0.22, 1, 0.36, 1) |

### 12.3 허용 예

- link underline 확장
- title color 변경
- arrow 2–4px 이동
- logo active cell 2–4px 이동
- reading progress
- theme transition

Article Reading Ruler:

- article detail에서만 기술 도면의 축척자를 닮은 Reading Ruler를 표시한다.
- 기존 header 하단의 가로 progress bar는 사용하지 않는다.
- `1360px` 이상에서는 viewport 오른쪽에 주요 H2를 세로 눈금으로 표시한다. 세로 축은 읽기
  진행률만큼 위에서 아래로 accent 색상이 채워진다. 현재 구간은 긴 accent 눈금, 지난 구간은
  중간 눈금, 남은 구간은 짧은 neutral 눈금으로 구분한다.
- desktop 눈금은 anchor link이며 keyboard focus와 `aria-current="location"`을 제공한다.
- `1360px` 미만에서는 기존 header control 영역에 세로 micro gauge와 `042% · 03/08` 형식의
  compact indicator를 둔다. `640px` 미만에서는 공간 확보를 위해 구간 수만 감춘다.
- compact indicator는 header 높이를 늘리거나 별도 subrow를 만들지 않는다. article이 아닌
  페이지의 header slot은 크기를 차지하지 않는다.
- 진행 fill은 `transform: scaleY()`만 사용해 layout shift를 만들지 않는다.
- 진행률, 현재 heading, TOC active 상태는 article 범위의 provider 한 곳에서 계산해 공유한다.
- scroll listener는 passive + `requestAnimationFrame`으로 제한하고 article 및 heading 위치는
  resize 때만 다시 측정한다. 별도 network 요청과 layout shift를 만들지 않는다.
- desktop ruler는 scroll 중 선명해지고 정지 후 낮은 대비로 돌아간다. hover와 keyboard
  focus에서는 다시 선명하게 표시한다. mobile indicator는 작은 글자의 가독성을 위해 동일한
  대비를 유지한다.
- reduced motion에서는 위치와 opacity animation을 제거하되 진행률과 active 정보는 유지한다.

Article list interaction:

- hover와 `focus-visible`에 같은 accent rail, title color, 최대 `2px` 이동을 사용한다.
- rail은 `scaleY`, title은 `translateX`를 사용해 layout shift를 만들지 않는다.

TOC와 code copy feedback:

- TOC active 상태는 rail의 opacity/scale과 text color로 표현한다. 항목 위치나 크기는 바꾸지 않는다.
- copy 결과는 icon과 label을 `Copy`, `Check`, `Retry` 상태로 바꾸고 짧은 opacity/scale feedback만 사용한다.
- 오류는 색상만으로 전달하지 않고 `Retry` label을 함께 표시한다.

Home scroll-driven detail:

- `Featured`, `Latest`, `Topics`의 장식 rail과 featured cover에만 제한적으로 사용한다.
- text 전체를 fade-in하지 않는다. cover도 기본 CSS에서는 완전히 보이며, 지원 브라우저에서만 view timeline을 적용한다.
- section마다 반복 reveal을 추가하지 않는다.

Page transition:

- Next.js App Router의 React View Transition을 progressive enhancement로 사용한다.
- `forward`, `back`, `swap` 탐색 의미를 link에 지정한다.
- forward/back은 최대 `12px` 수평 이동과 opacity, 같은 계층 이동은 opacity만 사용한다.
- Home featured cover와 해당 article detail cover는 같은 transition name으로 연결해 공간 관계를 설명한다.
- browser가 View Transition을 지원하지 않아도 일반 route navigation이 그대로 동작해야 한다.
- transition wrapper는 정적 HTML 콘텐츠를 숨기거나 hydration 뒤에 삽입하지 않는다.

Theme transition:

- 지원 브라우저에서는 View Transition API로 오른쪽에서 왼쪽으로 새 theme을 드러내는 **Blueprint Wipe**를 사용한다.
- wipe 경계는 viewport 안쪽의 `2px` accent rail이며 horizontal overflow 없이 reveal과 같은 `360ms` timing으로 이동한다.
- snapshot을 만들 때 기존 color transition을 잠시 제거해 중간색이 캡처되지 않게 한다.
- View Transition API 미지원 환경에서는 기존 `180ms` color transition을 사용한다.

### 12.4 Reduced motion

`prefers-reduced-motion: reduce`에서 animation과 smooth scroll을 사실상 제거한다. theme wipe와 page transition, scroll-driven detail은 실행하지 않는다. Reading Ruler는 위치·opacity animation 없이 진행률과 active 정보를 그대로 제공한다.

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
- topic index는 horizontal scroll, TOC는 접이식, 광고는 article flow로 각각 재배치한다.
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
- [ ] featured와 latest에 같은 article이 중복되지 않는가?
- [ ] article, note, topic count가 repository의 실제 데이터와 일치하는가?
- [ ] 번역 없는 locale에 가짜 article이나 존재하지 않는 detail link가 표시되지 않는가?
- [ ] desktop rail과 mobile flow에서 광고가 하나만 초기화되는가?

### 17.3 Article

- [ ] 실제 긴 MDX로 검증했는가?
- [ ] 본문 폭이 720–760px인가?
- [ ] H2/H3/code/table/image rhythm이 명확한가?
- [ ] metadata가 pill로 과장되지 않았는가?
- [ ] TOC가 보조 navigation처럼 보이는가?
- [ ] Reading Ruler와 TOC가 같은 active heading을 표시하고 keyboard로 이동 가능한가?
- [ ] sidebar가 topic 탐색, 광고, TOC 사이의 우선순위를 유지하는가?
- [ ] 광고와 navigation 사이에 충분한 간격이 있는가?
- [ ] mobile code/table scroll이 되는가?
- [ ] article archive의 페이지별 article 수, 현재 범위, 이전·다음 link가 실제 정적 route와 일치하는가?

### 17.4 App detail과 policy

- [ ] 기존 URL이 유지되는가?
- [ ] policy 언어 navigation이 명확한가?
- [ ] 법적 내용을 장식이 방해하지 않는가?
- [ ] `/apps/`가 목록 없이 home으로 이동하는가?
- [ ] primary navigation에 Apps 항목이 없는가?
- [ ] app 상세가 핵심 기능과 법적 문서로 바로 이어지는가?

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

1. topic별 cover system
2. search interaction
3. 전체 페이지 responsive visual QA
4. `theme-color` 동기화 검토
5. article comments 서비스 연결
6. 지역별 consent/CMP 운영 설정 최종 확인

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
  ├─ src/features/article/...
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
