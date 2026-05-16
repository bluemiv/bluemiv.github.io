# Bluemiv Tech Blog UI/UX Redesign Guide

## 1. Design Direction

Bluemiv Tech Blog는 개인 기술 블로그이면서 개발 지식 아카이브입니다. 새 UI는 과한 랜딩 페이지나 포트폴리오식 장식을 피하고, 글을 빠르게 찾고 오래 읽기 좋은 전문적인 기술 매거진으로 설계합니다.

핵심 컨셉은 **Editorial Dev Journal + Command Center Blog**입니다.

- Editorial Dev Journal: 좋은 타이포그래피, 넓은 여백, 명확한 글 계층, 읽기 좋은 본문
- Command Center Blog: 빠른 검색, 태그/카테고리 탐색, 키보드 친화적 인터랙션, 정보 밀도
- Soft Expressive Detail: 버튼, 토글, active state, hover state에만 절제된 색과 모션 적용

디자인 목표:

- 기술 글의 신뢰감과 집중도를 높인다.
- 라이트/다크 테마 모두 같은 브랜드 인상을 유지한다.
- 홈, 카테고리, 태그, 포스트 상세, 짧은 글의 탐색 흐름을 단순화한다.
- 긴 코드 블록과 긴 한글/영문 제목이 깨지지 않게 한다.
- 모바일에서 sidebar 없는 구조도 자연스럽게 작동한다.

디자인 금지:

- 의미 없는 그라디언트 배경, 장식용 blob, 과한 glassmorphism
- 카드 안의 카드 구조
- 글 본문과 TOC를 습관적으로 카드/박스로 감싸는 구조
- 날짜, 작성자, 수정일 같은 metadata를 의미 없이 pill badge로 만드는 패턴
- 마케팅 사이트처럼 큰 hero만 강조하는 첫 화면
- 블로그 본문보다 썸네일이 더 강한 레이아웃
- 낮은 contrast의 회색 텍스트
- hover에 의존하는 핵심 기능

## 2. Brand Personality

브랜드 인상:

- 명료함: 복잡한 기술 개념을 정리하는 블로그
- 차분함: 오래 읽어도 피곤하지 않은 화면
- 정밀함: spacing, line-height, code style이 안정적인 개발자 도구 느낌
- 약간의 생동감: active state, motion, accent color에서만 트렌디함

톤:

- UI 문구는 짧고 직접적으로 작성한다.
- 한글 중심 UI에서는 영어 대문자 메뉴를 줄이고 자연스러운 한글을 우선한다.
- 날짜, 태그, 카테고리 같은 metadata는 작고 안정적으로 배치한다.

## 3. Color System

색상은 neutral foundation 위에 blue/cyan accent를 얹습니다. 기술 블로그의 신뢰감은 유지하되, 현재보다 더 현대적인 깊이와 계층을 만듭니다.

### 3.1 Color Principles

- 배경은 완전한 순백/순흑 대신 눈이 편한 off-white와 deep navy black을 사용한다.
- 본문 텍스트 contrast는 WCAG AA 이상을 목표로 한다.
- primary color는 링크, active, selected, key action에만 사용한다.
- success/warning/danger는 본문 callout과 상태 표시에서만 사용한다.
- 다크 모드는 단순 invert가 아니라 색온도와 contrast를 별도 조정한다.

### 3.2 Light Theme Tokens

| Token | Value | Usage |
| --- | --- | --- |
| `--color-bg` | `#F8FAFC` | 전체 페이지 배경 |
| `--color-surface` | `#FFFFFF` | 카드, header, sidebar |
| `--color-surface-muted` | `#F1F5F9` | code inline, subtle section |
| `--color-surface-raised` | `#FFFFFF` | sticky header, popover |
| `--color-border` | `#E2E8F0` | 기본 border |
| `--color-border-strong` | `#CBD5E1` | 입력, active outline |
| `--color-text` | `#0F172A` | 본문, 제목 |
| `--color-text-muted` | `#475569` | description, metadata |
| `--color-text-subtle` | `#64748B` | 날짜, count, helper text |
| `--color-primary` | `#2563EB` | link, selected, primary action |
| `--color-primary-hover` | `#1D4ED8` | primary hover |
| `--color-primary-soft` | `#DBEAFE` | active bg, tag bg |
| `--color-accent` | `#0891B2` | secondary accent, focus detail |
| `--color-accent-soft` | `#CFFAFE` | secondary selected bg |
| `--color-code-bg` | `#111827` | block code background |
| `--color-code-inline-bg` | `#EEF2FF` | inline code bg |
| `--color-warning` | `#D97706` | warning callout |
| `--color-danger` | `#DC2626` | destructive, error |
| `--color-success` | `#059669` | success |

