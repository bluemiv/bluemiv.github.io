---
title: CSS 우선순위(Specificity) 개념 및 계산 방법
description: CSS에서 Specificity(우선순위)는 여러 스타일 규칙이 동일한 요소에 적용될 때, 어떤 규칙이 최종적으로 적용될지를 결정하는 중요한 개념입니다. Specificity는 각 선택자의 중요도를 숫자로 나타내며, 높은 값일수록 우선순위가 높습니다. 이 글에서는 CSS Specificity의 개념, 계산 방법에 대해 설명합니다.
date: 2024-01-22 21:03:45 +0900
last_modified_at: 2024-01-22 21:03:45 +0900
categories: [ WEB, CSS ]
tags: [ css, web, 우선순위, Specificity ]
pin: false
math: false
mermaid: false
image:
  path: /assets/img/posts/web/css/2024-01-22-css-specificity-calculation/thumbnail.webp
  alt: CSS 우선순위(Specificity) 개념 및 계산 방법
---

## 1. CSS Specificity란?

CSS Specificity는 CSS 선택자가 얼마나 우선순위가 높은지 나타내는 숫자 값입니다. 여러 개의 CSS 스타일이 동일한 요소에 적용될 경우, Specificity 값이 높은 규칙이 우선적으로 적용됩니다.
Specificity를 이해하면 스타일링 충돌을 해결할 수 있습니다.

## 2. Specificity 계산 방법

Specificity는 각 선택자의 유형에 따라 다르게 계산됩니다. 기본적으로 Specificity는 네 자리 숫자(a, b, c, d)로 표현되며, 왼쪽부터 오른쪽으로 갈수록 우선수위가 낮아집니다.
그리고, 각 자리는 선택자의 종류에 따라 가중치가 부여됩니다.

### 2.1. 선택자의 종류와 가중치

- **인라인 스타일**: 인라인 스타일은 가장 높은 우선순위를 가지며, `a`에 1을 더합니다. (e.g., `<div style="color: red;">`)
- **ID 선택자**: `b`에 1을 더합니다. (e.g., `#header`)
- **클래스, 속성, 의사 클래스 선택자**: `c`에 1을 더합니다. (e.g., `.container`, `[type="text"]`, `:hover`)
- **태그 선택자 및 의사 요소**: `d`에 1을 더합니다. (e.g., `div`, `p`, `::before`)

### 2.2. Specificity 예시

다음 예제를 통해 Specificity를 계산해보면,

```css
h1 {
    color: blue; /* Specificity: 0, 0, 0, 1 */
}

#header {
    color: green; /* Specificity: 0, 1, 0, 0 */
}

.container p {
    color: red; /* Specificity: 0, 0, 1, 1 */
}

body .main-content #section1 h2 {
    color: black; /* Specificity: 0, 1, 1, 2 */
}
```

- `h1` 선택자의 Specificity는 `0, 0, 0, 1`입니다. (태그 선택자 1개)
- `#header` 선택자의 Specificity는 `0, 1, 0, 0`입니다. (ID 선택자 1개)
- `.container p` 선택자의 Specificity는 `0, 0, 1, 1`입니다. (클래스 선택자 1개, 태그 선택자 1개)
- `body .main-content #section1 h2` 선택자의 Specificity는 `0, 1, 1, 2`입니다. (ID 선택자 1개, 클래스 선택자 1개, 태그 선택자 2개)

## 3. Specificity가 중요한 이유

여러 CSS 스타일이 동일한 요소에 적용될 때, Specificity를 사용하면 어떤 스타일이 최종적으로 적용될지를 명확히 알 수 있습니다.

```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        .text { color: blue; } /* Specificity: 0, 0, 1, 0 */
        p { color: red; } /* Specificity: 0, 0, 0, 1 */
    </style>
    <title>Specificity Example</title>
</head>
<body>
    <p class="text">해당 영역의 글씨는 파란색입니다.</p>
</body>
</html>
```

위 예제에서, `p` 요소에는 두 가지 스타일이 적용됩니다. 위에서 살펴본 것과 같이 Specificitysms 왼쪽부터 오른쪽으로 갈수록 우선수위가 낮아집니다.
따라서, `.text` 클래스 선택자가 `p` 태그 선택자보다 높은 Specificity를 가지므로 텍스트 색상은 파란색이 됩니다.

![스타일 충돌 원인 파악 가능](/assets/img/posts/web/css/2024-01-22-css-specificity-calculation/ex-1.webp)
_스타일 충돌 원인 파악 가능_

## 4. !important

`!important`는 Specificity를 무시하고 해당 규칙을 최우선으로 적용합니다. 하지만 남용하면 유지보수와 디버깅이 어려워지므로, 꼭 필요한 경우에 사용하는 것이 좋습니다.

```css
p {
    color: green !important;
}

p {
    color: blue;
}
```

위 예제에서, `p` 요소의 텍스트 색상은 `green`이 됩니다. `!important`가 없으면 후속 규칙이 적용되지만, `!important`는 모든 Specificity를 무시합니다.

## 5. 결론

CSS Specificity는 웹 개발에서 중요한 개념으로, 여러 스타일 동일한 요소에 적용될 때 어떤 규칙이 우선으로 적용되는지 결정합니다. Specificity를 이해하고 정확히 계산하면 스타일 충돌을 해결하고, 예측 가능한 스타일링을 구현하며, 유지보수를 쉽게 할 수 있습니다.
