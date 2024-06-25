---
title: CSS 투명도(Opacity)
description: CSS에서 opacity 속성은 요소의 투명도를 설정하는 데 사용됩니다. 이 글에서는 opacity 속성에 대해 설명합니다.
date: 2024-02-11 06:10:04 +0900
last_modified_at: 2024-02-11 06:10:04 +0900
categories: [ WEB, CSS ]
tags: [ css, web, 투명도, opacity ]
pin: false
math: false
mermaid: false
image:
  path: /assets/img/posts/web/css/2024-02-11-css-opacity/thumbnail.webp
  alt: CSS 투명도(Opacity)
---

## 1. opacity란?

`opacity` 속성은 요소의 투명도를 지정합니다. 값은 0에서 1 사이의 숫자로 표현되며, 0은 완전히 투명함을, 1은 완전히 불투명함을 의미합니다. 중간 값은 반투명한 상태를 나타냅니다.

- `opacity: 0;`: 완전히 투명
- `opacity: 0.5;`: 반투명
- `opacity: 1;`: 완전히 불투명

## 2. 기본 사용법

`opacity` 속성을 사용하여 요소의 투명도를 조절하는 방법을 코드로 예시를 들어보겠습니다.

```css
/* 투명도 0 (완전히 투명) */
.transparent-box {
  background-color: green;
  opacity: 0;
}

/* 투명도 0.5 (반투명) */
.semi-transparent-box {
  background-color: green;
  opacity: 0.5;
}

/* 투명도 1 (완전히 불투명) */
.opaque-box {
  background-color: green;
  opacity: 1;
}
```

<p class="codepen" data-height="300" data-default-tab="css,result" data-slug-hash="rNgKJgy" data-pen-title="Untitled" data-user="taehongdev" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/taehongdev/pen/rNgKJgy">
  Untitled</a> by taehong.kim (<a href="https://codepen.io/taehongdev">@taehongdev</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

위의 예시에서 `.transparent-box`는 완전히 투명하게 설정되며, `.semi-transparent-box`는 반투명, `.opaque-box`는 완전히 불투명하게 설정됩니다.

## 3. child element에 미치는 영향

`opacity` 속성은 부모 요소뿐만 아니라 자식 요소에도 영향을 미칩니다. 부모 요소에 설정된 투명도는 모든 자식 요소에도 동일하게 적용됩니다.

```html
<div class="parent-box">
  Parent Box
  <div class="child-box">
    Child Box
  </div>
</div>
```

```css
.parent-box {
  background-color: blue;
  opacity: 0.5;
  padding: 20px;
}

.child-box {
  background-color: red;
  padding: 10px;
}
```

<p class="codepen" data-height="300" data-default-tab="css,result" data-slug-hash="pomKLzy" data-pen-title="Untitled" data-user="taehongdev" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/taehongdev/pen/pomKLzy">
  Untitled</a> by taehong.kim (<a href="https://codepen.io/taehongdev">@taehongdev</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

위의 예시에서 `.parent-box`에 설정된 `opacity: 0.5;`는 `.child-box`에도 동일하게 적용되어 자식 요소 역시 반투명하게 보입니다.

## 4. 응용. 애니메이션과 결합

`opacity` 속성은 CSS 애니메이션과 함께 사용하면 `fade-in`, `fade-out` 효과를 만들 수 있습니다.

```css
@keyframes fade-out {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.fade-out-box {
  background-color: purple;
  animation: fade-out 2s forwards;
}
```

<p class="codepen" data-height="300" data-default-tab="css,result" data-slug-hash="PovaRov" data-pen-title="Untitled" data-user="taehongdev" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/taehongdev/pen/PovaRov">
  Untitled</a> by taehong.kim (<a href="https://codepen.io/taehongdev">@taehongdev</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

위의 예시에서 `.fade-out-box`는 2초 동안 점점 투명해지는 애니메이션이 적용됩니다.

<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
