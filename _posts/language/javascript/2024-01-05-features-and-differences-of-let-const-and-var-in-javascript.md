---
title: 자바스크립트에서 let, const, var의 특징과 차이점
description: 자바스크립트에서는 변수를 선언할 때 var, let, const 세 가지 키워드를 사용할 수 있습니다. 각각의 키워드는 변수를 선언할 때 특정한 특성과 사용 방법을 가지고 있습니다. 이 글에서는 let, const, var의 특징과 차이점을 설명합니다.
date: 2024-01-05 20:30:56 +0900
last_modified_at: 2024-01-05 20:30:56 +0900
categories: [ Language, JavaScript ]
tags: [ javascript, js, 자바스크립트, web, var, let, const, scope, TDZ ]
pin: false
math: false
mermaid: false
image:
  path: /assets/img/posts/language/javascript/2024-01-05-features-and-differences-of-let-const-and-var-in-javascript/thumbnail.webp
  alt: 자바스크립트에서 let, const, var의 특징과 차이점
---

## 1. var

`var` 키워드는 자바스크립트에서 가장 오래된 변수 선언 방식으로, ES6 이전부터 사용되었습니다.
하지만 아래와 같은 문제점이 있어서 현재는 잘 사용되지 않습니다.

### 1.1. var의 특징

1. **함수 스코프**: `var`로 선언된 변수는 함수 스코프를 가집니다. 이는 변수가 선언된 함수 내부에서만 유효하다는 것을 의미합니다. 함수 외부에서는 접근할 수 없습니다.
2. **호이스팅(Hoisting)**: `var`로 선언된 변수는 선언 단계와 초기화 단계가 분리되어, 변수 선언이 스코프의 최상단으로 끌어올려지는 호이스팅이 발생합니다. 이는 코드의 가독성을 떨어뜨릴 수
   있습니다.

### 1.2. var 예시

```javascript
function varExample() {
  console.log(message); // undefined
  var message = "Hello, World!";
  console.log(message); // Hello, World!
}

varExample();
```

위 예시에서 `message` 변수는 선언되기 전에 `console.log`로 출력되었지만, 오류가 발생하지 않고 `undefined`가 출력됩니다. 이는 `var` 변수의 호이스팅 때문에 최상단으로 변수 선언이
끌어올려져서 발생합니다.

## 2. let

`let` 키워드는 ES6에서 도입된 변수 선언 방식으로, `var`의 단점을 보완합니다.

### 2.1. let 특징

1. **블록 스코프**: `let`으로 선언된 변수는 블록 스코프를 가집니다. 이는 변수가 선언된 블록(`{}`) 내부에서만 유효하다는 것을 의미합니다.
2. **재선언 불가**: 동일한 스코프 내에서 `let`으로 선언된 변수는 다시 선언할 수 없습니다.
3. **호이스팅 발생**: `let`으로 선언된 변수도 호이스팅이 발생하지만, 초기화가 이루어지기 전에는 접근할 수 없습니다. 이를 **일시적 사각지대(TDZ, Temporal Dead Zone)**라고 합니다.

### 2.2. let 예시

```javascript
function letExample() {
  // console.log(message); // ReferenceError: Cannot access 'message' before initialization
  let message = "Hello, World!";
  console.log(message); // Hello, World!
}

letExample();
```

위 예시에서 `message` 변수는 선언되기 전에 `console.log`로 접근하려 하면 오류가 발생합니다. 이는 `let` 변수의 호이스팅과 `TDZ` 때문입니다.

## 3. const

`const` 키워드는 ES6에서 도입된 상수 선언 방식으로, 선언 후 값을 변경할 수 없습니다.

### 3.1. const 특징

1. **블록 스코프**: `const`로 선언된 변수도 `let`과 마찬가지로 블록 스코프를 가집니다.
2. **재선언 및 재할당 불가**: `const`로 선언된 변수는 동일한 스코프 내에서 다시 선언할 수 없으며, 초기화 이후 값을 변경할 수 없습니다.
3. **호이스팅 발생**: `const`로 선언된 변수도 호이스팅이 발생하지만, 초기화가 이루어지기 전에는 접근할 수 없습니다.

### 3.2. const 예시

```javascript
function constExample() {
  const message = "Hello, World!";
  // message = "Hello, JavaScript!"; // TypeError: Assignment to constant variable.
  console.log(message); // Hello, World!
}

constExample();
```

위 예시에서 `message` 변수는 선언 후 값을 변경하려 하면 오류가 발생합니다. 이는 `const` 변수의 재할당 불가 특성 때문입니다.

## 4. let, const, var의 차이점 정리

| 키워드     | 스코프    | 재선언 | 재할당 | 호이스팅            |
|---------|--------|-----|-----|-----------------|
| `var`   | 함수 스코프 | 가능  | 가능  | 선언과 초기화 분리      |
| `let`   | 블록 스코프 | 불가  | 가능  | 선언 전 접근 불가(TDZ) |
| `const` | 블록 스코프 | 불가  | 불가  | 선언 전 접근 불가(TDZ) |

### 4.1. 코드 예제

다음은 `let`, `const`, `var`의 특성을 활용한 간단한 예제입니다.

```javascript
function example() {
  if (true) {
    var functionScoped = "나는 function scope에요";
    let blockScoped = "나는 block scope에요";
    const constantValue = "나는 const 변수에요";

    console.log(functionScoped); // 나는 function scope에요
    console.log(blockScoped); // 나는 block scope에요
    console.log(constantValue); // 나는 const 변수에요

    blockScoped = "let은 변경이 가능해요.";
    console.log(blockScoped); // let은 변경이 가능해요.

    // constantValue = "변경이 불가능해요."; // Uncaught TypeError: Assignment to constant variable.
  }

  console.log(functionScoped); // 나는 function scope에요
  // console.log(blockScoped); // ReferenceError: blockScoped is not defined
  // console.log(constantValue); // ReferenceError: constantValue is not defined
}

example();
```

이 예제에서는 `var`로 선언된 `functionScoped` 변수는 함수 내 어디서든 접근할 수 있지만, `let`과 `const`로 선언된 `blockScoped`와 `constantValue` 변수는 블록
내부에서만 접근할 수 있습니다. 또한, `constantValue`는 상수로 선언되어 값을 변경할 수 없습니다. 이러한 특성을 이해하고 적절히 활용하면 자바스크립트 코드의 품질을 향상시킬 수 있습니다.

## 5. 결론

`var`는 함수 스코프와 호이스팅 문제로 인해 현재는 잘 사용되지 않습니다. 대신 `let`과 `const`를 사용하여 변수의 스코프와 재할당 여부를 명확하게 하는 것이 좋습니다. `let`은 값이 변경될 수 있는
변수를 선언할 때, `const`는 값이 변경되지 않는 상수를 선언할 때 사용합니다. 이를 통해 코드의 가독성과 안정성을 높일 수 있습니다.
