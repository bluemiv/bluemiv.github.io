---
title: CSS 색상(Colors) 표현 RGB, HEX, HSL
description: CSS에서 색상을 표현하는 방법에는 RGB, HEX, HSL이 있습니다. 이번 글에서는 이 세 가지에 대해 설명합니다.
date: 2024-02-10 17:57:13 +0900
last_modified_at: 2024-02-10 17:57:13 +0900
categories: [ WEB, CSS ]
tags: [ css, web, colos, rgb, hsl, hex, 색상, Hue, 채도, saturation, 명도, lightness ]
pin: false
math: false
mermaid: false
image:
  path: /assets/img/posts/web/css/2024-02-10-css-rgb-hex-hsl/thumbnail.webp
  alt: CSS 색상(Colors) 표현 RGB, HEX, HSL
---

## 1. RGB (Red, Green, Blue)

### 1.1. RGB란?

RGB는 색상을 `빨강(Red)`, `초록(Green)`, `파랑(Blue)`의 세 가지 기본 색상의 조합으로 표현합니다. 각 색상 값은 0에서 255 사이의 숫자로 나타내며, 세 가지 색상 값을 결합해 다양한
색상을 만들 수 있습니다.

### 1.2. 사용법

RGB 색상은 `rgb()` 함수를 사용하여 표현합니다. 예를 들어, 빨강색은 `rgb(255, 0, 0)`으로 나타낼 수 있습니다.

```css
.red-box {
  background-color: rgb(255, 0, 0); /* 빨강색 */
}

.green-box {
  background-color: rgb(0, 255, 0); /* 초록색 */
}

.blue-box {
  background-color: rgb(0, 0, 255); /* 파랑색 */
}
```

<p class="codepen" data-height="300" data-default-tab="css,result" data-slug-hash="zYQaRmZ" data-pen-title="Untitled" data-user="taehongdev" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/taehongdev/pen/zYQaRmZ">
  Untitled</a> by taehong.kim (<a href="https://codepen.io/taehongdev">@taehongdev</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

## 2. HEX (Hexadecimal)

### 2.1. HEX란?

HEX는 16진수(Hexadecimal)로 색상을 표현하는 방법입니다. RGB와 마찬가지로 빨강, 초록, 파랑의 조합으로 색상을 나타내며, 각 색상 값은 두 자리의 16진수로 표현됩니다. 총 6자리의 16진수 값으로
색상을 지정합니다.

### 2.2. 사용법

HEX 색상은 `#` 기호로 시작합니다. 예를 들어, 빨강색은 `#FF0000`으로 표현합니다.

```css
.red-box {
  background-color: #FF0000; /* 빨강색 */
}

.green-box {
  background-color: #00FF00; /* 초록색 */
}

.blue-box {
  background-color: #0000FF; /* 파랑색 */
}
```

<p class="codepen" data-height="300" data-default-tab="css,result" data-slug-hash="zYQaRMZ" data-pen-title="Untitled" data-user="taehongdev" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/taehongdev/pen/zYQaRMZ">
  Untitled</a> by taehong.kim (<a href="https://codepen.io/taehongdev">@taehongdev</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

## 3. HSL (Hue, Saturation, Lightness)

### 3.1. HSL이란?

HSL은 색상을 `색상(Hue)`, `채도(Saturation)`, `명도(Lightness)`로 표현합니다.

- **Hue**: 색상의 종류를 나타내며, 0에서 360도의 각도로 표현됩니다. 예를 들어, 빨강은 0도, 초록은 120도, 파랑은 240도입니다.
- **Saturation**: 색상의 채도를 나타내며, 0%에서 100% 사이의 값으로 나타냅니다. 0%는 회색, 100%는 가장 진한 색입니다.
- **Lightness**: 색상의 밝기를 나타내며, 0%에서 100% 사이의 값으로 나타냅니다. 0%는 검정, 100%는 흰색입니다.

### 3.2. 사용법

HSL 색상은 `hsl()` 함수를 사용하여 표현합니다. 예를 들어, 빨강색은 `hsl(0, 100%, 50%)`으로 나타낼 수 있습니다.

```css
.red-box {
  background-color: hsl(0, 100%, 50%); /* 빨강색 */
}

.green-box {
  background-color: hsl(120, 100%, 50%); /* 초록색 */
}

.blue-box {
  background-color: hsl(240, 100%, 50%); /* 파랑색 */
}
```

<p class="codepen" data-height="300" data-default-tab="css,result" data-slug-hash="yLWEvGe" data-pen-title="Untitled" data-user="taehongdev" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/taehongdev/pen/yLWEvGe">
  Untitled</a> by taehong.kim (<a href="https://codepen.io/taehongdev">@taehongdev</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

## 4. 요약

아래와 같이 RGB, HEX, HSL는 각각의 색상 표현 방식이 다르며, 나름의 장단점이 있습니다. 상황에 맞게 적절히 사용하면 됩니다.

- **RGB**: 색상을 빨강, 초록, 파랑의 3가지 색상의 조합으로 표현합니다.
- **HEX**: RGB 값을 16진수로 변환하여 표현합니다.
- **HSL**: 색상을 색상, 채도, 명도의 조합으로 표현합니다.

<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