### 3.3 Dark Theme Tokens

| Token | Value | Usage |
| --- | --- | --- |
| `--color-bg` | `#0B1120` | 전체 페이지 배경 |
| `--color-surface` | `#111827` | 카드, header, sidebar |
| `--color-surface-muted` | `#1E293B` | code inline, subtle section |
| `--color-surface-raised` | `#162033` | sticky header, popover |
| `--color-border` | `#253044` | 기본 border |
| `--color-border-strong` | `#334155` | 입력, active outline |
| `--color-text` | `#E5E7EB` | 본문, 제목 |
| `--color-text-muted` | `#CBD5E1` | description, metadata |
| `--color-text-subtle` | `#94A3B8` | 날짜, count, helper text |
| `--color-primary` | `#60A5FA` | link, selected, primary action |
| `--color-primary-hover` | `#93C5FD` | primary hover |
| `--color-primary-soft` | `#172554` | active bg, tag bg |
| `--color-accent` | `#22D3EE` | secondary accent, focus detail |
| `--color-accent-soft` | `#164E63` | secondary selected bg |
| `--color-code-bg` | `#0F172A` | block code background |
| `--color-code-inline-bg` | `#1E293B` | inline code bg |
| `--color-warning` | `#FBBF24` | warning callout |
| `--color-danger` | `#F87171` | destructive, error |
| `--color-success` | `#34D399` | success |

### 3.4 Semantic Mapping

| Semantic | Light | Dark |
| --- | --- | --- |
| Page background | `bg` | `bg` |
| Header background | `surface-raised / 88% opacity + blur` | `surface-raised / 84% opacity + blur` |
| Sidebar background | `bg` | `bg` |
| Card background | `surface` | `surface` |
| Card hover | `surface-raised + border-strong` | `surface-raised + border-strong` |
| Primary link | `primary` | `primary` |
| Link hover | `primary-hover` | `primary-hover` |
| Selection | `primary` bg + white text | `primary` bg + `#020617` text |
| Focus ring | `primary / 32%` | `primary / 42%` |

## 4. Typography

현재 Pretendard Variable은 유지합니다. 기술 블로그에서 한글, 영문, 숫자, 코드가 모두 안정적으로 보여야 하므로 본문에는 Pretendard를, 코드에는 system monospace stack을 사용합니다.

### 4.1 Font Families

```css
--font-sans: Pretendard Variable, Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
--font-mono: "SFMono-Regular", "Cascadia Code", "JetBrains Mono", Consolas, monospace;
```

### 4.2 Type Scale

| Token | Size | Line height | Weight | Usage |
| --- | ---: | ---: | ---: | --- |
| `text-xs` | 12px | 18px | 400/500 | metadata, count, helper |
| `text-sm` | 14px | 22px | 400/500 | nav, tag, compact UI |
| `text-base` | 16px | 28px | 400 | default body |
| `text-lg` | 18px | 30px | 400/500 | lead paragraph |
| `text-xl` | 20px | 32px | 600 | card title |
| `text-2xl` | 24px | 34px | 650 | section title |
| `text-3xl` | 30px | 40px | 700 | article h2 |
| `text-4xl` | 36px | 46px | 750 | article title desktop |
| `text-5xl` | 48px | 56px | 760 | home feature title only |

Rules:

- Letter spacing은 기본 `0`으로 둔다.
- 긴 한글 제목은 `line-clamp`보다 자연 줄바꿈을 우선한다.
- 본문 한 줄 길이는 desktop 기준 68-78자 범위를 목표로 한다.
- 모바일 본문은 16px 이하로 낮추지 않는다.
- 본문 line-height는 1.75 전후를 유지한다.

### 4.3 Article Typography

