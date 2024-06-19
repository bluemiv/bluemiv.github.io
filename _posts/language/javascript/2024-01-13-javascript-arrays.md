---
title: JavaScript 배열의 개념과 사용법
description: JavaScript에서 배열(Array)은 여러 개의 값을 하나의 변수에 저장할 수 있는 데이터 구조입니다. 배열은 객체(Object)의 일종으로, 인덱스(index)를 사용하여 요소(element)에 접근할 수 있습니다. 이 글에서는 JavaScript 배열의 개념, 배열 생성 방법 등 배열의 기본적인 조작에 대해 살펴봅니다.
date: 2024-01-13 20:59:01 +0900
last_modified_at: 2024-01-13 20:59:01 +0900
categories: [ Language, JavaScript ]
tags: [ javascript, js, 자바스크립트, web, 객체, array, 배열, map, forEach, filter, reduce, sort, find, splice, slice ]
pin: false
math: false
mermaid: false
image:
  path: /assets/img/posts/language/javascript/2024-01-13-javascript-arrays/thumbnail.webp
  alt: JavaScript 배열의 개념과 사용법
---

## 1. 배열이란 무엇인가?

JavaScript 배열은 다양한 데이터를 순서대로 저장할 수 있는 리스트입니다. 배열의 각 요소는 0부터 시작하는 인덱스(index)를 통해 접근할 수 있습니다.
배열은 일반적으로 같은 종류의 데이터를 그룹화하여 관리하는 데 사용되지만, JavaScript 배열은 다양한 데이터 타입을 함께 저장할 수 있습니다.

### 1.1. 배열 생성

배열을 생성하는 방법은 여러 가지가 있습니다. 가장 일반적인 방법은 배열 리터럴(array literal)을 사용하는 것입니다.

```javascript
const fruits = ['apple', 'banana', 'cherry'];
```

또한, `Array` 생성자를 사용하여 배열을 생성할 수도 있습니다.

```javascript
const fruits = new Array('apple', 'banana', 'cherry');
```

빈 배열을 생성하고 나중에 요소를 추가할 수도 있습니다.

```javascript
const fruits = [];
fruits[0] = 'apple';
fruits[1] = 'banana';
fruits[2] = 'cherry';
```

## 2. 배열 요소 접근 및 조작

배열의 요소에 접근하고 조작하는 방법은 매우 직관적입니다. 인덱스(index)를 사용하여 배열의 요소를 읽고 쓸 수 있습니다.

### 2.1. 요소 접근

배열의 요소에 접근하려면 인덱스를 사용합니다. 인덱스는 0부터 시작합니다.

```javascript
const fruits = ['apple', 'banana', 'cherry'];
console.log(fruits[0]); // 'apple'
console.log(fruits[1]); // 'banana'
console.log(fruits[2]); // 'cherry'
```

### 2.2. 요소 수정

인덱스를 사용하여 배열의 요소를 수정할 수 있습니다.

```javascript
const fruits = ['apple', 'banana', 'cherry'];
fruits[1] = 'blueberry';
console.log(fruits); // ['apple', 'blueberry', 'cherry']
```

### 2.3. 요소 추가

배열의 끝에 요소를 추가하려면 `push` 메서드를 사용합니다.

```javascript
const fruits = ['apple', 'banana', 'cherry'];
fruits.push('date');
console.log(fruits); // ['apple', 'banana', 'cherry', 'date']
```

배열의 특정 위치에 요소를 추가하려면 `splice` 메서드를 사용합니다.

```javascript
const fruits = ['apple', 'banana', 'cherry'];
fruits.splice(1, 0, 'blueberry');
console.log(fruits); // ['apple', 'blueberry', 'banana', 'cherry']
```

### 2.4. 요소 삭제

배열의 마지막 요소를 제거하려면 `pop` 메서드를 사용합니다.

```javascript
const fruits = ['apple', 'banana', 'cherry'];
fruits.pop();
console.log(fruits); // ['apple', 'banana']
```

배열의 첫 번째 요소를 제거하려면 `shift` 메서드를 사용합니다.

```javascript
const fruits = ['apple', 'banana', 'cherry'];
fruits.shift();
console.log(fruits); // ['banana', 'cherry']
```

배열의 특정 위치에 있는 요소를 제거하려면 `splice` 메서드를 사용합니다.

```javascript
const fruits = ['apple', 'banana', 'cherry'];
fruits.splice(1, 1);
console.log(fruits); // ['apple', 'cherry']
```

