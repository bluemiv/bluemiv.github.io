---
title: CSS에서 리스트(list) 스타일 속성 종류
description: 웹 페이지에서 리스트(list)는 콘텐츠를 구조화하고, 나열된 항목들을 보기 좋게 정리하는 데 사용하기 좋습니다. 이 글에서는 리스트 스타일 속성들을 설명합니다.
date: 2024-02-01 22:29:17 +0900
last_modified_at: 2024-02-01 22:29:17 +0900
categories: [ WEB, CSS ]
tags: [ css, web, list, 리스트, list-style-type, list-style-position, list-style-image, list-style ]
pin: false
math: false
mermaid: false
image:
  path: /assets/img/posts/web/css/2024-02-01-css-list-style-properties/thumbnail.webp
  alt: CSS에서 리스트(list) 스타일 속성 종류
---

## 1. 리스트 스타일 속성

리스트의 스타일링을 위해 아래와 같이 다양한 속성을 제공합니다.

- `list-style-type`
- `list-style-position`
- `list-style-image`
- `list-style`

본 글에서는 각 속성의 사용 방법을 소개합니다.

## 2. list-style-type

### 2.1. 설명

`list-style-type` 속성은 리스트 아이템의 기본 마커(marker) 유형을 설정합니다. 지원하는
값으로는 `none`, `disc`, `circle`, `square`, `decimal`, `decimal-leading-zero`, `lower-roman`, `upper-roman`, `lower-alpha`, `upper-alpha`
등이 있습니다.

### 2.2. 예제 코드

```html
<h2>List Style Type 예제</h2>
<ul class="disc-list">
  <li>Disc item 1</li>
  <li>Disc item 2</li>
</ul>
<ul class="circle-list">
  <li>Circle item 1</li>
  <li>Circle item 2</li>
</ul>
<ul class="square-list">
  <li>Square item 1</li>
  <li>Square item 2</li>
</ul>
<ol class="decimal-list">
  <li>Decimal item 1</li>
  <li>Decimal item 2</li>
</ol>
<ol class="upper-roman-list">
  <li>Upper Roman item 1</li>
  <li>Upper Roman item 2</li>
</ol>
```

```css
.disc-list {
  list-style-type: disc;
}

.circle-list {
  list-style-type: circle;
}

.square-list {
  list-style-type: square;
}

.decimal-list {
  list-style-type: decimal;
}

.upper-roman-list {
  list-style-type: upper-roman;
}
```

![list-style-type](/assets/img/posts/web/css/2024-02-01-css-list-style-properties/ex2.webp)
_list-style-type_

## 3. list-style-position

### 3.1. 설명

`list-style-position` 속성은 리스트 마커의 위치를 설정합니다. 이 속성은 `inside`와 `outside` 값을 가집니다.

- `inside`: 마커가 리스트 아이템 텍스트 안쪽에 위치합니다.
- `outside`: 마커가 리스트 아이템 텍스트 바깥쪽에 위치합니다.

### 3.2. 예제 코드

```html
<h2>List Style Position 예제</h2>
<ul class="inside-list">
  <li>Inside item 1</li>
  <li>Inside item 2</li>
</ul>
<ul class="outside-list">
  <li>Outside item 1</li>
  <li>Outside item 2</li>
</ul>
```

```css
.inside-list {
  list-style-position: inside;
}

.outside-list {
  list-style-position: outside;
}
```

![list-style-position](/assets/img/posts/web/css/2024-02-01-css-list-style-properties/ex3.webp)
_list-style-position_

## 4. list-style-image

### 4.1. 설명

`list-style-image` 속성은 커스텀 이미지로 리스트 마커를 설정합니다. 이 속성은 URL을 값으로 받아 리스트 아이템 마커로 이미지를 표시합니다.

### 4.2. 예제 코드

```html
<h2>List Style Image 예제</h2>
<ul class="image-list">
  <li>Image item 1</li>
  <li>Image item 2</li>
</ul>
```

```css
.image-list {
  list-style-image: url('/path/to/your/image.png');
}
```

![list-style-image](/assets/img/posts/web/css/2024-02-01-css-list-style-properties/ex4.webp)
_list-style-image_

## 5. list-style

### 5.1. 설명

`list-style` 속성은 `list-style-type`, `list-style-position` 속성을 한 번에 설정할 수 있는 단축 속성입니다.

### 5.2. 예제 코드

```html
<h2>List Style 예제</h2>
<ul class="custom-list">
  <li>Custom item 1</li>
  <li>Custom item 2</li>
</ul>
```

```css
.custom-list {
  list-style: square inside;
}
```

![list-style](/assets/img/posts/web/css/2024-02-01-css-list-style-properties/ex5.webp)
_list-style_