| Element | Desktop | Mobile | Spacing |
| --- | --- | --- | --- |
| Article title | 36px / 46px / 750 | 30px / 40px / 750 | bottom 16-24 |
| Description | 17px / 30px / 400 | 16px / 28px / 400 | bottom 24 |
| Metadata | 13px / 20px / 500 | 12px / 18px / 500 | grouped |
| H2 | 30px / 40px / 720 | 24px / 34px / 720 | top 56, bottom 18 |
| H3 | 24px / 34px / 680 | 20px / 30px / 680 | top 40, bottom 14 |
| H4 | 20px / 30px / 650 | 18px / 28px / 650 | top 32, bottom 12 |
| Paragraph | 16px / 30px / 400 | 16px / 29px / 400 | bottom 20 |
| List item | 16px / 30px / 400 | 16px / 29px / 400 | item gap 8 |
| Blockquote | 16px / 30px / 450 | 16px / 29px / 450 | vertical 24 |
| Code block | 14px / 24px / 400 | 13px / 22px / 400 | vertical 24 |

## 5. Spacing System

4px 기반 scale을 사용합니다. 이름은 기존 Tailwind token과 호환되게 유지하되, 실제 적용 규칙을 더 촘촘히 정의합니다.

| Token | Value | Usage |
| --- | ---: | --- |
| `space-1` | 4px | icon gap, micro |
| `space-2` | 8px | tag gap, compact list |
| `space-3` | 12px | button inner gap |
| `space-4` | 16px | default padding |
| `space-5` | 20px | paragraph block |
| `space-6` | 24px | card padding, section gap |
| `space-8` | 32px | page block gap |
| `space-10` | 40px | article section gap |
| `space-12` | 48px | major section |
| `space-14` | 56px | h2 top spacing |
| `space-16` | 64px | page top/bottom |

Layout padding:

- Mobile page padding: 16px
- Tablet page padding: 24px
- Desktop page padding: 32px
- Wide desktop content max width: 1280px
- Article content max width: 760px
- Article + TOC wrapper max width: 1040px
- Sidebar width: 260-280px
- TOC width: 220-240px

## 6. Radius, Border, Shadow, Depth

기술 블로그는 깊이감을 낮게 유지합니다. Shadow보다 border와 surface contrast로 계층을 만듭니다.

| Token | Value | Usage |
| --- | ---: | --- |
| `radius-sm` | 6px | tag, inline code |
| `radius-md` | 8px | card, button, input |
| `radius-lg` | 12px | feature card, thumbnail |
| `radius-xl` | 16px | command palette, modal |
| `radius-full` | 999px | pill tag, avatar |

Rules:

- 일반 카드 radius는 8px을 기본으로 한다.
- 썸네일과 modal만 12-16px 사용 가능하다.
- 카드 중첩 시 내부 카드는 border 없이 section으로 처리한다.
- Shadow는 sticky header, command palette, popover에만 사용한다.

Shadow tokens:

```css
--shadow-sm: 0 1px 2px rgba(15, 23, 42, 0.06);
--shadow-md: 0 8px 24px rgba(15, 23, 42, 0.10);
--shadow-lg: 0 24px 64px rgba(15, 23, 42, 0.18);
```

Dark shadow:

```css
--shadow-md-dark: 0 8px 28px rgba(0, 0, 0, 0.36);
--shadow-lg-dark: 0 24px 72px rgba(0, 0, 0, 0.48);
```

## 7. Layout System

### 7.1 Global Shell

Desktop:

- Header: sticky top, 56px height
- Left sidebar: 264px, sticky below header
- Main content: fluid
- Article detail: centered article + right TOC

Tablet:

- Header: sticky
- Sidebar: hidden or collapsible
- Main content: full width with 24px padding
- TOC: hidden or horizontal article nav

Mobile:

- Header: 52px height
- Sidebar removed
- Search button, theme button, menu button in header
- Category/tag filters appear as horizontal chips
- Article TOC becomes collapsible panel below metadata

### 7.2 Home Layout

Goal: 방문자가 최신 글, 관심 카테고리, 태그를 빠르게 파악하게 한다.

Desktop structure:

1. Compact intro band
   - Blog name
   - One-line description
   - Search/command button
   - RSS shortcut
