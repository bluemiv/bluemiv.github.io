---
title: CSS Flexbox 살펴보기
description: CSS flexbox는 웹 레이아웃 디자인을 더욱 유연하고 효율적으로 만들어줍니다. 이 글에서는 flexbox의 개념 및 사용법에 대해 설명합니다.
date: 2024-02-09 23:02:40 +0900
last_modified_at: 2024-02-09 23:02:40 +0900
categories: [ WEB, CSS ]
tags: [ css, web, flex, layout, 레이아웃, flexbox, flexible box layout, flex-start, flex-end, space-between ]
pin: false
math: false
mermaid: false
image:
  path: /assets/img/posts/web/css/2024-02-09-css-flex-box/thumbnail.webp
  alt: CSS Flexbox 살펴보기
---

## 1. Flexbox란 무엇인가?

`flexbox`(Flexible Box Layout)는 CSS3에서 도입된 레이아웃 모듈로, 컨테이너 내부의 아이템들을 자유롭게 정렬하고 배치할 수 있게 해줍니다.
기존의 `float`이나 `inline-block` 등으로는 어렵던 다양한 레이아웃을 flex 속성으로 쉽게 구현할 수 있습니다.

### 1.1. 주요 개념

- **Flex Container**: `display: flex`를 적용한 요소로, flex 컨테이너 안에 있는 모든 아이템들은 flex 아이템이 됩니다.
- **Flex Item**: flex 컨테이너 내부의 직접 자식 요소들입니다.

```html
<div class="flex-container">
  <div class="flex-item">1</div>
  <div class="flex-item">2</div>
  <div class="flex-item">3</div>
</div>
```

