---
title: CSS 개념부터 한번에 살펴보기
description: 웹 개발에 있어서 CSS는 필수적인 요소입니다. 이 글에서는 CSS의 기본 개념부터 심화 내용까지 간략하게 다룹니다.
date: 2024-01-11 20:06:19 +0900
last_modified_at: 2024-01-11 20:06:19 +0900
categories: [ WEB, CSS ]
tags: [ css, web ]
pin: false
math: false
mermaid: false
image:
  path: /assets/img/posts/web/css/2024-01-11-css-definition/thumbnail.webp
  alt: CSS 개념부터 한번에 살펴보기
---

## 1. CSS 란?

`CSS`는 `Cascading Style Sheets`의 약자로, HTML이나 XML로 작성된 문서의 스타일을 지정하는 데 사용되는 스타일시트 언어입니다. `CSS`를 사용하면 웹 페이지의 레이아웃, 색상, 글꼴 등을 정의할 수 있고, 웹 페이지의 전반적인 디자인을 관리하는 데 사용합니다.

### 1.1. CSS의 역할

`CSS`는 웹 페이지의 콘텐츠와 스타일을 분리하여 다음과 같은 이점을 제공합니다:

- **디자인 일관성**: 여러 HTML 파일에 동일한 스타일을 적용할 수 있습니다.
- **유지보수 용이성**: 스타일을 한 곳에서 수정하면 관련된 모든 페이지에 적용됩니다.
- **접근성 향상**: 구조와 디자인을 분리하여, 다양한 장치에서도 일관된 사용자 경험을 제공합니다.

### 1.2. CSS의 구성 요소

`CSS`는 기본적으로 선택자(`selector)`와 선언(`declaration)`으로 구성됩니다. 선언은 속성(`property)`과 값(`value)`으로 이루어져 있습니다.

```css
선택자 {
    속성: 값;
}
```

예를 들어, 아래 코드는 `h1` 요소의 텍스트 색상을 빨간색으로 설정하는 `CSS` 코드입니다

```css
h1 {
    color: red;
}
```

## 2. CSS의 사용 방법

CSS를 사용하는 방법은 아래와 같이 3가지가 있습니다.

### 2.1. 내부 스타일 시트 (Internal Style Sheet)

`CSS` 코드를 HTML 파일 내부의 `<style>` 태그 안에 작성하는 방법입니다.

```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body {
            background-color: lightblue;
        }
        h1 {
            color: navy;
        }
    </style>
</head>
<body>
    <h1>Hello World</h1>
</body>
</html>
```

### 2.2. 외부 스타일 시트 (External Style Sheet)

`CSS` 코드를 별도의 `.css` 파일로 작성하고, HTML 파일에서 이를 링크하는 방법입니다.

- `CSS` 파일

```css
body {
    background-color: lightblue;
}
h1 {
    color: navy;
}
```
{: file='styles.css' }

- `HTML` 파일

```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1>Hello World</h1>
</body>
</html>
```

### 2.3. 인라인 스타일 (Inline Style)

HTML 요소에 직접 `style` 속성을 사용하여 스타일을 적용하는 방법입니다.

```html
<h1 style="color: navy;">Hello World</h1>
```

## 3. CSS 선택자

`CSS` 선택자는 스타일을 적용할 HTML 요소를 선택하는 데 사용됩니다. 다양한 선택자를 통해 특정 요소나 그룹에 스타일을 적용할 수 있습니다.

### 3.1. 기본 선택자

- **태그 선택자**: 특정 태그를 선택할 때 사용합니다.

  ```css
  p {
      font-size: 16px;
  }
  ```

- **클래스 선택자**: 특정 클래스에 속한 요소를 선택할 때 사용합니다. 클래스 이름은 `.`으로 시작합니다.

  ```css
  .highlight {
      background-color: yellow;
  }
  ```

- **ID 선택자**: 특정 ID를 가진 요소를 선택할 때 사용합니다. 아이디 이름은 `#`으로 시작합니다. ID 선택자는 유니크한 값으로 하나의 document에 하나만 존재할 수 있습니다.

  ```css
  #main-title {
      font-weight: bold;
  }
  ```

### 3.2. 복합 선택자

- **자손 선택자**: 특정 요소의 하위(자손) 요소를 선택할 때 사용합니다.

  ```css
  div p {
      color: blue;
  }
  ```
  
  ```html
  <div>
    <p>동해물과 백두산이 마르고 닳도록 하느님이 보우하사</p>
    <div>
      <p>우리나라 만세 무궁화 삼천리 화려강산</p>
      <p>대한사람 대한으로 길이 보전하세</p>
    </div>
  </div>
  ```

- **자식 선택자**: 특정 요소의 직계 자식을 선택할 때 사용합니다.

  ```css
  ul > li {
      list-style-type: none;
  }
  ```
  
  ```html
  <ul>
    <li>HOME</li>
    <li>ABOUT</li>
  </ul>
  ```

- **속성 선택자**: 특정 속성(`property`)을 가진 요소를 선택할 때 사용합니다.

  ```css
  input[type="text"] {
      border: 1px solid #ccc;
  }
  ```
  
  ```html
  <input type="text" placeholder="username을 입력해주세요."/>
  ```

## 4. 박스 모델 (Box Model)

`CSS`에서 모든 요소는 하나의 박스(box)로 모델링됩니다. 박스 모델은 요소의 크기와 배치를 정의하는 데 사용됩니다. 박스 모델은 아래 네 가지 요소로 구성됩니다

1. **콘텐츠(content)**: 실제 내용
2. **패딩(padding)**: 콘텐츠 주위의 간격
3. **테두리(border)**: 패딩 주위의 테두리
4. **마진(margin)**: 테두리 주위의 외부 여백

![Box Model](/assets/img/posts/web/css/2024-01-11-css-definition/box-model.webp)
_Box Model_

## 5. 레이아웃 기법

`CSS`를 사용하여 다양한 레이아웃을 구성할 수 있습니다. 여기서는 주요 레이아웃 기법을 살펴보겠습니다.

### 5.1. 플렉스박스 (Flexbox)

플렉스박스는 1차원 레이아웃 모델로, 요소들을 수평 또는 수직으로 정렬하는 데 유용합니다.

```css
.container {
    display: flex;
    justify-content: center;
    align-items: center;
}
```

### 5.2. 그리드 (Grid)

그리드는 2차원 레이아웃 모델로, 복잡한 레이아웃을 구성하는 데 적합합니다.

```css
.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
}
```

### 5.3. 플로트 (Float)

플로트는 요소를 좌우로 배치하는 데 사용되며, 플로트를 해제하기 위한 클리어링(clear) 기술도 필요합니다.

```css
.float-left {
    float: left;
    width: 50%;
}
.float-right {
    float: right;
    width: 50%;
}
.clearfix::after {
    content: "";
    display: block;
    clear: both;
}
```

## 6. 미디어 쿼리 (Media Queries)

미디어 쿼리를 사용하면 다양한 장치의 화면 크기에 따라 다른 스타일을 적용할 수 있습니다. 이는 반응형 웹 디자인의 핵심 요소입니다.

```css
@media (max-width: 600px) {
    body {
        background-color: lightgray;
    }
}
```
