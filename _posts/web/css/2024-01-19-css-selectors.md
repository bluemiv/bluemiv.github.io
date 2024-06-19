---
title: CSS 선택자(selector) 종류부터 사용법 정리
description: CSS 선택자는 웹 페이지에서 특정 HTML 요소를 선택하여 스타일링할 수 있게 해줍니다. 이 글에서는 CSS 선택자의 종류부터 자손, 자식 선택자, 그리고 ::after, ::before 선택자 등 다양한 선택자에 대한 사용법을 설명합니다.
date: 2024-01-19 11:27:08 +0900
last_modified_at: 2024-01-19 11:27:08 +0900
categories: [ WEB, CSS ]
tags: [ css, web, after, before, 자식 선택자, 자손 선택자, 선택자, selector ]
pin: false
math: false
mermaid: false
image:
  path: /assets/img/posts/web/css/2024-01-19-css-selectors/thumbnail.webp
  alt: CSS 선택자(selector) 종류부터 사용법 정리
---

## 1. CSS 선택자의 종류

CSS 선택자(selector)는 HTML의 특정 요소를 타겟팅 할때 사용하며, 종류가 다양합니다. 이 글에서는 가장 기본적인 선택자부터 자주 사용하진 않지만, 알아두면 더 세밀하게 타켓팅할 수 있는 선택자까지 살펴봅니다.

### 1.1. 요소 선택자

요소 선택자는 HTML 문서의 특정 태그를 선택합니다. 예를 들어, 모든 `p` 태그를 선택하려면 아래와 같이 작성합니다.

```css
p {
    color: blue;
}
```

또는 모든 `div` 태그를 선택하려면 아래와 같이 작성합니다. 

```css
div {
    background-color: yellowgreen;
}
```

### 1.2. 클래스 선택자

클래스 선택자는 특정 클래스 속성을 가진 모든 요소를 선택합니다. 클래스 선택자는 점(`.`)을 사용하여 정의합니다.

```html
<div>
  <p>이 내용은 <span class="highlight">매우 중요합니다.</span></p>
  <p>이 내용은 <span class="second-highlight">그 다음으로 중요합니다.</span></p>
</div>
```

```css
.highlight {
    color: red;
}
.second-highlight {
    color: blue;
}
```

![클래스 선택자](/assets/img/posts/web/css/2024-01-19-css-selectors/ex-1-2.webp)
_클래스 선택자_

### 1.3. ID 선택자

ID 선택자는 고유한 `id` 속성을 가진 단일 요소를 선택합니다. ID 선택자는 해시(`#`)를 사용하여 정의합니다.

```html
<p id="unique">이것은 ID 선택자 입니다.</p>
<p class="unique">이것은 class 선택자 입니다.</p>
```

```css
#unique {
    font-weight: bold;
    color: blue;
}
```

![ID 선택자](/assets/img/posts/web/css/2024-01-19-css-selectors/ex-1-3.webp)
_ID 선택자_

### 1.4. 속성 선택자

속성(`property`) 선택자는 특정 속성을 가진 요소를 선택합니다.

```html
<input type="text" name="username">
<input type="password" name="password">
```

```css
input[type="password"] {
    border: 1px solid red;
}
```

![속성 선택자](/assets/img/posts/web/css/2024-01-19-css-selectors/ex-1-4.webp)
_속성 선택자_

### 1.5. 전체 선택자

전체 선택자(`*`)는 모든 형태의 모든 요소를 선택합니다.

```html
<div>
  <h1>애국가 1절</h1>
  <div>
    <p>동해물과 백두산이 마르고 닳도록</p>
    <p>하느님이 보우하사 우리나라만세</p>
    <p>(후렴)무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세</p>
  </div>
</div>
```

```css
* {
  color: green;
}
```

![전체 선택자](/assets/img/posts/web/css/2024-01-19-css-selectors/ex-1-5.webp)
_전체 선택자_

## 2. 계층적 선택자

CSS에서는 요소 간의 계층적 관계를 이용해 스타일을 지정할 수 있습니다. 여기에는 '자손 선택자'와 '자식 선택자'가 포함됩니다.

### 2.1. 자손 선택자

자손 선택자는 특정 요소 내의 모든 하위 요소를 선택합니다. 공백을 사용하여 정의합니다.

아래 예제에서는 `.container` 클래스 내의 모든 `p` 태그를 선택합니다.

