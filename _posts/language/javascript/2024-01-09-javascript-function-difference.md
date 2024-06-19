---
title: JavaScript의 일반 함수와 화살표 함수(Arrow Function)의 차이점
description: 일반 함수(function 키워드로 정의된 함수)와 화살표 함수(arrow function)는 가장 많이 사용되는 두 가지 방식입니다. 이 글에서는 두 함수의 문법적, 기능적 차이점과 사용 예시를 살펴보겠습니다.
date: 2024-01-09 12:18:11 +0900
last_modified_at: 2024-01-09 12:18:11 +0900
categories: [ Language, JavaScript ]
tags: [ javascript, js, 자바스크립트, web, function, 함수, method, arrow function ]
pin: false
math: false
mermaid: false
image:
  path: /assets/img/posts/language/javascript/2024-01-09-javascript-function-difference/thumbnail.webp
  alt: JavaScript의 일반 함수와 화살표 함수의 차이점
---

## 1. 함수 정의 방식

JavaScript에서 일반 함수는 `function` 키워드를 사용하여 정의합니다. 반면, 화살표 함수는 `=>` 기호를 사용하여 정의합니다.

### 1.1. 일반 함수 (Function)

일반 함수는 다음과 같이 정의할 수 있습니다

```javascript
function greet(name) {
  return `안녕, ${name}!`;
}
```

### 1.2. 화살표 함수 (Arrow function)

화살표 함수는 다음과 같이 정의할 수 있습니다

```javascript
const greet = (name) => {
  return `안녕, ${name}!`;
}
```

화살표 함수는 단일 표현식을 반환할 때 중괄호와 `return` 키워드를 생략할 수 있습니다:

```javascript
const greet = name => `안녕, ${name}!`;
```

## 2. this 바인딩

일반 함수와 화살표 함수의 가장 큰 차이점 중 하나는 `this` 키워드의 바인딩 방식입니다. 일반 함수는 호출 방식에 따라 `this`가 동적으로 바인딩됩니다. 반면, 화살표 함수는 `this`를 자신이 정의된
환경에 정적으로 바인딩합니다.

### 2.1. 일반 함수의 this 바인딩

일반 함수에서는 `this`가 호출 컨텍스트에 따라 다르게 바인딩됩니다

```javascript
const person = {
  name: "Hong",
  greet: function () {
    console.log(`Hello, ${this.name}`);
  }
};

person.greet(); // "Hello, Hong"
const greet = person.greet;
greet(); // "Hello, undefined" (전역 객체의 `this` 바인딩)
```

### 2.2. 화살표 함수의 this 바인딩

화살표 함수는 `this`를 자신이 정의된 스코프에 바인딩합니다

```javascript
const person = {
  name: "Hong",
  greet: () => {
    console.log(`Hello, ${this.name}`);
  }
};

person.greet(); // "Hello, undefined" (화살표 함수의 `this`는 상위 스코프를 참조)
```

화살표 함수에서 `this`는 상위 스코프의 `this`를 유지합니다:

```javascript
function Person(name) {
  this.name = name;
  this.greet = () => {
    console.log(`Hello, ${this.name}`);
  };
}

const hong = new Person("Hong");
hong.greet(); // "Hello, Hong"
```

## 3. 생성자 함수 사용 여부

일반 함수는 생성자 함수로 사용할 수 있지만, 화살표 함수는 생성자 함수로 사용할 수 없습니다.

### 3.1. 일반 함수의 생성자 함수

일반 함수는 `new` 키워드를 사용하여 인스턴스를 생성할 수 있습니다

```javascript
function Person(name) {
  this.name = name;
}

const hong = new Person("Hong");
console.log(hong.name); // "Hong"
```

### 3.2. 화살표 함수의 생성자 함수 불가능

화살표 함수는 생성자 함수로 사용할 수 없으며, `new` 키워드를 사용하면 오류가 발생합니다:

```javascript
const Person = (name) => {
  this.name = name;
};

const hong = new Person("Hong"); // TypeError: Person is not a constructor
```

## 4. arguments 객체

일반 함수는 `arguments` 객체를 통해 함수의 인자에 접근할 수 있지만, 화살표 함수는 `arguments` 객체를 지원하지 않습니다.

### 4.1. 일반 함수의 arguments 객체

일반 함수에서는 `arguments` 객체를 사용할 수 있습니다

```javascript
function sum() {
  let total = 0;
  for (let i = 0; i < arguments.length; i++) {
    total += arguments[i];
  }
  return total;
}

console.log(sum(1, 2, 3)); // 6
```

### 4.2. 화살표 함수의 rest parameter

화살표 함수는 `arguments` 객체를 지원하지 않지만, 나머지 매개변수(`rest parameter`)를 사용할 수 있습니다:

```javascript
const sum = (...numbers) => {
  return numbers.reduce((total, number) => total + number, 0);
}

console.log(sum(1, 2, 3)); // 6
```

## 5. 결론

일반 함수와 화살표 함수는 사용 용도와 문법이 다르기 때문에, 각각의 장단점을 이해하고 상황에 맞게 사용하는 것이 중요합니다. 일반 함수는 유연한 `this` 바인딩과 `arguments` 객체를 지원하는 반면,
화살표 함수는 간결한 문법과 상위 스코프의 `this`를 유지하는 특징이 있습니다.

마지막으로 일반 함수와 화살표 함수의 주요 차이점을 정리한 표입니다.

| 특성             | 일반 함수 (`function`) | 화살표 함수 (`=>`)           |
|----------------|--------------------|-------------------------|
| `this` 바인딩     | 동적                 | 정적 (상위 스코프 참조)          |
| `arguments` 객체 | 지원                 | 미지원 (rest parameter 사용) |
| 생성자 함수 사용      | 가능                 | 불가능                     |