```css
.flex-container {
  display: flex;
  justify-content: space-between;
}

.flex-item {
  flex: 1;
}
```

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="vYwrEam" data-pen-title="Untitled" data-user="taehongdev" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/taehongdev/pen/vYwrEam">
  Untitled</a> by taehong.kim (<a href="https://codepen.io/taehongdev">@taehongdev</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

## 2. Flexbox의 주요 속성

### 2.1 Flex Container 속성

- `display`: `flex` 또는 `inline-flex`로 설정합니다.
- `flex-direction`: 아이템의 주 축(main axis) 방향을 설정합니다.
  - `row`: 가로 방향 (기본값)
  - `column`: 세로 방향
- `justify-content`: 주 축을 따라 아이템들을 정렬합니다.
  - `flex-start`: 시작점에 정렬
  - `flex-end`: 끝점에 정렬
  - `center`: 중앙에 정렬
  - `space-between`: 아이템 사이에 동일한 간격을 둡니다.
  - `space-around`: 아이템 주위에 동일한 간격을 둡니다.
- `align-items`: 교차 축(cross axis)을 따라 아이템들을 정렬합니다.
  - `flex-start`: 시작점에 정렬
  - `flex-end`: 끝점에 정렬
  - `center`: 중앙에 정렬
  - `baseline`: 텍스트 기준선에 정렬
  - `stretch`: 아이템들을 컨테이너 높이에 맞춰 늘립니다.

### 2.2 Flex Item 속성

- `order`: 아이템의 순서를 설정합니다. 기본값은 0이며, 숫자가 낮을수록 먼저 배치됩니다.
- `flex-grow`: 남은 공간을 아이템들이 어떻게 차지할지를 설정합니다. 기본값은 0입니다.
- `flex-shrink`: 아이템들이 축소될 때의 비율을 설정합니다. 기본값은 1입니다.
- `flex-basis`: 아이템의 기본 크기를 설정합니다. 기본값은 `auto`입니다.
- `align-self`: 개별 아이템을 컨테이너와 다른 정렬로 설정합니다.

## 3. Flexbox 예제 코드

### 3.1. flex-direction 

`flex-direction` 속성은 flex 컨테이너 내의 아이템들이 배치되는 주 축(main axis)의 방향을 설정합니다. 기본값은 `row`입니다.

#### 3.1.1. row

```html
<div class="flex-container">
  <div class="flex-item">Item 1</div>
  <div class="flex-item">Item 2</div>
  <div class="flex-item">Item 3</div>
</div>
```

```css
.flex-container {
  display: flex;
  flex-direction: row; /* 기본값 */
  border: 1px solid #ddd;
}
.flex-item {
  background-color: #91a7ff;
  padding: 10px;
  margin: 5px;
}
```

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="abrKzPv" data-pen-title="Untitled" data-user="taehongdev" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/taehongdev/pen/abrKzPv">
  Untitled</a> by taehong.kim (<a href="https://codepen.io/taehongdev">@taehongdev</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

#### 3.1.2. column

```html
<div class="flex-container">
  <div class="flex-item">Item 1</div>
  <div class="flex-item">Item 2</div>
  <div class="flex-item">Item 3</div>
</div>
```

```css
.flex-container {
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  height: 200px;
}
.flex-item {
  background-color: #91a7ff;
  padding: 10px;
  margin: 5px;
}
```

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="MWdXYdN" data-pen-title="CSS Flexbox 살펴보기3" data-user="taehongdev" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/taehongdev/pen/MWdXYdN">
  CSS Flexbox 살펴보기3</a> by taehong.kim (<a href="https://codepen.io/taehongdev">@taehongdev</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

### 3.2. justify-content

`justify-content` 속성은 주 축(main axis)을 따라 아이템들을 정렬하는 방법을 설정합니다. 주 축은 `flex-direction`에 따라 달라집니다.

#### 3.2.1. flex-start

```html
<div class="flex-container">
  <div class="flex-item">Item 1</div>
  <div class="flex-item">Item 2</div>
  <div class="flex-item">Item 3</div>
</div>
```

```css
.flex-container {
  display: flex;
  justify-content: flex-start; /* 기본값 */
  border: 1px solid #ddd;
}
.flex-item {
  background-color: #91a7ff;
  padding: 10px;
  margin: 5px;
}
```

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="ExzRjaK" data-pen-title="Untitled" data-user="taehongdev" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/taehongdev/pen/ExzRjaK">
  Untitled</a> by taehong.kim (<a href="https://codepen.io/taehongdev">@taehongdev</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

#### 3.2.2. center

```html
<div class="flex-container">
  <div class="flex-item">Item 1</div>
  <div class="flex-item">Item 2</div>
  <div class="flex-item">Item 3</div>
</div>
```

```css
.flex-container {
  display: flex;
  justify-content: center;
  border: 1px solid #ddd;
}
.flex-item {
  background-color: #91a7ff;
  padding: 10px;
  margin: 5px;
}
```

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="jOoKEgJ" data-pen-title="Untitled" data-user="taehongdev" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/taehongdev/pen/jOoKEgJ">
  Untitled</a> by taehong.kim (<a href="https://codepen.io/taehongdev">@taehongdev</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

#### 3.2.3. space-between

```html
<div class="flex-container">
  <div class="flex-item">Item 1</div>
  <div class="flex-item">Item 2</div>
  <div class="flex-item">Item 3</div>
</div>
```

```css
.flex-container {
  display: flex;
  justify-content: space-between;
  border: 1px solid #ddd;
}
.flex-item {
  background-color: #91a7ff;
  padding: 10px;
  margin: 5px;
}
```

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="jOoKEjJ" data-pen-title="Untitled" data-user="taehongdev" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/taehongdev/pen/jOoKEjJ">
  Untitled</a> by taehong.kim (<a href="https://codepen.io/taehongdev">@taehongdev</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>


#### 3.2.4. space-evenly

```html
<div class="flex-container">
  <div class="flex-item">Item 1</div>
  <div class="flex-item">Item 2</div>
  <div class="flex-item">Item 3</div>
</div>
```

```css
.flex-container {
  display: flex;
  justify-content: space-evenly;
  border: 1px solid #ddd;
}
.flex-item {
  background-color: #91a7ff;
  padding: 10px;
  margin: 5px;
}
```

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="oNRyXXW" data-pen-title="Untitled" data-user="taehongdev" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/taehongdev/pen/oNRyXXW">
  Untitled</a> by taehong.kim (<a href="https://codepen.io/taehongdev">@taehongdev</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

#### 3.2.5. space-around

```html
<div class="flex-container">
  <div class="flex-item">Item 1</div>
  <div class="flex-item">Item 2</div>
  <div class="flex-item">Item 3</div>
</div>
```

```css
.flex-container {
  display: flex;
  justify-content: space-around;
  border: 1px solid #ddd;
}
.flex-item {
  background-color: #91a7ff;
  padding: 10px;
  margin: 5px;
}
```

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="abrKOOZ" data-pen-title="Untitled" data-user="taehongdev" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/taehongdev/pen/abrKOOZ">
  Untitled</a> by taehong.kim (<a href="https://codepen.io/taehongdev">@taehongdev</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

### 3.3. align-items

`align-items` 속성은 교차 축(cross axis)을 따라 아이템들을 정렬하는 방법을 설정합니다. 교차 축은 주 축에 수직인 방향입니다.

#### 3.3.1. flex-start

```html
<div class="flex-container">
  <div class="flex-item">Item 1</div>
  <div class="flex-item">Item 2</div>
  <div class="flex-item">Item 3</div>
</div>
```

```css
.flex-container {
  display: flex;
  align-items: flex-start;
  border: 1px solid #ddd;
  height: 200px;
}
.flex-item {
  background-color: #91a7ff;
  padding: 10px;
  margin: 5px;
}
```

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="OJYEVyo" data-pen-title="Untitled" data-user="taehongdev" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/taehongdev/pen/OJYEVyo">
  Untitled</a> by taehong.kim (<a href="https://codepen.io/taehongdev">@taehongdev</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

#### 3.3.2. center

```html
<div class="flex-container">
  <div class="flex-item">Item 1</div>
  <div class="flex-item">Item 2</div>
  <div class="flex-item">Item 3</div>
</div>
```

```css
.flex-container {
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  height: 200px;
}
.flex-item {
  background-color: #91a7ff;
  padding: 10px;
  margin: 5px;
}
```

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="pomKJjM" data-pen-title="Untitled" data-user="taehongdev" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/taehongdev/pen/pomKJjM">
  Untitled</a> by taehong.kim (<a href="https://codepen.io/taehongdev">@taehongdev</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

#### 3.3.3. flex-end

```html
<div class="flex-container">
  <div class="flex-item">Item 1</div>
  <div class="flex-item">Item 2</div>
  <div class="flex-item">Item 3</div>
</div>
```

```css
.flex-container {
  display: flex;
  align-items: flex-end;
  border: 1px solid #ddd;
  height: 200px;
}
.flex-item {
  background-color: #91a7ff;
  padding: 10px;
  margin: 5px;
}
```

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="RwmJPaQ" data-pen-title="Untitled" data-user="taehongdev" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/taehongdev/pen/RwmJPaQ">
  Untitled</a> by taehong.kim (<a href="https://codepen.io/taehongdev">@taehongdev</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

#### 3.3.4. stretch

```html
<div class="flex-container">
  <div class="flex-item">Item 1</div>
  <div class="flex-item">Item 2</div>
  <div class="flex-item">Item 3</div>
</div>
```

```css
.flex-container {
  display: flex;
  align-items: stretch;
  border: 1px solid #ddd;
  height: 200px;
}
.flex-item {
  background-color: #91a7ff;
  padding: 10px;
  margin: 5px;
}
```

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="JjqZdGE" data-pen-title="Untitled" data-user="taehongdev" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/taehongdev/pen/JjqZdGE">
  Untitled</a> by taehong.kim (<a href="https://codepen.io/taehongdev">@taehongdev</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
