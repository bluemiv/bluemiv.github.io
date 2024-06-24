---
title: JavaScript에서 null과 undefined의 차이
description: 변수의 값이 없거나 정의되지 않은 상태를 나타내기 위해 두 가지 값인 null과 undefined를 사용할 수 있습니다. 이 두 값은 겉보기에 비슷해 보이지만, 실제로는 다른 의미를 가지고 있습니다. 이번 글에서는 null과 undefined의 차이점에 대해 설명합니다.
date: 2024-02-05 21:35:06 +0900
last_modified_at: 2024-02-05 21:35:06 +0900
categories: [ Language, JavaScript ]
tags: [ javascript, js, 자바스크립트, "null", undefined ]
pin: false
math: false
mermaid: false
image:
  path: /assets/img/posts/language/javascript/2024-02-05-javascript-null-vs-undefined/thumbnail.webp
  alt: JavaScript에서 null과 undefined의 차이
---

## 1. null과 undefined의 기본 개념

### 1.1. undefined란?

`undefined`는 변수에 값이 할당되지 않았을 때 JavaScript 엔진이 자동으로 할당하는 기본 값입니다. 이는 변수가 선언되었지만 초기화되지 않았을 때 발생합니다.

```javascript
let user;
console.log(user); // 출력: undefined
```

### 1.2. null이란?

`null`은 의도적으로 변수에 값이 없음을 나타내기 위해 개발자가 할당하는 값입니다. 이는 프로그래머가 변수의 값이 "없음"을 명시적으로 지정할 때 사용됩니다.

```javascript
let user = null;
console.log(user); // 출력: null
```

## 2. null과 undefined의 차이점

### 2.1. 값의 의미

- `undefined`: 변수는 선언되었지만 값이 할당되지 않은 상태를 의미합니다.
- `null`: 변수에 명시적으로 값이 없음을 나타냅니다.

### 2.2. 타입 차이

JavaScript에서 `typeof` 연산자를 사용하면 `undefined`와 `null`의 타입이 다르다는 것을 알 수 있습니다.

```javascript
console.log(typeof undefined); // 출력: "undefined"
console.log(typeof null); // 출력: "object"
```

> JavaScript의 오래된 버그로 인해, null의 타입을 typeof로 확인해보면 object가 나옵니다.
{: .prompt-info }

### 2.3. 비교 연산

`undefined`와 `null`을 비교할 때 주의할 점은 동등 연산자(`==`)와 일치 연산자(`===`)의 차이입니다. 동등 연산자는 타입을 무시하고 비교하며, 일치 연산자는 타입까지 비교합니다.

```javascript
console.log(undefined == null);  // 출력: true
console.log(undefined === null); // 출력: false
```

## 3. null과 undefined 사용 예제

### 3.1. 함수의 반환 값

함수가 명시적으로 값을 반환하지 않을 때, JavaScript는 자동으로 `undefined`를 반환합니다.

```javascript
function sayHello() {
  console.log("Hello!");
}

let result = sayHello(); // Hello! 출력
console.log(result); // 출력: undefined
```

반면, 함수가 명시적으로 값을 반환할 수 있으며, 필요에 따라 `null`을 반환할 수 있습니다.

```javascript
function getUser(id) {
  if (id <= 0) {
    return null; // 유효하지 않은 ID
  }
  return {id: id, name: "User"};
}

let user = getUser(0);
console.log(user); // 출력: null
```

### 3.2. 객체의 속성

객체에서 존재하지 않는 속성을 접근할 때 `undefined`가 반환됩니다.

```javascript
let user = {name: "Alice"};
console.log(user.age); // 출력: undefined
```

객체의 속성이지만 값이 없음을 나타내기 위해 `null`을 사용할 수 있습니다.

```javascript
let user = {name: "Alice", age: null};
console.log(user.age); // 출력: null
```

## 4. null과 undefined를 다루기

### 4.1. 기본값 설정

변수에 `null` 또는 `undefined`가 할당될 가능성이 있는 경우, 기본값을 설정 할 수 있습니다.

```javascript
function greet(name) {
  name = name || "Guest";
  console.log("Hello, " + name);
}

greet(); // 출력: Hello, Guest
```

위 방법 말고, ES2020에서 도입된 null 병합 연산자 `Nullish coalescing operator` (`??`)를 사용하면 `null` 또는 `undefined`인 경우 기본값을 설정할 수 있습니다.

> null 병합 연산자 `Nullish coalescing operator`에 대해 더 자세히 알고 싶으시면 [이 글](/posts/javascript-nullish-coalescing-operator/)을 확인해주세요.
{: .prompt-tip }

```javascript
function greet(name) {
  name = name ?? "Guest";
  console.log("Hello, " + name);
}

greet(); // 출력: Hello, Guest
```

## 5. 요약

- `undefined`는 변수가 선언되었지만 값이 할당되지 않은 상태를 나타냅니다.
- `null`은 값이 없음을 명시적으로 나타내기 위해 할당됩니다.
- `typeof` 연산자로 두 값의 타입을 확인할 수 있습니다.
- 동등 연산자(`==`)와 일치 연산자(`===`)를 사용하여 비교할 때 주의해야 합니다.
- 기본값 설정을 Nullish coalescing operator를 사용하면 코드의 안전성을 높일 수 있습니다.