2. Featured latest post
   - Latest post 하나를 더 크게 노출
   - thumbnail이 있으면 우측/상단, 없으면 text-first
3. Recent posts grid
   - 3 columns desktop, 2 tablet, 1 mobile
4. Category strip
   - 카테고리별 count
5. Short posts module
   - 짧은 글 3-5개 preview

Card hierarchy:

- Featured card: title 24-30px, summary 16px, metadata 13px
- Default card: title 18-20px, summary 14-15px, metadata 12-13px
- Thumbnail height: 160-200px fixed range

### 7.3 Article Layout

Goal: 긴 글을 읽는 동안 길 잃지 않게 한다.

Article detail:

- Top metadata block
  - category chip
  - title
  - description
  - author/date/updatedAt
  - tags
- Metadata presentation
  - 날짜, 작성자, 수정일은 액션 요소가 아니므로 pill/card로 감싸지 않는다.
  - category/tag처럼 클릭 가능한 분류만 chip 형태를 쓴다.
  - 메타 정보는 작은 아이콘 + muted text + 자연스러운 inline layout을 기본으로 한다.
- Optional thumbnail
  - title 아래보다는 metadata 위/아래 중 한 위치로 통일
  - 16:9 또는 2.4:1 비율
- Body
  - max width 760px
  - paragraph rhythm 일정
  - 본문은 카드로 감싸지 않는다. article surface는 페이지 배경 위에 열려 있어야 한다.
  - 구분이 필요하면 큰 박스보다 h2/h3, spacing, divider, code block, blockquote로 해결한다.
- Right TOC
  - active heading 표시
  - max height with scroll
  - “맨 위로” action
  - TOC는 보조 UI이므로 카드처럼 무겁게 감싸지 않는다.
  - 얇은 vertical rail, active dot/text, subtle divider 중심으로 표현한다.
- Bottom
  - related posts
  - prev/next
  - comments

### 7.4 Category/Tag Pages

Goal: 필터링된 글 목록을 빠르게 스캔한다.

- Page title: `#react 글 12개`
- Supporting text: 필요 시 1줄 이하
- Sort/filter row: 최신순 기본
- Post list는 grid보다 list/card hybrid 추천
  - 제목, 설명, 태그, 날짜가 썸네일보다 우선
  - 썸네일은 optional preview

### 7.5 Short Posts

Goal: 짧은 글을 feed처럼 빠르게 소비한다.

- Desktop: main feed + side timeline
- Mobile: single column feed
- Card height는 내용 기반
- 제목보다 작성일/태그/본문 preview 비중을 높인다.

## 8. Component Guidelines

### 8.1 Header

Height:

- Desktop: 56px
- Mobile: 52px

Style:

- Background: surface-raised with opacity and backdrop blur
- Border bottom: 1px solid border
- Logo left, nav/search/actions right
- Header text size: 14px, weight 600

Actions:

- Search: icon button + `검색` label on desktop
- Theme toggle: icon only, tooltip
- RSS: icon only or hidden under menu

### 8.2 Sidebar

Sidebar는 navigation aid이지 주인공이 아닙니다.

- Width: 264px
- Padding: 20px 16px
- Section gap: 28px
- Section title: 12px uppercase or Korean small label, text-subtle
- Category item height: 32-36px
- Active item: primary-soft bg, primary text, left indicator 2px
- Tag cloud는 너무 많은 태그를 한 번에 보여주지 않는다. 상위 20개 + 더보기.

### 8.3 Buttons

Sizes:

| Size | Height | Padding | Text |
| --- | ---: | --- | --- |
| sm | 32px | 10px | 13px |
| md | 40px | 14px | 14px |
| lg | 48px | 18px | 15px |
| icon-sm | 32px | square | icon 16px |
| icon-md | 40px | square | icon 18px |

Variants:

- Primary: primary bg, white text
- Secondary: surface-muted bg, text
- Ghost: transparent, hover surface-muted
- Outline: border, hover surface-muted

State:

- Hover: color shift within 120-160ms
- Active: scale 0.98 only on button-like controls
- Focus visible: 2px ring + 2px offset
- Disabled: opacity 0.45, no pointer

### 8.4 Tags and Category Chips