## 3. 배열의 다양한 메서드

JavaScript 배열은 다양한 메서드를 제공하여 배열을 쉽게 조작할 수 있습니다.

### 3.1. forEach

`forEach` 메서드는 배열의 각 요소에 대해 함수를 실행합니다.

```javascript
const fruits = ['apple', 'banana', 'cherry'];
fruits.forEach(fruit => {
    console.log(fruit);
});
// 'apple'
// 'banana'
// 'cherry'
```

### 3.2. map

`map` 메서드는 배열의 각 요소에 대해 함수를 실행하고, 그 결과를 새로운 배열로 반환합니다.

```javascript
const numbers = [1, 2, 3];
const doubled = numbers.map(number => number * 2);
console.log(doubled); // [2, 4, 6]
```

### 3.3. filter

`filter` 메서드는 배열의 각 요소에 대해 함수를 실행하여, 그 결과가 `true`인 요소만을 모아 새로운 배열로 반환합니다.

```javascript
const numbers = [1, 2, 3, 4];
const even = numbers.filter(number => number % 2 === 0);
console.log(even); // [2, 4]
```

### 3.4. reduce

`reduce` 메서드는 배열의 각 요소에 대해 함수를 실행하여, 하나의 값을 반환합니다. 쉽게 이해하기 위해 누산기라고 생각하면 됩니다.

```javascript
const numbers = [1, 2, 3, 4];
const sum = numbers.reduce((total, number) => total + number, 0);
console.log(sum); // 10
```

### 3.5. find

`find` 메서드는 배열의 각 요소에 대해 함수를 실행하여, 그 결과가 `true`인 첫 번째 요소를 반환합니다.

```javascript
const numbers = [1, 2, 3, 4];
const firstEven = numbers.find(number => number % 2 === 0);
console.log(firstEven); // 2
```

### 3.6. sort

`sort` 메서드는 배열의 요소를 정렬합니다. 기본적으로 문자열로 정렬되므로 숫자를 정렬하려면 비교 함수를 제공해야 합니다.

```javascript
const fruits = ['cherry', 'banana', 'apple'];
fruits.sort();
console.log(fruits); // ['apple', 'banana', 'cherry']

const numbers = [4, 2, 3, 1];
numbers.sort((a, b) => a - b);
console.log(numbers); // [1, 2, 3, 4]
```

## 4. 배열과 반복문

배열은 반복문과 함께 자주 사용됩니다. 가장 일반적으로 사용되는 반복문은 `for` 루프입니다.

```javascript
const fruits = ['apple', 'banana', 'cherry'];
for (let i = 0; i < fruits.length; i++) {
    console.log(fruits[i]);
}
// 'apple'
// 'banana'
// 'cherry'
```

ES6부터는 `for...of` 루프를 사용할 수 있습니다.

```javascript
const fruits = ['apple', 'banana', 'cherry'];
for (const fruit of fruits) {
    console.log(fruit);
}
// 'apple'
// 'banana'
// 'cherry'
```

## 5. 배열의 고급 기능

### 5.1. 다차원 배열

JavaScript에서는 배열 안에 배열을 포함하여 다차원 배열을 만들 수 있습니다.

```javascript
const matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

console.log(matrix[1][2]); // 6
```

### 5.2. 배열의 비구조화 할당

ES6부터는 배열의 비구조화 할당(destructuring assignment)을 통해 배열의 요소를 개별 변수로 추출할 수 있습니다.

```javascript
const fruits = ['apple', 'banana', 'cherry'];
const [first, second, third] = fruits;

console.log(first); // 'apple'
console.log(second); // 'banana'
console.log(third); // 'cherry'
```

### 5.3. 스프레드 연산자

스프레드 연산자(spread operator)를 사용하면 배열을 쉽게 복사하거나 결합할 수 있습니다.

```javascript
const fruits = ['apple', 'banana', 'cherry'];
const moreFruits = [...fruits, 'date', 'elderberry'];

console.log(moreFruits); // ['apple', 'banana', 'cherry', 'date', 'elderberry']
```

## 6. 결론

JavaScript 배열은 데이터를 순서대로 저장하고 관리할 수 있는 데이터 구조입니다. 배열의 요소를 추가, 삭제, 수정할 수 있으며, 기본으로 제공하는 메서드를 통해 배열을 쉽게 조작할 수 있습니다.
