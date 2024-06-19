---
title: CSS 속성(Properties)과 값(Values) 정리
description: 이 글에서는 CSS의 기본 개념인 속성(Properties)과 값(Values)에 대해 자세히 설명합니다.
date: 2024-01-20 20:30:43 +0900
last_modified_at: 2024-01-20 20:30:43 +0900
categories: [ WEB, CSS ]
tags: [ css, web, 속성, 값, property, value ]
pin: false
math: false
mermaid: false
image:
  path: /assets/img/posts/web/css/2024-01-20-css-property-value/thumbnail.webp
  alt: CSS 속성(Properties)과 값(Values) 정리
---

## 1. CSS 속성과 값

CSS 속성(property)은 HTML 요소의 스타일을 정의하는 데 사용됩니다. 각 속성은 특정 스타일을 지정하며, 다양한 값으로 설정할 수 있습니다. 이 글에서는 몇 가지 주요 속성과 값에 대해 설명합니다.

### 1.1. 색상

색상 속성은 요소의 텍스트, 배경 등의 색상을 지정하는 데 사용됩니다.

- `color`: 텍스트 색상을 지정합니다.
- `background-color`: 요소의 배경색을 지정합니다.

```html
<div>
  <h1>인사</h1>
  안녕하세요.
</div>
```

```css
h1 {
    color: blue; /* 텍스트 색상 */
}

div {
    background-color: yellow; /* 배경 색상 */
}
```

![색상 예시 1](/assets/img/posts/web/css/2024-01-20-css-property-value/ex1-1.webp)
_색상 예시 1_

색상의 값은 여러가지 값으로 지정할 수 있습니다.

- 키워드 색상 값: `red`, `blue`, `green` 등.
- 16진수 색상 값: `#ff0000`, `#00ff00`, `#0000ff` 등.
- RGB 색상 값: `rgb(255, 0, 0)`, `rgb(0, 255, 0)`, `rgb(0, 0, 255)` 등.
- RGBA 색상 값: `rgba(255, 0, 0, 0.5)` 등.

```html
<div>
  <h1>인사</h1>
  <p>안녕하세요.</p>
</div>
```

```css
h1 {
    color: #ffffff; /* 16진수 색상 값 */
}

p {
    background-color: rgb(0, 255, 0); /* RGB 색상 값 */
}

div {
    background-color: rgba(0, 0, 255, 0.5); /* RGBA 색상 값 */
}
```

![색상 예시 2](/assets/img/posts/web/css/2024-01-20-css-property-value/ex1-2.webp)
_색상 예시 2_

### 1.2. 텍스트

텍스트 속성은 요소 내 텍스트의 스타일을 지정합니다.

- `font-size`: 텍스트 크기를 지정합니다.
- `font-family`: 텍스트의 글꼴을 지정합니다.
- `text-align`: 텍스트 정렬을 지정합니다. (`left`, `center`, `right`, `justify`).

```html
<p>안녕하세요.</p>
```

```css
p {
    font-size: 64px; /* 텍스트 크기 */
    font-family: Arial, sans-serif; /* 글꼴 */
    text-align: justify; /* 텍스트 정렬 */
}
```

![텍스트 예시 1](/assets/img/posts/web/css/2024-01-20-css-property-value/ex2-1.webp)
_텍스트 예시 1_

```css
p {
    font-size: 20px; /* 텍스트 크기 */
    font-family: "Times New Roman", Times, serif; /* 글꼴 */
    text-align: center; /* 텍스트 정렬 */
}
```

![텍스트 예시 2](/assets/img/posts/web/css/2024-01-20-css-property-value/ex2-2.webp)
_텍스트 예시 2_

### 1.3. 박스 모델

박스 모델 속성은 요소의 레이아웃을 제어합니다.

- `width`: 요소의 너비를 지정합니다.
- `height`: 요소의 높이를 지정합니다.
- `margin`: 요소 외부 여백을 지정합니다.
- `padding`: 요소 내부 여백을 지정합니다.
- `border`: 요소의 테두리를 지정합니다.

```html
<div class="container"></div>
```

```css
.container {
  width: 200px; /* 너비 */
  height: 100px; /* 높이 */
  margin: 20px; /* 외부 여백 */
  padding: 10px; /* 내부 여백 */
  border: 1px solid black; /* 테두리 */
}
```

![박스 모델 예시 1](/assets/img/posts/web/css/2024-01-20-css-property-value/ex3-1.webp)
_박스 모델 예시 1_

박스 모델의 값은 요소의 크기, 여백 등을 지정합니다. 주요 크기 단위는 다음과 같습니다.

- `px`: 픽셀.
- `em`: 부모 요소의 폰트 크기를 기준으로 한 상대 단위.
- `%`: 부모 요소의 크기를 기준으로 한 백분율.

```html
<div class="container">내용</div>
```

```css
.container {
    width: 50%; /* 부모 요소 크기의 50% */
    height: 100px; /* 100 픽셀 */
    padding: 1em; /* 부모 요소 폰트 크기의 1배 */
    background-color: yellowgreen;
}
```

![박스 모델 예시 2](/assets/img/posts/web/css/2024-01-20-css-property-value/ex3-2.webp)
_박스 모델 예시 2_

### 1.4. transform

변형 속성은 요소의 크기, 회전, 위치 등을 변경합니다.

 - `transform`: 요소의 변형을 지정합니다.
 - `scale()`: 요소의 크기를 조정합니다.
 - `rotate()`: 요소를 회전시킵니다.
 - `translate()`: 요소의 위치를 이동시킵니다.

```html
<div class="container"></div>
```

```css
.container {
  transform: scale(1.5) rotate(45deg) translate(50px, 100px);
  width: 50px;
  height: 50px;
  background-color: orange;
}
```

![transform 예시](/assets/img/posts/web/css/2024-01-20-css-property-value/ex4-1.webp)
_transform 예시_

### 1.5. Animation

애니메이션 속성은 요소에 애니메이션 효과를 적용합니다.

- `animation-name`: 애니메이션 이름을 지정합니다.
- `animation-duration`: 애니메이션의 지속 시간을 지정합니다.
- `animation-timing-function`: 애니메이션의 시간 함수를 지정합니다.

```html
<div class="container"></div>
```

```css
@keyframes change-background-color {
    from {background-color: red;}
    to {background-color: yellow;}
}

.container {
    width: 50px;
    height: 50px;
    animation-name: change-background-color;
    animation-duration: 2.5s;
    animation-timing-function: ease-in-out;
}
```

![animation 예시](/assets/img/posts/web/css/2024-01-20-css-property-value/ex5-1.gif)
_animation 예시_

## 2. 결론

다양한 속성과 값을 이해하고 활용하면 웹 페이지를 보다 아름답고 사용자 친화적으로 만들 수 있습니다. 이 글에서 다룬 기본적인 CSS 속성(Properties)와 값(Values)을 잘 활용하여 자신만의 스타일링을 할 수 있습니다. 