Tag:

- Height: 28-32px
- Radius: full or 8px
- Padding: 8-10px horizontal
- Font: 13px, weight 600
- Default: surface-muted bg, text-muted
- Hover: primary-soft bg, primary text

Category:

- Slightly stronger than tag
- Include count when used in sidebar/list
- Avoid random category colors unless palette is strictly defined

### 8.5 Post Cards

Default post card:

- Radius: 8px
- Border: 1px solid border
- Padding: 16px or thumbnail + 16px content
- Hover: border-strong, title primary, subtle translateY(-2px)
- Transition: 160ms ease-out

Content order:

1. Category/date metadata
2. Title
3. Description
4. Tags

Thumbnail rules:

- Use real post thumbnail if meaningful.
- If no thumbnail, use text-only card. Do not create decorative placeholder clutter.
- Thumbnail object-fit cover, fixed aspect ratio.

### 8.6 Pagination

- Desktop: page numbers + previous/next
- Mobile: previous/next primary, numbers hidden or compact
- Current page: primary bg
- Hit target: minimum 36x36px

### 8.7 Command Palette / Search

Search should become primary navigation.

Trigger:

- Header search button
- Keyboard shortcut `/` or `Cmd+K`

Palette:

- Width: 640px desktop
- Mobile: full-screen sheet
- Background: surface-raised
- Radius: 16px desktop, 0-16px mobile sheet
- Search input height: 52px
- Result item height: 56-72px

Result content:

- Title
- Category/tag
- Date
- Matching excerpt if possible

Keyboard:

- Arrow up/down
- Enter open
- Esc close

### 8.8 Table of Contents

- Right side desktop only
- Active item uses primary text and left indicator
- Items max 2 lines
- H3+ indented by 12px steps
- Use textContent instead of innerHTML for labels when possible
- Include reading progress bar at article top or header bottom
- Avoid card container by default. TOC should feel like a reading guide, not a separate widget.
- Use a thin rail/progress line and subtle section dividers before using borders or surface boxes.

### 8.9 Code Blocks

기술 블로그의 핵심 컴포넌트입니다.

Block:

- Background: code-bg
- Radius: 10-12px
- Padding: 16px vertical
- Horizontal scroll allowed
- Font: 13-14px
- Line-height: 22-24px

Features:

- Language label
- Optional file title
- Copy button
- Highlighted line support
- Long line wrapping은 기본 off, horizontal scroll 사용

Inline code:

- Font: 0.875em
- Radius: 6px
- Padding: 2px 5px
- Light bg: code-inline-bg
- Dark bg: surface-muted

### 8.10 Callouts

MDX에서 자주 쓸 수 있는 callout을 정의합니다.

Types:

- Note: primary
- Tip: success
- Warning: warning
- Danger: danger

Style:

- Left border 3px
- Background soft color
- Padding 16px
- Radius 8px
- Title 14px / 700
- Body 15-16px / 28px

## 9. Motion and Interaction

Motion은 정보 이해를 돕는 범위에서만 사용합니다.

Durations:

| Use | Duration | Easing |
| --- | ---: | --- |
| Hover color | 120ms | ease-out |
| Button press | 80ms | ease-out |
| Card hover | 160ms | ease-out |
| Theme icon | 160ms | ease-in-out |
| Palette open | 180ms | ease-out |
| Page enter | 200ms | ease-out |

Rules:

- Layout shift를 만드는 motion 금지
- 본문 영역에 반복 animation 금지
- `prefers-reduced-motion`이면 transform/scroll animation 제거
- Theme toggle은 icon fade/rotate 정도만 허용
- Card hover는 translateY(-2px) 이하

## 10. Accessibility

Minimum:

- Text contrast WCAG AA 이상
- 모든 interactive element keyboard focus 가능
- Focus visible 제거 금지
- Icon-only button은 `aria-label` 필수
- Heading hierarchy 유지
- Link text는 목적이 드러나야 한다
- Motion reduced mode 지원
- Touch target 최소 44x44px 권장, compact UI도 36x36px 이하 금지

Article:

- 본문 h1은 page title 한 번만 사용
- MDX 본문은 h2부터 시작 권장
- Code block copy button은 keyboard 접근 가능
- Table은 mobile horizontal scroll container 제공
- 이미지 alt 필수. 장식 이미지는 빈 alt.