```html
<div class="container">
    <p>부모 요소의 직계 자식 요소입니다.</p>
    <div>
        <p>부모 요소의 자손 요소입니다.</p>
    </div>
    <span>해당 부분은 선택되지 않습니다.</span>
</div>
```

```css
.container p {
    background-color: yellowgreen;
}
```

![자손 선택자](/assets/img/posts/web/css/2024-01-19-css-selectors/ex-2-1.webp)
_자손 선택자_

### 2.2. 자식 선택자

자식 선택자는 특정 요소의 직계 자식만을 선택합니다. `>` 기호를 사용하여 정의합니다.

```html
<div class="parent">
    <p>부모 요소의 직계 자식 요소입니다.</p>
    <div>
        <p>부모 요소의 자손 요소입니다.</p>
    </div>
</div>
```

```css
.parent > p {
    color: blue;
}
```

![자식 선택자](/assets/img/posts/web/css/2024-01-19-css-selectors/ex-2-2.webp)
_자식 선택자_

위의 예제에서는 `.parent` 클래스의 직계 자식인 `p` 태그만 선택합니다.

## 3. 가상 요소 선택자

가상 요소 선택자는 요소의 앞 또는 뒷 부분을 스타일링하는 데 사용됩니다. 선택자로는 `::before`와 `::after`가 있습니다.

### 3.1. ::before 선택자

`::before` 선택자는 요소의 콘텐츠 앞에 생성된 가상 요소를 선택합니다. 주로 콘텐츠를 추가하거나 꾸미는 데 사용됩니다.

```html
<p class="note">web2와 web3의 차이점은?</p>
```

```css
.note::before {
    content: "Note: ";
    font-weight: bold;
    background-color: #dbe4ff;
    border: 1px solid #4c6ef5;
}
```

![::before 선택자](/assets/img/posts/web/css/2024-01-19-css-selectors/ex-3-1.webp)
_::before 선택자_

위의 예제에서는 `.note` 클래스의 `p` 태그 앞에 "Note: "라는 텍스트가 추가됩니다.

### 3.2. ::after 선택자

`::after` 선택자는 요소의 콘텐츠 뒤에 생성된 가상 요소를 선택합니다.

```html
<p class="note">web2와 web3의 차이점은?</p>
```

```css
.note::after {
    content: " Read more.";
    font-style: italic;
    color: #4c6ef5;
}
```

위의 예제에서는 `.note` 클래스의 `p` 태그 뒤에 " Read more."라는 텍스트가 추가됩니다.

![::after 선택자](/assets/img/posts/web/css/2024-01-19-css-selectors/ex-3-2.webp)
_::after 선택자_

## 4. 고급 선택자

### 4.1. 속성 값의 시작 부분 매칭

속성 값의 시작 부분을 매칭하는 선택자는 `^=` 기호를 사용합니다.

```html
<a href="https://naver.com">Naver</a>
<a href="http://google.com">Google</a>
```

```css
a[href^="https"] {
    color: orange;
}
```

위의 예제에서는 `href` 속성이 "https"로 시작하는 모든 `a` 태그를 선택합니다.

![property 값의 시작 부분 매칭](/assets/img/posts/web/css/2024-01-19-css-selectors/ex-4-1.webp)
_property 값의 시작 부분 매칭_

### 4.2. 속성 값의 끝 부분 매칭

속성 값의 끝 부분을 매칭하는 선택자는 `$=` 기호를 사용합니다.

```html
<img src="image.png">
<img src="photo.jpg">
```

```css
img[src$=".jpg"] {
    border: 2px solid red;
}
```

![property 값의 끝 부분 매칭](/assets/img/posts/web/css/2024-01-19-css-selectors/ex-4-2.webp)
_property 값의 끝 부분 매칭_

위의 예제에서는 `src` 속성이 ".jpg"로 끝나는 모든 `img` 태그를 선택합니다.

### 4.3. 속성 값의 포함 매칭

속성 값에 특정 문자열을 포함하는 선택자는 `*=` 기호를 사용합니다.

```html
<div class="box-content">Content</div>
<div class="box-header">Header</div>
<div class="footer">Footer</div>
```

```css
div[class*="box"] {
    padding: 10px;
    background-color: #96f2d7;
}
```

위 예제에서는 클래스 이름에 "box"를 포함하는 모든 `div` 태그를 선택합니다.

![property 값의 포함 매칭](/assets/img/posts/web/css/2024-01-19-css-selectors/ex-4-3.webp)
_property 값의 포함 매칭_
