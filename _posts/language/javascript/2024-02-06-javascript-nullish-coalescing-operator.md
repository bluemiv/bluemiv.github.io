---
title: JavaScript의 Null 병합 연산자(Nullish Coalescing Operator)
description: JavaScript에서 null 병합 연산자(Nullish Coalescing Operator) (??)는 ES2020에서 도입된 새로운 기능입니다. 이 연산자는 변수에 null 또는 undefined가 할당된 경우에 기본값을 설정하는 데 사용할 수 있습니다. 이는 기존의 || 연산자와 유사하지만 차이점이 있습니다.
date: 2024-02-06 11:44:17 +0900
last_modified_at: 2024-02-06 11:44:17 +0900
categories: [ Language, JavaScript ]
tags: [ javascript, js, 자바스크립트, null 병합 연산자, nullish coalescing operator, nullish coalescing, nullish ]
pin: false
math: false
mermaid: false
image:
  path: /assets/img/posts/language/javascript/2024-02-06-javascript-nullish-coalescing-operator/thumbnail.webp
  alt: JavaScript의 Null 병합 연산자(Nullish Coalescing Operator)
---

## 1. null 병합 연산자(Nullish Coalescing Operator)

### 1.1. 기본 개념

`null 병합 연산자` (`??`)는 좌측 피연산자가 `null` 또는 `undefined`일 때 우측 피연산자를 반환합니다. 이 연산자는 변수에 기본값을 설정할 때, 유용하게 사용할 수 있습니다.

```javascript
let user = null;
let defaultUser = "Guest";
let currentUser = user ?? defaultUser;
console.log(currentUser); // 출력: "Guest"
```

이해를 돕기 위해 또 다른 예시를 살펴보면, 

```javascript
let user1 = null;
let user2 = undefined;
let user3 = "Alice";

console.log(user1 ?? "Guest"); // 출력: "Guest"
console.log(user2 ?? "Guest"); // 출력: "Guest"
console.log(user3 ?? "Guest"); // 출력: "Alice"
```

 위 예제 코드를 보면, or 연산자(`||`)와 비슷하게 동작하는 걸로 보입니다. 다른 차이점을 살펴봅시다.

## 2. OR 연산자(||)와의 차이점

### 2.1. 기본 개념

`OR 연산자` (`||`)는 좌측 피연산자가 `falsy`한 값(즉, `false`, `0`, `""`, `null`, `undefined`, `NaN` 등)일 때 우측 피연산자를 반환합니다. 이 연산자는
주로 `falsy`한 값에 대해 기본값을 설정하는 데 사용됩니다.

```javascript
let user1 = false;
let user2 = "";
let user3 = null;
let user4 = undefined;
let user5 = 0;
let user6 = "Alice";

console.log(user1 || "Guest"); // 출력: "Guest"
console.log(user2 || "Guest"); // 출력: "Guest"
console.log(user3 || "Guest"); // 출력: "Guest"
console.log(user4 || "Guest"); // 출력: "Guest"
console.log(user5 || "Guest"); // 출력: "Guest"
console.log(user6 || "Guest"); // 출력: "Alice"
```

### 2.3. 차이점 정리

`||` 연산자와 `??` 연산자는 변수에 기본값을 설정하는 용도로 사용되지만, 두 연산자가 `falsy`한 값을 처리하는 방식에 차이가 있습니다.

- `||` 연산자: `false`, `0`, `""`, `null`, `undefined`, `NaN` 등의 모든 `falsy`한 값을 고려합니다.
- `??` 연산자: `null`과 `undefined`만 고려합니다.

이를 통해 `0`, `false`, `""`와 같은 값도 유효한 값으로 처리하고 싶을 때 `??` 연산자를 사용하는 것이 더 적합합니다.

```javascript
let count = 0;
const defaultCount = 10;
let result = count ?? defaultCount;
console.log(result); // 출력: 0

result = count || defaultCount;
console.log(result); // 출력: 10
```

위 예제에서 `count`가 `0`일 때 `??` 연산자는 `0`을 유효한 값으로 인정하여 반환하지만, `||` 연산자는 `0`을 `falsy`한 값으로 인식하여 `defaultCount`를 반환합니다.

## 3. null 병합 연산자 응용

### 3.1. 사용자 정보 출력

사용자 이름을 출력할 때, 이름이 `null` 또는 `undefined`인 경우 기본값을 설정하는 예제입니다.

```javascript
function getUserName(user) {
  return user.name ?? "Guest";
}

let user1 = {name: "Alice"};
let user2 = {name: null};
let user3 = {};

console.log(getUserName(user1)); // 출력: "Alice"
console.log(getUserName(user2)); // 출력: "Guest"
console.log(getUserName(user3)); // 출력: "Guest"
```

### 3.2. 설정값 확인

앱의 설정값이 `null` 또는 `undefined`인 경우, 기본값을 설정하는 예제입니다.

```javascript
const settings = {
  theme: "dark",
  language: null
};

let theme = settings.theme ?? "light";
let language = settings.language ?? "en";

console.log(theme); // 출력: "dark"
console.log(language); // 출력: "en"
```

좀 더 depth가 깊은 경우에도 사용할 수 있습니다.

```javascript
const settings = {
  color: {
    background: {
      header: "#bac8ff",
      main: "#ffffff"
    }
  }
}

const headerBackgroundColor = settings?.color?.background?.header;
const footerBackgroundColor = settings?.color?.background?.footer || "#f1f3f5";
console.log(headerBackgroundColor); // #bac8ff
console.log(footerBackgroundColor); // #f1f3f5
```

### 3.3. 배열 처리

배열이 있는 경우에만 map, filter, reduce와 같은 배열 메서드를 호출하고, 배열이 없을 때는 빈 배열을 반환하는 예제입니다. 

```javascript
const processArray = (arr) => {
    return arr?.map(item => item * 2) ?? [];
};

// 배열이 있는 경우
let numbers = [1, 2, 3, 4];
let result = processArray(numbers);
console.log(result); // [2, 4, 6, 8]

// 배열이 null인 경우
numbers = null;
result = processArray(numbers);
console.log(result); // []

// 배열이 undefined인 경우
numbers = undefined;
result = processArray(numbers);
console.log(result); // []
```