Dark mode:

- 다크 모드에서 blue text가 너무 밝아 번지지 않게 한다.
- Border는 충분히 보여야 하지만 밝게 튀지 않아야 한다.
- Code block과 page background가 뭉치지 않게 surface 차이를 둔다.

## 11. Responsive Breakpoints

| Name | Width | Behavior |
| --- | ---: | --- |
| `sm` | 640px | mobile large |
| `md` | 768px | tablet, sidebar still hidden |
| `lg` | 1024px | sidebar/TOC available |
| `xl` | 1280px | full desktop grid |
| `2xl` | 1536px | max content centered |

Rules:

- Mobile first.
- Sidebar appears at `lg` or wider only if content remains readable.
- TOC appears at `lg` or wider, hidden if article width would drop below 680px.
- Home grid: 1 column mobile, 2 tablet, 3 desktop, 4 only for compact cards.
- Article content must stay readable before showing extra columns.

## 12. Implementation Tokens Draft

Tailwind v4 `@theme` 기준 초안입니다.

```css
@theme {
  --spacing-1: 0.25rem;
  --spacing-2: 0.5rem;
  --spacing-3: 0.75rem;
  --spacing-4: 1rem;
  --spacing-5: 1.25rem;
  --spacing-6: 1.5rem;
  --spacing-8: 2rem;
  --spacing-10: 2.5rem;
  --spacing-12: 3rem;
  --spacing-14: 3.5rem;
  --spacing-16: 4rem;

  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;

  --color-app-bg: #F8FAFC;
  --color-app-surface: #FFFFFF;
  --color-app-surface-muted: #F1F5F9;
  --color-app-surface-raised: #FFFFFF;
  --color-app-border: #E2E8F0;
  --color-app-border-strong: #CBD5E1;
  --color-app-text: #0F172A;
  --color-app-text-muted: #475569;
  --color-app-text-subtle: #64748B;
  --color-app-primary: #2563EB;
  --color-app-primary-hover: #1D4ED8;
  --color-app-primary-soft: #DBEAFE;
  --color-app-accent: #0891B2;
  --color-app-accent-soft: #CFFAFE;

  --color-app-dark-bg: #0B1120;
  --color-app-dark-surface: #111827;
  --color-app-dark-surface-muted: #1E293B;
  --color-app-dark-surface-raised: #162033;
  --color-app-dark-border: #253044;
  --color-app-dark-border-strong: #334155;
  --color-app-dark-text: #E5E7EB;
  --color-app-dark-text-muted: #CBD5E1;
  --color-app-dark-text-subtle: #94A3B8;
  --color-app-dark-primary: #60A5FA;
  --color-app-dark-primary-hover: #93C5FD;
  --color-app-dark-primary-soft: #172554;
  --color-app-dark-accent: #22D3EE;
  --color-app-dark-accent-soft: #164E63;
}
```

## 13. Page-Level Redesign Checklist

### Home

- Add compact intro/search band.
- Replace uniform grid with featured latest + recent grid.
- Add category strip with counts.
- Show short posts module.
- Keep first viewport content-focused, not decorative.

### Article

- Refine metadata hierarchy.
- Standardize thumbnail ratio.
- Add reading progress.
- Improve TOC active state.
- Add copy button to code blocks.
- Add callout MDX components.
- Improve related posts density.

### Sidebar

- Reduce visual weight.
- Show categories before tags.
- Limit tags with “more”.
- Add active route state.

### Header

- Increase height to 56px desktop.
- Add search command.
- Use icon buttons with labels/tooltips.
- Keep blur subtle.

### Mobile

- Remove sidebar dependency.
- Add horizontal category chips.
- Add collapsible article TOC.
- Keep tap targets large.
- Test long Korean/English titles.

## 14. Quality Bar

Before shipping redesign:

- `pnpm lint` pass
- `pnpm build` pass
- Desktop screenshot: home, article, category, short post
- Mobile screenshot: home, article, search
- Light/dark comparison for all pages
- Keyboard navigation check
- Contrast spot-check for text, links, tags, code
- Long title and long code block test
- Reduced motion check
