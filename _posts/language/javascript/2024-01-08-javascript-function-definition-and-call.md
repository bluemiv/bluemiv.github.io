---
title: JavaScript 함수 정의 및 호출 방법
description: 이 글에서는 JavaScript에서 함수를 정의하고 호출하는 방법에 대해 살펴봅니다.
date: 2024-01-08 15:10:51 +0900
last_modified_at: 2024-01-08 15:10:51 +0900
categories: [ Language, JavaScript ]
tags: [ javascript, js, 자바스크립트, web, function, 함수, method, arrow function, closure, recursive ]
pin: false
math: false
mermaid: false
image:
  path: /assets/img/posts/language/javascript/2024-01-08-javascript-function-definition-and-call/thumbnail.webp
  alt: JavaScript 함수 정의 및 호출 방법
---

## 1. JavaScript의 함수란?

함수(`function`)는 특정 작업을 수행하는 코드 블록입니다. 함수는 재사용이 가능하여 코드의 중복을 줄이고, 가독성을 높여주고, 유지 보수를 쉽게 만들어줍니다.

## 2. 함수 정의 방법

JavaScript에서 함수를 정의하는 방법은 대표적으로 함수 선언문과 함수 표현식이 있습니다.

### 2.1. 함수 선언문

함수 선언문은 `function` 키워드를 사용하여 함수를 정의합니다. 함수 이름을 명시적으로 지정하여 코드 어디서나 호출할 수 있습니다.

```javascript
function sayHello(name) {
  console.log(`안녕, ${name}!`);
}
```

이 함수는 `sayHello`라는 이름을 가지며, `name`이라는 매개변수를 받아 콘솔에 인사말을 출력합니다.

### 2.2. 함수 표현식

함수 표현식은 변수에 익명 함수를 할당하는 방식으로 함수를 정의합니다. 함수 표현식은 할당된 변수명을 사용하여 호출할 수 있습니다.

```javascript
const greet = function (name) {
  console.log(`안녕, ${name}!`);
};
```

이 함수는 `greet`이라는 변수에 할당되며, `name` 매개변수를 받아 인사말을 출력합니다.

## 3. 함수 호출 방법

함수를 호출하는 방법은 간단합니다. 함수 이름 뒤에 괄호를 사용하여 호출할 수 있습니다. 괄호 안에 인수를 넣어 함수에 전달할 수도 있습니다.

```javascript
sayHello('카리나');  // Output: 안녕, 카리나!
greet('닝닝');       // Output: 안녕, 닝닝!
```

## 4. 고급 함수 기능

JavaScript 함수는 단순한 호출 외에도 다양한 고급 기능을 제공합니다.

### 4.1. 매개변수 기본값

매개변수 기본(`default`)값을 사용하면 함수 호출 시 인수가 제공되지 않았을 때 사용할 기본값을 지정할 수 있습니다.

```javascript
function greet(name = '방문자') {
  console.log(`${name}님 환영합니다!`);
}

greet();      // Output: 방문자님 환영합니다!
greet('준');  // Output: 준님 환영합니다!
```

### 4.2. 화살표 함수 (Arrow function)

화살표 함수는 ES6에서 도입된 새로운 함수 정의 방식으로, 더 간결한 문법을 제공합니다. 특히 `this` 바인딩이 기존 함수와 다르게 동작합니다.

```javascript
const add = (a, b) => a + b;

console.log(add(2, 3));  // Output: 5
```

위 화살표 함수는 아래 코드와 동일합니다.

```javascript
function add(a, b) {
  return a + b;
};
```

> 일반 함수와 화살표 함수의 차이점이 궁금하면, [이 글](/posts/javascript-function-difference/)을 참고해주세요.
{: .prompt-info }

### 4.3. 즉시 실행 함수 표현식 (IIFE)

IIFE(Immediately Invoked Function Expression)는 함수 정의와 동시에 즉시 실행되는 함수입니다. 주로 코드의 스코프를 제한하기 위해 사용됩니다.

```javascript
(function () {
  console.log('이 함수는 즉시 실행 함수입니다.');
})();

// Arrow function으로 작성하면
(() => {
  console.log('이 함수는 즉시 실행 함수입니다.');
})()
```

### 4.4. 콜백 함수 (Callback)

콜백 함수는 다른 함수의 인수로 전달되는 함수입니다. 주로 비동기 작업에서 사용됩니다.

```javascript
function fetchData(callback) {
  // 데이터 가져오는 작업 (예: API 호출)
  const data = {name: '윈터', age: 23};
  callback(data);
}

function displayData(data) {
  console.log(`이름: ${data.name}, 나이: ${data.age}`);
}

fetchData(displayData);
```

### 4.5 클로저 (Closure)

클로저는 함수가 생성될 때의 환경을 기억하는 특성이 있습니다. 클로저를 사용하면 내부 함수에서 외부 함수의 변수에 접근할 수 있습니다.

```javascript
function createCounter() {
  let count = 0;
  return function () {
    count++;
    console.log(`Count: ${count}`);
  };
}

const counter = createCounter();
counter();  // Output: Count: 1
counter();  // Output: Count: 2
```

### 4.6. 재귀 함수 (Recursive function)

재귀 함수는 함수가 자기 자신을 호출하는 방식입니다. 주로 반복적인 작업을 수행할 때 사용됩니다.

```javascript
function factorial(n) {
  if (n === 0) {
    return 1;
  }
  return n * factorial(n - 1);
}

console.log(factorial(5));  // Output: 120
```

### 4.7. 매개변수로 함수를 전달

함수는 JavaScript에서 일급 객체이므로, 다른 함수의 매개변수로 전달할 수 있습니다. 이런 특징은 함수형 프로그래밍에서 중요한 역할을 합니다.

```javascript
function executeFunction(func, value) {
  return func(value);
}

function double(number) {
  return number * 2;
}

console.log(executeFunction(double, 5));  // Output: 10
```

### 4.8. 함수를 리턴

함수는 다른 함수의 반환 값으로 사용할 수도 있습니다. 이는 고차 함수(`higher-order function`)라고 불립니다.

```javascript
function createMultiplier(multiplier) {
  return function (value) {
    return value * multiplier;
  };
}

const double = createMultiplier(2);
console.log(double(5));  // Output: 10

const triple = createMultiplier(3);
console.log(triple(5));  // Output: 15
```

## 5. 결론

JavaScript 함수는 다양한 정의와 호출 방식을 통해 코드의 재사용성을 높이고, 유지 보수를 용이하게 하며, 더 효율적인 프로그래밍을 할 수 있게 도와줍니다.
