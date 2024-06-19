---
title: CSS 크기 단위 (rem, em, px, vw, vh, %)
description: CSS에서 크기 값을 정의하는 다양한 단위들은 웹 디자인과 개발에서 중요한 역할을 합니다. 이 글에서는 rem, em, px, vw, vh, % 등 모든 단위에 대해 설명합니다.
date: 2024-01-23 11:54:01 +0900
last_modified_at: 2024-01-23 11:54:01 +0900
categories: [ WEB, CSS ]
tags: [ css, web, 크기, size, rem, em, px, vw, vh, 퍼센트, 뷰포트, 반응형 ]
pin: false
math: false
mermaid: false
image:
  path: /assets/img/posts/web/css/2024-01-23-css-size-units/thumbnail.webp
  alt: CSS 크기 단위 (rem, em, px, vw, vh, %)
---

## 1. px (픽셀)

`px`는 픽셀을 의미하며, 고정된 단위로서 화면의 실제 픽셀 수를 기준으로 합니다. 예를 들어, `20px`은 항상 20픽셀이고 항상 고정된 값입니다.

```css
.element {
    width: 100px;
    height: 50px;
}
```

**장점**
- 고정된 크기를 제공하므로, 정밀한 제어가 가능합니다.

**단점**
- 반응형 디자인에서 유연성이 떨어질 수 있습니다.
- 다양한 해상도에서 일관성이 유지되지 않을 수 있습니다.

## 2. em

`em`은 부모 요소의 `font-size`를 기준으로 한 상대적인 단위입니다. 예를 들어, 요소의 `font-size`가 `16px`일 때, `2em`은 `32px`입니다.

```html
<div class="parent">
  부모 요소
  <div class="child">
    자식 요소
  </div>
</div>
```

```css
.parent {
    font-size: 16px;
}

.child {
    width: 2em; /* 32px */
    height: 1.5em; /* 24px */
}
```

**장점**
- 부모 요소의 `font-size`에 상대적인 크기를 지정할 수 있어 유연한 레이아웃이 가능합니다.

**단점**
- 중첩된 요소들에서 크기 계산이 복잡해질 수 있습니다.

## 3. rem

`rem`은 루트 요소(`html` 태그)의 `font-size`를 기준으로 한 상대적인 단위입니다. 보통 `html`의 기본 폰트 크기는 브라우저 설정에 따라 `16px`입니다.

```css
html {
    font-size: 16px;
}

.element {
    width: 2rem; /* 32px */
    height: 1.5rem; /* 24px */
}
```

**장점**
- `rem`은 전역 크기를 기준으로 크기가 정해지고, 전체 레이아웃의 일관성을 유지하기 좋습니다.

**단점**
- 모든 크기가 루트 요소의 `font-size`에 의존하기 때문에 루트 크기 변경 시 모든 요소의 크기가 변경됩니다.

## 4. vw (뷰포트 너비)

`vw`는 뷰포트 너비의 백분율을 의미합니다. 예를 들어, `1vw`는 뷰포트 너비의 1%입니다. `100vw`는 뷰포트의 너비의 100%입니다.

```css
.element {
    width: 50vw; /* 뷰포트 너비의 50% */
    height: 25vw; /* 뷰포트 너비의 25% */
}
```

**장점**
- 반응형 디자인에서 유용하며, 뷰포트 크기에 따라 동적으로 크기가 조절됩니다.

**단점**
- 높이를 설정할 때는 유용하지 않을 수 있습니다.

## 5. vh (뷰포트 높이)

`vh`는 뷰포트 높이의 백분율을 의미합니다. 예를 들어, `1vh`는 뷰포트 높이의 1%입니다. `100vh`는 뷰포트의 높이의 100%입니다.

```css
.element {
    width: 50vh; /* 뷰포트 높이의 50% */
    height: 25vh; /* 뷰포트 높이의 25% */
}
```

**장점**
- 반응형 디자인에서 유용하며, 뷰포트 크기에 따라 동적으로 크기가 조절됩니다.

**단점**
- 너비를 설정할 때는 유용하지 않을 수 있습니다.

## 6. % (퍼센트)

`%`는 부모 요소의 크기에 상대적인 단위입니다. 예를 들어, 부모 요소의 너비가 `200px`일 때, 자식 요소의 너비를 `50%`로 설정하면 `100px`이 됩니다.

```css
.parent {
    width: 200px;
}

.child {
    width: 50%; /* 부모 요소 너비의 50% */
    height: 50%; /* 부모 요소 높이의 50% */
}
```

**장점**
- 부모 요소에 상대적인 크기를 제공하여 유연한 레이아웃이 가능합니다.

**단점**
- 부모 요소의 크기 변경에 따라 자식 요소의 크기도 변경됩니다.

## 7. 단위 크기 사용 예시

### 7.1. 고정 크기와 반응형 디자인

고정 크기(`px`)는 간단한 레이아웃에 적합하지만, 반응형 디자인에는 유연한 단위(`%`, `vw`, `vh`, `em`, `rem`)를 사용하는 것이 좋습니다.

```css
/* 고정 크기 예시 */
.fixed {
    width: 300px;
    height: 150px;
}

/* 반응형 디자인 예시 */
.responsive {
    width: 50%;
    height: 50vh;
}
```

### 7.2. 폰트 크기 설정

폰트 크기를 설정할 때는 `rem`과 `em`을 주로 사용합니다. `rem`은 전체 사이트의 일관성을 유지하는 데 유리하며, `em`은 특정 요소나 컴포넌트 내에서 상대적인 크기를 설정하는 데 유리합니다.

```html
<html lang="ko">
...
<body>
    root 폰트 크기: 16px
    <div class="container">
      container 폰트 크기: 24px
      <div class="title">title 폰트 크기: 32px</div>
      <div class="subtitle">subtitle 폰트 크기: 12px</div>
    </div>
</body>
</html>
```

```css
/* 기본 폰트 크기 설정 */
html {
    font-size: 16px;
}

/* rem을 사용한 폰트 크기 */
.title {
    font-size: 2rem; /* 32px */
}

/* em을 사용한 폰트 크기 */
.container {
    font-size: 1.5em; /* 24px */
}

.container .subtitle {
    font-size: 0.5em; /* 12px */
}
```

![폰트 크기 설정](/assets/img/posts/web/css/2024-01-23-css-size-units/ex1.webp)
_폰트 크기 설정_

### 7.3. 반응형 이미지 크기

이미지의 크기를 반응형으로 설정하려면 `%`나 `vw`, `vh`를 사용할 수 있습니다.

```css
/* 부모 요소에 상대적인 이미지 크기 */
.image {
    width: 100%;
    height: auto;
}

/* 뷰포트에 상대적인 이미지 크기 */
.viewport-image {
    width: 50vw;
    height: auto;
}
```

## 결론

고정된 크기를 원할 때는 `px`을, 반응형 디자인을 원할 때는 `em`, `rem`, `vw`, `vh`, `%` 등의 유연한 단위를 사용하는 것이 좋습니다.
