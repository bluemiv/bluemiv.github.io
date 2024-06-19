---
title: JavaScript의 조건문 (if, else if, else, switch)
description: JavaScript에서 조건문은 프로그램의 흐름을 제어하는 데 중요한 역할을 합니다. 다양한 상황에 맞추어 다른 코드를 실행하기 위해 if, else if, else, switch 문을 사용합니다.
date: 2024-01-06 11:23:08 +0900
last_modified_at: 2024-01-06 11:23:08 +0900
categories: [ Language, JavaScript ]
tags: [ javascript, js, 자바스크립트, web, if, else, else if, switch, 조건문 ]
pin: false
math: false
mermaid: false
image:
  path: /assets/img/posts/language/javascript/2024-01-06-javascript-if-else-switch-statements-guide/thumbnail.webp
  alt: JavaScript의 조건문 (if, else if, else, switch)
---

## 1. if, else 조건문

조건문은 특정 조건이 참(`true`)인지 거짓(`false`)인지에 따라 다른 코드를 실행합니다. 조건문을 이용하여 프로그램을 다양한 상황에 맞춰 동작할 수 있도록 할 수 있습니다.

### 1.1. if 문

`if` 문은 조건이 참일 때 실행되는 코드를 지정합니다. 

```javascript
if (조건) {
    // 조건이 참일 때 실행되는 코드
}
```

**[예제]**

아래 예시는 사용자가 로그인했는지 여부를 확인하는 코드입니다. `isLoggedIn` 변수가 `true`이면 "Welcome back!" 메시지가 출력됩니다.

```javascript
let isLoggedIn = true;

if (isLoggedIn) {
    console.log("로그인했습니다.");
}
```

### 1.2. else 문

`else` 문은 `if` 문 조건이 거짓일 때 실행되는 코드를 지정합니다.

```javascript
if (조건) {
    // 조건이 참일 때 실행되는 코드
} else {
    // 조건이 거짓일 때 실행되는 코드
}
```

**[예제]**

아래 예시는 사용자가 로그인했는지 여부를 확인하고, 그렇지 않으면 로그인 메시지를 출력하는 코드

```javascript
let isLoggedIn = false;

if (isLoggedIn) {
    console.log("로그인 했습니다.");
} else {
    console.log("로그인을 해주세요.");
}
```

### 1.3. else if 문

`else if` 문은 여러 조건을 순차적으로 검사할 때 사용됩니다.

```javascript
if (조건1) {
    // 조건1이 참일 때 실행되는 코드
} else if (조건2) {
    // 조건2가 참일 때 실행되는 코드
} else {
    // 조건1과 조건2가 모두 거짓일 때 실행되는 코드
}
```

**[예제]**

아래 예시는 사용자의 역할(role)에 따라 다른 메시지를 출력하는 코드

```javascript
let role = "guest";

if (role === "admin") {
    console.log("관리자로 로그인했습니다.");
} else if (role === "user") {
    console.log("일반 사용자로 로그인했습니다.");
} else {
    console.log("게스트입니다.");
}
```

## 2. switch 문

`switch` 문은 하나의 변수에 대해 여러 가능한 값을 검사할 때 사용됩니다. 각 값에 따라 다른 코드를 실행할 수 있습니다.

```javascript
switch (변수) {
    case 값1:
        // 변수의 값이 값1일 때 실행되는 코드
        break;
    case 값2:
        // 변수의 값이 값2일 때 실행되는 코드
        break;
    default:
        // 변수의 값이 어떠한 case에도 해당되지 않을 때 실행되는 코드
}
```

**[예제]**

아래 예시는 요일에 따라 다른 메시지를 출력하는 코드입니다.

```javascript
const day = "월";

switch (day) {
    case "월":
        console.log("워킹데이의 시작하는 날입니다.");
        break;
    case "수":
        console.log("워킹데이의 중간인 날입니다.");
        break;
    case "금":
        console.log("워킹데이 마지막 날입니다.");
        break;
    default:
        console.log("월, 수, 금이 아닌 요일입니다.");
}
```

위 예제에서 `day` 변수의 값에 따라 다른 메시지가 출력됩니다. `case` 문의 마지막에 `break` 문을 사용하여 조건이 맞을 때 `switch` 문을 종료합니다.
`default` 문은 `case` 문의 조건이 모두 거짓일 때 실행됩니다.

## 3. 조건문 중첩

조건문은 중첩하여 사용할 수 있습니다. 이는 하나의 조건문 내부에 또 다른 조건문을 포함하는 것을 의미합니다.

**[예제]**

아래 예시는 사용자가 로그인했는지 확인하고 관리자인지 확인하는 코드입니다.

```javascript
let isLoggedIn = true;
let role = "admin";

if (isLoggedIn) {
    if (role === "admin") {
        console.log("관리자로 로그인했습니다.");
    } else {
        console.log("일반 사용자로 로그인했습니다.");
    }
} else {
    console.log("로그인 해주세요.");
}
```

위 예제에서 첫 번째 `if` 문은 사용자가 로그인했는지 확인하고, 로그인한 경우 내부의 `if` 문이 사용자의 역할을 검사합니다.

## 4. 조건문 최적화

조건문을 작성할 때는 가능한 최적화된 코드를 작성하는 것이 중요합니다. 조건이 간단하고 명확해야 하며, 불필요한 중첩을 피해야 합니다.

**[예제]**

중복된 조건을 최소화한 코드

```javascript
let isLoggedIn = true;
let role = "admin";

if (!isLoggedIn) {
    console.log("로그인 해주세요.");
} else if (role === "admin") {
    console.log("관리자로 로그인했습니다.");
} else {
    console.log("일반 사용자로 로그인했습니다.");
}
```

위 예제에서는 중복된 조건을 최소화하여 코드의 가독성을 높였습니다.

## 5. 결론

JavaScript의 조건문은 프로그램의 흐름을 제어하는 강력한 도구입니다. `if`, `else if`, `else`, `switch` 문을 적절히 사용하여 다양한 조건에 따라 코드를 실행할 수 있습니다. 각 조건문을 이해하고 적절히 사용하는 것이 중요하며, 조건문을 최적화하여 효율적인 코드를 작성하는 것이 좋습니다.
