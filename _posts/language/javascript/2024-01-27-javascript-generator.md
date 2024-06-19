---
title: JavaScript 제네레이터 (Generator)
description: JavaScript에서 제네레이터(Generator)는 실행을 중간에 멈췄다가 필요할 때 다시 시작할 수 있습니다. 제네레이터는 function* 키워드로 정의되며, yield 키워드를 사용하여 함수의 실행을 제어합니다. 이 글에서는 제네레이터의 개념, 사용법에 대해 설명합니다.
date: 2024-01-27 22:03:34 +0900
last_modified_at: 2024-01-27 22:03:34 +0900
categories: [ Language, JavaScript ]
tags: [ javascript, js, 자바스크립트, generator, 제네레이터, 이터레이터, yield, throw ]
pin: false
math: false
mermaid: false
image:
  path: /assets/img/posts/language/javascript/2024-01-27-javascript-generator/thumbnail.webp
  alt: JavaScript 제네레이터 (Generator)
---

## 1. 제네레이터의 개념

제네레이터 함수는 일반 함수와 달리 실행을 중간에 멈출 수 있고, 나중에 다시 시작할 수 있는 함수입니다. 제네레이터 함수는 호출되면 이터레이터(Iterator)를 반환하며, `next()` 메서드를 호출하여 함수의
실행을 제어할 수 있습니다.

## 2. 제네레이터 사용법

### 2.1. 제네레이터 함수의 정의

제네레이터 함수는 `function*` 키워드를 사용하여 정의합니다. 함수 내에서 `yield` 키워드를 사용하여 값을 반환하고, 실행을 멈춥니다.

```javascript
function* simpleGenerator() {
  yield 1;
  yield 2;
  yield 3;
}
```

### 2.2. 제네레이터 객체 생성

제네레이터 함수를 호출하면 제네레이터 객체가 반환됩니다. 이 객체는 `next()` 메서드를 가지고 있으며, `next()` 메서드를 호출하면 제네레이터 함수가 실행됩니다.

```javascript
const generator = simpleGenerator(); // 제네레이터 객체 생성

console.log(generator.next());  // { value: 1, done: false }
console.log(generator.next());  // { value: 2, done: false }
console.log(generator.next());  // { value: 3, done: false }
console.log(generator.next());  // { value: undefined, done: true }
```

`yield` 키워드는 제네레이터 함수의 실행을 일시 중지하고, 값을 반환합니다. 다음 `next()` 호출 시, 이전 `yield` 이후의 코드부터 실행이 재개됩니다.

### 2.3. yield를 사용한 값 반환

```javascript
function* yieldExample() {
  console.log('Start');
  yield 1;
  console.log('첫 번째 yield 이후 실행 됨');
  yield 2;
  console.log('두 번째 yield 이후 실행 됨');
}

const iterator = yieldExample();
console.log(iterator.next()); 
// Start
// { value: 1, done: false }

console.log(iterator.next());
// 첫 번째 yield 이후 실행 됨 
// { value: 2, done: false }

console.log(iterator.next());
// 두 번째 yield 이후 실행 됨
// { value: undefined, done: true }
```

### 2.4. return 문

제네레이터 함수에서 `return` 문을 사용하여 실행을 종료하고 값을 반환할 수 있습니다.

```javascript
function* returnGenerator() {
  yield 1;
  return 2;
  yield 3;  // 이 코드는 실행되지 않습니다.
}

const iterator = returnGenerator();
console.log(iterator.next());  // { value: 1, done: false }
console.log(iterator.next());  // { value: 2, done: true }
console.log(iterator.next());  // { value: undefined, done: true }
```

## 3. 제네레이터와 이터레이터

제네레이터는 이터레이터 인터페이스를 가지고 있어서, 배열과 같이 `for...of` 루프에서 사용할 수 있습니다.

### 3.1. for...of 와 제네레이터

```javascript
function* countGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

for (let value of countGenerator()) {
  console.log(value);  // 출력: 1 2 3
}
```

## 4. 제네레이터의 응용

### 4.1. 무한 이터레이터

제네레이터를 사용하여 무한 이터레이터를 만들 수 있습니다.

```javascript
function* infiniteGenerator() {
  let i = 0;
  while (true) {
    yield i++;
  }
}

const infinite = infiniteGenerator();
console.log(infinite.next().value);  // 출력: 0
console.log(infinite.next().value);  // 출력: 1
console.log(infinite.next().value);  // 출력: 2
```

### 4.2. 제네레이터를 사용한 비동기 작업

제네레이터는 비동기 작업을 동기식으로 작성하는 데 사용할 수 있습니다. 예를 들어, `Promise`와 함께 사용하여 비동기 작업을 순차적으로 처리할 수 있습니다.

```javascript
function callApi1() {
  return new Promise(resolve => setTimeout(() => resolve(1), 1000));
}

function callApi2() {
  return new Promise(resolve => setTimeout(() => resolve(2), 1000));
}

function* asyncGenerator() {
  const result1 = yield callApi1(1000);
  console.log(result1);  // 출력: 1
  const result2 = yield callApi2(1000);
  console.log(result2);  // 출력: 2
}

const iterator = asyncGenerator();

function process(iteration) {
  if (iteration.done) return; // 종료
  iteration.value.then(value => process(iterator.next(value)));
}

process(iterator.next());
```

## 5. throw()

제네레이터 객체의 `throw()` 메서드를 사용하여 제네레이터 함수 내에서 예외(Exception)를 발생시킬 수 있습니다.

```javascript
function* throwGenerator() {
  try {
    yield 1;
    yield 2;
  } catch (e) {
    console.log('Error caught inside generator:', e);
  }
}

const iterator = throwGenerator();
console.log(iterator.next());  // { value: 1, done: false }
console.log(iterator.throw(new Error('Something went wrong')));  // Error caught inside generator: Error: Something went wrong
console.log(iterator.next());  // { value: undefined, done: true }
```
